<script lang="ts" module>
	/**
	 * Ein Eintrag der Breadcrumb-Kette. Die Ableitung (welche Segmente es gibt,
	 * wie sie heißen, welches Zwischensegment eine echte Route ist) macht die
	 * App — sie kennt ihren Router. Die Shell rendert nur:
	 *
	 * - letzter Eintrag  → aktive Seite (nicht klickbar)
	 * - `href` gesetzt   → Link
	 * - `href` fehlt     → reiner Text (Segment ohne eigene Route)
	 */
	export type AppShellBreadcrumb = { label: string; href?: string };
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';

	type Props = {
		/** Navigationsbaum links (die App reicht ihre eigene Sidebar herein). */
		sidebar?: Snippet;
		/**
		 * Fertig abgeleitete Breadcrumb-Kette, von der Startseite bis zur
		 * aktiven Seite. Ändert sie sich, scrollt die Leiste ans rechte Ende.
		 */
		breadcrumbs?: AppShellBreadcrumb[];
		/** Rechte Seite der Kopfzeile — App-Aktionen (Status, Aktualisieren, …). */
		headerEnd?: Snippet;
		/** Seiteninhalt. */
		children?: Snippet;
		/**
		 * Inhalt unterhalb des Seiteninhalts, aber noch innerhalb des Insets —
		 * für app-eigene Leisten/Overlays, die neben dem Inhalt stehen sollen
		 * (Statusleiste, Toaster).
		 */
		insetEnd?: Snippet;
		/**
		 * Vor-/Zurück-Buttons in der Kopfzeile. Sie existieren für die
		 * installierte PWA, die keine Browser-Leiste hat; in einer normalen
		 * Web-App sind sie redundant → `navButtons={false}`.
		 */
		navButtons?: boolean;
		/** Zurück-Button zeigen (z. B. `false` auf der Startseite). */
		canGoBack?: boolean;
		/** Vorwärts-Button zeigen. */
		canGoForward?: boolean;
		/** Klick auf Zurück — die App entscheidet, was „zurück" heißt. */
		onBack?: () => void;
		/** Klick auf Vorwärts. */
		onForward?: () => void;
		/** Beschriftung (aria-label/title) des Zurück-Buttons. */
		backLabel?: string;
		/** Beschriftung (aria-label/title) des Vorwärts-Buttons. */
		forwardLabel?: string;
		/**
		 * Logo in der Kopfzeile: Bildpfad oder Snippet für eigenes Markup.
		 * Nur auf kleinen Breiten sichtbar — ab `md` zeigt die Sidebar das Logo.
		 */
		logo?: string | Snippet;
		/** Alternativtext, wenn `logo` ein Bildpfad ist. */
		logoAlt?: string;
		/** Beschriftung (aria-label) des Logo-Links. */
		logoLabel?: string;
		/** Logo ausblenden, ohne die Quelle zu entfernen. */
		showLogo?: boolean;
		/** Linkziel des Logos. */
		homeHref?: string;
		/**
		 * Wechselt dieser Wert, wird der Inhaltsbereich neu gemountet — die
		 * Ladelogik der aktuellen Ansicht läuft dadurch frisch (Aktualisieren).
		 */
		reloadKey?: unknown;
	};

	let {
		sidebar,
		breadcrumbs = [],
		headerEnd,
		children,
		insetEnd,
		navButtons = true,
		canGoBack = true,
		canGoForward = true,
		onBack,
		onForward,
		backLabel = 'Zurück',
		forwardLabel = 'Vor',
		logo,
		logoAlt = '',
		logoLabel = 'Start',
		showLogo = true,
		homeHref = '/',
		reloadKey
	}: Props = $props();

	// Einzeilige Breadcrumb-Leiste: nach jeder Änderung ans rechte Ende scrollen,
	// damit die aktive Seite immer sichtbar ist (tiefe Pfade scrollen links raus).
	let breadcrumbScroller: HTMLDivElement | undefined = $state();
	$effect(() => {
		void breadcrumbs;
		const ol = breadcrumbScroller?.querySelector('ol');
		if (ol)
			requestAnimationFrame(() => {
				ol.scrollLeft = ol.scrollWidth;
			});
	});
</script>

<Sidebar.Provider>
	{@render sidebar?.()}
	<!-- ms-0 auch eingeklappt: der Default (ms-2 bei collapsed) erzeugt rechts
	     neben der Icon-Leiste einen zusätzlichen weißen Streifen. -->
	<!-- min-w-0: MAIN ist Flex-Item — ohne die Freigabe drückt der min-content
	     langer Breadcrumbs das Layout über die Viewport-Breite hinaus. -->
	<Sidebar.Inset class="min-w-0 md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-0">
		<header
			class="vt-app-header sticky top-0 right-2 left-2 z-50 flex h-16 items-center gap-2 rounded-t-md bg-background px-4 shadow-sm"
		>
			<div class="flex w-full items-center justify-between gap-2">
				<div class="flex min-w-0 flex-1 items-center gap-2">
					<!-- Reihenfolge auf dem Handy: ganz links der Menü-Button, rechts
					     daneben das Logo (ab md zeigt die Sidebar selbst das Logo). -->
					<!-- Burger + Vor/Zurück: Ghost-Grundfläche transparent — Hintergrund
					     erst beim Hover (User-Vorgabe). -->
					<Sidebar.Trigger class="-ms-1 bg-transparent dark:bg-transparent" />
					<!-- Globale Vor-/Zurück-Buttons direkt rechts neben dem Burger-Menü:
					     auf ALLEN Geräten sichtbar (auch Desktop und installierte PWA),
					     gleiche Größe wie der Sidebar-Trigger (size-9/Icon size-5);
					     Zurück nur auf der Startseite ausgeblendet. Was „zurück"/„vor"
					     bedeutet, entscheidet die App (onBack/onForward). -->
					{#if navButtons}
						{#if canGoBack}
							<Button
								variant="ghost"
								size="icon"
								type="button"
								onclick={() => onBack?.()}
								aria-label={backLabel}
								title={backLabel}
								class="size-9 shrink-0 bg-transparent text-muted-foreground dark:bg-transparent"
							>
								<ArrowLeftIcon class="size-5" />
							</Button>
						{/if}
						{#if canGoForward}
							<Button
								variant="ghost"
								size="icon"
								type="button"
								onclick={() => onForward?.()}
								aria-label={forwardLabel}
								title={forwardLabel}
								class="size-9 shrink-0 bg-transparent text-muted-foreground dark:bg-transparent"
							>
								<ArrowRightIcon class="size-5" />
							</Button>
						{/if}
					{/if}
					{#if logo && showLogo}
						<a href={homeHref} class="md:hidden" aria-label={logoLabel}>
							{#if typeof logo === 'string'}
								<img class="size-8 rounded-md" src={logo} alt={logoAlt} />
							{:else}
								{@render logo()}
							{/if}
						</a>
					{/if}
					<Separator
						orientation="vertical"
						class="me-2 hidden data-[orientation=vertical]:h-4 lg:block"
					/>
					<!-- Breadcrumb: immer EINZEILIG — bei tiefen Pfaden scrollt die Leiste
					     horizontal; nach Navigation wird ans Ende (aktive Seite) gescrollt. -->
					<div bind:this={breadcrumbScroller} class="hidden min-w-0 flex-1 lg:block">
						<Breadcrumb.Root>
							<Breadcrumb.List
								class="flex-nowrap overflow-x-auto whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
							>
								{#each breadcrumbs as crumb, index (index)}
									{#if index > 0}
										<Breadcrumb.Separator class={index === 1 ? 'hidden md:block' : ''} />
									{/if}
									<Breadcrumb.Item class={index === 0 ? 'hidden md:block' : ''}>
										{#if index === breadcrumbs.length - 1}
											<Breadcrumb.Page>{crumb.label}</Breadcrumb.Page>
										{:else if crumb.href}
											<Breadcrumb.Link href={crumb.href}>{crumb.label}</Breadcrumb.Link>
										{:else}
											<!-- Segment ohne eigene Route (z. B. "Projekte"/"Geräte" in
										     /tours/…): reiner Text statt Link in einen 404. -->
											<span class="text-muted-foreground">{crumb.label}</span>
										{/if}
									</Breadcrumb.Item>
								{/each}
							</Breadcrumb.List>
						</Breadcrumb.Root>
					</div>
				</div>
				<div class="flex items-center gap-2">
					{@render headerEnd?.()}
				</div>
			</div>
		</header>

		<!-- vt-page-content: Animations-Hook des Seitenwechsels (nur dieser
		     Bereich bewegt sich, Sidebar/Header bleiben statisch). Der
		     {#key}-Block remountet die Seite beim Refresh-Button — die
		     onMount-Ladelogik der aktuellen Ansicht läuft dadurch frisch. -->
		<section class="vt-page-content p-4">
			{#key reloadKey}
				{@render children?.()}
			{/key}
		</section>

		{@render insetEnd?.()}
	</Sidebar.Inset>
</Sidebar.Provider>
