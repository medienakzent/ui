import { describe, expect, it } from 'vitest';
import {
	RenderComponentConfig,
	RenderSnippetConfig,
	renderComponent,
	renderSnippet
} from './render-helpers';

describe('render helpers', () => {
	it('wraps components in RenderComponentConfig', () => {
		const component = {} as any;
		const result = renderComponent(component, { a: 1 } as any);
		expect(result).toBeInstanceOf(RenderComponentConfig);
		expect(result.component).toBe(component);
	});

	it('wraps snippets in RenderSnippetConfig', () => {
		const snippet = (() => null) as any;
		const result = renderSnippet(snippet, { b: 2 });
		expect(result).toBeInstanceOf(RenderSnippetConfig);
		expect(result.snippet).toBe(snippet);
		expect(result.params).toEqual({ b: 2 });
	});
});
