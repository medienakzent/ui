import { describe, expect, it } from 'vitest';
import { mergeObjects } from './data-table.svelte';

describe('mergeObjects', () => {
	it('prefers later sources and keeps key visibility', () => {
		const merged = mergeObjects({ a: 1, shared: 'x' }, { b: 2, shared: 'y' });
		expect((merged as any).a).toBe(1);
		expect((merged as any).b).toBe(2);
		expect((merged as any).shared).toBe('y');
		expect('a' in (merged as any)).toBe(true);
		expect(Object.keys(merged as any)).toEqual(expect.arrayContaining(['a', 'b', 'shared']));
	});

	it('supports thunk sources', () => {
		const merged = mergeObjects(
			() => ({ a: 1 }),
			() => ({ b: 2 })
		);
		expect((merged as any).a).toBe(1);
		expect((merged as any).b).toBe(2);
	});
});
