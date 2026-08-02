<script lang="ts">
	import { tick, untrack, type ComponentProps, type Snippet } from 'svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import NavMain from '$lib/components/nav-main.svelte';
	import NavSecondary from '$lib/components/nav-secondary.svelte';
	import NavUser from '$lib/components/nav-user.svelte';
	import type { ShellNavItem } from '$lib/components/nav-types.js';
	import SearchIcon from '@lucide/svelte/icons/search';

	type Props = {
		/** Hauptnavigation — bereits übersetzt und gefiltert (siehe ShellNavItem). */
		navMain: ShellNavItem[];
		/** Sekundärnavigation (Icon-Reihe am unteren Menürand). */
		navSecondary: ShellNavItem[];
		/** Aktueller Pfad: Aktiv-Erkennung der Navigation + Navigations-Signal. */
		pathname: string;
		user: ComponentProps<typeof NavUser>['user'];
		/** Bereits übersetzte Beschriftung des Abmelde-Eintrags. */
		logoutLabel: string;
		/** Abmelden anstoßen — die Bestätigung stellt die App (`footerExtras`). */
		onLogout: () => void;
		/**
		 * Erste Kopfzeile neben dem Logo. Bewusst NICHT `title` — der Name
		 * kollidiert mit dem gleichnamigen HTML-Attribut aus `Sidebar.Root`.
		 */
		brandTitle: string;
		/** Zweite Kopfzeile (Produkt-/Versionszeile), optional. */
		brandSubtitle?: string;
		/** Logo: Bildpfad oder Snippet für eigenes Markup. */
		logo: string | Snippet;
		/** Alternativtext, wenn `logo` ein Bildpfad ist. */
		logoAlt?: string;
		/** Linkziel des Logos. */
		homeHref?: string;
		/** Zusatzzeile(n) innerhalb des Logo-Menüs (z. B. Build-Info). */
		brandExtras?: Snippet;
		/** Eigener Kopfbereich unter dem Logo-Menü (z. B. Kontext-Auswahl). */
		headerExtras?: Snippet;
		/** Suchfeld im Kopfbereich; nur mit diesem Snippet erscheint die Suchzeile. */
		search?: Snippet;
		/** Beschriftung des Such-Icons im eingeklappten Zustand. */
		searchLabel?: string;
		/** Zusätzlicher Inhalt im Footer (z. B. Bestätigungsdialoge). */
		footerExtras?: Snippet;
		/**
		 * Nach jeder Navigation (und beim ersten Rendern) mit dem aktuellen Pfad
		 * aufgerufen — Ersatz für einen Router-Hook, den die Shell nicht kennt.
		 */
		onNavigated?: (pathname: string) => void;
	} & ComponentProps<typeof Sidebar.Root>;

	let {
		ref = $bindable(null),
		navMain,
		navSecondary,
		pathname,
		user,
		logoutLabel,
		onLogout,
		brandTitle,
		brandSubtitle,
		logo,
		logoAlt = '',
		homeHref = '/',
		brandExtras,
		headerExtras,
		search,
		searchLabel,
		footerExtras,
		onNavigated,
		...restProps
	}: Props = $props();

	// Für die Icon-Platzhalter (Suche) im eingeklappten Zustand: Klick fährt die
	// Sidebar wieder auf (dann steht das echte Control bereit).
	const sidebar = useSidebar();

	// Mobiles Sheet-Menü bei JEDER Navigation schließen — egal ob der Klick aus
	// NavMain, NavSecondary, Suche oder Logo kam. Ohne das bleibt das Menü
	// während des Seitenwechsels offen. `untrack` hält das Signal auf den
	// Pfadwechsel begrenzt (sonst löst jede Sidebar-Zustandsänderung mit aus).
	// Der Pfad IST das Navigations-Signal — die Shell kennt bewusst keinen Router
	// (Bibliotheks-Vorgabe, docs/UI-LIBRARY.md 2.2). Navigationen auf denselben
	// Pfad (Klick auf den bereits aktiven Eintrag) sieht sie darum nicht.
	$effect(() => {
		const path = pathname;
		untrack(() => {
			if (sidebar.isMobile && sidebar.openMobile) sidebar.setOpenMobile(false);
			onNavigated?.(path);
		});
	});

	// Such-Icon (eingeklappt): Sidebar auffahren UND das Suchfeld fokussieren.
	async function openAndFocusSearch() {
		sidebar.setOpen(true);
		await tick();
		document.querySelector<HTMLInputElement>('[data-global-search-slot] input')?.focus();
	}
</script>

<!-- collapsible="icon": nie komplett zufahren — eingeklappt bleibt eine
     Icon-Leiste mit App-Symbol stehen (Navigation per Tooltip bedienbar). -->
<Sidebar.Root bind:ref variant="inset" collapsible="icon" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<!-- Eingeklappt: gleiche Zeilenhöhe wie ausgeklappt (h-12), Logo zentriert -->
			<Sidebar.MenuItem
				class="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
			>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href={homeHref} {...props}>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								{#if typeof logo === 'string'}
									<img class="rounded-lg" src={logo} alt={logoAlt} />
								{:else}
									{@render logo()}
								{/if}
							</div>
							<div
								class="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden"
							>
								<span class="truncate font-medium">{brandTitle}</span>
								{#if brandSubtitle}
									<span class="truncate text-xs">{brandSubtitle}</span>
								{/if}
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
			{@render brandExtras?.()}
		</Sidebar.Menu>
		{@render headerExtras?.()}
		{#if search}
			<Sidebar.Menu>
				<Sidebar.MenuItem>
					<!-- Eingeklappt: Such-Icon an gleicher Position (zentriert), Klick fährt
					     die Sidebar auf und fokussiert das Suchfeld. Kein Tooltip. -->
					<div
						class="hidden h-[42px] items-center justify-center pb-1.5 group-data-[collapsible=icon]:flex"
					>
						<Sidebar.MenuButton aria-label={searchLabel} onclick={openAndFocusSearch}>
							<SearchIcon />
						</Sidebar.MenuButton>
					</div>
					<div class="pb-1.5 group-data-[collapsible=icon]:hidden" data-global-search-slot>
						{@render search()}
					</div>
				</Sidebar.MenuItem>
			</Sidebar.Menu>
		{/if}
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navMain} {pathname} />
		<NavSecondary items={navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<!-- Eingeklappt (Icon-Modus): das Benutzer-Icon ganz unten ausblenden
	     (User-Vorgabe 2026-07-29). -->
	<Sidebar.Footer class="group-data-[collapsible=icon]:hidden">
		<NavUser {user} {logoutLabel} {onLogout} />
		{@render footerExtras?.()}
	</Sidebar.Footer>
</Sidebar.Root>
