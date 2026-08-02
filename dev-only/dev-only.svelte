<!--
	Generisches Render-Gate: rendert seinen Inhalt genau dann, wenn `enabled`
	wahr ist. Gedacht für Debug-/Diagnose-Werkzeuge (z. B. die Diagnose-Info-Popups
	der Listen), die Endnutzern nie angezeigt werden dürfen.

	Die Bedingung kommt bewusst vom Aufrufer und hat KEINEN Default (Testfrage
	CONVENTIONS §3.1: `ui/` bleibt frei von App-Kopplung). Ein Default wäre in
	beide Richtungen falsch — `false` versteckt die Werkzeuge auch vor
	Entwicklern, `true` zeigt sie allen Nutzern. In dieser App lautet der Aufruf
	daher immer `enabled={$devMode}` mit `devMode` aus `$lib/stores/dev-mode`.
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		enabled: boolean;
		children?: Snippet;
	};

	let { enabled, children }: Props = $props();
</script>

{#if enabled}
	{@render children?.()}
{/if}
