import { describe, expect, it } from 'vitest';
import { cn } from './ui-utils';

describe('ui-utils', () => {
	it('cn merges class names', () => {
		expect(cn('a', 'b')).toContain('a');
		expect(cn('a', 'b')).toContain('b');
	});
});
