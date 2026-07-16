<script lang="ts">
	/**
	 * Runde Count-Badge, die oben rechts an einem Button/Icon „klebt".
	 * Voraussetzung: der umgebende Button (bzw. Container) ist `relative`.
	 * Wird nur bei count > 0 gerendert; `pointer-events-none`, damit der Klick
	 * weiterhin den Button trifft.
	 */
	export let count: number;
</script>

{#if count > 0}
	<span
		class="pointer-events-none absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-none font-semibold text-primary-foreground"
	>
		{count}
	</span>
{/if}
