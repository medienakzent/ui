<script lang="ts">
	import * as Sidebar from '../sidebar/index.js';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import type { ShellNavItem } from './nav-types.js';

	type Props = {
		items: ShellNavItem[];
		/** Aktueller Pfad für die Aktiv-Erkennung (App liefert ihn, kein Router-Import). */
		pathname: string;
	};

	let { items, pathname }: Props = $props();

	function isActiveRoute(url: string, path: string): boolean {
		if (url === '/') return path === '/';
		return path === url || path.startsWith(url + '/');
	}
</script>

<Sidebar.Group>
	<Sidebar.Menu>
		{#each items as mainItem (mainItem.id)}
			{@const active = isActiveRoute(mainItem.href, pathname)}
			<!-- Eingeklappt: Zeile behält die ausgeklappte Höhe (h-9), Icon
				     zentriert, bewusst ohne Tooltip. -->
			<Sidebar.MenuItem
				class="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-9 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
			>
				<Sidebar.MenuButton
					size="default"
					isActive={active}
					class="h-9 gap-3 px-3 text-sm group-data-[collapsible=icon]:justify-center"
				>
					{#snippet child({ props })}
						<!-- Sektionsfarbe als dezenter Akzent: Tint + Farbbalken links statt
						     vollflächiger Füllung (Wiedererkennung ohne Lärm). -->
						<a
							href={mainItem.href}
							rel={mainItem.external ? 'noopener noreferrer' : undefined}
							{...props}
							style:background={active && mainItem.color
								? `color-mix(in srgb, ${mainItem.color} 15%, transparent)`
								: undefined}
							style:box-shadow={active && mainItem.color
								? `inset 3px 0 0 ${mainItem.color}`
								: undefined}
						>
							<mainItem.icon class="size-5!" />
							<span class="group-data-[collapsible=icon]:hidden">{mainItem.label}</span>
							{#if mainItem.external}
								<!-- Kennzeichnung: öffnet extern (neuer Tab) -->
								<ExternalLinkIcon
									class="size-3.5 shrink-0 opacity-60 group-data-[collapsible=icon]:hidden"
									aria-hidden="true"
								/>
							{/if}
							{#if mainItem.badge}
								<!-- Außendienst-Umbau: Zähler immer farblos in neutraler Muted-Optik
									     (theme-aware) — auch auf der aktiven Zeile, deren Tint hell genug
									     für normalen Text bleibt. -->
								<span
									class="ms-auto inline-flex h-4.5 items-center justify-center rounded-md bg-muted px-2 text-xs leading-none font-semibold text-muted-foreground tabular-nums group-data-[collapsible=icon]:hidden"
								>
									{mainItem.badge}
								</span>{/if}
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
