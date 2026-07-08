<!--
	SearchableSelect — Dropdown "wie bei Lager" (bits-ui-Floating mit Portal,
	Kollisions-Handling und interner Scroll-Liste), zusätzlich mit Suchfeld.

	Warum Popover statt Select: bits-ui Select fängt Tastatureingaben für die
	Typeahead-Navigation ab — ein frei fokussierbares Suchfeld im Panel braucht
	die neutrale Popover-Basis. Portal + Floating-Positionierung lösen zugleich
	die Z-Index-/Overflow-Probleme der bisherigen inline-`absolute`-Menüs:
	der Inhalt wird nach body portaliert und liegt auf derselben Overlay-Ebene
	(z-50) wie alle anderen Popups, statt im Stacking-Kontext der Seite mit
	Sticky-Headern und Save-Bar zu konkurrieren.

	Zwei Betriebsarten:
	- Value-Select (`value` gesetzt): Trigger zeigt das gewählte Label,
	  Optionen bekommen ein Häkchen (wie ui/select).
	- Aktions-Menü (`value` = null/undefined): Trigger zeigt immer den
	  `placeholder`, Auswahl feuert nur `onSelect`.
-->
<script lang="ts" module>
	export type SearchableSelectOption = {
		value: string;
		label: string;
		/** Zusätzliche Klassen für den Options-Button (z. B. Warnfarben in Aktions-Menüs). */
		class?: string;
		/** Trennlinie oberhalb dieser Option (bei aktiver Suche ausgeblendet). */
		separatorBefore?: boolean;
	};
</script>

<script lang="ts">
	import { Popover as PopoverPrimitive } from 'bits-ui';
	import { Check, ChevronDown, Search } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { dictionary } from '$lib/i18n';

	let {
		options = [],
		value = null,
		onSelect,
		placeholder = '',
		disabled = false,
		searchable = true,
		align = 'start',
		invalid = false,
		class: className,
		style = '',
		open = $bindable(false)
	}: {
		options?: SearchableSelectOption[];
		value?: string | null;
		onSelect?: (value: string) => void;
		placeholder?: string;
		disabled?: boolean;
		searchable?: boolean;
		align?: 'start' | 'center' | 'end';
		invalid?: boolean;
		class?: string;
		style?: string;
		open?: boolean;
	} = $props();

	let query = $state('');
	let listEl: HTMLDivElement | null = $state(null);
	let searchEl: HTMLInputElement | null = $state(null);

	const selected = $derived(options.find((o) => o.value === value) ?? null);
	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;
	});

	function pick(opt: SearchableSelectOption) {
		open = false;
		onSelect?.(opt.value);
	}

	function optionButtons(): HTMLButtonElement[] {
		return listEl ? Array.from(listEl.querySelectorAll('button')) : [];
	}

	function onSearchKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (filtered.length > 0) pick(filtered[0]);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			optionButtons()[0]?.focus();
		}
	}

	function onListKeydown(e: KeyboardEvent) {
		if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
		e.preventDefault();
		const buttons = optionButtons();
		if (buttons.length === 0) return;
		const idx = buttons.indexOf(document.activeElement as HTMLButtonElement);
		if (e.key === 'ArrowDown') {
			buttons[Math.min(idx + 1, buttons.length - 1)]?.focus();
		} else if (idx <= 0) {
			searchEl?.focus();
		} else {
			buttons[idx - 1]?.focus();
		}
	}
</script>

<PopoverPrimitive.Root
	bind:open
	onOpenChange={(o) => {
		if (o) query = '';
	}}
>
	<PopoverPrimitive.Trigger
		{disabled}
		{style}
		aria-invalid={invalid || undefined}
		class={cn(
			'flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-xs ring-offset-background transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
			'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
			'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
			className
		)}
	>
		<span class="line-clamp-1 text-left">{selected?.label ?? placeholder}</span>
		<ChevronDown class="ml-2 size-4 shrink-0 opacity-60" />
	</PopoverPrimitive.Trigger>
	<PopoverPrimitive.Portal>
		<PopoverPrimitive.Content
			{align}
			sideOffset={4}
			collisionPadding={16}
			onOpenAutoFocus={(e) => {
				// Kein Autofokus auf das Suchfeld — sonst klappt auf Mobilgeräten
				// sofort die Bildschirmtastatur auf. Fokus stattdessen auf die Liste.
				e.preventDefault();
				listEl?.focus();
			}}
			class="z-50 flex max-h-[var(--bits-floating-available-height)] min-w-[max(10rem,var(--bits-floating-anchor-width))] animate-in flex-col overflow-hidden rounded-md border border-slate-200 bg-popover text-popover-foreground shadow-md fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 dark:border-slate-800 dark:bg-slate-900"
		>
			{#if searchable}
				<div class="shrink-0 border-b border-border p-1.5">
					<div class="relative">
						<Search
							class="pointer-events-none absolute top-1/2 left-2 size-3.5 -translate-y-1/2 text-muted-foreground"
						/>
						<input
							bind:this={searchEl}
							bind:value={query}
							type="text"
							placeholder={$dictionary.common.select.searchPlaceholder}
							onkeydown={onSearchKeydown}
							class="h-8 w-full rounded-sm border border-input bg-background pr-2 pl-7 text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
						/>
					</div>
				</div>
			{/if}
			<div
				bind:this={listEl}
				tabindex="-1"
				role="listbox"
				onkeydown={onListKeydown}
				class="overflow-y-auto overscroll-contain p-1 outline-none"
			>
				{#each filtered as opt (opt.value)}
					{#if opt.separatorBefore && !query.trim()}
						<div class="my-1 border-t border-border" role="separator"></div>
					{/if}
					<button
						type="button"
						role="option"
						aria-selected={value != null ? opt.value === value : undefined}
						onclick={() => pick(opt)}
						class={cn(
							'flex w-full items-center rounded-sm px-2 py-2 text-left text-sm transition outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							opt.class
						)}
					>
						{#if value != null}
							<span class="mr-2 flex size-4 shrink-0 items-center justify-center">
								{#if opt.value === value}
									<Check class="size-4" />
								{/if}
							</span>
						{/if}
						<span class="flex-1">{opt.label}</span>
					</button>
				{/each}
				{#if filtered.length === 0}
					<p class="px-2 py-3 text-center text-sm text-muted-foreground">
						{$dictionary.common.select.noResults}
					</p>
				{/if}
			</div>
		</PopoverPrimitive.Content>
	</PopoverPrimitive.Portal>
</PopoverPrimitive.Root>
