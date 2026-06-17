import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Badge, { badgeVariants } from './badge.svelte';

/**
 * #165: erster echter gerenderter Komponententest (Chromium via
 * vitest-browser-svelte). Deckt die eigentliche Logik der Badge ab — die
 * Variant→Klassen-Zuordnung und die Tag-Auswahl (span / a / button).
 */
describe('Badge', () => {
	it('renders a <span> with the neutral variant classes by default', () => {
		const { container } = render(Badge);
		const el = container.querySelector('span');
		expect(el).not.toBeNull();
		expect(el?.className).toContain('rounded-full');
		// neutral is the default variant
		expect(el?.className).toContain('text-foreground');
	});

	it('applies the warning variant classes', () => {
		const { container } = render(Badge, { variant: 'warning' });
		const el = container.querySelector('span');
		expect(el?.className).toContain('bg-amber-50');
		expect(el?.className).toContain(badgeVariants.warning.split(' ')[0]);
	});

	it('renders an <a> with the href when one is passed', () => {
		const { container } = render(Badge, { variant: 'id', href: '/customers/1' });
		const a = container.querySelector('a');
		expect(a).not.toBeNull();
		expect(a?.getAttribute('href')).toBe('/customers/1');
		expect(container.querySelector('span')).toBeNull();
	});

	it('renders a <button> when an onclick handler is passed', () => {
		const { container } = render(Badge, { onclick: () => {} });
		const button = container.querySelector('button');
		expect(button).not.toBeNull();
		expect(button?.getAttribute('type')).toBe('button');
	});
});
