// share.js — Marco's Pizza Club sharing layer (Phase 3).
// Canvas bake-card generator, native share helpers, and deep-link codecs.
// No backend: everything composes client-side.

const CARD_W = 1080;
const CARD_H = 1350; // 4:5 — plays nicely with IG stories/posts and chat previews

// Palette mirrors css/tokens.css
const C = {
  cream: "#FAF3E3",
  surface: "#FFFDF6",
  ink: "#2B1D16",
  inkSoft: "#5C4A3D",
  terracotta: "#C4572E",
  terracottaDeep: "#A03F1D",
  butter: "#F2C94C",
  sage: "#8A9A5B"
};

const RATING_LABEL = { 1: "\u{1F648} Needs work", 2: "\u{1F44D} Solid", 3: "\u{1F618} Chef's kiss" };

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* Halftone dot texture, the rubber-hose signature. */
function dots(ctx, x, y, w, h, gap, r, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for (let py = y; py < y + h; py += gap) {
    for (let px = x + ((py / gap) % 2 ? gap / 2 : 0); px < x + w; px += gap) {
      ctx.beginPath();
      ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

/* Awning stripe band. */
function awning(ctx, y, h) {
  const stripeW = 90;
  for (let x = -stripeW, i = 0; x < CARD_W + stripeW; x += stripeW, i++) {
    ctx.fillStyle = i % 2 ? C.cream : C.terracotta;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + stripeW, y);
    ctx.lineTo(x + stripeW, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    ctx.fill();
  }
}

function drawCover(ctx, img, x, y, w, h, radius) {
  ctx.save();
  roundRectPath(ctx, x, y, w, h, radius);
  ctx.clip();
  const scale = Math.max(w / img.width, h / img.height);
  const dw = img.width * scale, dh = img.height * scale;
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh);
  ctx.restore();
  // Ink outline on top of the clipped image
  roundRectPath(ctx, x, y, w, h, radius);
  ctx.lineWidth = 8;
  ctx.strokeStyle = C.ink;
  ctx.stroke();
}

function wrapText(ctx, text, maxWidth, maxLines) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const w of words) {
    const t = line ? line + " " + w : w;
    if (ctx.measureText(t).width > maxWidth && line) {
      lines.push(line);
      line = w;
      if (lines.length === maxLines - 1) break;
    } else line = t;
  }
  if (line && lines.length < maxLines) lines.push(line);
  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, "") + "\u2026";
  }
  return lines;
}

/**
 * Compose a shareable bake card as a PNG blob.
 * entry: { title, detail?, rating?, photo? (dataURL), ts }
 */
export async function makeBakeCard(entry) {
  await (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve());
  const canvas = document.createElement("canvas");
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext("2d");

  const display = '"Titan One", "Arial Black", sans-serif';
  const body = '"Nunito", "Segoe UI", sans-serif';

  // Background
  ctx.fillStyle = C.cream;
  ctx.fillRect(0, 0, CARD_W, CARD_H);
  dots(ctx, 0, 0, CARD_W, CARD_H, 34, 3, C.ink, 0.05);

  // Awning top band
  awning(ctx, 0, 56);
  ctx.fillStyle = C.ink;
  ctx.fillRect(0, 56, CARD_W, 8);

  // Card panel
  const pad = 64;
  const panel = { x: pad, y: 120, w: CARD_W - pad * 2, h: CARD_H - 120 - 150 };
  ctx.save();
  ctx.shadowColor = "rgba(43,29,22,0.9)";
  ctx.shadowOffsetX = 12;
  ctx.shadowOffsetY = 12;
  ctx.shadowBlur = 0;
  roundRectPath(ctx, panel.x, panel.y, panel.w, panel.h, 36);
  ctx.fillStyle = C.surface;
  ctx.fill();
  ctx.restore();
  roundRectPath(ctx, panel.x, panel.y, panel.w, panel.h, 36);
  ctx.lineWidth = 9;
  ctx.strokeStyle = C.ink;
  ctx.stroke();

  // Kicker
  ctx.fillStyle = C.terracotta;
  ctx.font = `700 30px ${body}`;
  ctx.textAlign = "center";
  ctx.fillText("FRESH FROM MY OVEN", CARD_W / 2, panel.y + 76);

  // Title
  ctx.fillStyle = C.ink;
  ctx.font = `56px ${display}`;
  const titleLines = wrapText(ctx, entry.title || "My bake", panel.w - 120, 2);
  titleLines.forEach((l, i) => ctx.fillText(l, CARD_W / 2, panel.y + 150 + i * 66));
  const afterTitle = panel.y + 150 + titleLines.length * 66;

  // Photo (user bake photo or mascot fallback)
  const photoY = afterTitle + 8;
  const photoH = 560;
  let img = null;
  try {
    img = await loadImage(entry.photo || "./images/mascot-cheer.jpg");
  } catch { /* keep null */ }
  if (img) drawCover(ctx, img, panel.x + 56, photoY, panel.w - 112, photoH, 28);

  // Rating chip
  let cursorY = photoY + photoH + 78;
  if (entry.rating) {
    const label = RATING_LABEL[entry.rating] || "";
    ctx.font = `700 34px ${body}`;
    const tw = ctx.measureText(label).width + 72;
    const chipX = (CARD_W - tw) / 2;
    ctx.save();
    ctx.shadowColor = C.ink;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    roundRectPath(ctx, chipX, cursorY - 44, tw, 66, 33);
    ctx.fillStyle = C.butter;
    ctx.fill();
    ctx.restore();
    roundRectPath(ctx, chipX, cursorY - 44, tw, 66, 33);
    ctx.lineWidth = 6;
    ctx.strokeStyle = C.ink;
    ctx.stroke();
    ctx.fillStyle = C.ink;
    ctx.fillText(label, CARD_W / 2, cursorY + 3);
    cursorY += 84;
  }

  // Note excerpt
  if (entry.detail) {
    ctx.fillStyle = C.inkSoft;
    ctx.font = `italic 400 31px ${body}`;
    const noteLines = wrapText(ctx, `\u201C${entry.detail}\u201D`, panel.w - 160, 2);
    noteLines.forEach((l, i) => ctx.fillText(l, CARD_W / 2, cursorY + i * 42));
    cursorY += noteLines.length * 42;
  }

  // Date
  const d = new Date(entry.ts || Date.now());
  ctx.fillStyle = C.inkSoft;
  ctx.font = `700 26px ${body}`;
  ctx.fillText(
    d.toLocaleDateString("en-SG", { day: "numeric", month: "long", year: "numeric" }),
    CARD_W / 2, panel.y + panel.h - 44
  );

  // Footer wordmark
  ctx.fillStyle = C.ink;
  ctx.font = `40px ${display}`;
  ctx.fillText("MARCO'S PIZZA CLUB", CARD_W / 2, CARD_H - 78);
  ctx.fillStyle = C.terracotta;
  ctx.font = `700 26px ${body}`;
  ctx.fillText("Learn it. Stretch it. Bake it.", CARD_W / 2, CARD_H - 38);

  return new Promise(resolve => canvas.toBlob(resolve, "image/png"));
}

/* Share a PNG blob via the native sheet, falling back to a download. */
export async function shareCard(blob, filename, text) {
  const file = new File([blob], filename, { type: "image/png" });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], text });
      return "shared";
    } catch (e) {
      if (e.name === "AbortError") return "cancelled";
    }
  }
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  return "downloaded";
}

/* Share plain text + URL via native sheet, falling back to clipboard. */
export async function shareText(title, text, url) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return "shared";
    } catch (e) {
      if (e.name === "AbortError") return "cancelled";
    }
  }
  try {
    await navigator.clipboard.writeText(`${text}\n${url}`);
    return "copied";
  } catch {
    return "failed";
  }
}

/* ---------------- Deep-link codecs ----------------
   Links ride in the hash after a "?": #calc?p=2&s=std&st=newpolitan&h=72
   so GitHub Pages never sees them and the SPA parses them on boot. */

export function encodeParams(route, params) {
  const qs = Object.entries(params)
    .filter(([, v]) => v !== null && v !== undefined && v !== "")
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  const base = location.origin + location.pathname;
  return `${base}#${route}${qs ? "?" + qs : ""}`;
}

export function parseHashParams() {
  const h = location.hash || "";
  const qIdx = h.indexOf("?");
  if (qIdx === -1) return { route: h.slice(1) || "home", params: null };
  const route = h.slice(1, qIdx);
  const params = {};
  for (const pair of h.slice(qIdx + 1).split("&")) {
    const [k, v] = pair.split("=");
    if (k) params[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return { route, params };
}
