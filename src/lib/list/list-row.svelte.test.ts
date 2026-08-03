import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from 'vitest-browser-svelte';
import ListRow from './list-row.svelte';

const snippet = (html: string) => createRawSnippet(() => ({ render: () => html }));

const title = snippet('<span>Titel</span>');

/**
 * #165: ListRow chooses its root element based on `href` + presence of an
 * actions slot. Without actions a row with an href IS the anchor (simplest,
 * most robust); without an href it stays a plain div. This is the core layout
 * decision shared by every list in the app.
 */
describe('ListRow', () => {
	it('renders the whole row as an anchor when href is set and there are no actions', () => {
		const { container } = render(ListRow, { href: '/tours/1', title });
		const root = container.firstElementChild as HTMLElement;
		expect(root.tagName).toBe('A');
		expect(root.getAttribute('href')).toBe('/tours/1');
		expect(root.textContent).toContain('Titel');
	});

	it('renders a plain div (no whole-row link) when no href is given', () => {
		const { container } = render(ListRow, { title });
		const root = container.firstElementChild as HTMLElement;
		expect(root.tagName).toBe('DIV');
		expect(container.querySelector('a')).toBeNull();
	});

	it('indents the row when `indent` is set', () => {
		const { container } = render(ListRow, { href: '/x', indent: true, title });
		const root = container.firstElementChild as HTMLElement;
		expect(root.className).toContain('ml-6');
	});

	// Der a11y-Invariant der Ganz-Zeilen-Navigation: sobald die Zeile eigene
	// Bedienelemente hat (actions-Buttons oder den Aufklapp-Button der
	// Badge-Reihe), darf kein Anchor die Zeile umschließen — sonst läge ein
	// <button> in einem <a>. Der Titel bleibt über den stretched-link klickbar.
	it('keeps the row a div (stretched title link) when actions are given', () => {
		const { container } = render(ListRow, {
			href: '/tours/1',
			title,
			actions: snippet('<button type="button">Aktion</button>')
		});
		const root = container.firstElementChild as HTMLElement;
		expect(root.tagName).toBe('DIV');
		expect(container.querySelector('a.stretched-link')?.getAttribute('href')).toBe('/tours/1');
		expect(container.querySelector('a button')).toBeNull();
	});

	it('keeps the row a div (stretched title link) when badges are given', () => {
		const { container } = render(ListRow, {
			href: '/tours/1',
			title,
			badges: snippet('<span>Projekte 3</span>')
		});
		const root = container.firstElementChild as HTMLElement;
		expect(root.tagName).toBe('DIV');
		expect(container.querySelector('a.stretched-link')?.getAttribute('href')).toBe('/tours/1');
		expect(container.querySelector('a button')).toBeNull();
	});

	it('renders the optional regions only when their snippet is given', () => {
		const { container } = render(ListRow, { title });
		expect(container.textContent).not.toContain('Zeitraum');

		const withRegions = render(ListRow, {
			title,
			idBadge: snippet('<span>KNr 4711</span>'),
			timeframe: snippet('<span>Zeitraum</span>'),
			meta: snippet('<span>Metazeile</span>'),
			date: snippet('<span>01.08.2026</span>')
		});
		expect(withRegions.container.textContent).toContain('KNr 4711');
		expect(withRegions.container.textContent).toContain('Zeitraum');
		expect(withRegions.container.textContent).toContain('Metazeile');
		expect(withRegions.container.textContent).toContain('01.08.2026');
	});
});
