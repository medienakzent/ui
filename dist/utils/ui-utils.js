/**
 * Domänenfreier UI-Teil der Utils: `cn()` und die Props-Typ-Helfer.
 *
 * Diese Datei ist bewusst frei von KKIS-Fachlichkeit — sie wandert später
 * unverändert in die eigenständige UI-Bibliothek (eigenes Git, auch von einer
 * zweiten App ohne SvelteKit genutzt). Hier darf NICHTS Fachliches dazukommen:
 * keine Formatierer für Termine/Namen/Adressen, keine Sync-, Enum- oder
 * Origin-Logik. Alles Fachliche gehört nach `src/lib/utils.ts`.
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
