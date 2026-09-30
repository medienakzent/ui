/**
 * Canvas-Unterschriften-Pad — aus signature-popup.svelte extrahiert, damit
 * die Zusammenfassungs-Seite (Tour-Projekt, Origin ContentPage „Zusammenfassung")
 * dieselbe Zeichenlogik nutzen kann wie das Signatur-Popup der Lieferscheine.
 */
/** Fixed drawing height; width is responsive (fills the container). */
const SIGNATURE_PAD_HEIGHT = 170;
/** Normalise a stored signature into a usable data URL. */
function asSignatureDataUrl(value) {
    if (!value)
        return '';
    return value.startsWith('data:') ? value : `data:image/png;base64,${value}`;
}
export function setupSignaturePad(canvas, onInk, initial) {
    const ctx = canvas.getContext('2d');
    if (!ctx)
        return { clear: () => { }, destroy: () => { } };
    const CSS_HEIGHT = SIGNATURE_PAD_HEIGHT;
    let cssWidth = canvas.clientWidth || canvas.parentElement?.clientWidth || 300;
    let existingImg = null;
    const applyStroke = () => {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    };
    // (Re)size the backing store to the current CSS width and repaint background
    // plus an optional image (restored signature or a resize snapshot).
    const render = (image) => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(cssWidth * dpr));
        canvas.height = Math.round(CSS_HEIGHT * dpr);
        canvas.style.height = `${CSS_HEIGHT}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        // TRANSPARENT lassen: der Untergrund wurde frueher hier eingefaerbt und
        // landete damit in jedem toDataURL() — die exportierte PNG hatte eine
        // deckende graue Flaeche. Im Pruefbericht und auf dem Lieferschein sass
        // die Unterschrift dadurch in einem grauen Kasten statt auf dem Papier.
        // Die Flaeche zeichnet jetzt CSS auf dem <canvas>-Element (signature-
        // field.svelte); der Nutzer sieht dasselbe, der Export bekommt Alpha.
        ctx.clearRect(0, 0, cssWidth, CSS_HEIGHT);
        const img = image ?? existingImg;
        if (img)
            ctx.drawImage(img, 0, 0, cssWidth, CSS_HEIGHT);
        applyStroke();
    };
    render();
    // Restore a previously captured signature (fixes "reopen shows blank pad").
    const initialUrl = asSignatureDataUrl(initial);
    if (initialUrl) {
        const img = new Image();
        img.onload = () => {
            existingImg = img;
            render();
            onInk();
        };
        img.src = initialUrl;
    }
    // Re-measure on viewport changes (e.g. iPad rotation) and preserve strokes.
    const onResize = () => {
        const w = canvas.clientWidth || canvas.parentElement?.clientWidth || cssWidth;
        if (w === cssWidth || w === 0)
            return;
        let snap = null;
        try {
            const url = canvas.toDataURL('image/png');
            snap = new Image();
            snap.src = url;
        }
        catch {
            snap = null;
        }
        cssWidth = w;
        if (snap && !snap.complete)
            snap.onload = () => render(snap);
        else
            render(snap);
    };
    window.addEventListener('resize', onResize);
    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const touch = 'touches' in e ? e.touches[0] : e;
        const scaleX = cssWidth / rect.width;
        const scaleY = CSS_HEIGHT / rect.height;
        return {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY
        };
    };
    let drawing = false;
    const start = (e) => {
        drawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        onInk();
    };
    const draw = (e) => {
        if (!drawing)
            return;
        e.preventDefault();
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    };
    const stop = () => {
        drawing = false;
    };
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseleave', stop);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stop);
    return {
        clear: () => {
            existingImg = null;
            render();
        },
        destroy: () => {
            window.removeEventListener('resize', onResize);
            canvas.removeEventListener('mousedown', start);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stop);
            canvas.removeEventListener('mouseleave', stop);
            canvas.removeEventListener('touchstart', start);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stop);
        }
    };
}
