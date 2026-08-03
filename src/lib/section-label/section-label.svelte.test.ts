import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import SectionLabel, { sectionLabelClass } from './section-label.svelte';

/**
 * #165: die Logik der Abschnittsüberschrift ist die Element-Wahl (`as`) und das
 * Mergen der Abstands-Klassen der Aufrufstelle auf den Basis-Stil — genau die
 * beiden Punkte, in denen sich die 45 Fundstellen unterscheiden.
 */
describe('SectionLabel', () => {
	it('renders an <h3> with the base classes by default', () => {
		const { container } = render(SectionLabel);
		const el = container.firstElementChild as HTMLElement;
		expect(el.tagName).toBe('H3');
		for (const cls of sectionLabelClass.split(' ')) {
			expect(el.className).toContain(cls);
		}
	});

	it('renders the element given via `as`', () => {
		for (const [as, tag] of [
			['h4', 'H4'],
			['span', 'SPAN'],
			['p', 'P']
		]) {
			const { container } = render(SectionLabel, { as });
			expect((container.firstElementChild as HTMLElement).tagName).toBe(tag);
		}
	});

	it('keeps the base style when spacing classes are passed via `class`', () => {
		const { container } = render(SectionLabel, { class: 'mb-2 shrink-0' });
		const el = container.firstElementChild as HTMLElement;
		expect(el.className).toContain('mb-2');
		expect(el.className).toContain('shrink-0');
		expect(el.className).toContain('uppercase');
		expect(el.className).toContain('text-muted-foreground');
	});

	it('never falls below text-xs (Designkanon)', () => {
		const { container } = render(SectionLabel);
		expect((container.firstElementChild as HTMLElement).className).toContain('text-xs');
	});

	it('passes extra attributes through to the element', () => {
		const { container } = render(SectionLabel, { id: 'devices-heading' });
		expect((container.firstElementChild as HTMLElement).id).toBe('devices-heading');
	});
});
