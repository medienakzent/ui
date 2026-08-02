<script lang="ts">
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import LogOutIcon from '@lucide/svelte/icons/log-out';

	import * as Avatar from '../avatar/index.js';
	import * as DropdownMenu from '../dropdown-menu/index.js';
	import * as Sidebar from '../sidebar/index.js';
	import { useSidebar } from '../sidebar/index.js';

	type Props = {
		user: {
			name: string;
			email: string;
			avatar: string;
		};
		/** Bereits übersetzte Beschriftung des Abmelde-Eintrags. */
		logoutLabel: string;
		/** Abmelden anstoßen — die Bestätigung (Dialog) stellt die App. */
		onLogout: () => void;
	};

	let { user, logoutLabel, onLogout }: Props = $props();

	const sidebar = useSidebar();

	// Initialen für den Avatar-Fallback (kein Firmenlogo im Login-Payload):
	// erste Buchstaben der ersten beiden Namensbestandteile, z. B. "Max Muster" → "MM".
	const initials = $derived(
		user.name
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]!.toUpperCase())
			.join('') || '?'
	);
</script>

<Sidebar.Menu>
	<!-- Eingeklappt: gleiche Zeilenhöhe (h-12), Avatar zentriert -->
	<Sidebar.MenuItem
		class="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center"
	>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="size-8 rounded-lg">
							{#if user.avatar}
								<Avatar.Image src={user.avatar} alt={user.name} />
							{/if}
							<Avatar.Fallback class="rounded-lg">{initials}</Avatar.Fallback>
						</Avatar.Root>
						<div
							class="grid flex-1 text-start text-sm leading-tight group-data-[collapsible=icon]:hidden"
						>
							<span class="truncate font-medium">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
						<ChevronsUpDownIcon class="ms-auto size-4 group-data-[collapsible=icon]:hidden" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							{#if user.avatar}
								<Avatar.Image src={user.avatar} alt={user.name} />
							{/if}
							<Avatar.Fallback class="rounded-lg">{initials}</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-start text-sm leading-tight">
							<span class="truncate font-medium">{user.name}</span>
							<span class="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item onclick={onLogout}>
					<LogOutIcon />
					{logoutLabel}
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
