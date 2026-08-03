<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import Mic from '@lucide/svelte/icons/mic';
	import MicOff from '@lucide/svelte/icons/mic-off';

	type Props = {
		lang?: string;
		/**
		 * Optional zwei-Wege-Binding fuer das Transkript. Wenn der Aufrufer
		 * `bind:value` setzt, schreibt die Komponente das Endergebnis direkt in
		 * dieses Feld zurueck — ohne dass der Konsument einen Result-Handler
		 * verkabeln muss.
		 */
		value?: string;
		/**
		 * Wenn true, wird der erkannte Text an den bestehenden `value` angehaengt
		 * (mit einem Leerzeichen). Default: false (ueberschreibt).
		 */
		append?: boolean;
		class?: string;
		/** Wird nach jedem erkannten Transkript aufgerufen. */
		onresult?: (transcript: string) => void;
	};

	let {
		lang = 'de-DE',
		value = $bindable(''),
		append = false,
		class: className = '',
		onresult
	}: Props = $props();

	let supported = $state(false);
	let listening = $state(false);
	// `any`: die Web Speech API hat keine lib.dom-Typen (SpeechRecognition fehlt in TS).
	let recognition: any = null;

	onMount(() => {
		const SpeechRecognition =
			(window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		if (!SpeechRecognition) return;

		supported = true;
		recognition = new SpeechRecognition();
		recognition.lang = lang;
		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.onresult = async (event: any) => {
			const transcript = event.results?.[0]?.[0]?.transcript?.trim();
			listening = false;
			if (!transcript) return;
			// Wert direkt zurueckschreiben damit `bind:value` Konsumenten das
			// Ergebnis sichtbar im Input-Feld haben — ohne dass ein Result-
			// Handler verkabelt werden muss.
			value = append && value ? `${value} ${transcript}` : transcript;
			await tick();
			onresult?.(transcript);
		};

		recognition.onerror = () => {
			listening = false;
		};

		recognition.onend = () => {
			listening = false;
		};
	});

	onDestroy(() => {
		if (recognition && listening) {
			recognition.abort();
		}
	});

	function toggle() {
		if (!recognition) return;
		if (listening) {
			recognition.abort();
			listening = false;
		} else {
			recognition.start();
			listening = true;
		}
	}
</script>

{#if supported}
	<button
		type="button"
		class="inline-flex h-9 w-11 items-center justify-center border border-r-0 border-input bg-background transition-colors {listening
			? 'bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400'
			: 'text-muted-foreground hover:bg-muted dark:bg-input/30'} {className}"
		onclick={toggle}
		title={listening ? 'Spracheingabe stoppen' : 'Spracheingabe starten'}
	>
		{#if listening}
			<MicOff class="size-5 animate-pulse" />
		{:else}
			<Mic class="size-5" />
		{/if}
	</button>
{/if}
