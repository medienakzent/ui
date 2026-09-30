<script lang="ts">
	/**
	 * Inline-Count neben Icon/Text eines Buttons (z. B. „Kollegen 1").
	 * Bewusst KEIN absolut positionierter Notification-Dot mehr: der ragte über
	 * den Button hinaus und wurde von paint-containment-Vorfahren
	 * (content-visibility der Listenzeilen) abgeschnitten.
	 * Wird nur bei count > 0 gerendert; `pointer-events-none`, damit der Klick
	 * weiterhin den Button trifft.
	 */
	type Props = {
		count: number;
	};

	let { count }: Props = $props();
</script>

{#if count > 0}
	<span
		class="pointer-events-none inline-flex h-4.5 min-w-4.5 items-center justify-center rounded-md bg-muted px-1 text-xs leading-none font-semibold text-muted-foreground tabular-nums"
	>
		{count}
	</span>
{/if}
