import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from 'vitest-browser-svelte';
import DetailShell from './detail-shell.svelte';

/**
 * #165: die DetailShell kapselt den Guard, mit dem jede Detailseite beginnt.
 * Geprüft werden die Zustands-Reihenfolge (Laden > Fehler > nicht gefunden >
 * Inhalt), die Skeleton-Zeilen und die Polsterung der Zustands-Absätze.
 */
const content = createRawSnippet(() => ({
	render: () => '<div id="content">Kundendaten</div>'
}));

const skeletons = (container: Element) =>
	container.querySelectorAll('[data-slot="skeleton"]').length;

describe('DetailShell', () => {
	it('renders the content when loaded, error-free and found', () => {
		const { container } = render(DetailShell, { children: content });
		expect(container.querySelector('#content')).not.toBeNull();
	});

	it('renders the detail skeleton while loading', () => {
		const { container } = render(DetailShell, { loading: true, children: content });
		expect(skeletons(container)).toBeGreaterThan(0);
		expect(container.querySelector('#content')).toBeNull();
	});

	it('forwards skeletonRows to the DetailSkeleton', () => {
		const rows = (n: number) =>
			skeletons(
				render(DetailShell, { loading: true, skeletonRows: n, children: content }).container
			);
		// Zwei Platzhalter pro Grid-Zeile (Label + Wert).
		expect(rows(8) - rows(3)).toBe(2 * 5);
	});

	it('renders the error in the destructive style with p-4 padding', () => {
		const { container } = render(DetailShell, { error: 'Laden fehlgeschlagen', children: content });
		const p = container.querySelector('p') as HTMLElement;
		expect(p.textContent).toBe('Laden fehlgeschlagen');
		expect(p.className).toContain('text-destructive');
		expect(p.className).toContain('font-semibold');
		expect(p.className).toContain('p-4');
		expect(container.querySelector('#content')).toBeNull();
	});

	it('renders the notFound text in the muted style', () => {
		const { container } = render(DetailShell, {
			notFound: true,
			notFoundText: 'Kunde nicht gefunden',
			children: content
		});
		const p = container.querySelector('p') as HTMLElement;
		expect(p.textContent).toBe('Kunde nicht gefunden');
		expect(p.className).toContain('text-muted-foreground');
		expect(p.className).toContain('p-4');
	});

	it('drops the padding when stateClass is cleared', () => {
		const { container } = render(DetailShell, {
			notFound: true,
			notFoundText: 'nicht gefunden',
			stateClass: '',
			children: content
		});
		expect((container.querySelector('p') as HTMLElement).className).not.toContain('p-4');
	});

	it('lets loading win over error and notFound', () => {
		const { container } = render(DetailShell, {
			loading: true,
			error: 'Kaputt',
			notFound: true,
			notFoundText: 'nicht gefunden',
			children: content
		});
		expect(skeletons(container)).toBeGreaterThan(0);
		expect(container.textContent).not.toContain('Kaputt');
	});

	it('lets error win over notFound', () => {
		const { container } = render(DetailShell, {
			error: 'Kaputt',
			notFound: true,
			notFoundText: 'nicht gefunden',
			children: content
		});
		expect(container.textContent).toContain('Kaputt');
		expect(container.textContent).not.toContain('nicht gefunden');
	});
});
