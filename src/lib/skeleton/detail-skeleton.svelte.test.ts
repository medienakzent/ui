import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DetailSkeleton from './detail-skeleton.svelte';

/**
 * #165: the detail-page skeleton draws a label/value grid with `rows` rows, i.e.
 * two skeleton cells per row on top of the fixed header/action placeholders.
 */
describe('DetailSkeleton', () => {
	const skeletonCount = (rows: number) =>
		render(DetailSkeleton, { rows }).container.querySelectorAll('[data-slot="skeleton"]').length;

	it('adds two skeleton cells for each grid row', () => {
		// Difference isolates the per-row contribution from the fixed header/buttons.
		expect(skeletonCount(5) - skeletonCount(2)).toBe(2 * 3);
	});

	it('renders header + action placeholders too', () => {
		// 3 (title row) + 2 (action buttons) fixed placeholders, plus 2 per row.
		expect(skeletonCount(0)).toBe(5);
	});
});
