import { describe, expect, it } from 'vitest';
import { IsMobile } from './is-mobile.svelte';

describe('IsMobile', () => {
	it('creates media query object', () => {
		const hook = new IsMobile();
		expect(hook).toBeInstanceOf(IsMobile);
	});
});
