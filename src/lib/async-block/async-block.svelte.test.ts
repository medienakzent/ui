import { describe, expect, it } from 'vitest';
import { createRawSnippet } from 'svelte';
import { render } from 'vitest-browser-svelte';
import AsyncBlock from './async-block.svelte';

/**
 * #165: der AsyncBlock kapselt die Zustands-Reihenfolge (Laden > Fehler > Leer >
 * Inhalt) und die Standarddarstellung der drei Zustände. Genau das wird geprüft —
 * inklusive der Snippet-Overrides, mit denen Aufrufstellen abweichend rendern
 * (z. B. Skeleton statt Spinner).
 */
const snippet = (html: string) => createRawSnippet(() => ({ render: () => html }));

const content = snippet('<ul id="content"><li>Zeile</li></ul>');

describe('AsyncBlock', () => {
	it('renders the content when not loading, not failed and not empty', () => {
		const { container } = render(AsyncBlock, { children: content });
		expect(container.querySelector('#content')).not.toBeNull();
	});

	it('shows the spinner with the loading text while loading', () => {
		const { container } = render(AsyncBlock, {
			loading: true,
			loadingText: 'Lade Positionen …',
			children: content
		});
		const status = container.querySelector('[role="status"]');
		expect(status?.textContent).toContain('Lade Positionen …');
		expect(container.querySelector('#content')).toBeNull();
	});

	it('shows the error in the destructive style and hides the content', () => {
		const { container } = render(AsyncBlock, { error: 'Kaputt', children: content });
		const p = container.querySelector('p');
		expect(p?.textContent).toBe('Kaputt');
		expect(p?.className).toBe('text-sm font-semibold text-destructive');
		expect(container.querySelector('#content')).toBeNull();
	});

	it('shows the empty text in the muted style', () => {
		const { container } = render(AsyncBlock, {
			empty: true,
			emptyText: 'Keine Positionen',
			children: content
		});
		const p = container.querySelector('p');
		expect(p?.textContent).toBe('Keine Positionen');
		expect(p?.className).toBe('text-sm text-muted-foreground');
	});

	it('renders nothing for an empty state without text or snippet', () => {
		const { container } = render(AsyncBlock, { empty: true, children: content });
		expect(container.textContent?.trim()).toBe('');
	});

	it('lets loading win over error and empty', () => {
		const { container } = render(AsyncBlock, {
			loading: true,
			error: 'Kaputt',
			empty: true,
			children: content
		});
		expect(container.querySelector('[role="status"]')).not.toBeNull();
		expect(container.textContent).not.toContain('Kaputt');
	});

	it('lets error win over empty', () => {
		const { container } = render(AsyncBlock, {
			error: 'Kaputt',
			empty: true,
			emptyText: 'Keine Positionen',
			children: content
		});
		expect(container.textContent).toContain('Kaputt');
		expect(container.textContent).not.toContain('Keine Positionen');
	});

	it('uses the loadingContent snippet instead of the spinner', () => {
		const { container } = render(AsyncBlock, {
			loading: true,
			loadingContent: snippet('<div id="skeleton"></div>'),
			children: content
		});
		expect(container.querySelector('#skeleton')).not.toBeNull();
		expect(container.querySelector('[role="status"]')).toBeNull();
	});

	it('passes the error text into the errorContent snippet', () => {
		const errorContent = createRawSnippet((message: () => string) => ({
			render: () => `<div id="custom-error">${message()}</div>`
		}));
		const { container } = render(AsyncBlock, { error: 'Kaputt', errorContent, children: content });
		expect(container.querySelector('#custom-error')?.textContent).toBe('Kaputt');
	});

	it('uses the emptyContent snippet instead of the default text', () => {
		const { container } = render(AsyncBlock, {
			empty: true,
			emptyText: 'Keine Positionen',
			emptyContent: snippet('<div id="custom-empty">nix</div>'),
			children: content
		});
		expect(container.querySelector('#custom-empty')).not.toBeNull();
		expect(container.textContent).not.toContain('Keine Positionen');
	});
});
