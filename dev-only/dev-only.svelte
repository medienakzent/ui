<!--
	Zentrales Dev-Modus-Gate: rendert seinen Inhalt nur, wenn der Dev-Modus
	($lib/stores/dev-mode) aktiv ist. Für Debug-/Diagnose-Werkzeuge (z. B. die
	Diagnose-Info-Popups der Listen), die Endnutzern nie angezeigt werden
	dürfen. Das Gate lebt bewusst an EINER Stelle — Einbindungsstellen wrappen
	nur, statt jeweils selbst $devMode zu prüfen.
-->
<script lang="ts">
	import { devMode } from '$lib/stores/dev-mode';
</script>

{#if $devMode}
	<slot />
{/if}
