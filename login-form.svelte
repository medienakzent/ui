<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import {
		FieldGroup,
		Field,
		FieldLabel,
		FieldDescription,
		FieldSeparator
	} from '$lib/components/ui/field/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';
	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();
	const id = $props.id();

	let server = 'compdata.kkis.cloud';
	let username = '';
	let password = '';
	let loading = false;
	let errorMessage = '';
	let successMessage = '';

	const handleSubmit = async () => {
		errorMessage = '';
		successMessage = '';
		loading = true;

		try {
			// TODO: Use given Server currently proxied for local development
			const endpoint = `/kkisapi/api/kkis/mitarbeiter/login`;

			// TODO: use hashed password (md5) currently using hashed one for testing
			const response = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ loginName: username, password: password })
			});

			const payload = await response.json().catch(() => ({}));

			if (!response.ok) {
				throw new Error(payload?.message ?? 'Login failed');
			}

			const token = payload?.offlineAPIKey;

			if (token) {
				localStorage.setItem('authToken', token);
			}

			successMessage = payload?.message ?? 'Login successful.';
		} catch (error) {
			errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
		} finally {
			loading = false;
		}
	};
</script>

<div class={cn('flex flex-col gap-6', className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form class="p-6 md:p-8" on:submit|preventDefault={handleSubmit}>
				<FieldGroup>
					<div class="flex flex-col items-center gap-2 text-center">
						<img alt="Compdata Logo" src="/images/icon.png" class="mx-auto h-12 w-12 rounded-md" />
						<h1 class="text-2xl font-bold">Welcome back</h1>
						<p class="text-balance text-muted-foreground">Login to your Compdata account</p>
					</div>
					<Field>
						<FieldLabel for="server-{id}">Server</FieldLabel>
						<Input
							id="server-{id}"
							name="server"
							type="text"
							placeholder="compdata.kkis.cloud"
							bind:value={server}
							required
						/>
					</Field>
					<Field>
						<FieldLabel for="username-{id}">Username</FieldLabel>
						<Input
							id="username-{id}"
							name="username"
							type="text"
							placeholder="Max Mustermann"
							bind:value={username}
							autocomplete="username"
							required
						/>
					</Field>
					<Field>
						<div class="flex items-center">
							<FieldLabel for="password-{id}">Password</FieldLabel>
							<a href="##" class="ms-auto text-sm underline-offset-2 hover:underline">
								Forgot your password?
							</a>
						</div>
						<Input
							id="password-{id}"
							name="password"
							type="password"
							bind:value={password}
							autocomplete="current-password"
							required
						/>
					</Field>
					<Field>
						<Button type="submit" disabled={loading}>
							{#if loading}
								Signing in...
							{:else}
								Login
							{/if}
						</Button>
					</Field>
					{#if errorMessage}
						<FieldDescription class="text-destructive">{errorMessage}</FieldDescription>
					{/if}
					{#if successMessage}
						<FieldDescription class="text-emerald-600">{successMessage}</FieldDescription>
					{/if}
					<FieldSeparator class="*:data-[slot=field-separator-content]:bg-card">
						Or continue with
					</FieldSeparator>
					<Field class="grid grid-cols-3 gap-4">
						<Button variant="outline" type="button">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path
									d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
									fill="currentColor"
								/>
							</svg>
							<span class="sr-only">Login with Microsoft</span>
						</Button>
					</Field>
				</FieldGroup>
			</form>
			<div class="relative hidden bg-muted md:block">
				<img
					src="/images/compdata-berg.jpg"
					alt="placeholder"
					class="absolute inset-0 h-full w-full object-cover"
				/>
			</div>
		</Card.Content>
	</Card.Root>
	<FieldDescription class="px-6 text-center">
		By clicking continue, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</FieldDescription>
</div>
