// ================================================================
// Marco's Pizza Club — App controller
// Vanilla ES modules, hash router, localStorage state.
// ================================================================
import { PACKS, TOTAL_LESSONS, findLesson } from "./data/lessons.js";
import { RECIPES, findRecipe } from "./data/recipes.js";
import {
  SIZES, DOUGHS, SAUCES, CHEESES, TOPPINGS, COMBOS,
  SIZE_DEFAULT, DOUGH_DEFAULT, SAUCE_DEFAULT
} from "./data/builder.js";
import { DOUGHS as DOUGH_RECIPES } from "./data/doughs.js";

/* ---------------- State ---------------- */
const STORE_KEY = "mpc-state";

const defaultState = () => ({
  schemaVersion: 1,
  completedLessons: {},           // { "packId/lessonId": true }
  journal: [],                    // [{id,type:'build'|'bake'|'note',title,detail,ts}]
  builder: {
    size: SIZE_DEFAULT,
    dough: DOUGH_DEFAULT,
    sauce: SAUCE_DEFAULT,
    cheeses: ["lowmoisture"],
    toppings: ["basil"]
  }
});

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.schemaVersion !== 1) return defaultState();
    return { ...defaultState(), ...parsed, builder: { ...defaultState().builder, ...parsed.builder } };
  } catch {
    return defaultState();
  }
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* private mode */ }
}

/* ---------------- Utilities ---------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const app = $("#app");
const overlayRoot = $("#overlay-root");

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function lessonsDoneCount() {
  return Object.keys(state.completedLessons).length;
}
function packDone(pack) {
  return pack.lessons.filter(l => state.completedLessons[`${pack.id}/${l.id}`]).length;
}
function fmtWhen(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" }) + " · " +
    d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

/* ---------------- Router ---------------- */
const TITLES = { home: "Home", learn: "Pizza School", build: "Pizza Builder", recipes: "Recipes", bake: "Bake Guide", journal: "Journal", pasta: "Pasta", doughlab: "Dough Lab" };

function currentRoute() {
  const h = (location.hash || "#home").slice(1);
  return TITLES[h] ? h : "home";
}

function render() {
  closeOverlays();
  const route = currentRoute();
  $("#pageTitle").textContent = TITLES[route];
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.route === route));
  const views = { home: viewHome, learn: viewLearn, build: viewBuild, recipes: viewRecipes, bake: viewBake, journal: viewJournal, pasta: viewPasta, doughlab: viewDoughLab };
  app.innerHTML = views[route]();
  app.scrollTop = 0;
  window.scrollTo({ top: 0 });
  const after = { learn: wireLearn, build: wireBuild, recipes: wireRecipes, bake: wireBake, journal: wireJournal, home: wireHome, pasta: wirePasta, doughlab: wireDoughLab };
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.route === route || (route === "doughlab" && b.dataset.route === "recipes")));
  after[route]();
}

window.addEventListener("hashchange", render);
$$(".nav-item").forEach(b => b.addEventListener("click", () => { location.hash = "#" + b.dataset.route; }));

/* ================================================================
   HOME
================================================================ */
function viewHome() {
  const done = lessonsDoneCount();
  const builds = state.journal.filter(e => e.type === "build").length;
  const bakes = state.journal.filter(e => e.type === "bake").length;
  const nextLesson = findNextLesson();
  const featured = RECIPES[0];

  return `
  <section class="section">
    <div class="hero">
      <img src="./images/hero-margherita.jpg" alt="Homemade margherita pizza on a floured peel" fetchpriority="high" />
      <div class="hero-copy">
        <span class="chip">Ciao, welcome to the club</span>
        <h2>Great pizza is a science you can taste.</h2>
        <p>Learn the why, build with intent, and bake like you mean it — all in a normal home oven.</p>
        <button class="btn btn-primary" data-go="learn">Start learning</button>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="grid-3">
      <div class="card metric"><strong>${done}<span style="font-size:15px;color:var(--muted)">/${TOTAL_LESSONS}</span></strong><span>Lessons done</span></div>
      <div class="card metric"><strong>${builds}</strong><span>Pizzas designed</span></div>
      <div class="card metric"><strong>${bakes}</strong><span>Bakes logged</span></div>
    </div>
  </section>

  ${nextLesson ? `
  <section class="section">
    <div class="card continue-card" data-continue role="button" tabindex="0">
      <div style="flex:1">
        <span class="eyebrow" style="color:var(--basil)">Continue learning</span>
        <h3 style="margin:4px 0 8px">${esc(nextLesson.lesson.title)}</h3>
        <div class="progress"><i style="width:${Math.round(done / TOTAL_LESSONS * 100)}%"></i></div>
        <p style="margin-top:8px">${esc(nextLesson.pack.title)} · ${nextLesson.lesson.minutes} min read</p>
      </div>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" stroke-width="2.2" stroke-linecap="round"><path d="m9 5 7 7-7 7"/></svg>
    </div>
  </section>` : `
  <section class="section">
    <div class="card mascot-card">
      <img src="./images/mascot-cheer.jpg" alt="Marco the mascot celebrating" />
      <div>
        <h3>Pizza School: complete!</h3>
        <p>Every lesson read. Marco salutes you, dottore della pizza. Now go log some bakes.</p>
      </div>
    </div>
  </section>`}

  <section class="section">
    <div class="card mascot-card">
      <img src="./images/mascot-hero.jpg" alt="Marco tossing pizza dough" />
      <div>
        <h3>Marco's tip of the day</h3>
        <p>${esc(dailyTip())}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="card media-card doughlab-teaser" data-go="doughlab" role="button" tabindex="0">
      <img src="./images/doughlab/doughlab-hero.jpg" alt="Dough experiment bench with scale, flour and dough ball" loading="lazy" />
      <div class="media-copy">
        <span class="chip chip-butter">New</span>
        <h3 style="margin-top:8px">The Dough Lab</h3>
        <p>Five doughs, five personalities — including Marco's tribute to that legendary Casa Vostra crust.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head"><h2>Featured recipe</h2><button class="btn-ghost btn" data-go="recipes">All recipes</button></div>
    <div class="card media-card" data-recipe="${featured.id}" role="button" tabindex="0">
      <img src="${featured.image}" alt="${esc(featured.title)}" loading="lazy" />
      <div class="media-copy">
        <h3>${esc(featured.title)}</h3>
        <p>${esc(featured.tagline)}</p>
        <div class="chips">${featured.chips.slice(0, 3).map(c => `<span class="chip chip-terracotta">${esc(c)}</span>`).join("")}</div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="card pies-teaser" data-go="pasta" role="button" tabindex="0">
      <div>
        <span class="chip chip-butter">Coming soon</span>
        <h3 style="margin:8px 0 4px">Marco's Pasta</h3>
        <p>Something silky is simmering in the back kitchen…</p>
      </div>
      <img src="./images/mascot-pasta.jpg" alt="Marco twirling a forkful of spaghetti" loading="lazy" />
    </div>
  </section>`;
}

const TIPS = [
  "Weigh your flour. A cheap kitchen scale beats every gadget in the pizza aisle.",
  "Pizza #2 always beats pizza #1 — the steel finishes heating on the first bake. Plan accordingly.",
  "Semolina on the peel, flour on your hands. Never the other way round.",
  "If the dough springs back, it isn't stubborn — it's tense. Rest it 15 minutes.",
  "Your sauce should taste slightly too salty from the bowl. The dough dilutes it.",
  "Cold dough tears; room-temperature dough flows. Two hours out of the fridge, minimum.",
  "The grill/broiler is your wood-fired dome. Final 90 seconds, watch it like a hawk.",
  "One topping fewer than you want. Restraint is the most Italian ingredient of all."
];
function dailyTip() {
  const day = Math.floor(Date.now() / 86400000);
  return TIPS[day % TIPS.length];
}

function findNextLesson() {
  for (const pack of PACKS) {
    for (const lesson of pack.lessons) {
      if (!state.completedLessons[`${pack.id}/${lesson.id}`]) return { pack, lesson };
    }
  }
  return null;
}

function wireHome() {
  $$("[data-go]").forEach(el => el.addEventListener("click", () => { location.hash = "#" + el.dataset.go; }));
  const cont = $("[data-continue]");
  if (cont) cont.addEventListener("click", () => {
    const nx = findNextLesson();
    if (nx) { location.hash = "#learn"; setTimeout(() => openStory(nx.pack.id, nx.lesson.id), 60); }
  });
  const rec = $("[data-recipe]");
  if (rec) rec.addEventListener("click", () => { location.hash = "#recipes"; setTimeout(() => openCook(rec.dataset.recipe), 60); });
}

/* ================================================================
   LEARN — packs → chapter option list → story viewer
================================================================ */
function viewLearn() {
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Pizza School</h2><p>Three packs, twelve lessons, zero soggy centres.</p></div>
    </div>
    ${PACKS.map(pack => {
      const done = packDone(pack);
      const pct = Math.round(done / pack.lessons.length * 100);
      return `
      <div class="card pack-card" style="margin-bottom:14px">
        <img src="${pack.image}" alt="${esc(pack.title)}" loading="lazy" />
        <div class="pack-body">
          <h3>${esc(pack.title)}</h3>
          <p>${esc(pack.subtitle)}</p>
          <div class="progress"><i style="width:${pct}%"></i></div>
          <div class="pack-meta">
            <span>${done}/${pack.lessons.length} lessons · ~${pack.lessons.reduce((n, l) => n + l.minutes, 0)} min</span>
            <button class="btn btn-secondary btn-small" data-pack="${pack.id}">${done === 0 ? "Open pack" : done === pack.lessons.length ? "Review" : "Continue"}</button>
          </div>
        </div>
      </div>`;
    }).join("")}
  </section>`;
}

function wireLearn() {
  $$("[data-pack]").forEach(btn => btn.addEventListener("click", () => openChapterMenu(btn.dataset.pack)));
}

function openChapterMenu(packId) {
  const pack = PACKS.find(p => p.id === packId);
  if (!pack) return;
  overlayRoot.innerHTML = `
    <div class="sheet-backdrop" data-close></div>
    <div class="sheet" role="dialog" aria-label="${esc(pack.title)} chapters">
      <div class="sheet-grab"></div>
      <h3>${esc(pack.title)}</h3>
      <p>${esc(pack.subtitle)} — pick a chapter, jump straight in.</p>
      <div class="option-list">
        ${pack.lessons.map((l, i) => {
          const done = !!state.completedLessons[`${pack.id}/${l.id}`];
          return `
          <button class="option-item ${done ? "done" : ""}" data-lesson="${l.id}">
            <span class="option-num">${done ? "✓" : i + 1}</span>
            <span><strong>${esc(l.title)}</strong><small>${esc(l.summary)} · ${l.minutes} min</small></span>
            ${done ? `<svg class="option-check" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="m5 13 4 4L19 7"/></svg>` : ""}
          </button>`;
        }).join("")}
      </div>
    </div>`;
  $("[data-close]", overlayRoot).addEventListener("click", closeOverlays);
  $$("[data-lesson]", overlayRoot).forEach(btn =>
    btn.addEventListener("click", () => openStory(pack.id, btn.dataset.lesson))
  );
}

/* ---------------- Story viewer ---------------- */
let story = null;

function openStory(packId, lessonId, slideIdx = 0, returnToCook = false) {
  const found = findLesson(packId, lessonId);
  if (!found) return;
  story = { packId, lessonId, slideIdx, returnToCook, ...found };
  renderStory();
}

function renderStory() {
  if (!story) return;
  const { pack, lesson } = story;
  const total = lesson.slides.length + 1; // +1 completion slide
  const i = story.slideIdx;
  const isDone = i >= lesson.slides.length;
  const slide = isDone ? null : lesson.slides[i];

  overlayRoot.innerHTML = `
  <div class="story" role="dialog" aria-label="${esc(lesson.title)}">
    <div class="story-progress">${Array.from({ length: total }, (_, k) => `<i class="${k <= i ? "on" : ""}"></i>`).join("")}</div>
    <div class="story-top">
      <span class="story-pack">${esc(pack.title)}</span>
      <button class="story-close" aria-label="Close lesson"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
    </div>
    <div class="story-slide">
      ${isDone ? `
        <div class="story-done">
          <img src="./images/mascot-cheer.jpg" alt="Marco celebrating" />
          <div>
            <div class="story-kicker">Lesson complete</div>
            <h2>Bravissimo!</h2>
            <p class="story-body">"${esc(lesson.title)}" is in your head now. ${nextInPack() ? "Ready for the next chapter?" : "That's the whole pack — magnifico!"}</p>
          </div>
          <div style="display:flex;gap:10px;width:100%;max-width:340px">
            ${story.returnToCook && cook ? `<button class="btn btn-primary btn-block" data-back-cook>Back to the recipe</button>` : `
            ${nextInPack() ? `<button class="btn btn-primary btn-block" data-next-lesson>Next lesson</button>` : ""}
            <button class="btn btn-secondary btn-block" data-back-menu>Chapters</button>`}
          </div>
        </div>` : `
        ${slide.image ? `<img src="${slide.image}" alt="" />` : ""}
        <div class="story-kicker">${esc(slide.kicker)}</div>
        <h2>${slide.title}</h2>
        <p class="story-body">${slide.body}</p>
        ${slide.science ? `<div class="science-note">${slide.science}</div>` : ""}
      `}
      ${!isDone ? `<button class="story-tap left" aria-label="Previous"></button><button class="story-tap right" aria-label="Next"></button>` : ""}
    </div>
  </div>`;

  $(".story-close", overlayRoot).addEventListener("click", () => {
    const backToCook = story.returnToCook && cook;
    story = null;
    if (backToCook) { renderCook(); } else { closeOverlays(); render(); }
  });
  const backCook = $("[data-back-cook]", overlayRoot);
  if (backCook) backCook.addEventListener("click", () => { story = null; renderCook(); });
  const left = $(".story-tap.left", overlayRoot);
  const right = $(".story-tap.right", overlayRoot);
  if (left) left.addEventListener("click", () => { if (story.slideIdx > 0) { story.slideIdx--; renderStory(); } });
  if (right) right.addEventListener("click", advanceStory);
  const nextBtn = $("[data-next-lesson]", overlayRoot);
  if (nextBtn) nextBtn.addEventListener("click", () => {
    const nx = nextInPack();
    if (nx) openStory(story.packId, nx.id);
  });
  const backBtn = $("[data-back-menu]", overlayRoot);
  if (backBtn) backBtn.addEventListener("click", () => {
    const pid = story.packId;
    story = null;
    render();
    openChapterMenu(pid);
  });
}

function advanceStory() {
  if (!story) return;
  story.slideIdx++;
  if (story.slideIdx >= story.lesson.slides.length) {
    const key = `${story.packId}/${story.lessonId}`;
    if (!state.completedLessons[key]) {
      state.completedLessons[key] = true;
      save();
    }
  }
  renderStory();
}

function nextInPack() {
  if (!story) return null;
  const { pack, index } = story;
  return pack.lessons[index + 1] || null;
}

/* ================================================================
   BUILD — pizza builder with live viz, balance meters, insights
================================================================ */
function viewBuild() {
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Pizza Builder</h2><p>Compose a pizza. Marco reacts in real time.</p></div>
    </div>

    <div class="card builder-viz-card">
      <div id="pizzaViz">${pizzaSvg()}</div>
      <div class="balance" id="balanceBars">${balanceBarsHtml()}</div>
    </div>

    <div class="card" style="margin-top:14px">
      <h3 class="builder-h">Size</h3>
      <div class="seg-row" data-group="size">
        ${SIZES.map(s => `<button class="seg ${state.builder.size === s.id ? "on" : ""}" data-id="${s.id}"><strong>${esc(s.label)}</strong><small>${esc(s.sub)}</small></button>`).join("")}
      </div>

      <h3 class="builder-h">Dough</h3>
      <div class="seg-row" data-group="dough">
        ${DOUGHS.map(d => `<button class="seg ${state.builder.dough === d.id ? "on" : ""}" data-id="${d.id}"><strong>${esc(d.label)}</strong><small>${esc(d.hydration)} hydration</small></button>`).join("")}
      </div>

      <h3 class="builder-h">Sauce</h3>
      <div class="seg-row" data-group="sauce">
        ${SAUCES.map(s => `<button class="seg ${state.builder.sauce === s.id ? "on" : ""}" data-id="${s.id}"><strong>${esc(s.label)}</strong></button>`).join("")}
      </div>

      <h3 class="builder-h">Cheese <small class="hint">(pick up to 2)</small></h3>
      <div class="seg-row wrap" data-group="cheese">
        ${CHEESES.map(c => `<button class="seg ${state.builder.cheeses.includes(c.id) ? "on" : ""}" data-id="${c.id}"><strong>${esc(c.label)}</strong></button>`).join("")}
      </div>

      <h3 class="builder-h">Toppings <small class="hint">(pick up to 3)</small></h3>
      <div class="seg-row wrap" data-group="topping">
        ${TOPPINGS.map(t => `<button class="seg ${state.builder.toppings.includes(t.id) ? "on" : ""}" data-id="${t.id}"><strong>${esc(t.label)}</strong>${t.after ? `<small>${esc(t.after)}</small>` : ""}</button>`).join("")}
      </div>
    </div>

    <div class="card insight-card" id="builderInsights">${insightsHtml()}</div>

    <button class="btn btn-primary btn-block" id="saveBuild" style="margin-top:14px">Save this pizza to my Journal</button>
  </section>`;
}

function builderPicks() {
  const b = state.builder;
  return {
    size: SIZES.find(s => s.id === b.size) || SIZES[0],
    dough: DOUGHS.find(d => d.id === b.dough) || DOUGHS[0],
    sauce: SAUCES.find(s => s.id === b.sauce) || SAUCES[0],
    cheeses: CHEESES.filter(c => b.cheeses.includes(c.id)),
    toppings: TOPPINGS.filter(t => b.toppings.includes(t.id))
  };
}

function builderScores() {
  const { dough, sauce, cheeses, toppings } = builderPicks();
  const parts = [dough, sauce, ...cheeses, ...toppings];
  const sum = k => parts.reduce((n, p) => n + (p[k] || 0), 0);
  return { bright: sum("bright"), rich: sum("rich"), moisture: sum("moisture"), crunch: sum("crunch") };
}

function balanceBarsHtml() {
  const s = builderScores();
  const cap = 14;
  const pct = v => Math.min(100, Math.round(v / cap * 100));
  const moistWarn = s.moisture >= 9;
  return `
    <div class="bal-row"><span>Bright</span><div class="bal-track"><i style="width:${pct(s.bright)}%;background:var(--basil)"></i></div></div>
    <div class="bal-row"><span>Rich</span><div class="bal-track"><i style="width:${pct(s.rich)}%;background:var(--butter-dark)"></i></div></div>
    <div class="bal-row"><span>Crunch</span><div class="bal-track"><i style="width:${pct(s.crunch)}%;background:var(--crust)"></i></div></div>
    <div class="bal-row ${moistWarn ? "warn" : ""}"><span>Moisture</span><div class="bal-track"><i style="width:${pct(s.moisture)}%;background:${moistWarn ? "var(--danger)" : "var(--terracotta-light)"}"></i></div></div>`;
}

function pizzaSvg() {
  const { size, dough, sauce, cheeses, toppings } = builderPicks();
  const R = size.id === "sharing" ? 92 : 78;
  const rimW = size.id === "sharing" ? 11 : 13;
  const saucR = R - rimW - 2;
  const crust = dough.viz.crust;

  // deterministic pseudo-random positions
  const rng = mulberry(hash(dough.id + sauce.id + cheeses.map(c => c.id).join() + toppings.map(t => t.id).join()));
  const scatter = (count, maxR) => Array.from({ length: count }, () => {
    const a = rng() * Math.PI * 2, r = Math.sqrt(rng()) * maxR;
    return [100 + Math.cos(a) * r, 100 + Math.sin(a) * r];
  });

  let layers = "";

  // cheese pools
  const hasCheese = cheeses.length > 0;
  if (hasCheese) {
    const cheeseColor = (cheeses.find(c => c.id !== "parmesan") || cheeses[0]).viz.color;
    layers += scatter(12, saucR - 12).map(([x, y]) => {
      const rr = 9 + rng() * 9;
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${rr.toFixed(1)}" ry="${(rr * (0.75 + rng() * 0.3)).toFixed(1)}" fill="${cheeseColor}" opacity="0.95"/>`;
    }).join("");
    if (cheeses.some(c => c.id === "parmesan")) {
      layers += scatter(26, saucR - 8).map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.9 + rng()).toFixed(1)}" fill="#E0C98F"/>`).join("");
    }
  }

  // toppings
  for (const t of toppings) {
    const c = t.viz.color;
    if (t.viz.shape === "dot") {
      layers += scatter(8, saucR - 14).map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7.5" fill="${c}" stroke="#8E2E24" stroke-width="1.2"/>`).join("");
    } else if (t.viz.shape === "leaf") {
      layers += scatter(6, saucR - 14).map(([x, y]) => {
        const rot = Math.round(rng() * 360);
        return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6.5" ry="3.2" fill="${c}" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }).join("");
    } else if (t.viz.shape === "slice") {
      layers += scatter(7, saucR - 15).map(([x, y]) => {
        const rot = Math.round(rng() * 360);
        return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="8" ry="5" fill="${c}" opacity="0.9" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }).join("");
    } else if (t.viz.shape === "ribbon") {
      layers += scatter(5, saucR - 16).map(([x, y]) => {
        const rot = Math.round(rng() * 360);
        return `<path d="M ${x - 9} ${y} q 4 -7 9 0 q 5 7 9 0" stroke="${c}" stroke-width="4.5" fill="none" stroke-linecap="round" transform="rotate(${rot} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
      }).join("");
    } else if (t.viz.shape === "drizzle") {
      layers += `<path d="M 45 70 Q 75 55 105 72 T 160 78 M 40 105 Q 80 95 118 108 T 162 112 M 48 138 Q 85 128 120 142 T 158 140" stroke="${c}" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.9"/>`;
    }
  }

  // leopard spots on rim
  let spots = "";
  if (dough.viz.spots) {
    const spotRng = mulberry(42);
    spots = Array.from({ length: 14 }, () => {
      const a = spotRng() * Math.PI * 2;
      const rr = R - rimW / 2 + (spotRng() - 0.5) * 5;
      const x = 100 + Math.cos(a) * rr, y = 100 + Math.sin(a) * rr;
      return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 + spotRng() * 2.2).toFixed(1)}" fill="#7A4A21" opacity="0.55"/>`;
    }).join("");
  }

  return `
  <svg viewBox="0 0 200 200" role="img" aria-label="Your pizza design">
    <circle cx="102" cy="104" r="${R}" fill="#00000014"/>
    <circle cx="100" cy="100" r="${R}" fill="${crust}"/>
    <circle cx="100" cy="100" r="${R - rimW}" fill="${shade(crust, -8)}"/>
    <circle cx="100" cy="100" r="${saucR}" fill="${sauce.viz.color}"/>
    ${layers}
    ${spots}
  </svg>`;
}

function hash(str) { let h = 0; for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; } return Math.abs(h) || 1; }
function mulberry(a) { return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

function insightsHtml() {
  const { size, dough, sauce, cheeses, toppings } = builderPicks();
  const s = builderScores();
  const lines = [];

  if (s.moisture >= 9) {
    lines.push({ warn: true, text: "Moisture alert! This combination risks a soggy centre. Drain, sauté, or drop one of the wet ingredients." });
  }
  lines.push({ text: size.note });
  lines.push({ text: dough.insight });
  lines.push({ text: sauce.insight });
  cheeses.forEach(c => lines.push({ text: c.insight }));
  toppings.forEach(t => lines.push({ text: t.insight }));
  COMBOS.forEach(combo => {
    if (combo.ids.every(id => state.builder.toppings.includes(id))) lines.push({ star: true, text: combo.text });
  });
  if (toppings.length === 0) lines.push({ text: "No toppings? A true marinara-spirit move. Sometimes crust, sauce and cheese are the whole poem." });

  return `
    <h3 class="builder-h" style="margin-top:0">Marco's read on this pizza</h3>
    <ul class="insights">
      ${lines.map(l => `<li class="${l.warn ? "warn" : ""}${l.star ? " star" : ""}">${esc(l.text)}</li>`).join("")}
    </ul>`;
}

function wireBuild() {
  $$(".seg-row .seg").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.closest(".seg-row").dataset.group;
      const id = btn.dataset.id;
      const b = state.builder;
      if (group === "size") b.size = id;
      else if (group === "dough") b.dough = id;
      else if (group === "sauce") b.sauce = id;
      else if (group === "cheese") {
        if (b.cheeses.includes(id)) b.cheeses = b.cheeses.filter(x => x !== id);
        else if (b.cheeses.length < 2) b.cheeses.push(id);
        else { toast("Two cheeses maximum — restraint, remember?"); return; }
      } else if (group === "topping") {
        if (b.toppings.includes(id)) b.toppings = b.toppings.filter(x => x !== id);
        else if (b.toppings.length < 3) b.toppings.push(id);
        else { toast("Marco's iron law: three toppings max!"); return; }
      }
      save();
      refreshBuilder();
    });
  });

  $("#saveBuild").addEventListener("click", () => {
    const { size, dough, sauce, cheeses, toppings } = builderPicks();
    const title = toppings.length
      ? `${toppings.map(t => t.label).join(" + ")} (${size.label.toLowerCase()})`
      : `${sauce.id === "bianca" ? "Bianca" : "Margherita-style"} (${size.label.toLowerCase()})`;
    const detail = [
      `${size.label} · ${size.sub}`,
      `Dough: ${dough.label} (${dough.hydration})`,
      `Sauce: ${sauce.label}`,
      `Cheese: ${cheeses.map(c => c.label).join(", ") || "none"}`,
      `Toppings: ${toppings.map(t => t.label).join(", ") || "none"}`
    ].join("\n");
    state.journal.unshift({ id: Date.now(), type: "build", title, detail, ts: Date.now() });
    save();
    toast("Saved to your Journal. Now go bake it!");
  });
}

function refreshBuilder() {
  // update segment states
  $$(".seg-row").forEach(row => {
    const group = row.dataset.group;
    $$(".seg", row).forEach(seg => {
      const id = seg.dataset.id;
      const b = state.builder;
      const on = group === "size" ? b.size === id
        : group === "dough" ? b.dough === id
        : group === "sauce" ? b.sauce === id
        : group === "cheese" ? b.cheeses.includes(id)
        : b.toppings.includes(id);
      seg.classList.toggle("on", on);
    });
  });
  $("#pizzaViz").innerHTML = pizzaSvg();
  $("#balanceBars").innerHTML = balanceBarsHtml();
  $("#builderInsights").innerHTML = insightsHtml();
}

/* ================================================================
   RECIPES — cards → cook-along mode with timers
================================================================ */
function viewRecipes() {
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Recipes</h2><p>Cook-along mode with built-in timers. Phone on the counter, sauce on your thumb.</p></div>
    </div>
    <div class="card media-card doughlab-teaser" data-go-lab role="button" tabindex="0" style="margin-bottom:14px">
      <img src="./images/doughlab/doughlab-hero.jpg" alt="Dough experiment bench" loading="lazy" />
      <div class="media-copy">
        <span class="chip chip-butter">New</span>
        <h3 style="margin-top:8px">The Dough Lab</h3>
        <p>Five experimental doughs — from a beginner 65% to Marco's Casa Vostra tribute.</p>
      </div>
    </div>
    ${RECIPES.map(r => `
    <div class="card media-card" data-cook="${r.id}" role="button" tabindex="0" style="margin-bottom:14px">
      <img src="${r.image}" alt="${esc(r.title)}" loading="lazy" />
      <div class="media-copy">
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.tagline)}</p>
        <div class="chips">${r.chips.map(c => `<span class="chip chip-terracotta">${esc(c)}</span>`).join("")}</div>
      </div>
    </div>`).join("")}
  </section>`;
}

function wireRecipes() {
  $$("[data-cook]").forEach(el => el.addEventListener("click", () => openCook(el.dataset.cook)));
  const lab = $("[data-go-lab]");
  if (lab) lab.addEventListener("click", () => { location.hash = "#doughlab"; });
}

/* ---------------- Cook-along overlay ---------------- */
let cook = null; // { recipe, step: -1 = intro, timers: {} }

function openCook(recipeId) {
  const recipe = findRecipe(recipeId);
  if (!recipe) return;
  cook = { recipe, step: -1 };
  renderCook();
}

function renderCook() {
  if (!cook) return;
  stopTimer();
  const r = cook.recipe;
  const total = r.steps.length;
  const i = cook.step;

  let body;
  if (i === -1) {
    body = `
      <img class="cook-hero" src="${r.imageLg}" alt="${esc(r.title)}" />
      <div class="cook-pad">
        <div class="chips">${r.chips.map(c => `<span class="chip chip-terracotta">${esc(c)}</span>`).join("")}</div>
        <h2>${esc(r.title)}</h2>
        <p class="cook-intro">${esc(r.intro)}</p>
        <div class="science-note">${esc(r.science)}</div>
        <h3 style="margin:18px 0 8px">Ingredients</h3>
        <ul class="ingredients">${r.ingredients.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <button class="btn btn-primary btn-block" data-start style="margin-top:16px">Start cooking</button>
      </div>`;
  } else if (i >= total) {
    body = `
      <div class="cook-pad cook-finish">
        <img src="./images/mascot-cheer.jpg" alt="Marco celebrating" />
        <h2>Buon appetito!</h2>
        <p>You just made a ${esc(r.title)} from scratch. Log it while the memory (and the crust) is still warm — future you will thank present you.</p>
        <button class="btn btn-primary btn-block" data-log>Log this bake in my Journal</button>
        <button class="btn btn-secondary btn-block" data-close-cook style="margin-top:10px">Done</button>
      </div>`;
  } else {
    const step = r.steps[i];
    body = `
      <div class="cook-pad">
        <div class="cook-stepline">Step ${i + 1} of ${total}</div>
        <div class="progress" style="margin-bottom:18px"><i style="width:${Math.round((i + 1) / total * 100)}%"></i></div>
        <h2>${esc(step.title)}</h2>
        ${step.use && step.use.length ? `
        <div class="cook-use">
          <div class="cook-use-label">You'll need</div>
          <ul>${step.use.map(u => `<li>${esc(u)}</li>`).join("")}</ul>
        </div>` : ""}
        ${step.actions && step.actions.length ? `
        <ol class="cook-actions">${step.actions.map(a => `<li>${esc(a)}</li>`).join("")}</ol>` : ""}
        ${step.text ? `<p class="cook-body">${esc(step.text)}</p>` : ""}
        ${step.note ? `<p class="cook-note"><strong>Marco says:</strong> ${esc(step.note)}</p>` : ""}
        ${step.minutes ? timerHtml(step.minutes) : ""}
        ${step.learn ? `
        <button class="cook-learn" data-learn>
          <span class="cook-learn-icon">📖</span>
          <span><small>Learn the why</small><strong>${esc(step.learn.label)}</strong></span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
        </button>` : ""}
      </div>`;
  }

  overlayRoot.innerHTML = `
  <div class="cook" role="dialog" aria-label="${esc(r.title)} cook-along">
    <div class="cook-top">
      <button class="story-close" data-close-cook aria-label="Close recipe"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <span class="cook-title">${esc(r.title)}</span>
      <span style="width:38px"></span>
    </div>
    <div class="cook-scroll">${body}</div>
    ${i >= 0 && i < total ? `
    <div class="cook-nav">
      <button class="btn btn-secondary" data-prev ${i === 0 ? "disabled" : ""}>Back</button>
      <button class="btn btn-primary" data-next>${i === total - 1 ? "Finish" : "Next step"}</button>
    </div>` : ""}
  </div>`;

  $$("[data-close-cook]", overlayRoot).forEach(b => b.addEventListener("click", () => { cook = null; stopTimer(); closeOverlays(); }));
  const startBtn = $("[data-start]", overlayRoot);
  if (startBtn) startBtn.addEventListener("click", () => { cook.step = 0; renderCook(); });
  const prev = $("[data-prev]", overlayRoot);
  if (prev) prev.addEventListener("click", () => { cook.step--; renderCook(); });
  const next = $("[data-next]", overlayRoot);
  if (next) next.addEventListener("click", () => { cook.step++; renderCook(); });
  const learnBtn = $("[data-learn]", overlayRoot);
  if (learnBtn) learnBtn.addEventListener("click", () => {
    const st = r.steps[cook.step];
    if (st && st.learn) { stopTimer(); openStory(st.learn.pack, st.learn.lesson, st.learn.slide || 0, true); }
  });
  const logBtn = $("[data-log]", overlayRoot);
  if (logBtn) logBtn.addEventListener("click", () => {
    state.journal.unshift({
      id: Date.now(), type: "bake",
      title: r.title,
      detail: `Cooked along with the ${r.title} recipe.`,
      ts: Date.now()
    });
    save();
    cook = null; stopTimer(); closeOverlays();
    toast("Bake logged. Marco is proud of you.");
    if (currentRoute() === "journal") render();
  });
  wireTimer();
}

/* ---------------- Step timer ---------------- */
let timer = null; // { total, left, running, interval }

function timerHtml(minutes) {
  const secs = minutes * 60;
  return `
  <div class="timer" data-secs="${secs}">
    <div class="timer-face"><span id="timerOut">${fmtTime(secs)}</span></div>
    <div class="timer-btns">
      <button class="btn btn-primary btn-small" id="timerToggle">Start timer</button>
      <button class="btn btn-secondary btn-small" id="timerReset">Reset</button>
    </div>
  </div>`;
}

function fmtTime(s) {
  const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}` : `${m}:${String(sec).padStart(2, "0")}`;
}

function wireTimer() {
  const el = $(".timer", overlayRoot);
  if (!el) return;
  const total = parseInt(el.dataset.secs, 10);
  timer = { total, left: total, running: false, interval: null };
  const out = $("#timerOut", overlayRoot);
  const toggle = $("#timerToggle", overlayRoot);
  const reset = $("#timerReset", overlayRoot);

  toggle.addEventListener("click", () => {
    if (!timer) return;
    if (timer.running) {
      clearInterval(timer.interval);
      timer.running = false;
      toggle.textContent = "Resume";
    } else {
      timer.running = true;
      toggle.textContent = "Pause";
      timer.interval = setInterval(() => {
        timer.left--;
        out.textContent = fmtTime(Math.max(0, timer.left));
        if (timer.left <= 0) {
          clearInterval(timer.interval);
          timer.running = false;
          el.classList.add("done");
          toggle.textContent = "Start timer";
          beep();
          toast("Timer done — next step!");
        }
      }, 1000);
    }
  });
  reset.addEventListener("click", () => {
    clearInterval(timer.interval);
    timer.left = timer.total;
    timer.running = false;
    el.classList.remove("done");
    out.textContent = fmtTime(timer.total);
    toggle.textContent = "Start timer";
  });
}

function stopTimer() {
  if (timer && timer.interval) clearInterval(timer.interval);
  timer = null;
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.28, 0.56].forEach(t => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.value = 880;
      g.gain.setValueAtTime(0.28, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.22);
      o.connect(g).connect(ctx.destination);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.24);
    });
  } catch { /* silent */ }
}

/* ================================================================
   BAKE — home oven guide
================================================================ */
const BAKE_MODES = {
  convection: {
    label: "Fan / Convection",
    rows: [
      ["Temperature", "Maximum — usually 250 °C fan"],
      ["Surface", "Baking steel or stone, upper third"],
      ["Preheat", "45–60 min with steel inside"],
      ["Bake time", "5–7 min (personal), 7–9 min (sharing)"],
      ["Finish", "Grill/broiler, final 60–90 s"]
    ],
    note: "Fan ovens circulate heat, so tops brown faster — watch the cheese from minute 4. If your fan mode caps at 230 °C, use conventional mode at maximum instead."
  },
  conventional: {
    label: "Conventional",
    rows: [
      ["Temperature", "Maximum — usually 275 °C top+bottom"],
      ["Surface", "Baking steel or stone, upper third"],
      ["Preheat", "60 min with steel inside"],
      ["Bake time", "6–8 min (personal), 8–10 min (sharing)"],
      ["Finish", "Grill/broiler, final 90–120 s"]
    ],
    note: "No fan means a calmer top — the grill finish is nearly mandatory for proper cheese browning. Rotate the pizza halfway; conventional ovens always have a hot corner."
  }
};

let bakeMode = "convection";

function viewBake() {
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Bake Guide</h2><p>Your oven's honest capabilities, maximised.</p></div>
    </div>

    <div class="card">
      <img class="card-img-top" src="./images/bake-steel-oven.jpg" alt="Pizza baking on a steel under the grill" loading="lazy" />
      <div style="padding:16px 18px 18px">
        <h3 style="margin-bottom:6px">The home oven protocol</h3>
        <p>Pick your oven type. The numbers change; the philosophy doesn't: maximum heat, thermal mass, upper third, patience on the preheat.</p>
        <div class="tabs" id="bakeTabs" style="margin-top:14px">
          ${Object.entries(BAKE_MODES).map(([id, m]) => `<button class="tab ${bakeMode === id ? "on" : ""}" data-mode="${id}">${m.label}</button>`).join("")}
        </div>
        <div id="bakeSpec">${bakeSpecHtml()}</div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;padding:16px 18px 18px">
      <h3 style="margin-bottom:10px">Hardware, ranked by Marco</h3>
      <div class="gear">
        <div class="gear-item"><span class="gear-rank">1</span><div><strong>Baking steel (6–10 mm)</strong><p>Conducts ~15× faster than stone. The single biggest upgrade for a home oven.</p></div></div>
        <div class="gear-item"><span class="gear-rank">2</span><div><strong>Cordierite stone</strong><p>Cheaper, lighter, still transformative. Just preheat it the full hour.</p></div></div>
        <div class="gear-item"><span class="gear-rank">3</span><div><strong>Upturned cast-iron pan</strong><p>The zero-spend option. Thermal mass is the goal; the material is negotiable.</p></div></div>
        <div class="gear-item"><span class="gear-rank">+</span><div><strong>Peel + semolina</strong><p>Non-negotiable supporting cast. Semolina rolls like ball bearings; flour just burns.</p></div></div>
      </div>
    </div>

    <div class="card" style="margin-top:14px;padding:16px 18px 18px">
      <h3 style="margin-bottom:10px">Doneness, at a glance</h3>
      <div class="cue"><span class="cue-dot" style="background:var(--crust)"></span><div><strong>Rim</strong><p>Deep golden with scattered dark leopard spots. Pale = wait; uniform black = steel too close to grill.</p></div></div>
      <div class="cue"><span class="cue-dot" style="background:var(--butter-dark)"></span><div><strong>Cheese</strong><p>Fully melted, lazy bubbles, first golden patches. Furious spitting means too much water on board.</p></div></div>
      <div class="cue"><span class="cue-dot" style="background:var(--terracotta)"></span><div><strong>Base</strong><p>The lift test: a gentle arc with a slight tip droop. Floppy = underdone. Rigid = overdone.</p></div></div>
      <p class="hint" style="margin-top:10px">Rest 60 seconds before cutting — steam needs a moment to escape upward, not into your crisp base.</p>
    </div>
  </section>`;
}

function bakeSpecHtml() {
  const m = BAKE_MODES[bakeMode];
  return `
    <table class="spec-table">
      ${m.rows.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}
    </table>
    <div class="science-note" style="margin-top:12px">${esc(m.note)}</div>`;
}

function wireBake() {
  $$("#bakeTabs .tab").forEach(t => t.addEventListener("click", () => {
    bakeMode = t.dataset.mode;
    $$("#bakeTabs .tab").forEach(x => x.classList.toggle("on", x === t));
    $("#bakeSpec").innerHTML = bakeSpecHtml();
  }));
}

/* ================================================================
   JOURNAL
================================================================ */
const TYPE_META = {
  build: { label: "Pizza design", icon: "🍕" },
  bake: { label: "Bake", icon: "🔥" },
  note: { label: "Note", icon: "✏️" }
};

function viewJournal() {
  const entries = state.journal;
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Bake Journal</h2><p>Every bake teaches something — if you write it down.</p></div>
      ${entries.length ? `<button class="btn btn-ghost" id="exportJournal">Export</button>` : ""}
    </div>

    <div class="card" style="padding:16px 18px">
      <h3 style="margin-bottom:8px">Quick note</h3>
      <textarea id="noteText" class="note-input" rows="2" placeholder="e.g. 65% dough, 48h ferment — best crust yet. Rotate earlier next time."></textarea>
      <button class="btn btn-primary btn-small" id="addNote" style="margin-top:10px">Add note</button>
    </div>

    ${entries.length === 0 ? `
    <div class="card mascot-card" style="margin-top:14px">
      <img src="./images/mascot-hero.jpg" alt="Marco tossing dough" />
      <div>
        <h3>Nothing logged yet</h3>
        <p>Design a pizza in the Builder or cook along with a recipe — your story starts with bake #1.</p>
      </div>
    </div>` : `
    <div class="journal-list" style="margin-top:14px">
      ${entries.map(e => `
      <div class="card journal-entry">
        <span class="journal-icon">${TYPE_META[e.type]?.icon || "📄"}</span>
        <div class="journal-body">
          <div class="journal-head">
            <strong>${esc(e.title)}</strong>
            <button class="journal-del" data-del="${e.id}" aria-label="Delete entry"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13"/></svg></button>
          </div>
          <p class="journal-detail">${esc(e.detail).replace(/\n/g, "<br>")}</p>
          <small>${TYPE_META[e.type]?.label || "Entry"} · ${fmtWhen(e.ts)}</small>
        </div>
      </div>`).join("")}
    </div>`}
  </section>`;
}

function wireJournal() {
  const add = $("#addNote");
  if (add) add.addEventListener("click", () => {
    const txt = $("#noteText").value.trim();
    if (!txt) { toast("Write something first — even 'crust too pale' counts."); return; }
    state.journal.unshift({ id: Date.now(), type: "note", title: txt.length > 42 ? txt.slice(0, 42) + "…" : txt, detail: txt, ts: Date.now() });
    save();
    render();
    toast("Note saved.");
  });
  $$("[data-del]").forEach(btn => btn.addEventListener("click", () => {
    state.journal = state.journal.filter(e => String(e.id) !== btn.dataset.del);
    save();
    render();
    toast("Entry deleted.");
  }));
  const exp = $("#exportJournal");
  if (exp) exp.addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state.journal, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "marcos-pizza-club-journal.json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Journal exported as JSON.");
  });
}

/* ================================================================
   DOUGH LAB — experimental dough recipes
================================================================ */
const METER_LABELS = { crisp: "Crisp", fluff: "Fluff", chew: "Chew", flavour: "Flavour" };

function metersHtml(meters, compact = false) {
  return `<div class="meters${compact ? " meters-compact" : ""}">${Object.entries(METER_LABELS).map(([k, label]) => `
    <div class="meter">
      <span class="meter-label">${label}</span>
      <span class="meter-dots">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= meters[k] ? "on" : ""}"></i>`).join("")}</span>
    </div>`).join("")}</div>`;
}

function viewDoughLab() {
  const tried = state.doughsTried || {};
  return `
  <section class="section">
    <div class="hero doughlab-hero">
      <img src="./images/doughlab/doughlab-hero.jpg" alt="Dough experiment bench with scale, flour, water and honey" fetchpriority="high" />
      <div class="hero-copy">
        <span class="chip">Flour · water · salt · yeast</span>
        <h2>The Dough Lab</h2>
        <p>Same four ingredients, five completely different pizzas. That's not magic — that's fermentation. Pick a dough, follow the timeline, log the results.</p>
      </div>
    </div>
  </section>

  <section class="section">
    ${DOUGH_RECIPES.map(d => `
    <div class="card dough-card" data-dough="${d.id}" role="button" tabindex="0">
      <img class="card-img-top" src="${d.image}" alt="${esc(d.name)}" loading="lazy" />
      <div class="dough-copy">
        <div class="chips">
          <span class="chip chip-butter">${esc(d.badge)}</span>
          ${tried[d.id] ? `<span class="chip chip-basil">Tried ✓</span>` : ""}
        </div>
        <h3>${esc(d.name)}</h3>
        <p>${esc(d.tagline)}</p>
        <div class="dough-stats">
          <span><strong>${d.hydration}%</strong> water</span>
          <span><strong>${esc(d.time)}</strong> total</span>
          <span><strong>${esc(d.level)}</strong></span>
        </div>
        ${metersHtml(d.meters, true)}
      </div>
    </div>`).join("")}
  </section>`;
}

function wireDoughLab() {
  $$("[data-dough]").forEach(el => el.addEventListener("click", () => openDough(el.dataset.dough)));
}

function openDough(id) {
  const d = DOUGH_RECIPES.find(x => x.id === id);
  if (!d) return;
  overlayRoot.innerHTML = `
  <div class="cook" role="dialog" aria-label="${esc(d.name)} dough recipe">
    <div class="cook-top">
      <button class="story-close" data-close-dough aria-label="Close dough recipe"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <span class="cook-title">${esc(d.name)}</span>
      <span style="width:38px"></span>
    </div>
    <div class="cook-scroll">
      <img class="cook-hero" src="${d.image}" alt="${esc(d.name)}" />
      <div class="cook-pad">
        <div class="chips">
          <span class="chip chip-butter">${esc(d.badge)}</span>
          <span class="chip chip-terracotta">${d.hydration}% hydration</span>
          <span class="chip chip-terracotta">${esc(d.time)}</span>
          <span class="chip chip-terracotta">${esc(d.level)}</span>
        </div>
        <h2>${esc(d.name)}</h2>
        <p class="cook-intro">${esc(d.story)}</p>
        ${metersHtml(d.meters)}
        <p class="hint" style="margin-top:6px">${esc(d.yieldText)}</p>

        <h3 style="margin:20px 0 8px">Ingredients</h3>
        ${d.ingredients.map(sec => `
          <div class="dough-ing-section">
            ${d.ingredients.length > 1 ? `<h4>${esc(sec.section)}</h4>` : ""}
            <table class="dough-table">
              <thead><tr><th>Ingredient</th><th>Amount</th><th>Baker's %</th></tr></thead>
              <tbody>${sec.items.map(it => `<tr><td>${esc(it.name)}</td><td>${esc(it.amount)}</td><td>${esc(it.pct)}</td></tr>`).join("")}</tbody>
            </table>
          </div>`).join("")}

        <h3 style="margin:20px 0 8px">The timeline</h3>
        <div class="dough-timeline">
          ${d.timeline.map(t => `<div class="tl-row"><span class="tl-when">${esc(t.when)}</span><span class="tl-what">${esc(t.what)}</span></div>`).join("")}
        </div>

        <h3 style="margin:20px 0 8px">Method</h3>
        <ol class="dough-steps">${d.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>

        <div class="science-note" style="margin-top:18px"><strong>The science:</strong> ${esc(d.science)}</div>

        <h3 style="margin:20px 0 8px">Marco's tips</h3>
        <ul class="ingredients">${d.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul>

        <button class="btn btn-primary btn-block" data-log-dough style="margin-top:18px">I made this — log it in my Journal</button>
        <button class="btn btn-secondary btn-block" data-close-dough style="margin-top:10px">Back to the lab</button>
      </div>
    </div>
  </div>`;

  $$("[data-close-dough]", overlayRoot).forEach(b => b.addEventListener("click", closeOverlays));
  $("[data-log-dough]", overlayRoot).addEventListener("click", () => {
    state.doughsTried = state.doughsTried || {};
    state.doughsTried[d.id] = true;
    state.journal.unshift({
      id: Date.now(), type: "bake",
      title: d.name,
      detail: `Dough Lab experiment: ${d.name} (${d.hydration}% hydration, ${d.time}).`,
      ts: Date.now()
    });
    save();
    closeOverlays();
    toast("Experiment logged. The lab notebook grows.");
    if (currentRoute() === "doughlab" || currentRoute() === "journal") render();
  });
}

/* ================================================================
   PASTA — coming soon teaser
================================================================ */
function viewPasta() {
  return `
  <section class="section">
    <div class="card pies-hero">
      <img src="./images/mascot-pasta.jpg" alt="Marco the mascot twirling a forkful of spaghetti" />
      <div class="pies-copy">
        <span class="chip chip-butter">Coming soon</span>
        <h2>Marco's Pasta</h2>
        <p>Silky egg dough, sauces that actually cling, and the science of al dente — the pasta chapter of the club is bubbling away in the test kitchen right now. Fresh sheets, filled shapes, and sauce pairings that would make a nonna nod.</p>
        <p class="hint">Pizza first, pasta next. That's the natural order of dough.</p>
        <button class="btn btn-primary" id="notifyPasta">Notify me (Marco's way)</button>
      </div>
    </div>
  </section>`;
}

function wirePasta() {
  const btn = $("#notifyPasta");
  if (btn) btn.addEventListener("click", () => toast("Marco will shout very loudly from the kitchen when the pasta is ready."));
}

/* ================================================================
   Overlays, splash, boot
================================================================ */
function closeOverlays() {
  stopTimer();
  overlayRoot.innerHTML = "";
}

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && overlayRoot.innerHTML) {
    story = null; cook = null;
    closeOverlays();
  } else if (story && e.key === "ArrowRight") advanceStory();
  else if (story && e.key === "ArrowLeft" && story.slideIdx > 0) { story.slideIdx--; renderStory(); }
});

// Splash
window.addEventListener("load", () => {
  setTimeout(() => $("#splash").classList.add("gone"), 650);
});

// Service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => { /* offline still optional */ });
  });
}

// First render
render();
