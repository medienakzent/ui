<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import ListRowSkeleton from '$lib/components/ui/skeleton/list-row-skeleton.svelte';
	import SpeechInput from './speech-input.svelte';
	import XIcon from '@lucide/svelte/icons/x';
	import { uiSettings } from '$lib/stores/ui-settings';
	import { showError } from '$lib/services/toast';
	import { dictionary } from '$lib/i18n';

	export let title: string;
	/** Kompletten Kopf (Überschrift + Zähler-Badge) ausblenden — z. B. im Geräte-
	 *  Tab, wo der Tab-Name die Überschrift bereits liefert. */
	export let hideHeader: boolean = false;
	export let count: number = 0;
	export let countLabel: string = '';
	export let countLabelSingular: string = '';
	export let placeholder: string = '';
	export let loading: boolean = false;
	export let error: string = '';
	export let empty: boolean = false;
	export let emptyText: string = '';
	export let search: string = '';
	export let skeletonCount: number = 5;

	$: resolvedEmpty = emptyText || $dictionary.lists.emptyDefault;

	let lastReportedError = '';
	$: if (error && error !== lastReportedError) {
		lastReportedError = error;
		showError(error);
	}

	$: searchBottom = $uiSettings.searchBarPosition === 'bottom';
	$: speechEnabled = $uiSettings.speechInputEnabled;
	$: buttonsRight = $uiSettings.searchBarButtonSide === 'right';

	// Rundet/bordert die Suchleisten-Segmente nach ihrer tatsaechlichen
	// DOM-Position (erstes/mittleres/letztes Kind), statt jedes Element seine
	// Seite raten zu lassen. Dadurch stimmen die Radien unabhaengig davon, ob die
	// Buttons links oder rechts stehen und welche Segmente vorhanden sind.
	const barSegments =
		'[&>*:first-child]:rounded-s-md [&>*:last-child]:rounded-e-md ' +
		'[&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none ' +
		'[&>*:last-child]:border-e [&>*:not(:last-child)]:border-e-0';
</script>

<section class="relative">
	{#if !hideHeader}
		<div class="mb-2 flex items-center justify-between">
			<div>
				<h2 class="text-xl font-semibold text-foreground">{title}</h2>
			</div>
			<span
				class="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
			>
				{count}
				{count === 1 ? countLabelSingular || countLabel : countLabel}
			</span>
		</div>
	{/if}

	<!-- Optional action row above the search bar (e.g. batch/prefill button) -->
	{#if $$slots['above-search']}
		<div class="mb-2 flex flex-wrap items-center gap-2">
			<slot name="above-search" />
		</div>
	{/if}

	{#if !searchBottom}
		<div
			class="sticky top-[4rem] z-20 -mx-4 mb-2 flex flex-row flex-wrap items-center gap-2 bg-background px-3 py-2 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.08)]"
		>
			<div class="flex min-w-0 flex-1 flex-row items-center {barSegments}">
				{#if !buttonsRight}
					<slot name="before-search" />
					{#if speechEnabled}
						<SpeechInput bind:value={search} />
					{/if}
				{/if}
				<Input {placeholder} bind:value={search} aria-label={placeholder} />
				{#if search}
					<!-- #82: X-Button zum Leeren der Suche (als eigenes Leisten-Segment,
				     nur bei Eingabe sichtbar). -->
					<button
						type="button"
						on:click={() => (search = '')}
						aria-label={$dictionary.lists.clearSearch}
						title={$dictionary.lists.clearSearch}
						class="flex h-9 shrink-0 items-center justify-center border border-input bg-background px-2.5 text-foreground transition-colors hover:bg-muted"
					>
						<XIcon class="size-4" />
					</button>
				{/if}
				{#if buttonsRight}
					{#if speechEnabled}
						<SpeechInput bind:value={search} />
					{/if}
					<slot name="before-search" />
				{/if}
			</div>
			{#if $$slots['after-search']}
				<div class="flex shrink-0 flex-wrap items-center gap-2">
					<slot name="after-search" />
				</div>
			{/if}
		</div>
	{/if}

	<!-- Optional filter row (e.g. status/result chips) directly under the search -->
	{#if $$slots.filters}
		<div class="mb-2">
			<slot name="filters" />
		</div>
	{/if}

	<!-- Skeleton nur beim Erstladen (noch keine Einträge). Läuft ein Reload mit
	     vorhandenen Daten (Suche/Sync), bleibt die alte Liste stehen und die
	     neuen Ergebnisse animieren per flip/fade hinein — ein Skeleton-Blitz
	     pro Tastendruck würde jede Listen-Animation unsichtbar machen. -->
	{#if loading && empty}
		<ListRowSkeleton count={skeletonCount} />
	{:else if error}
		<p class="text-sm text-muted-foreground">{resolvedEmpty}</p>
	{:else if empty}
		<p class="text-sm text-muted-foreground">{resolvedEmpty}</p>
	{:else}
		<!-- -mx-4: Bleed auf Seitenbreite (Gegenstück zum px-4 der ListRow) —
		     Zeilen-Hintergründe und Trennlinien laufen bis an den Rand. -->
		<div class="-mx-4 divide-y divide-border">
			<slot />
		</div>
	{/if}

	{#if searchBottom}
		<div
			class="sticky bottom-0 z-20 -mx-2 mt-2 flex flex-row items-center bg-background px-2 pt-2 pb-1 shadow-[0_-4px_6px_-4px_rgba(0,0,0,0.08)] {barSegments}"
		>
			{#if !buttonsRight}
				<slot name="before-search" />
				{#if speechEnabled}
					<SpeechInput bind:value={search} />
				{/if}
			{/if}
			<Input {placeholder} bind:value={search} aria-label={placeholder} />
			{#if search}
				<!-- #82: X-Button zum Leeren der Suche (als eigenes Leisten-Segment,
				     nur bei Eingabe sichtbar). -->
				<button
					type="button"
					on:click={() => (search = '')}
					aria-label={$dictionary.lists.clearSearch}
					title={$dictionary.lists.clearSearch}
					class="flex h-9 shrink-0 items-center justify-center border border-input bg-background px-2.5 text-foreground transition-colors hover:bg-muted"
				>
					<XIcon class="size-4" />
				</button>
			{/if}
			{#if buttonsRight}
				{#if speechEnabled}
					<SpeechInput bind:value={search} />
				{/if}
				<slot name="before-search" />
			{/if}
		</div>
	{/if}
</section>
