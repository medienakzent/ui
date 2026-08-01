import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ListRowSkeleton from './list-row-skeleton.svelte';

/**
 * #165: the shared list skeleton must draw exactly `count` placeholder rows so
 * the loading state matches the real list length the caller expects.
 */
describe('ListRowSkeleton', () => {
	it('renders the default number of rows', () => {
		const { container } = render(ListRowSkeleton);
		const wrapper = container.querySelector('.divide-y');
		expect(wrapper?.children.length).toBe(5);
	});

	it('renders exactly `count` rows', () => {
		const { container } = render(ListRowSkeleton, { count: 3 });
		const wrapper = container.querySelector('.divide-y');
		expect(wrapper?.children.length).toBe(3);
	});
});
