// ================================================================
// Marco's Pizza Club — App controller
// Vanilla ES modules, hash router, localStorage state.
// ================================================================
import { PACKS, TOTAL_LESSONS, findLesson } from "./data/lessons.js";
import { RECIPES, findRecipe, OVEN_MODES } from "./data/recipes.js";
import { PASTA_PACKS, TOTAL_PASTA_LESSONS, findPastaLesson } from "./data/pasta-lessons.js";
import { PASTA_RECIPES, findPastaRecipe } from "./data/pasta-recipes.js";
// Unified lookups across pizza + pasta content
const findAnyLesson = (packId, lessonId) => findLesson(packId, lessonId) || findPastaLesson(packId, lessonId);
const findAnyRecipe = id => findRecipe(id) || findPastaRecipe(id);
import {
  SIZES, DOUGHS, SAUCES, CHEESES, TOPPINGS, COMBOS,
  SIZE_DEFAULT, DOUGH_DEFAULT, SAUCE_DEFAULT
} from "./data/builder.js";
import { DOUGHS as DOUGH_RECIPES } from "./data/doughs.js";
import { makeBakeCard, shareCard, shareText, encodeParams, parseHashParams } from "./share.js";

/* ---------------- State ---------------- */
const STORE_KEY = "mpc-state";

const defaultState = () => ({
  schemaVersion: 1,
  onboarded: false,               // first-run welcome completed
  name: null,                     // what Marco calls you (optional)
  kitchen: null,                  // "oven" | "combi" | "pizzaoven"
  celebrated: {},                 // one-time milestone flags
  completedLessons: {},           // { "packId/lessonId": true }
  journal: [],                    // [{id,type:'build'|'bake'|'note'|'dough',title,detail,ts,photo?,rating?}]
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
  // Escapes every character that can break out of an HTML text or attribute
  // context, including backticks. Verified against payloads like
  // <img src=x onerror=alert(1)> — rendered inert as text.
  return String(s).replace(/[&<>"'`]/g, c => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;", "`": "&#96;" }[c]
  ));
}

const REDUCED_MOTION = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Celebrations ---------------- */
function confetti() {
  if (REDUCED_MOTION) return;
  const holder = document.createElement("div");
  holder.className = "confetti";
  holder.setAttribute("aria-hidden", "true");
  const colors = ["#C4552D", "#E8A33D", "#7A9E5F", "#2B2118", "#F2E8D5"];
  for (let i = 0; i < 26; i++) {
    const p = document.createElement("i");
    p.style.left = (4 + Math.random() * 92) + "%";
    p.style.background = colors[i % colors.length];
    p.style.animationDelay = (Math.random() * 0.35) + "s";
    p.style.animationDuration = (1.1 + Math.random() * 0.8) + "s";
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    holder.appendChild(p);
  }
  document.body.appendChild(holder);
  setTimeout(() => holder.remove(), 2400);
}

function celebrateOnce(key, msg) {
  if (state.celebrated[key]) return;
  state.celebrated[key] = true;
  save();
  confetti();
  if (msg) toast(msg);
}

function bakesLogged() {
  return state.journal.filter(e => e.type === "bake").length;
}
function weekWins() {
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const recent = state.journal.filter(e => e.ts > weekAgo);
  return {
    bakes: recent.filter(e => e.type === "bake").length,
    other: recent.filter(e => e.type !== "bake").length
  };
}
const KITCHENS = {
  oven: { label: "Home oven", icon: "\uD83C\uDF73", hint: "Steel or stone, full heat" },
  combi: { label: "Combi microwave", icon: "\uD83D\uDCE6", hint: "Panasonic CS89 & friends" },
  pizzaoven: { label: "Pizza oven", icon: "\uD83D\uDD25", hint: "400 \u00B0C+ — lucky you" }
};

let toastTimer;
function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
}

function lessonsDoneCount() {
  // Pizza School only — pasta progress is counted separately by pastaLessonsDone()
  return PACKS.reduce((n, p) => n + packDone(p), 0);
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
const TITLES = { home: "Home", learn: "Pizza School", build: "Pizza Builder", recipes: "Recipes", bake: "Bake Guide", journal: "Journal", pasta: "Pasta", doughlab: "Dough Lab", calc: "Dough Calculator" };

function currentRoute() {
  let h = (location.hash || "#home").slice(1);
  const q = h.indexOf("?");
  if (q !== -1) h = h.slice(0, q); // share/deep-link params ride after "?"
  return TITLES[h] ? h : "home";
}

function render() {
  closeOverlays();
  const route = currentRoute();
  handleDeepLink(route); // consume any share/deep-link params before drawing
  $("#pageTitle").textContent = TITLES[route];
  updateWorldSwitch(route);
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.route === route));
  const views = { home: viewHome, learn: viewLearn, build: viewBuild, recipes: viewRecipes, bake: viewBake, journal: viewJournal, pasta: viewPasta, doughlab: viewDoughLab, calc: viewCalc };
  app.innerHTML = views[route]();
  app.scrollTop = 0;
  window.scrollTo({ top: 0 });
  const after = { learn: wireLearn, build: wireBuild, recipes: wireRecipes, bake: wireBake, journal: wireJournal, home: wireHome, pasta: wirePasta, doughlab: wireDoughLab, calc: wireCalc };
  $$(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.route === route || ((route === "doughlab" || route === "calc") && b.dataset.route === "recipes")));
  after[route]();
}

window.addEventListener("hashchange", render);
$$(".nav-item").forEach(b => b.addEventListener("click", () => { location.hash = "#" + b.dataset.route; }));

/* ---------------- World switch (topbar) ----------------
   One clear button to hop between the pizza and pasta kitchens. */
function updateWorldSwitch(route) {
  const btn = $("#worldSwitch");
  if (!btn) return;
  const inPasta = route === "pasta";
  btn.innerHTML = inPasta
    ? `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><circle cx="10" cy="10.2" r=".4"/><circle cx="14" cy="12.8" r=".4"/><circle cx="11.2" cy="14" r=".4"/></svg><span>Pizza</span>`
    : `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 15c2.5-1 4-3.5 4-6"/><path d="M7.5 16.5C10 15.5 12 13 12 10"/><path d="M11 18c3-1 5-4 5-7"/><path d="M14.5 19.5C18 18.5 20 15 20 12"/><path d="M3 20c5 1.5 13 1.5 18-1"/></svg><span>Pasta</span>`;
  btn.setAttribute("aria-label", inPasta ? "Switch to the pizza kitchen" : "Switch to the pasta kitchen");
  btn.dataset.dest = inPasta ? "home" : "pasta";
}
$("#worldSwitch").addEventListener("click", () => {
  const dest = $("#worldSwitch").dataset.dest || "pasta";
  try { sessionStorage.setItem("mpc-world", dest === "pasta" ? "pasta" : "pizza"); } catch (e) {}
  location.hash = "#" + dest;
});

/* ---------------- Share deep links ----------------
   Formats: #calc?p=2&s=m&st=newpolitan…  #build?sz=m&d=classic…  #recipes?cook=personal-margherita&from=Marcus */
let pendingChallenge = null; // consumed after the recipes view wires up
function handleDeepLink(route) {
  const parsed = parseHashParams();
  const params = parsed && parsed.params;
  if (!params) return;
  // Strip params from the hash without retriggering hashchange render loops.
  const clean = "#" + route;
  if (route === "calc" && applyCalcParams(params)) {
    history.replaceState(null, "", clean);
    setTimeout(() => toast(params.from ? `${params.from} sent you this dough mix. Marco already likes them.` : "A shared dough mix, loaded and ready."), 400);
  } else if (route === "build" && applyBuildParams(params)) {
    history.replaceState(null, "", clean);
    setTimeout(() => toast(params.from ? `${params.from} challenges your taste buds. Tweak away.` : "A shared pizza design, loaded. Improve it if you dare."), 400);
  } else if (route === "recipes" && params.cook) {
    history.replaceState(null, "", clean);
    pendingChallenge = params;
  } else {
    history.replaceState(null, "", clean);
  }
}

/* ================================================================
   HOME
================================================================ */
function whatNext() {
  const done = lessonsDoneCount();
  const bakes = bakesLogged();
  if (done === 0) {
    return { eyebrow: "Your next move", title: "Read your first lesson", copy: "Five minutes on flour, and your dough will already thank you. Most people see a better crust after just 3 lessons.", cta: "Start Flour Power", act: "first-lesson" };
  }
  if (bakes === 0) {
    return { eyebrow: "Your next move", title: "Bake your first pizza with Marco", copy: "You know some theory \u2014 now get flour on your hands. The Personal Margherita walks you through every minute.", cta: "Cook along tonight", act: "first-bake" };
  }
  if (done < TOTAL_LESSONS) {
    const nx = findNextLesson();
    return { eyebrow: "Your next move", title: `Keep going: ${nx.lesson.title}`, copy: `${TOTAL_LESSONS - done} lessons to go \u2014 you're closer to \u201Cwhy did that work?\u201D becoming \u201CI knew that would work.\u201D`, cta: "Continue learning", act: "continue" };
  }
  return { eyebrow: "Your next move", title: "Time to experiment", copy: "School's done \u2014 now the fun part. Mix a custom dough in the Calculator or chase that Casa Vostra crust in the Dough Lab.", cta: "Open the Dough Calculator", act: "calc" };
}

function viewHome() {
  const done = lessonsDoneCount();
  const builds = state.journal.filter(e => e.type === "build").length;
  const bakes = state.journal.filter(e => e.type === "bake").length;
  const nextLesson = findNextLesson();
  const featured = RECIPES[0];
  const nxt = whatNext();
  const wins = weekWins();
  const kit = state.kitchen ? KITCHENS[state.kitchen] : null;

  return `
  <section class="section">
    <div class="hero">
      <img src="./images/hero-margherita.jpg" alt="Homemade margherita pizza on a floured peel" fetchpriority="high" />
      <div class="hero-copy">
        <span class="chip">${state.name ? `Ciao, ${esc(state.name)}!` : "Ciao, welcome to the club"}</span>
        <h2>Great pizza is a science you can taste.</h2>
        <p>Learn the why, build with intent, and bake like you mean it — all in a normal home oven.</p>
        <button class="btn btn-primary" data-go="learn">Start learning</button>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="card next-card" data-next-act="${nxt.act}" role="button" tabindex="0">
      <div style="flex:1">
        <span class="eyebrow" style="color:var(--terracotta)">${esc(nxt.eyebrow)}</span>
        <h3 style="margin:4px 0 6px">${esc(nxt.title)}</h3>
        <p>${esc(nxt.copy)}</p>
        <span class="btn btn-primary btn-sm" style="margin-top:10px;display:inline-block">${esc(nxt.cta)}</span>
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

  <section class="section">
    <div class="card wins-card">
      <div>
        <h3 style="margin:0 0 4px">This week's pizza wins</h3>
        <p>${wins.bakes === 0 && wins.other === 0 ? "A quiet week so far \u2014 no pressure. Even one bake is a win in Marco's book." : wins.bakes === 0 ? `${wins.other === 1 ? "1 note" : wins.other + " notes"} in the journal this week \u2014 thinking about pizza counts too.` : wins.bakes === 1 ? `1 pizza baked this week${wins.other ? ` (plus ${wins.other} journal ${wins.other === 1 ? "note" : "notes"})` : ""}. Marco is quietly proud.` : `${wins.bakes} pizzas baked this week \u2014 Marco is telling the whole famiglia.`}</p>
      </div>
      ${kit ? `<button class="kitchen-chip" data-change-kitchen title="Change kitchen">${kit.icon} ${esc(kit.label)}</button>` : `<button class="kitchen-chip" data-change-kitchen>Set up my kitchen</button>`}
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
        <span class="chip chip-butter">New</span>
        <h3 style="margin:8px 0 4px">Marco's Pasta</h3>
        <p>Fresh dough, al dente science, squid ink secrets — the pasta chapter is open.</p>
      </div>
      <img src="./images/mascot-pasta.jpg" alt="Marco twirling a forkful of spaghetti" loading="lazy" />
    </div>
  </section>

  <section class="section" style="text-align:center;padding-bottom:18px">
    <button class="btn btn-ghost btn-sm" data-replay-welcome>Replay Marco's welcome</button>
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
  const nxtCard = $("[data-next-act]");
  if (nxtCard) nxtCard.addEventListener("click", () => {
    const act = nxtCard.dataset.nextAct;
    if (act === "first-lesson") { location.hash = "#learn"; setTimeout(() => openStory(PACKS[0].id, PACKS[0].lessons[0].id), 60); }
    else if (act === "first-bake") { location.hash = "#recipes"; setTimeout(() => openCook(RECIPES[0].id), 60); }
    else if (act === "continue") { const nx = findNextLesson(); if (nx) { location.hash = "#learn"; setTimeout(() => openStory(nx.pack.id, nx.lesson.id), 60); } }
    else if (act === "calc") { location.hash = "#calc"; }
  });
  const chg = $("[data-change-kitchen]");
  if (chg) chg.addEventListener("click", (e) => { e.stopPropagation(); openOnboarding(2); });
  const replay = $("[data-replay-welcome]");
  if (replay) replay.addEventListener("click", () => openOnboarding(1));
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
  const found = findAnyLesson(packId, lessonId);
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
  <div class="story" role="dialog" aria-modal="true" aria-label="${esc(lesson.title)}">
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
          <div style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:340px">
            ${story.returnToCook && cook ? `<button class="btn btn-primary btn-block" data-back-cook>Back to the recipe</button>` : `
            ${nextInPack() ? `<button class="btn btn-primary btn-block" data-next-lesson>Next lesson</button>` : ""}
            ${applyNudgeHtml()}
            <button class="btn btn-secondary btn-block" data-back-menu>Chapters</button>
            <button class="btn btn-ghost btn-block btn-sm" data-remember>Save a takeaway to my Journal</button>`}
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
  const applyBtn = $("[data-apply-nudge]", overlayRoot);
  if (applyBtn) applyBtn.addEventListener("click", () => {
    const target = applyBtn.dataset.applyNudge;
    story = null;
    closeOverlays();
    if (target === "build") { location.hash = "#build"; }
    else {
      // Pasta recipes live on the pasta tab; pizza-side recipes on the recipes tab
      location.hash = findPastaRecipe(target) ? "#pasta" : "#recipes";
      setTimeout(() => openCook(target), 80);
    }
  });
  const remBtn = $("[data-remember]", overlayRoot);
  if (remBtn) remBtn.addEventListener("click", () => {
    state.journal.unshift({ id: Date.now(), type: "note", title: `Lesson: ${lesson.title}`, detail: lesson.summary || "Completed and understood.", ts: Date.now() });
    save();
    toast("Saved to your Journal \uD83D\uDCD3");
    remBtn.disabled = true;
    remBtn.textContent = "Saved \u2713";
  });
}

function applyNudgeHtml() {
  if (!story) return "";
  // Map pack → most relevant immediate application (exact pack id match)
  const map = {
    dough: { target: "build", label: "Try dough choices in the Builder" },
    sauce: { target: "personal-margherita", label: "Cook it: Personal Margherita" },
    oven: { target: "personal-margherita", label: "Bake one tonight" },
    "egg-flour": { target: "tagliatelle-butter-sage", label: "Cook it: Fresh Tagliatelle, Butter & Sage" },
    "al-dente": { target: "cacio-e-pepe", label: "Cook it: Cacio e Pepe" },
    "sauce-science": { target: "carbonara", label: "Cook it: Classic Carbonara" },
    "squid-ink": { target: "squid-ink-tagliolini", label: "Cook it: Squid Ink Tagliolini" }
  };
  const nudge = map[story.packId] || { target: "build", label: "Try this in the Builder" };
  return `<button class="btn btn-secondary btn-block" data-apply-nudge="${nudge.target}">${esc(nudge.label)}</button>`;
}

function advanceStory() {
  if (!story) return;
  story.slideIdx++;
  if (story.slideIdx >= story.lesson.slides.length) {
    const key = `${story.packId}/${story.lessonId}`;
    if (!state.completedLessons[key]) {
      state.completedLessons[key] = true;
      save();
      confetti();
      const n = lessonsDoneCount();
      if (n === 1) celebrateOnce("first-lesson", "First lesson done \u2014 Marco is beaming!");
      else if (n === TOTAL_LESSONS) celebrateOnce("all-lessons", "Pizza School: COMPLETE. Dottore della pizza!");
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
    <button class="btn btn-secondary btn-block" id="shareBuild" style="margin-top:10px">📤 Share my pizza</button>
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
    <div class="bal-row ${moistWarn ? "warn" : ""}"><span>Moisture</span><div class="bal-track"><i style="width:${pct(s.moisture)}%;background:${moistWarn ? "var(--danger)" : "var(--terracotta-light)"}"></i></div></div>
    <p class="bal-caption">${esc(balanceCaption(s, moistWarn))}</p>`;
}

function balanceCaption(s, moistWarn) {
  if (moistWarn) return "A bit swampy in the middle \u2014 drain something wet and this gets great.";
  if (s.bright < 3 && s.rich >= 6) return "Rich and cosy \u2014 a pinch more brightness (basil? hot honey?) would make this pop!";
  if (s.bright >= 6 && s.rich < 3) return "Zingy and fresh \u2014 a creamy cheese would round it out beautifully.";
  if (s.crunch >= 8) return "Serious crunch credentials. This one will sing on the way in.";
  if (s.bright >= 4 && s.rich >= 4 && s.crunch >= 4) return "Beautifully balanced \u2014 Marco would serve this to his nonna.";
  return "A gentle, honest pizza. Add or swap anything \u2014 there are no wrong answers here.";
}

function pizzaSvg() {
  const { size, dough, sauce, cheeses, toppings } = builderPicks();
  const R = size.id === "sharing" ? 92 : 78;
  const rimW = size.id === "sharing" ? 11 : 13;
  const saucR = R - rimW - 2;
  // Defensive: fall back to sensible defaults if a data entry ever ships
  // without a viz block, so the drawing never throws mid-render.
  const crust = (dough.viz && dough.viz.crust) || "#E8C083";

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
    const cheesePick = cheeses.find(c => c.id !== "parmesan") || cheeses[0];
    const cheeseColor = (cheesePick.viz && cheesePick.viz.color) || "#F6EAC9";
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
    if (!t.viz) continue;
    const c = t.viz.color || "#8E2E24";
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
  if (dough.viz && dough.viz.spots) {
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
    <circle cx="100" cy="100" r="${saucR}" fill="${(sauce.viz && sauce.viz.color) || "#C1502E"}"/>
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

  $("#shareBuild").addEventListener("click", async () => {
    const { size, dough, sauce, cheeses, toppings } = builderPicks();
    const b = state.builder;
    const url = encodeParams("build", {
      sz: b.size, d: b.dough, sc: b.sauce,
      ch: b.cheeses.join("."), t: b.toppings.join("."),
      from: state.name || ""
    });
    const desc = toppings.length ? toppings.map(t => t.label).join(" + ") : (sauce.id === "bianca" ? "a bianca" : "a margherita-style");
    const res = await shareText(
      "Marco's Pizza Club — my pizza design",
      `\u{1F355} ${state.name ? state.name + " designed" : "I designed"} ${desc} on ${dough.label.toLowerCase()} dough in Marco's Pizza Builder. Open it, tweak it, or dare to improve it:`,
      url
    );
    if (res === "copied") toast("Pizza link copied \u2014 challenge someone's taste buds.");
    else if (res === "shared") toast("Design shared. Marco approves of showing off.");
  });
}

/** Prefill the builder from a shared deep link (#build?sz=m&d=classic&sc=red&ch=a.b&t=x.y). */
function applyBuildParams(params) {
  if (!params) return false;
  let applied = false;
  const b = state.builder;
  if (params.sz && SIZES.some(s => s.id === params.sz)) { b.size = params.sz; applied = true; }
  if (params.d && DOUGHS.some(d => d.id === params.d)) { b.dough = params.d; applied = true; }
  if (params.sc && SAUCES.some(s => s.id === params.sc)) { b.sauce = params.sc; applied = true; }
  if (params.ch != null) {
    const ids = params.ch ? params.ch.split(".").filter(id => CHEESES.some(c => c.id === id)) : [];
    b.cheeses = ids.slice(0, 2); applied = true;
  }
  if (params.t != null) {
    const ids = params.t ? params.t.split(".").filter(id => TOPPINGS.some(tp => tp.id === id)) : [];
    b.toppings = ids.slice(0, 3); applied = true;
  }
  if (applied) save();
  return applied;
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
  if (pendingChallenge) {
    const p = pendingChallenge;
    pendingChallenge = null;
    const target = findRecipe(p.cook);
    if (target) {
      setTimeout(() => {
        openCook(target.id);
        toast(p.from ? `${p.from} challenged you to make the ${target.title}. Show them how it's done.` : `You've been challenged: the ${target.title}. Marco believes in you.`);
      }, 350);
    }
  }
}

/* ---------------- Cook-along overlay ---------------- */
let cook = null; // { recipe, step: -1 = intro, -2 = oven choice, mode: "oven"|"combi"|null }

function openCook(recipeId) {
  const recipe = findAnyRecipe(recipeId);
  if (!recipe) return;
  cook = { recipe, step: -1, mode: null };
  renderCook();
}

// Resolve a step for the active oven mode: combi overrides replace base fields.
function resolveStep(step, mode) {
  if (mode !== "combi" || !step.combi) return step;
  return { ...step, ...step.combi, learn: step.learn, video: step.video, title: step.title };
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
  } else if (i === -2) {
    body = `
      <div class="cook-pad">
        <div class="cook-stepline">Before we start</div>
        <h2>What are you baking in?</h2>
        <p class="cook-intro">Preheat, temperature and timing all change with your oven — pick yours and every step adapts.</p>
        <div class="mode-pick">
          ${OVEN_MODES.map(m => {
            const isDefault = (state.kitchen === "combi" && m.id === "combi") || ((state.kitchen === "oven" || state.kitchen === "pizzaoven") && m.id === "oven");
            return `
          <button class="mode-card ${isDefault ? "suggested" : ""}" data-mode="${m.id}">
            <span class="mode-icon">${m.icon}</span>
            <span class="mode-body"><strong>${esc(m.title)}</strong>${isDefault ? `<span class="chip chip-butter" style="margin:2px 0 4px;align-self:flex-start">Your kitchen</span>` : ""}<small>${esc(m.desc)}</small></span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>
          </button>`;
          }).join("")}
        </div>
        <p class="cook-note" style="margin-top:14px"><strong>Marco says:</strong> No steel? No shame. The combi path is tuned for a Panasonic CS89-class convection microwave — 230 °C max, enamel shelf, grill finish.</p>
      </div>`;
  } else if (i >= total) {
    body = `
      <div class="cook-pad cook-finish">
        <img src="./images/mascot-cheer.jpg" alt="Marco celebrating" />
        <h2>Buon appetito!</h2>
        <p>You just made a ${esc(r.title)} from scratch. Log it while the memory (and the crust) is still warm — future you will thank present you.</p>
        <div class="log-form">
          <div class="log-label">How did it turn out?</div>
          <div class="rating-row" role="radiogroup" aria-label="Rate this bake">
            <button class="rating-chip" role="radio" aria-checked="false" data-rating="1">\uD83D\uDE48 Needs work</button>
            <button class="rating-chip" role="radio" aria-checked="false" data-rating="2">\uD83D\uDC4D Solid</button>
            <button class="rating-chip" role="radio" aria-checked="false" data-rating="3">\uD83D\uDE18 Chef's kiss</button>
          </div>
          <label class="photo-btn">
            <input type="file" accept="image/*" id="bakePhoto" hidden />
            <span id="photoLabel">\uD83D\uDCF8 Add a photo of your pizza</span>
          </label>
          <textarea class="note-input" id="bakeNote" rows="2" placeholder="Anything to remember? e.g. rim was perfect, centre slightly wet"></textarea>
        </div>
        <button class="btn btn-primary btn-block" data-log>Log this bake</button>
        <button class="btn btn-secondary btn-block" data-challenge style="margin-top:10px">📣 Challenge a friend to this</button>
        <button class="btn btn-ghost btn-block btn-sm" data-close-cook style="margin-top:8px">Done — skip the log</button>
      </div>`;
  } else {
    const step = resolveStep(r.steps[i], cook.mode);
    const modeLabel = cook.mode === "combi" ? "Combi microwave" : "Full-size oven";
    body = `
      <div class="cook-pad">
        <div class="cook-stepline">Step ${i + 1} of ${total} ${r.noOven ? `<span class="mode-chip" style="cursor:default">🍳 Stovetop</span>` : `<button class="mode-chip" data-remode title="Change oven type">${cook.mode === "combi" ? "📦" : "🔥"} ${modeLabel}</button>`}</div>
        <div class="progress" style="margin-bottom:18px"><i style="width:${Math.round((i + 1) / total * 100)}%"></i></div>
        <h2>${esc(step.title)}</h2>
        ${step.video ? `
        <video class="cook-video" src="${step.video}" ${REDUCED_MOTION ? 'controls' : 'autoplay loop'} muted playsinline preload="metadata" aria-label="Video demonstration: ${esc(step.title)}"></video>` : ""}
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
  <div class="cook" role="dialog" aria-modal="true" aria-label="${esc(r.title)} cook-along">
    <div class="cook-top">
      <button class="story-close" data-close-cook aria-label="Close recipe"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <span class="cook-title">${esc(r.title)}</span>
      <span style="width:38px"></span>
    </div>
    <div class="cook-scroll">${body}</div>
    ${i >= 0 && i < total ? `
    <div class="cook-nav">
      <button class="btn btn-secondary" data-prev>Back</button>
      <button class="btn btn-primary" data-next>${i === total - 1 ? "Finish" : "Next step"}</button>
    </div>` : ""}
  </div>`;

  $$("[data-close-cook]", overlayRoot).forEach(b => b.addEventListener("click", () => { cook = null; stopTimer(); closeOverlays(); }));
  const startBtn = $("[data-start]", overlayRoot);
  if (startBtn) startBtn.addEventListener("click", () => {
    // Stovetop-only recipes skip the oven-choice screen
    if (cook.recipe.noOven) { cook.mode = "oven"; cook.step = 0; } else { cook.step = -2; }
    renderCook();
  });
  $$("[data-mode]", overlayRoot).forEach(b => b.addEventListener("click", () => {
    cook.mode = b.dataset.mode; cook.step = 0; renderCook();
  }));
  const remode = $("[data-remode]", overlayRoot);
  if (remode) remode.addEventListener("click", () => { stopTimer(); cook.step = -2; renderCook(); });
  const prev = $("[data-prev]", overlayRoot);
  if (prev) prev.addEventListener("click", () => { cook.step = cook.step === 0 ? (cook.recipe.noOven ? -1 : -2) : cook.step - 1; renderCook(); });
  const next = $("[data-next]", overlayRoot);
  if (next) next.addEventListener("click", () => { cook.step++; renderCook(); });
  const learnBtn = $("[data-learn]", overlayRoot);
  if (learnBtn) learnBtn.addEventListener("click", () => {
    const st = r.steps[cook.step];
    if (st && st.learn) { stopTimer(); openStory(st.learn.pack, st.learn.lesson, st.learn.slide || 0, true); }
  });
  const modeLog = cook.mode === "combi" ? " (combi microwave)" : "";
  // Finish screen: rating chips, photo picker, note
  let pickedRating = 0, pickedPhoto = null;
  const ratingChips = $$(".rating-chip", overlayRoot);
  const pickRating = chip => {
    pickedRating = parseInt(chip.dataset.rating, 10);
    ratingChips.forEach(c => {
      const on = c === chip;
      c.classList.toggle("on", on);
      c.setAttribute("aria-checked", on ? "true" : "false");
      c.tabIndex = on ? 0 : -1;
    });
  };
  ratingChips.forEach((chip, ci) => {
    chip.tabIndex = ci === 0 ? 0 : -1; // roving tabindex
    chip.addEventListener("click", () => pickRating(chip));
    chip.addEventListener("keydown", e => {
      let target = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") target = ratingChips[(ci + 1) % ratingChips.length];
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") target = ratingChips[(ci - 1 + ratingChips.length) % ratingChips.length];
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); pickRating(chip); return; }
      if (target) { e.preventDefault(); target.focus(); pickRating(target); }
    });
  });
  const photoInput = $("#bakePhoto", overlayRoot);
  if (photoInput) photoInput.addEventListener("change", async () => {
    const f = photoInput.files && photoInput.files[0];
    if (!f) return;
    try {
      pickedPhoto = await downscalePhoto(f);
      $("#photoLabel", overlayRoot).textContent = "\uD83D\uDCF8 Photo added \u2713 (tap to change)";
    } catch { toast("Couldn't read that photo — try another?"); }
  });
  const logBtn = $("[data-log]", overlayRoot);
  if (logBtn) logBtn.addEventListener("click", () => {
    const note = ($("#bakeNote", overlayRoot) || {}).value || "";
    const entry = {
      id: Date.now(), type: "bake",
      title: r.title,
      detail: note.trim() || `Cooked along with the ${r.title} recipe${modeLog}.`,
      ts: Date.now()
    };
    if (pickedRating) entry.rating = pickedRating;
    if (pickedPhoto) entry.photo = pickedPhoto;
    pushJournal(entry);
    cook = null; stopTimer(); closeOverlays();
    const n = bakesLogged();
    if (n === 1) celebrateOnce("first-bake", "Your first bake is in the book. Marco is SO proud.");
    else if (n === 5) celebrateOnce("five-bakes", "5 bakes logged — you're officially a regular at the club.");
    else if (n === 10) celebrateOnce("ten-bakes", "10 bakes! Marco is naming a table after you.");
    else if (n === 25) celebrateOnce("twentyfive-bakes", "25 bakes. Marco has hung your photo behind the counter.");
    else { confetti(); toast("Bake logged. Marco is proud of you."); }
    if (currentRoute() === "journal") render();
    // Offer a share card right after logging — the proudest moment.
    setTimeout(() => offerShareCard(entry), 700);
  });
  const challengeBtn = $("[data-challenge]", overlayRoot);
  if (challengeBtn) challengeBtn.addEventListener("click", async () => {
    const url = encodeParams("recipes", { cook: r.id, from: state.name || "" });
    const who = state.name ? `${state.name} just made` : "A friend just made";
    const res = await shareText(
      "Marco's Pizza Club challenge",
      `\u{1F355} ${who} the ${r.title} with Marco's Pizza Club — and challenges you to beat it. The app walks you through every minute:`,
      url
    );
    if (res === "copied") toast("Challenge link copied — paste it anywhere.");
    else if (res === "shared") toast("Challenge sent. No pressure. (Some pressure.)");
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
  build: { label: "Pizza design", icon: "\uD83C\uDF55" },
  bake: { label: "Bake", icon: "\uD83D\uDD25" },
  note: { label: "Note", icon: "\u270F\uFE0F" },
  dough: { label: "Dough mix", icon: "\uD83E\uDD63" }
};
const RATING_META = { 1: "\uD83D\uDE48 Needs work", 2: "\uD83D\uDC4D Solid", 3: "\uD83D\uDE18 Chef's kiss" };

/* Quota-safe journal save: if localStorage is full (photos!), drop oldest photos first. */
function pushJournal(entry) {
  state.journal.unshift(entry);
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  } catch {
    // Storage full — strip photos from oldest entries until it fits
    const withPhotos = [...state.journal].reverse().filter(e => e.photo && e !== entry);
    for (const old of withPhotos) {
      delete old.photo;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); toast("Storage was full — oldest photo trimmed to make room."); return; } catch { /* keep trimming */ }
    }
    delete entry.photo;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); toast("Storage full — entry saved without the photo."); } catch { toast("Couldn't save — storage is full."); }
  }
}

/* Downscale an image file to ≤640px JPEG data URL for journal storage. */
function downscalePhoto(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const max = 640;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale), h = Math.round(img.height * scale);
      const cv = document.createElement("canvas");
      cv.width = w; cv.height = h;
      cv.getContext("2d").drawImage(img, 0, 0, w, h);
      resolve(cv.toDataURL("image/jpeg", 0.78));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("bad image")); };
    img.src = url;
  });
}

function journalInsight(entries) {
  const bakes = entries.filter(e => e.type === "bake");
  if (bakes.length < 2) return null;
  const rated = bakes.filter(b => b.rating);
  if (rated.length >= 2 && rated[0].rating > rated[1].rating) return "Your latest bake beat the one before it. That's the curve Marco likes to see.";
  const counts = {};
  bakes.forEach(b => { counts[b.title] = (counts[b.title] || 0) + 1; });
  const fav = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  if (fav && fav[1] >= 2) return `${fav[0]} is your go-to (${fav[1]} bakes). Maybe next time, surprise Marco with something new?`;
  return `${bakes.length} bakes logged. Every one of them taught your hands something.`;
}

function viewJournal() {
  const entries = state.journal;
  const photos = entries.filter(e => e.photo);
  const insight = journalInsight(entries);
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Bake Journal</h2><p>Every bake teaches something — if you write it down.</p></div>
      <button class="btn btn-ghost" id="backupMenu" aria-label="Backup and restore">Backup</button>
    </div>

    ${clubBadgesHtml()}

    ${photos.length ? `
    <div class="bake-grid">
      ${photos.slice(0, 9).map(e => `<img src="${e.photo}" alt="${esc(e.title)}" title="${esc(e.title)}" loading="lazy" />`).join("")}
    </div>` : ""}

    ${insight ? `
    <div class="card mascot-card" style="margin-bottom:14px">
      <img src="./images/mascot-hero.jpg" alt="Marco" />
      <div><h3>Marco noticed…</h3><p>${esc(insight)}</p></div>
    </div>` : ""}

    <div class="card" style="padding:16px 18px">
      <h3 style="margin-bottom:8px">Quick note</h3>
      <textarea id="noteText" class="note-input" rows="2" placeholder="e.g. 65% dough, 48h ferment — best crust yet. Rotate earlier next time."></textarea>
      <div style="display:flex;gap:10px;align-items:center;margin-top:10px">
        <button class="btn btn-primary btn-small" id="addNote">Add note</button>
        <label class="photo-btn photo-btn-inline">
          <input type="file" accept="image/*" id="notePhoto" hidden />
          <span id="notePhotoLabel">\uD83D\uDCF8 Photo</span>
        </label>
      </div>
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
        <span class="journal-icon">${TYPE_META[e.type]?.icon || "\uD83D\uDCC4"}</span>
        <div class="journal-body">
          <div class="journal-head">
            <strong>${esc(e.title)}</strong>
            <span class="journal-actions">
              ${e.type === "bake" ? `<button class="journal-share" data-share-card="${e.id}" aria-label="Make a share card" title="Make a share card"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/></svg></button>` : ""}
              <button class="journal-del" data-del="${e.id}" aria-label="Delete entry"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V5h6v2m-8 0 1 13h8l1-13"/></svg></button>
            </span>
          </div>
          ${e.photo ? `<img class="journal-photo" src="${e.photo}" alt="Photo for ${esc(e.title)}" loading="lazy" />` : ""}
          <p class="journal-detail">${esc(e.detail).replace(/\n/g, "<br>")}</p>
          <small>${TYPE_META[e.type]?.label || "Entry"}${e.rating ? ` · ${RATING_META[e.rating]}` : ""} · ${fmtWhen(e.ts)}</small>
        </div>
      </div>`).join("")}
    </div>`}
  </section>`;
}

function wireJournal() {
  let notePhoto = null;
  const notePhotoInput = $("#notePhoto");
  if (notePhotoInput) notePhotoInput.addEventListener("change", async () => {
    const f = notePhotoInput.files && notePhotoInput.files[0];
    if (!f) return;
    try {
      notePhoto = await downscalePhoto(f);
      $("#notePhotoLabel").textContent = "\uD83D\uDCF8 \u2713";
    } catch { toast("Couldn't read that photo — try another?"); }
  });
  const add = $("#addNote");
  if (add) add.addEventListener("click", () => {
    const txt = $("#noteText").value.trim();
    if (!txt && !notePhoto) { toast("Write something first — even 'crust too pale' counts."); return; }
    const entry = { id: Date.now(), type: "note", title: txt ? (txt.length > 42 ? txt.slice(0, 42) + "\u2026" : txt) : "Photo note", detail: txt || "", ts: Date.now() };
    if (notePhoto) entry.photo = notePhoto;
    pushJournal(entry);
    render();
    toast("Note saved.");
  });
  $$("[data-del]").forEach(btn => btn.addEventListener("click", () => {
    state.journal = state.journal.filter(e => String(e.id) !== btn.dataset.del);
    save();
    render();
    toast("Entry deleted.");
  }));
  const backupBtn = $("#backupMenu");
  if (backupBtn) backupBtn.addEventListener("click", openBackupSheet);
  $$("[data-share-card]").forEach(btn => btn.addEventListener("click", async () => {
    const entry = state.journal.find(e => String(e.id) === btn.dataset.shareCard);
    if (entry) await runShareCard(entry, btn);
  }));
}

/* ---------------- Sharing: bake cards & backup ---------------- */
async function runShareCard(entry, btn) {
  const original = btn ? btn.innerHTML : null;
  if (btn) { btn.disabled = true; btn.innerHTML = "\u23F3"; }
  try {
    const blob = await makeBakeCard(entry);
    if (!blob) throw new Error("canvas");
    const res = await shareCard(blob, "marcos-pizza-club-bake.png", `\u{1F355} ${entry.title} \u2014 fresh from my oven, with Marco's Pizza Club.`);
    if (res === "downloaded") toast("Share card saved \u2014 check your downloads.");
    else if (res === "shared") toast("Card shared. Marco is showing everyone.");
  } catch {
    toast("Couldn't build the card \u2014 try again?");
  } finally {
    if (btn) { btn.disabled = false; btn.innerHTML = original; }
  }
}

function offerShareCard(entry) {
  // Gentle post-log offer, never forced: a toast-sized action card.
  const holder = document.createElement("div");
  holder.className = "share-offer";
  holder.setAttribute("role", "dialog");
  holder.setAttribute("aria-label", "Share your bake");
  holder.innerHTML = `
    <p><strong>Nice one!</strong> Want a little card of this bake for the family chat?</p>
    <div class="share-offer-btns">
      <button class="btn btn-primary btn-sm" data-yes>\u{1F4E4} Make a share card</button>
      <button class="btn btn-ghost btn-sm" data-no>Not now</button>
    </div>`;
  document.body.appendChild(holder);
  const close = () => holder.remove();
  holder.querySelector("[data-yes]").addEventListener("click", async () => { close(); await runShareCard(entry, null); });
  holder.querySelector("[data-no]").addEventListener("click", close);
  setTimeout(() => { if (document.body.contains(holder)) close(); }, 12000);
}

const BADGES = [
  { key: "first-bake", icon: "\u{1F355}", label: "First bake", need: s => bakesLogged() >= 1 },
  { key: "five-bakes", icon: "\u{1F396}\uFE0F", label: "Club regular", need: s => bakesLogged() >= 5 },
  { key: "ten-bakes", icon: "\u{1F3C6}", label: "House favourite", need: s => bakesLogged() >= 10 },
  { key: "twentyfive-bakes", icon: "\u{1F451}", label: "Pizza royalty", need: s => bakesLogged() >= 25 },
  { key: "school-done", icon: "\u{1F393}", label: "Pizza School grad", need: s => lessonsDoneCount() >= TOTAL_LESSONS }
];
function clubBadgesHtml() {
  const earned = BADGES.filter(b => b.need(state));
  if (!earned.length) return "";
  return `<div class="badge-strip" aria-label="Club badges">${earned.map(b => `<span class="club-badge" title="${esc(b.label)}"><i>${b.icon}</i>${esc(b.label)}</span>`).join("")}</div>`;
}

function openBackupSheet() {
  const holder = document.createElement("div");
  holder.className = "share-offer backup-sheet";
  holder.setAttribute("role", "dialog");
  holder.setAttribute("aria-label", "Backup and restore journal");
  holder.innerHTML = `
    <p><strong>Your journal, your dough.</strong> Back it up to a file, or restore one from another device.</p>
    <div class="share-offer-btns">
      <button class="btn btn-primary btn-sm" data-backup>\u2B07\uFE0F Back up journal</button>
      <label class="btn btn-secondary btn-sm" style="cursor:pointer">\u2B06\uFE0F Restore<input type="file" accept="application/json,.json" hidden data-restore /></label>
      <button class="btn btn-ghost btn-sm" data-no>Close</button>
    </div>`;
  document.body.appendChild(holder);
  const close = () => holder.remove();
  holder.querySelector("[data-no]").addEventListener("click", close);
  holder.querySelector("[data-backup]").addEventListener("click", () => {
    const payload = { app: "marcos-pizza-club", version: 1, exported: new Date().toISOString(), journal: state.journal, completedLessons: state.completedLessons, doughsTried: state.doughsTried || {} };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "marcos-pizza-club-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("Backup saved \u2014 photos included.");
    close();
  });
  holder.querySelector("[data-restore]").addEventListener("change", async e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      const incoming = Array.isArray(data) ? data : (data.journal || []);
      if (!Array.isArray(incoming)) throw new Error("bad format");
      const have = new Set(state.journal.map(en => String(en.id)));
      const added = incoming.filter(en => en && en.id && en.title && !have.has(String(en.id)));
      state.journal = [...added, ...state.journal].sort((a, b) => b.ts - a.ts);
      if (data.completedLessons) state.completedLessons = { ...data.completedLessons, ...state.completedLessons };
      if (data.doughsTried) state.doughsTried = { ...data.doughsTried, ...(state.doughsTried || {}) };
      save();
      close();
      render();
      toast(added.length ? `Restored ${added.length} ${added.length === 1 ? "entry" : "entries"}. Welcome back!` : "Nothing new to restore \u2014 you already had it all.");
    } catch {
      toast("That file doesn't look like a club backup.");
    }
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
    <div class="card next-card" data-go-calc role="button" tabindex="0" style="margin-bottom:14px">
      <div style="flex:1">
        <span class="eyebrow" style="color:var(--terracotta)">New tool</span>
        <h3 style="margin:4px 0 6px">Dough Calculator</h3>
        <p>Any number of pizzas, any size, any style — Marco does the maths and hands you the gram-perfect mix.</p>
        <span class="btn btn-primary btn-sm" style="margin-top:10px;display:inline-block">Open the calculator</span>
      </div>
    </div>
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
  const calcCard = $("[data-go-calc]");
  if (calcCard) {
    calcCard.addEventListener("click", () => { location.hash = "#calc"; });
    calcCard.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); location.hash = "#calc"; } });
  }
}

function openDough(id) {
  const d = DOUGH_RECIPES.find(x => x.id === id);
  if (!d) return;
  overlayRoot.innerHTML = `
  <div class="cook" role="dialog" aria-modal="true" aria-label="${esc(d.name)} dough recipe">
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
   DOUGH CALCULATOR — simple by default, power on request
================================================================ */
const CALC_STYLES = {
  neapolitan: { label: "Neapolitan-ish", hydration: 62, salt: 2.8, yeast: 0.2, note: "Soft, puffy rim. The classic starting point." },
  newpolitan: { label: "Newpolitan", hydration: 72, salt: 2.6, yeast: 0.3, note: "Casa Vostra territory — crisp outside, fluffy sweet middle." },
  newyork: { label: "New York", hydration: 63, salt: 2.5, yeast: 0.4, note: "Chewy, foldable, forgiving. Add 2% oil + 2% sugar below." },
  panpizza: { label: "Pan / focaccia", hydration: 80, salt: 2.2, yeast: 0.5, note: "No-knead, fluffy, fried-crisp bottom. Great in a combi." }
};
const CALC_SIZES = { s: { label: "Small (22 cm)", grams: 170 }, m: { label: "Medium (26 cm)", grams: 220 }, l: { label: "Large (30 cm)", grams: 280 } };
let calc = { pizzas: 2, size: "m", style: "newpolitan", advanced: false, hydration: null, salt: null, yeast: null };

function calcNumbers() {
  const st = CALC_STYLES[calc.style];
  const hydration = calc.advanced && calc.hydration != null ? calc.hydration : st.hydration;
  const salt = calc.advanced && calc.salt != null ? calc.salt : st.salt;
  const yeast = calc.advanced && calc.yeast != null ? calc.yeast : st.yeast;
  const totalDough = calc.pizzas * CALC_SIZES[calc.size].grams;
  // flour + flour*(h+s+y)/100 = total → flour = total / (1 + (h+s+y)/100)
  const flour = totalDough / (1 + (hydration + salt + yeast) / 100);
  const r = x => Math.round(x);
  return {
    hydration, salt, yeast, totalDough: r(totalDough),
    flour: r(flour),
    water: r(flour * hydration / 100),
    saltG: Math.round(flour * salt / 100 * 10) / 10,
    yeastG: Math.round(flour * yeast / 100 * 10) / 10
  };
}

function yeastHint(y) {
  if (y <= 0.15) return "Marco's slow lane: this little yeast wants a long, cold nap — plan 24–72 h in the fridge for the flavour to bloom.";
  if (y <= 0.35) return "The sweet spot for an overnight or next-day dough — mix tonight, bake tomorrow, look like a genius.";
  if (y <= 0.6) return "Same-day territory: give it 4–6 h somewhere warm and it'll be ready by dinner.";
  return "In a hurry, eh? This much yeast rises in 2–3 h — fine for tonight, but the flavour won't be as deep. Marco forgives you.";
}

function calcCaption(h) {
  if (h < 60) return "Firm and easy to handle — great for rolling pins and beginners.";
  if (h < 66) return "The friendly zone. Easy to stretch, hard to mess up.";
  if (h < 72) return "Softer and bubblier — flour your hands and be gentle.";
  if (h < 78) return "Sticky but worth it: big open crumb, crisp-fluffy contrast. Marco's happy place.";
  return "Basically wet cement — no-knead folds only, bake it in a pan, thank Marco later.";
}

function viewCalc() {
  const n = calcNumbers();
  const st = CALC_STYLES[calc.style];
  return `
  <section class="section">
    <div class="section-head">
      <div><h2>Dough Calculator</h2><p>Tell Marco what you're making — he'll do the maths.</p></div>
      <button class="btn btn-ghost" data-back-lab>Dough Lab</button>
    </div>

    <div class="card" style="padding:18px">
      <h3 class="builder-h" style="margin-top:0">How many pizzas?</h3>
      <div class="stepper">
        <button class="stepper-btn" data-calc-minus aria-label="Fewer pizzas">−</button>
        <span class="stepper-val">${calc.pizzas}</span>
        <button class="stepper-btn" data-calc-plus aria-label="More pizzas">+</button>
      </div>

      <h3 class="builder-h">How big are we talking?</h3>
      <div class="seg-row" data-calc-size>
        ${Object.entries(CALC_SIZES).map(([id, s]) => `<button class="seg ${calc.size === id ? "on" : ""}" data-id="${id}"><strong>${esc(s.label.split(" ")[0])}</strong><small>${esc(s.label.match(/\((.+)\)/)[1])} · ${s.grams} g ball</small></button>`).join("")}
      </div>

      <h3 class="builder-h">Which crust are you chasing?</h3>
      <div class="seg-row wrap" data-calc-style>
        ${Object.entries(CALC_STYLES).map(([id, s]) => `<button class="seg ${calc.style === id ? "on" : ""}" data-id="${id}"><strong>${esc(s.label)}</strong><small>${s.hydration}% water</small></button>`).join("")}
      </div>
      <p class="hint" style="margin-top:6px">${esc(st.note)}</p>

      <button class="btn btn-ghost btn-sm" data-calc-adv style="margin-top:12px">${calc.advanced ? "Hide the dials \u25B4" : "I want more control \u25BE"}</button>
      ${calc.advanced ? `
      <div class="calc-adv">
        <label class="calc-slider"><span>Hydration <strong>${n.hydration}%</strong></span>
          <input type="range" min="55" max="90" step="1" value="${n.hydration}" data-adv="hydration" /></label>
        <label class="calc-slider"><span>Salt <strong>${n.salt}%</strong></span>
          <input type="range" min="1.5" max="3.5" step="0.1" value="${n.salt}" data-adv="salt" /></label>
        <label class="calc-slider"><span>Yeast (instant) <strong>${n.yeast}%</strong></span>
          <input type="range" min="0.05" max="1" step="0.05" value="${n.yeast}" data-adv="yeast" /></label>
        <p class="hint yeast-hint" style="margin:4px 0 0">${esc(yeastHint(n.yeast))}</p>
      </div>` : ""}
    </div>

    <div class="card calc-result" style="margin-top:14px;padding:18px">
      <h3 style="margin:0 0 4px">Your dough — ${calc.pizzas} × ${CALC_SIZES[calc.size].grams} g balls</h3>
      <p class="bal-caption" style="margin:0 0 12px">${esc(calcCaption(n.hydration))}</p>
      <table class="dough-table">
        <thead><tr><th>Ingredient</th><th>Amount</th><th>Baker's %</th></tr></thead>
        <tbody>
          <tr><td>Bread flour (strong, 12–14% protein)</td><td><strong>${n.flour} g</strong></td><td>100%</td></tr>
          <tr><td>Water (cool, ~18 °C)</td><td><strong>${n.water} g</strong></td><td>${n.hydration}%</td></tr>
          <tr><td>Fine sea salt</td><td><strong>${n.saltG} g</strong></td><td>${n.salt}%</td></tr>
          <tr><td>Instant dry yeast</td><td><strong>${n.yeastG} g</strong></td><td>${n.yeast}%</td></tr>
          <tr><td><em>Total dough</em></td><td><em>${n.totalDough} g</em></td><td></td></tr>
        </tbody>
      </table>
      <p class="hint" style="margin-top:10px">Marco's method in one breath: mix → rest 20 min → knead or fold until smooth → ferment. For the full step-by-step, borrow the timeline from the closest Dough Lab recipe.</p>
      <button class="btn btn-primary btn-block" data-calc-save style="margin-top:12px">Save this mix to my Journal</button>
      <button class="btn btn-secondary btn-block" data-calc-share style="margin-top:10px">📤 Share this mix</button>
    </div>
  </section>`;
}

function wireCalc() {
  const rerender = () => { app.innerHTML = viewCalc(); wireCalc(); };
  $("[data-back-lab]").addEventListener("click", () => { location.hash = "#doughlab"; });
  $("[data-calc-minus]").addEventListener("click", () => { if (calc.pizzas > 1) { calc.pizzas--; rerender(); } });
  $("[data-calc-plus]").addEventListener("click", () => { if (calc.pizzas < 12) { calc.pizzas++; rerender(); } });
  $$("[data-calc-size] .seg").forEach(b => b.addEventListener("click", () => { calc.size = b.dataset.id; rerender(); }));
  $$("[data-calc-style] .seg").forEach(b => b.addEventListener("click", () => {
    calc.style = b.dataset.id;
    calc.hydration = calc.salt = calc.yeast = null; // reset dials to style defaults
    rerender();
  }));
  $("[data-calc-adv]").addEventListener("click", () => { calc.advanced = !calc.advanced; rerender(); });
  $$("[data-adv]").forEach(sl => sl.addEventListener("input", () => {
    calc[sl.dataset.adv] = parseFloat(sl.value);
    // Live-update numbers without full rerender to keep slider focus
    const n = calcNumbers();
    const label = sl.closest(".calc-slider").querySelector("strong");
    label.textContent = sl.dataset.adv === "hydration" ? `${n.hydration}%` : `${calc[sl.dataset.adv]}%`;
    const rows = $$(".calc-result tbody tr");
    if (rows.length === 5) {
      rows[0].children[1].innerHTML = `<strong>${n.flour} g</strong>`;
      rows[1].children[1].innerHTML = `<strong>${n.water} g</strong>`;
      rows[1].children[2].textContent = `${n.hydration}%`;
      rows[2].children[1].innerHTML = `<strong>${n.saltG} g</strong>`;
      rows[2].children[2].textContent = `${n.salt}%`;
      rows[3].children[1].innerHTML = `<strong>${n.yeastG} g</strong>`;
      rows[3].children[2].textContent = `${n.yeast}%`;
    }
    $(".calc-result .bal-caption").textContent = calcCaption(n.hydration);
    const yh = $(".yeast-hint");
    if (yh) yh.textContent = yeastHint(n.yeast);
  }));
  $("[data-calc-save]").addEventListener("click", () => {
    const n = calcNumbers();
    pushJournal({
      id: Date.now(), type: "dough",
      title: `${CALC_STYLES[calc.style].label} dough × ${calc.pizzas}`,
      detail: `${n.flour} g flour · ${n.water} g water (${n.hydration}%) · ${n.saltG} g salt · ${n.yeastG} g yeast → ${calc.pizzas} × ${CALC_SIZES[calc.size].grams} g balls.`,
      ts: Date.now()
    });
    confetti();
    toast("Mix saved — check your Journal when you bake it.");
  });
  $("[data-calc-share]").addEventListener("click", async () => {
    const n = calcNumbers();
    const p = { p: calc.pizzas, s: calc.size, st: calc.style };
    if (calc.advanced) {
      if (calc.hydration != null) p.h = calc.hydration;
      if (calc.salt != null) p.sa = calc.salt;
      if (calc.yeast != null) p.y = calc.yeast;
    }
    const url = encodeParams("calc", p);
    const res = await shareText(
      "Marco's Pizza Club — dough mix",
      `\u{1F35E} My ${CALC_STYLES[calc.style].label} dough: ${n.flour} g flour \u00b7 ${n.water} g water (${n.hydration}%) \u00b7 ${n.saltG} g salt \u00b7 ${n.yeastG} g yeast. Open it in Marco's calculator:`,
      url
    );
    if (res === "copied") toast("Mix link copied \u2014 send it to a dough friend.");
    else if (res === "shared") toast("Mix shared. Spread the fermentation gospel.");
  });
}

/** Prefill the calculator from a shared deep link (#calc?p=2&s=m&st=newpolitan&h=72...). */
function applyCalcParams(params) {
  if (!params) return false;
  let applied = false;
  const pz = parseInt(params.p, 10);
  if (pz >= 1 && pz <= 12) { calc.pizzas = pz; applied = true; }
  if (CALC_SIZES[params.s]) { calc.size = params.s; applied = true; }
  if (CALC_STYLES[params.st]) { calc.style = params.st; calc.hydration = calc.salt = calc.yeast = null; applied = true; }
  const h = parseFloat(params.h), sa = parseFloat(params.sa), y = parseFloat(params.y);
  if (h >= 55 && h <= 90) { calc.hydration = h; calc.advanced = true; applied = true; }
  if (sa >= 1.5 && sa <= 3.5) { calc.salt = sa; calc.advanced = true; applied = true; }
  if (y >= 0.05 && y <= 1) { calc.yeast = y; calc.advanced = true; applied = true; }
  return applied;
}

/* ================================================================
   PASTA — lesson packs + cook-along recipes
================================================================ */
function pastaLessonsDone() {
  return PASTA_PACKS.reduce((n, p) => n + packDone(p), 0);
}

function viewPasta() {
  const done = pastaLessonsDone();
  return `
  <section class="section">
    <div class="hero">
      <img src="./images/pasta/pasta-hero.jpg" alt="Fresh tagliatelle nests on a floured bench" fetchpriority="high" />
      <div class="hero-copy">
        <span class="chip">The pasta chapter is open</span>
        <h2>Silky dough, sauces that cling, and the science of al dente.</h2>
        <p>From the golden egg-to-flour ratio to jet-black squid ink dough — learn the why, then cook along step by step.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head">
      <div><h2>Pasta School</h2><p>Four packs, ${TOTAL_PASTA_LESSONS} lessons — ${done ? `${done} done, keep going.` : "start with the egg and the flour."}</p></div>
    </div>
    ${PASTA_PACKS.map(pack => {
      const pd = packDone(pack);
      const pct = Math.round(pd / pack.lessons.length * 100);
      return `
      <div class="card pack-card" style="margin-bottom:14px">
        <img src="${pack.image}" alt="${esc(pack.title)}" loading="lazy" />
        <div class="pack-body">
          <h3>${esc(pack.title)}</h3>
          <p>${esc(pack.subtitle)}</p>
          <div class="progress"><i style="width:${pct}%"></i></div>
          <div class="pack-meta">
            <span>${pd}/${pack.lessons.length} lessons · ~${pack.lessons.reduce((n, l) => n + l.minutes, 0)} min</span>
            <button class="btn btn-secondary btn-small" data-pasta-pack="${pack.id}">${pd === 0 ? "Open pack" : pd === pack.lessons.length ? "Review" : "Continue"}</button>
          </div>
        </div>
      </div>`;
    }).join("")}
  </section>

  <section class="section">
    <div class="section-head">
      <div><h2>Pasta Recipes</h2><p>Cook-along mode, per-step ingredients, timers — pot on the stove, phone on the counter.</p></div>
    </div>
    ${[
      { label: "Fresh dough", blurb: "Make the pasta itself — machine or rolling pin", ids: ["tagliatelle-butter-sage", "squid-ink-tagliolini"] },
      { label: "Roman classics", blurb: "Pantry pasta, big technique", ids: ["carbonara", "cacio-e-pepe", "aglio-olio"] },
      { label: "Seafood & ink", blurb: "The coast on a plate — no cheese allowed", ids: ["nero-spaghetti", "seafood-linguine"] },
      { label: "Long-simmer & baked", blurb: "Sunday projects and weeknight comfort", ids: ["ragu", "bolognese", "lasagne-pasta"] },
      { label: "From the same kitchen", blurb: "Not pasta, still Italian", ids: ["mushroom-soup"] }
    ].map(g => `
    <h3 class="pasta-group" style="margin:18px 0 2px">${g.label}</h3>
    <p style="margin:0 0 10px;color:var(--muted);font-size:14px">${g.blurb}</p>
    ${g.ids.map(id => PASTA_RECIPES.find(r => r.id === id)).filter(Boolean).map(r => `
    <div class="card media-card" data-cook-pasta="${r.id}" role="button" tabindex="0" style="margin-bottom:14px">
      <img src="${r.image}" alt="${esc(r.title)}" loading="lazy" />
      <div class="media-copy">
        <h3>${esc(r.title)}</h3>
        <p>${esc(r.tagline)}</p>
        <div class="chips">${r.chips.map(c => `<span class="chip chip-terracotta">${esc(c)}</span>`).join("")}</div>
      </div>
    </div>`).join("")}`).join("")}
  </section>`;
}

function wirePasta() {
  $$("[data-pasta-pack]").forEach(btn => btn.addEventListener("click", () => openPastaChapterMenu(btn.dataset.pastaPack)));
  $$("[data-cook-pasta]").forEach(el => el.addEventListener("click", () => openCook(el.dataset.cookPasta)));
}

function openPastaChapterMenu(packId) {
  const pack = PASTA_PACKS.find(p => p.id === packId);
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

/* ================================================================
   ONBOARDING — first-run welcome (3 screens)
================================================================ */
let onboard = null; // { screen: 1|2|3 }

function openOnboarding(screen = 1) {
  onboard = { screen };
  try { sessionStorage.setItem("mpc-ob-screen", String(screen)); } catch (_) { /* private mode */ }
  renderOnboarding();
}

function renderOnboarding() {
  if (!onboard) return;
  const s = onboard.screen;
  let body = "";
  if (s === 1) {
    body = `
      <img class="onboard-mascot" src="./images/mascot-hero.jpg" alt="Marco tossing pizza dough" />
      <h2>Ciao! I'm Marco.</h2>
      <p>Welcome to my little pizza club. No exams, no gatekeeping — just the science of great pizza, told like a friend would tell it, and a kitchen that smells amazing by the weekend.</p>
      <button class="btn btn-primary btn-block" data-ob-next>Piacere, Marco!</button>
      <button class="btn btn-ghost btn-block btn-sm" data-ob-skip>Skip the tour</button>`;
  } else if (s === 2) {
    body = `
      <h2>What's your kitchen like?</h2>
      <p>I'll tune preheat times, temperatures and tricks to what you've actually got. You can change this anytime from the home screen.</p>
      <div class="onboard-kitchens">
        ${Object.entries(KITCHENS).map(([id, k]) => `
        <button class="mode-card ${state.kitchen === id ? "suggested" : ""}" data-ob-kitchen="${id}">
          <span class="mode-icon">${k.icon}</span>
          <span class="mode-body"><strong>${esc(k.label)}</strong><small>${esc(k.hint)}</small></span>
        </button>`).join("")}
      </div>`;
  } else {
    const kit = state.kitchen ? KITCHENS[state.kitchen] : null;
    body = `
      <img class="onboard-mascot" src="./images/mascot-cheer.jpg" alt="Marco celebrating" />
      <h2>Perfetto${kit ? ` — ${esc(kit.label.toLowerCase())} it is` : ""}!</h2>
      <label class="ob-name"><span>What should Marco call you? <small>(optional)</small></span>
        <input type="text" id="obName" maxlength="24" placeholder="Your name" value="${esc(state.name || "")}" autocomplete="given-name" /></label>
      <p>Where shall we start? Both roads lead to great pizza.</p>
      <button class="btn btn-primary btn-block" data-ob-lesson>\uD83D\uDCD6 Teach me something first <small style="display:block;font-weight:400">5-minute lesson on flour</small></button>
      <button class="btn btn-secondary btn-block" data-ob-bake>\uD83C\uDF55 Straight to the kitchen <small style="display:block;font-weight:400">Cook-along Personal Margherita</small></button>
      <button class="btn btn-ghost btn-block btn-sm" data-ob-skip>I'll just look around</button>`;
  }

  overlayRoot.innerHTML = `
  <div class="onboard" role="dialog" aria-modal="true" aria-label="Welcome to Marco's Pizza Club">
    <div class="onboard-card">
      <div class="onboard-dots">${[1, 2, 3].map(n => `<i class="${n === s ? "on" : ""}"></i>`).join("")}</div>
      ${body}
    </div>
  </div>`;

  const finish = (thenDo) => {
    const nameEl = $("#obName", overlayRoot);
    if (nameEl && nameEl.value.trim()) state.name = nameEl.value.trim().slice(0, 24);
    state.onboarded = true;
    save();
    onboard = null;
    try { sessionStorage.removeItem("mpc-ob-screen"); } catch (_) { /* noop */ }
    closeOverlays();
    if (thenDo) thenDo();
  };
  const setScreen = sc => {
    onboard.screen = sc;
    try { sessionStorage.setItem("mpc-ob-screen", String(sc)); } catch (_) { /* private mode */ }
    renderOnboarding();
  };
  const nextB = $("[data-ob-next]", overlayRoot);
  if (nextB) nextB.addEventListener("click", () => setScreen(2));
  $$("[data-ob-kitchen]", overlayRoot).forEach(b => b.addEventListener("click", () => {
    state.kitchen = b.dataset.obKitchen;
    save();
    setScreen(3);
  }));
  const lessonB = $("[data-ob-lesson]", overlayRoot);
  if (lessonB) lessonB.addEventListener("click", () => finish(() => { location.hash = "#learn"; setTimeout(() => openStory(PACKS[0].id, PACKS[0].lessons[0].id), 80); }));
  const bakeB = $("[data-ob-bake]", overlayRoot);
  if (bakeB) bakeB.addEventListener("click", () => finish(() => { location.hash = "#recipes"; setTimeout(() => openCook("personal-margherita"), 80); }));
  $$("[data-ob-skip]", overlayRoot).forEach(b => b.addEventListener("click", () => finish(() => { render(); })));
}

/* ================================================================
   Overlays, splash, boot
================================================================ */
function closeOverlays() {
  stopTimer();
  overlayRoot.innerHTML = "";
  // Restore focus to where the user was before the overlay opened.
  if (lastFocused && document.contains(lastFocused)) {
    try { lastFocused.focus(); } catch (_) { /* noop */ }
  }
  lastFocused = null;
}

// Focus management: whenever an overlay renders, move focus to its close
// button so keyboard and screen-reader users land inside the dialog.
let lastFocused = null;
const overlayObserver = new MutationObserver(() => {
  const dialog = overlayRoot.querySelector('[role="dialog"]');
  if (dialog) {
    if (!lastFocused) lastFocused = document.activeElement;
    const closeBtn = dialog.querySelector(".story-close, [data-close-cook], [data-close-dough]");
    if (closeBtn && !dialog.contains(document.activeElement)) closeBtn.focus();
  }
});
overlayObserver.observe(overlayRoot, { childList: true });

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && overlayRoot.innerHTML) {
    if (onboard) { state.onboarded = true; save(); onboard = null; }
    story = null; cook = null;
    closeOverlays();
  } else if (e.key === "Tab" && overlayRoot.innerHTML) {
    // Focus trap: keep Tab cycling inside the open dialog (incl. onboarding).
    const dialog = overlayRoot.querySelector('[role="dialog"]');
    if (!dialog) return;
    const focusables = Array.from(dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.disabled && el.offsetParent !== null);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
      e.preventDefault(); first.focus();
    }
  } else if (story && e.key === "ArrowRight") advanceStory();
  else if (story && e.key === "ArrowLeft" && story.slideIdx > 0) { story.slideIdx--; renderStory(); }
});

// Splash — hold Marco's welcome card for at least 1.5s from page start,
// measured against navigation start so fast loads still get the full beat.
window.addEventListener("load", () => {
  const SPLASH_MIN = 1500;
  const elapsed = performance.now();
  const wait = Math.max(SPLASH_MIN - elapsed, 120);
  setTimeout(() => $("#splash").classList.add("gone"), wait);
});

// Service worker — updateViaCache:"none" makes the browser always revalidate
// sw.js itself, and an explicit update() check runs on every load so returning
// visitors pick up new versions promptly instead of waiting on HTTP cache TTLs.
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js", { updateViaCache: "none" })
      .then(reg => { reg.update().catch(() => {}); })
      .catch(() => { /* offline still optional */ });
  });
}

/* ---------------- World chooser (entry screen) ----------------
   Pizza and pasta are equal citizens: every fresh session opens on a
   full-screen chooser with two full-bleed 9:16-style photo panels. The
   choice routes to the matching world; it never re-shows within a session. */
function worldChooserPending() {
  try { return !sessionStorage.getItem("mpc-world"); } catch (_) { return false; }
}
function openWorldChooser(afterChoice) {
  const el = document.createElement("div");
  el.className = "world-chooser";
  el.setAttribute("role", "dialog");
  el.setAttribute("aria-modal", "true");
  el.setAttribute("aria-label", "Choose your kitchen");
  el.innerHTML = `
    <div class="world-brand">
      <img src="./icons/favicon-48.png" alt="" width="32" height="32" />
      <span>Marco&rsquo;s Club</span>
      <em>Tonight we cook&hellip;</em>
    </div>
    <button class="world-panel" data-world="pizza" aria-label="Enter the pizza kitchen">
      <img src="./images/chooser-pizza.jpg" alt="Wood-fired margherita pizza on a wooden board" fetchpriority="high" />
      <span class="world-label"><strong>Pizza</strong><small>Dough, fire &amp; the perfect crust</small></span>
    </button>
    <button class="world-panel" data-world="pasta" aria-label="Enter the pasta kitchen">
      <img src="./images/chooser-pasta.jpg" alt="Fresh egg tagliatelle and squid ink tagliolini nests" fetchpriority="high" />
      <span class="world-label"><strong>Pasta</strong><small>Fresh dough, sauce &amp; black gold</small></span>
    </button>`;
  document.body.appendChild(el);
  $$(".world-panel", el).forEach(btn => btn.addEventListener("click", () => {
    const world = btn.dataset.world;
    try { sessionStorage.setItem("mpc-world", world); } catch (_) { /* noop */ }
    el.classList.add("world-leave");
    location.hash = world === "pasta" ? "#pasta" : "#home";
    setTimeout(() => { el.remove(); if (typeof afterChoice === "function") afterChoice(world); }, 380);
  }));
}

// First render, wrapped in a visible error boundary so a failed boot never
// leaves a silent blank screen.
try {
  render();
  const startTour = () => {
    if (state.onboarded) return;
    // Resume mid-tour if the tab was closed part-way through onboarding.
    let resume = 1;
    try { resume = parseInt(sessionStorage.getItem("mpc-ob-screen"), 10) || 1; } catch (_) { /* noop */ }
    setTimeout(() => openOnboarding(Math.min(Math.max(resume, 1), 3)), 500);
  };
  if (worldChooserPending()) {
    setTimeout(() => openWorldChooser(() => startTour()), 250);
  } else {
    startTour();
  }
} catch (err) {
  console.error("Boot failed:", err);
  app.innerHTML = `
    <section class="section">
      <div class="card" style="padding:24px;text-align:center">
        <h2>Mamma mia, something broke.</h2>
        <p class="hint">The app hit an error while starting. Try refreshing — if it keeps happening, clear the site data and reload.</p>
        <button class="btn btn-primary" onclick="location.reload()">Reload</button>
      </div>
    </section>`;
  const splash = $("#splash");
  if (splash) splash.classList.add("gone");
}
