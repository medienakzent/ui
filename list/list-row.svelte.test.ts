import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ListRow from './list-row.svelte';

/**
 * #165: ListRow chooses its root element based on `href` + presence of an
 * actions slot. Without actions a row with an href IS the anchor (simplest,
 * most robust); without an href it stays a plain div. This is the core layout
 * decision shared by every list in the app.
 */
describe('ListRow', () => {
	it('renders the whole row as an anchor when href is set and there are no actions', () => {
		const { container } = render(ListRow, { href: '/tours/1' });
		const root = container.firstElementChild as HTMLElement;
		expect(root.tagName).toBe('A');
		expect(root.getAttribute('href')).toBe('/tours/1');
	});

	it('renders a plain div (no whole-row link) when no href is given', () => {
		const { container } = render(ListRow);
		const root = container.firstElementChild as HTMLElement;
		expect(root.tagName).toBe('DIV');
		expect(container.querySelector('a')).toBeNull();
	});

	it('indents the row when `indent` is set', () => {
		const { container } = render(ListRow, { href: '/x', indent: true });
		const root = container.firstElementChild as HTMLElement;
		expect(root.className).toContain('ml-6');
	});
});
