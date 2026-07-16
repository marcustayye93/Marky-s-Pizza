// Marco's Pizza Club — Pizza Builder data
// Flavour axes (0–10 raw contribution): bright (acid/freshness), rich (fat/salt),
// moisture (water risk), crunch (texture). Insights are Marco-voice strings.

export const SIZES = [
  {
    id: "personal",
    label: "Personal",
    sub: "20–25 cm · 170 g",
    doughG: 170,
    note: "One pizza, one person, zero regrets. Easier to stretch, launch and bake evenly."
  },
  {
    id: "sharing",
    label: "Sharing",
    sub: "28–32 cm · 280 g",
    doughG: 280,
    note: "Remember: double the diameter is 4× the area. Top with restraint or the centre goes soggy."
  }
];

export const DOUGHS = [
  {
    id: "neapolitan",
    label: "Neapolitan-ish",
    hydration: "68%",
    bright: 0, rich: 1, moisture: 3, crunch: 2,
    insight: "68% hydration, cold-fermented — airy, blistered, floppy-tipped. Needs a fully preheated steel and confident hands. The connoisseur's choice.",
    viz: { crust: "#D9A05B", spots: true }
  },
  {
    id: "ny",
    label: "New York",
    hydration: "62%",
    bright: 0, rich: 2, moisture: 1, crunch: 5,
    insight: "62% hydration with a little oil — crisp yet foldable, sturdy under heavier toppings. The most forgiving dough for beginners.",
    viz: { crust: "#C98F4A", spots: false }
  },
  {
    id: "balanced",
    label: "House 65%",
    hydration: "65%",
    bright: 0, rich: 1, moisture: 2, crunch: 3,
    insight: "The club house dough: 65% hydration, 48-hour cold ferment. Open crumb without the water-balloon handling. Marco's daily driver.",
    viz: { crust: "#D2984F", spots: true }
  }
];

export const SAUCES = [
  {
    id: "classic",
    label: "Crushed Tomato",
    bright: 6, rich: 0, moisture: 4, crunch: 0,
    insight: "Raw crushed tomatoes, salt, nothing else. Bright acidity that cuts through cheese — the reference point for all pizza.",
    viz: { color: "#C1442E" }
  },
  {
    id: "bianca",
    label: "Garlic Oil (Bianca)",
    bright: 1, rich: 3, moisture: 0, crunch: 0,
    insight: "No tomato: garlic-infused oil brushed to the rim. Zero water added, so your base bakes crisper — but you lose tomato's acid. Add brightness after the bake (rocket, lemon zest, hot honey).",
    viz: { color: "#E8C97A" }
  }
];

export const CHEESES = [
  {
    id: "lowmoisture",
    label: "Low-Moisture Mozz",
    bright: 0, rich: 5, moisture: 1, crunch: 1,
    insight: "The home-oven workhorse: stretchy, salty, browns beautifully, barely any water.",
    viz: { color: "#F2E3B8" }
  },
  {
    id: "fiordilatte",
    label: "Fresh Mozzarella",
    bright: 1, rich: 4, moisture: 5, crunch: 0,
    insight: "Creamy milky pools — but it's ~60% water. Drain slices on kitchen paper 30 minutes or budget for a softer centre.",
    viz: { color: "#FBF4E4" }
  },
  {
    id: "parmesan",
    label: "Parmesan Dusting",
    bright: 1, rich: 3, moisture: 0, crunch: 1,
    insight: "A fine grating stacks glutamates with the tomato — umami synergy at zero moisture cost. Seasoning, not blanket.",
    viz: { color: "#EAD9A0", fleck: true }
  }
];

export const TOPPINGS = [
  {
    id: "basil",
    label: "Fresh Basil",
    after: "half after bake",
    bright: 4, rich: 0, moisture: 0, crunch: 0,
    insight: "Half under the cheese before baking (mellow), half on after (perfume). Its volatile oils vanish above 60 °C.",
    viz: { color: "#4A7043", shape: "leaf" }
  },
  {
    id: "mushroom",
    label: "Mushrooms",
    after: "sauté first",
    bright: 1, rich: 2, moisture: 3, crunch: 1,
    insight: "Sauté first, always — they're 92% water. Browned in a pan they bring deep savoury notes instead of a soggy centre.",
    viz: { color: "#8A6A4C", shape: "slice" }
  },
  {
    id: "freshtomato",
    label: "Fresh Tomato",
    after: "salt & drain",
    bright: 5, rich: 0, moisture: 4, crunch: 0,
    insight: "Salt the slices and drain 20 minutes. Lovely brightness, serious water. Skip if you already chose fresh mozzarella — the moisture budget won't survive both.",
    viz: { color: "#D4593F", shape: "slice" }
  },
  {
    id: "pepperoni",
    label: "Pepperoni",
    after: "",
    bright: 0, rich: 5, moisture: 0, crunch: 2,
    insight: "Small natural-casing slices curl into crispy cups. Blot on paper first for maximum crisp, minimum grease slick.",
    viz: { color: "#B03A2E", shape: "dot" }
  },
  {
    id: "prosciutto",
    label: "Prosciutto",
    after: "after bake only",
    bright: 1, rich: 5, moisture: 0, crunch: 0,
    insight: "Drape it on AFTER the bake — oven heat turns silk into cardboard. The residual warmth releases its aroma perfectly.",
    viz: { color: "#C87D6E", shape: "ribbon" }
  },
  {
    id: "hothoney",
    label: "Hot Honey",
    after: "after bake only",
    bright: 4, rich: 1, moisture: 0, crunch: 0,
    insight: "Sweet-heat drizzled after the bake. Magic with pepperoni's salt and fat; sugar burns in the oven, so always finish, never bake.",
    viz: { color: "#DFA23A", shape: "drizzle" }
  },
  {
    id: "rocket",
    label: "Rocket",
    after: "after bake only",
    bright: 5, rich: 0, moisture: 1, crunch: 2,
    insight: "A peppery cool salad on a hot pizza — instant contrast. Toss with a drop of olive oil and pile on after the bake.",
    viz: { color: "#5B8250", shape: "leaf" }
  }
];

// Pairing bonuses: extra insight lines when combos are detected.
export const COMBOS = [
  { ids: ["pepperoni", "hothoney"], text: "Pepperoni + hot honey: salt-fat meets sweet-heat — the modern classic. Marco approves loudly." },
  { ids: ["prosciutto", "rocket"], text: "Prosciutto + rocket: salty-rich meets peppery-fresh. Both go on after the bake — a no-cook power couple." },
  { ids: ["mushroom", "basil"], text: "Earthy mushrooms + aromatic basil: quietly excellent. Consider the bianca base to let them lead." },
  { ids: ["freshtomato", "basil"], text: "Fresh tomato + basil: summer on a crust. Keep the rest minimal." }
];

export const SIZE_DEFAULT = "personal";
export const DOUGH_DEFAULT = "balanced";
export const SAUCE_DEFAULT = "classic";
