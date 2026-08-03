# @compdata/ui

Gemeinsame UI-Bausteine, App-Shell und Design-Tokens für Svelte-5-Anwendungen.
Herausgelöst aus der KKIS Workbench, ausgelegt auf Nutzung durch **mehrere Apps** —
mit und ohne SvelteKit.

---

## Was drin ist

| Bereich                    | Inhalt                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Primitives**             | `button`, `badge`, `card`, `input`, `textarea`, `checkbox`, `label`, `separator`, `spinner`, `skeleton`, … |
| **Overlays**               | `modal`, `sheet`, `drawer`, `popover`, `tooltip`, `dropdown-menu`, `confirm-dialog`                        |
| **Listen**                 | `list/list-row`, `list/list-load-more`, `list/speech-input`                                                |
| **Zustände**               | `async-block` (laden/Fehler/leer), `detail-shell` (Detailseiten-Gerüst), `loading-indicator`               |
| **App-Shell**              | `app-shell` (Header, Breadcrumb, Inhaltsbereich), `app-shell-sidebar`, `nav-main`, `nav-secondary`, `nav-user` |
| **Sonstiges**              | `section-label`, `count-badge`, `boolean-icon`, `collapsible-text`, `signature-field`, `dev-only`, `progress`, `tabs`, `table`, `field`, `avatar`, `breadcrumb`, `sidebar`, `sonner` |
| **Design-Fundament**       | `theme.css` — Tokens, Dark-Variant, `@theme inline`, geteilte Utilities                                    |
| **Interne Helfer**         | `utils/` — `cn()`, Typ-Helfer, `motion`, `signature-pad`, `is-mobile`, `on-visible`                        |

Alle Bausteine sind **domänenfrei**: keine Datenbank, keine Geschäftslogik, keine
festen Texte. Sichtbare Beschriftungen kommen als Props oder über die
Label-Schnittstelle (siehe unten).

---

## Installation

```jsonc
// package.json der App
"dependencies": {
  "@compdata/ui": "git+ssh://git@github.com/compdataitgmh/ui.git#v0.1.0"
}
```

**Immer ein Tag pinnen, niemals `#main`.** npm friert sonst pro App eine andere
Commit-SHA ein, und die beiden Anwendungen laufen unbemerkt auseinander.

Peer-Dependencies müssen in der App installiert sein: `svelte`, `bits-ui`,
`@lucide/svelte`, `tailwind-merge`, `clsx`, `tailwind-variants`, `tailwindcss`,
`tw-animate-css`. Optional: `svelte-sonner` und `mode-watcher` (nur für `sonner`).

---

## Einrichtung

### 1. Styling einbinden

```css
/* app.css der Konsumenten-App */
@import 'tailwindcss';
@import 'tw-animate-css';
@import '@compdata/ui/theme.css';
@source '../../node_modules/@compdata/ui/dist';

/* Danach das eigene Branding — überschreibt die Defaults aus theme.css */
@theme {
	--color-primary: oklch(0.55 0.19 25);
	--font-display: 'Inter', sans-serif;
}
```

> **Die `@source`-Zeile ist Pflicht.** Tailwind 4 scannt `node_modules` nicht.
> Ohne sie fehlen im **Produktions**-Build genau die Klassen, die nur in
> Lib-Komponenten vorkommen — lautlos, ohne Fehlermeldung. Der Dev-Server
> verdeckt das, weil die App viele Klassen selbst verwendet.
> Der Pfad ist relativ zur CSS-Datei; beim Verschieben mit anpassen.

**Pflichtprüfung nach jedem Versionswechsel:**

```bash
npm run build
grep -o "data-\[state=closed\]:slide-out-to-right" dist/assets/*.css
```

Findet der Befehl nichts, greift `@source` nicht — dann fehlen Klassen im Build.

### 2. Dark-Mode

Das Paket erwartet die Klasse `dark` am `<html>`-Element (`@custom-variant dark`).
Der Umschalt-Mechanismus bleibt Sache der App:

```ts
document.documentElement.classList.toggle('dark', isDark);
```

### 3. Beschriftungen (optional)

Elf generische Texte („Schließen", „Abbrechen", „Mehr anzeigen", …) haben deutsche
Defaults. Wer übersetzen will, setzt sie einmal im Wurzel-Layout:

```svelte
<script>
	import { setUiLabels } from '@compdata/ui/labels';
	setUiLabels({ close: 'Close', cancel: 'Cancel' /* … */ });
</script>
```

`setUiLabels` akzeptiert auch einen Store — dann schlägt ein Sprachwechsel zur
Laufzeit sofort durch.

---

## Nutzung

```svelte
<script>
	import { Button } from '@compdata/ui/button';
	import { Badge } from '@compdata/ui/badge';
	import { AsyncBlock } from '@compdata/ui/async-block';
</script>

<AsyncBlock {loading} {error} empty={items.length === 0} emptyText="Nichts gefunden">
	{#each items as item}
		<Badge variant="positive">{item.status}</Badge>
	{/each}
</AsyncBlock>
```

### App-Shell

`app-shell` und `app-shell-sidebar` sind **router-frei**. Die App liefert den
aktuellen Pfad, fertige Navigationseinträge und Breadcrumbs als Daten:

```svelte
<AppShell
	{breadcrumbs}
	reloadKey={tick}
	onBack={() => history.back()}
	navButtons={false}
>
	{#snippet sidebar()}
		<AppShellSidebar {navMain} {navSecondary} pathname={$page.url.pathname} … />
	{/snippet}
	{#snippet headerEnd()}…{/snippet}
	{@render children()}
</AppShell>
```

Nav-Einträge folgen dem Typ `ShellNavItem`:

```ts
type ShellNavItem = {
	id: string;
	href: string;
	label: string; // bereits übersetzt
	icon: Component;
	color?: string;
	badge?: string | number | null;
	external?: boolean;
	onClick?: () => void;
};
```

Feature-Flags, Rechte und Sichtbarkeitsregeln kennt die Bibliothek **nicht** — die
App filtert die Liste, bevor sie sie hereinreicht.

`navButtons={false}` blendet die Vor-/Zurück-Schaltflächen aus; sie existieren nur,
weil eine installierte iOS-PWA keine Browser-Navigation hat.

---

## Entwicklung

```bash
npm install
npm run check     # svelte-check
npm run test      # Unit- und Browser-Tests (Playwright/Chromium)
npm run package   # baut dist/ via svelte-package
```

### Gleichzeitig an App und Bibliothek arbeiten

Über `node_modules` gibt es kein HMR. Für die tägliche Arbeit deshalb einen
Alias setzen und das Paket lokal einbinden:

```ts
// vite.config.ts der App
resolve: {
	alias: process.env.UI_LOCAL ? { '@compdata/ui': '/pfad/zu/ui/src/lib' } : {}
},
server: { fs: { allow: ['.', '/pfad/zu/ui'] } }
```

```css
@source '/pfad/zu/ui/src/lib'; /* nur im lokalen Modus nötig */
```

**Vor jedem Merge einmal ohne Alias bauen** — sonst fällt ein `@source`-Fehler erst
in Produktion auf.

### Regeln für Beiträge

- Kein Import aus einer App: keine Datenbank, keine Stores, keine Geschäftslogik,
  kein `$app/*` (SvelteKit-Virtualmodule brechen die Nutzung außerhalb von Kit).
- Alle Importe innerhalb des Pakets **relativ** — ein `$lib`-Alias existiert hier nicht.
- Svelte 5: `$props()` mit benanntem `Props`-Typ, `{#snippet}`/`{@render}` statt `<slot>`.
- Sichtbare Texte als Prop oder über `labels`, niemals fest verdrahtet.
- `svelte` und `bits-ui` gehören ausschließlich in `peerDependencies` — sonst
  entstehen zwei Instanzen und die Context-API bricht (`npm ls svelte bits-ui`).

---

## Versionierung

Semver über Git-Tags. Breaking Changes sind alles, was eine Prop umbenennt, ein
Snippet entfernt oder ein Token aus `theme.css` streicht.

```bash
npm version minor
git push --follow-tags
```

Danach in den Apps den Tag anheben. Im Docker-Setup gilt: `node_modules` liegt oft
in einem anonymen Volume — nach einem Versionswechsel `docker compose down -v`,
sonst bleibt lautlos die alte Version aktiv.
