// Marco's Dough Lab — five doughs, five personalities.
// All gram amounts target 2 x 280 g dough balls (except the pan pizza, which fills one 23x33 cm tray).

export const DOUGHS = [
  {
    id: 'newpolitan',
    name: 'The Newpolitan Tribute',
    badge: 'Casa Vostra inspired',
    tagline: 'Crispy on top, sweet and cloud-fluffy in the middle',
    level: 'Advanced',
    hydration: 72,
    time: '36–48 h',
    yieldText: '2 balls · 280 g · 28 cm pizzas',
    image: './images/doughlab/doughlab-newpolitan.jpg',
    meters: { crisp: 5, fluff: 5, chew: 3, flavour: 5 },
    story: 'This is Marco\u2019s home-oven tribute to the \u201cNewpolitan\u00ae\u201d style served at Casa Vostra in Singapore \u2014 Chef Antonio Miscellaneo\u2019s contemporary evolution of Neapolitan pizza (we\u2019re fans, not affiliates!). Their crust is fermented for 36 hours and baked at 450\u00b0C for a base that\u2019s crispy, airy and scioglievole \u2014 melt-in-your-mouth. We can\u2019t hit 450\u00b0C at home, but with a biga preferment, 72% hydration, a two-day cold ferment and a sneaky grill trick, we get shockingly close: shattering-crisp top, and a middle that\u2019s sweet, doughy and fluffy all at once.',
    ingredients: [
      {
        section: 'Night 1 — the biga',
        items: [
          { name: 'Strong 00 or bread flour (12.5–13.5% protein)', amount: '165 g', pct: '50% of total flour' },
          { name: 'Cold water', amount: '74 g', pct: '45% of biga flour' },
          { name: 'Instant yeast', amount: '0.5 g', pct: '0.3%' }
        ]
      },
      {
        section: 'Day 2 — the final dough',
        items: [
          { name: 'All of the biga', amount: '~240 g', pct: '—' },
          { name: 'Same flour', amount: '165 g', pct: '50% of total flour' },
          { name: 'Ice-cold water, added gradually', amount: '164 g', pct: 'to 72% total' },
          { name: 'Fine sea salt', amount: '9 g', pct: '2.7%' },
          { name: 'Honey', amount: '5 g', pct: '1.5%' },
          { name: 'Diastatic malt (optional but magic)', amount: '2 g', pct: '0.6%' }
        ]
      }
    ],
    timeline: [
      { when: 'Night 1 · 22:00', what: 'Mix the biga — shaggy and dry-looking is correct. 1 h at room temp, then fridge.' },
      { when: 'Day 2 · 18:00', what: 'Tear biga into bits, knead final dough. Bulk 1 h at room temp, then back to the fridge.' },
      { when: 'Day 3 · 14:00', what: 'Divide and ball while cold. Final proof 3–4 h at room temp, covered.' },
      { when: 'Day 3 · 17:00', what: 'Preheat steel on the TOP shelf at max for 60 min. Grill on for the last 3 min.' },
      { when: 'Day 3 · 18:00', what: 'Stretch, top light, launch. 5–7 min under the grill. Tribute complete.' }
    ],
    steps: [
      'Night 1: stir the yeast into the cold water, pour over the flour and mix with fingertips until every bit of flour is damp but the mass is still shaggy and lumpy. Do NOT knead — a biga should look like a mistake. Loosely covered: 1 h on the counter, then 18–24 h in the fridge.',
      'Day 2: tear the cold biga into walnut-sized pieces in a bowl. Dissolve the honey in a third of the ice water and add it with the malt. Squeeze and mix until the biga breaks down into a rough paste.',
      'Knead in the remaining water a splash at a time — only add more once the last splash disappears. 72% feels alarming and sticky around the halfway mark; keep going. Slap-and-fold on the counter for 8–10 min until glossy.',
      'Add the salt with the final splash of water and knead 2 more min until the dough passes the windowpane test — stretch a piece thin enough to read a comic through.',
      'Bulk ferment 1 h at room temp, then cover and refrigerate 18–24 h.',
      'Ball the dough cold (far easier to handle): divide into 2 × 280 g, pull each into a tight ball with a taut skin. Proof in covered, lightly oiled containers 3–4 h at room temp until puffy and roughly doubled.',
      'One hour before baking: baking steel or stone on the TOP shelf, oven at absolute max (250–290°C). Three minutes before launching, switch to the grill/broiler.',
      'Stretch from the centre outwards, pushing gas into the rim — never touch the outer 3 cm. Top lightly (this crust is the star). Launch onto the screaming-hot steel and bake 5–7 min under the grill until the rim is puffed, leopard-spotted and crisp.'
    ],
    science: 'Three things make this crust taste sweet without tasting sugary. First, the biga: 24 hours of slow fermentation lets amylase enzymes snip starch into maltose faster than the lazy yeast can eat it, so sugars accumulate in the dough. Second, honey and malt top up those sugars and turbo-charge browning, compensating for a home oven running 180°C cooler than Casa Vostra\u2019s. Third, 72% hydration turns to steam in the oven and inflates the crumb into big glossy pockets — that\u2019s the fluff. The top-shelf steel plus grill recreates a wood oven\u2019s double attack: fierce conducted heat below, radiant fire above.',
    tips: [
      'The honey is training wheels for home ovens — at 450\u00b0C Chef Antonio needs none, at 275\u00b0C you\u2019ll thank me.',
      'Add the water gradually or the dough will slosh instead of stretch. Patience, amico.',
      'Cold dough balls like a dream. Warm dough balls like glue.',
      'No steel? A heavy upside-down cast-iron pan works. No grill? Bake 2 min longer and accept slightly gentler leopard spots.'
    ]
  },
  {
    id: 'everyday65',
    name: "Marco's Everyday 65%",
    badge: 'Start here',
    tagline: 'The reliable classic that teaches your hands what dough should feel like',
    level: 'Beginner',
    hydration: 65,
    time: '4 h (or overnight)',
    yieldText: '2 balls · 280 g · 26 cm pizzas',
    image: './images/doughlab/doughlab-everyday.jpg',
    meters: { crisp: 3, fluff: 3, chew: 3, flavour: 2 },
    story: 'Every pizzaiolo\u2019s first love. 65% hydration is the sweet spot Chef Antonio himself recommends to beginners \u2014 wet enough for a decent puff, dry enough that it won\u2019t glue itself to your fingers and your dignity. Master this before you visit the wilder doughs in the lab.',
    ingredients: [
      {
        section: 'The dough',
        items: [
          { name: 'Bread or 00 flour (12–13% protein)', amount: '340 g', pct: '100%' },
          { name: 'Lukewarm water', amount: '221 g', pct: '65%' },
          { name: 'Fine sea salt', amount: '8.5 g', pct: '2.5%' },
          { name: 'Instant yeast (same-day)', amount: '1.4 g', pct: '0.4%' },
          { name: '…or instant yeast (overnight fridge)', amount: '0.7 g', pct: '0.2%' }
        ]
      }
    ],
    timeline: [
      { when: 'H 0:00', what: 'Mix and knead 10 min until smooth.' },
      { when: 'H 0:10', what: 'Bulk ferment 1 h at room temp, covered.' },
      { when: 'H 1:10', what: 'Divide, ball, proof 2–3 h until doubled.' },
      { when: 'H 3:30', what: 'Preheat steel at max for 45–60 min.' },
      { when: 'H 4:00', what: 'Stretch, top, bake 6–8 min. Dinner.' }
    ],
    steps: [
      'Dissolve the yeast in the water. Add two-thirds of the flour and stir to a thick batter, then add the rest with the salt.',
      'Knead 8–10 min on the counter until smooth and slightly tacky — it should spring back slowly when poked.',
      'Bulk ferment 1 h at room temperature until roughly 1.5× the size.',
      'Divide into 2 × 280 g, ball tightly, and proof covered for 2–3 h (or overnight in the fridge with the smaller yeast dose — better flavour, same effort).',
      'Preheat your steel or stone near the top of the oven at max temperature for at least 45 min.',
      'Stretch to 26 cm, top, and bake 6–8 min until golden with brown spots.'
    ],
    science: 'Hydration is the master variable of dough. At 65%, gluten strands align easily during kneading, which is why this dough feels cooperative. Less water = denser, crunchier crust; more water = airier but stickier. Learn how 65% feels — every other dough in the lab is a deliberate deviation from this baseline.',
    tips: [
      'Poke test: if the dent springs back slowly, it\u2019s proofed. Fast = underproofed, never = overproofed.',
      'The overnight-fridge option is the single cheapest flavour upgrade in pizza.',
      'Salt slows yeast — mix it in with the last of the flour, not directly onto the yeast.'
    ]
  },
  {
    id: 'coldferment48',
    name: 'Slow & Soulful 48h',
    badge: 'Flavour bomb',
    tagline: 'Two days in the fridge, sourdough-deep flavour, zero sourdough drama',
    level: 'Intermediate',
    hydration: 68,
    time: '48–52 h',
    yieldText: '2 balls · 280 g · 27 cm pizzas',
    image: './images/doughlab/doughlab-coldferment.jpg',
    meters: { crisp: 4, fluff: 4, chew: 4, flavour: 4 },
    story: 'Reviewers of Casa Vostra rave about a \u201crich sourdough-like flavour\u201d \u2014 and here\u2019s the secret: you don\u2019t need a sourdough starter to get it. You need time and a cold fridge. This dough takes five minutes of work per day and repays you with a crust you\u2019ll happily eat plain.',
    ingredients: [
      {
        section: 'The dough',
        items: [
          { name: 'Bread or 00 flour (12–13% protein)', amount: '335 g', pct: '100%' },
          { name: 'Cool water', amount: '228 g', pct: '68%' },
          { name: 'Fine sea salt', amount: '8.7 g', pct: '2.6%' },
          { name: 'Instant yeast', amount: '0.5 g', pct: '0.15%' }
        ]
      }
    ],
    timeline: [
      { when: 'Day 1 · evening', what: 'Mix, knead 8 min, bulk 2 h at room temp.' },
      { when: 'Day 1 · night', what: 'Into the fridge. Walk away. Live your life.' },
      { when: 'Day 3 · afternoon', what: 'Ball the cold dough, proof 3 h at room temp.' },
      { when: 'Day 3 · evening', what: 'Max preheat, stretch, bake 6–8 min.' }
    ],
    steps: [
      'Mix all ingredients and knead 8 min until smooth. The tiny yeast amount is intentional — the fridge is doing the heavy lifting.',
      'Bulk ferment 2 h at room temperature to wake the yeast up.',
      'Cover tightly and refrigerate 48 h. Bubbles will slowly build — that\u2019s flavour compounding like interest.',
      'Ball the cold dough into 2 × 280 g, then proof covered at room temp for about 3 h until puffy.',
      'Preheat steel at max on a high shelf for 45–60 min. Stretch, top, bake 6–8 min.'
    ],
    science: 'Cold doesn\u2019t stop fermentation — it rearranges it. At 4°C yeast activity drops ~90%, but the enzymes (proteases and amylases) keep working, breaking proteins into savoury amino acids and starch into sugars. Meanwhile bacteria produce gentle lactic and acetic acids. After 48 hours you have a dough loaded with flavour precursors that caramelise into a deeply bronzed, complex crust — the same chemistry behind that \u201csourdough-like\u201d note in a 36-hour Newpolitan ferment.',
    tips: [
      'Use a transparent container and mark the dough level with tape — you\u2019ll see exactly how alive it is.',
      'It can stretch to 72 h in the fridge. Past that, the proteases win and the dough gets slack and tears.',
      'Cold dough straight to balling — don\u2019t let it warm up first or it turns sticky.'
    ]
  },
  {
    id: 'newyork',
    name: 'New York Slice',
    badge: 'Foldable',
    tagline: 'Bronzed, chewy, and built to be folded in half on a busy sidewalk',
    level: 'Intermediate',
    hydration: 63,
    time: '24–72 h',
    yieldText: '2 balls · 300 g · 30 cm pizzas',
    image: './images/doughlab/doughlab-newyork.jpg',
    meters: { crisp: 4, fluff: 2, chew: 5, flavour: 3 },
    story: 'The pizza that conquered a city that\u2019s always in a hurry. Oil and a little sugar separate this dough from its Italian cousins \u2014 and they\u2019re both engineering choices, not decoration. This is the dough for when you want big foldable slices with a chew you can hear.',
    ingredients: [
      {
        section: 'The dough',
        items: [
          { name: 'Bread flour (12.5–13.5% protein)', amount: '345 g', pct: '100%' },
          { name: 'Cool water', amount: '217 g', pct: '63%' },
          { name: 'Olive oil', amount: '10 g', pct: '3%' },
          { name: 'Sugar', amount: '7 g', pct: '2%' },
          { name: 'Fine sea salt', amount: '8.6 g', pct: '2.5%' },
          { name: 'Instant yeast', amount: '1 g', pct: '0.3%' }
        ]
      }
    ],
    timeline: [
      { when: 'Day 1', what: 'Mix, knead 10 min, straight into the fridge in balls.' },
      { when: 'Day 2 (or 3)', what: 'Out of the fridge 2 h before baking.' },
      { when: 'Bake day', what: 'Steel on middle-high shelf, max heat, 7–9 min bake.' }
    ],
    steps: [
      'Dissolve sugar and yeast in the water, add flour, salt and oil, and knead 10 min to a smooth, supple dough — noticeably firmer than the Italian doughs in this lab.',
      'Divide into 2 × 300 g, ball, and refrigerate in covered containers for 24–72 h. 48 h is the classic slice-shop sweet spot.',
      'Take the balls out 2 h before baking to lose the chill.',
      'Preheat steel at max, one notch below the top shelf, 45–60 min. Stretch thin to 30 cm, keeping only a slim rim.',
      'Top with a swirl of cooked-style tomato sauce and low-moisture mozzarella. Bake 7–9 min until the underside is evenly bronzed.',
      'Cut into big quarters. Fold. Eat while walking around your kitchen aggressively.'
    ],
    science: 'Oil coats gluten strands and shortens them slightly, converting Neapolitan crackle into New York chew and helping the crust stay tender as it cools. Sugar isn\u2019t there for sweetness — at home-oven slice temperatures (bakes are longer and cooler than Naples), it drives Maillard browning so the base bronzes evenly instead of blistering. That\u2019s why a NY slice is uniformly golden, not leopard-spotted.',
    tips: [
      'Low-moisture mozzarella, not fresh — NY pizza should never be watery.',
      'Stretch thinner than feels right; the middle should almost read a newspaper.',
      'Reheat leftover slices in a dry frying pan, lid on for the last minute. Better than day one.'
    ]
  },
  {
    id: 'romanpan',
    name: 'Cloud Nine Pan Pizza',
    badge: 'No-knead',
    tagline: '80% hydration, zero kneading, focaccia-fluffy with a fried-crisp bottom',
    level: 'Beginner-friendly',
    hydration: 80,
    time: '26–50 h',
    yieldText: 'One 23×33 cm tray · 8 squares',
    image: './images/doughlab/doughlab-romanpan.jpg',
    meters: { crisp: 4, fluff: 5, chew: 2, flavour: 4 },
    story: 'Rome\u2019s al taglio bakeries sell pizza by the scissor-cut square, and their secret is scandalous amounts of water. At 80% hydration this dough is unkneadable \u2014 which is wonderful news, because you don\u2019t knead it. Folds and patience build the gluten while you watch TV. The pan does the rest. This is the fluffiest thing in the lab and the hardest to mess up.',
    ingredients: [
      {
        section: 'The dough',
        items: [
          { name: 'Bread flour (12.5%+ protein)', amount: '400 g', pct: '100%' },
          { name: 'Cool water', amount: '320 g', pct: '80%' },
          { name: 'Fine sea salt', amount: '10 g', pct: '2.5%' },
          { name: 'Instant yeast', amount: '2 g', pct: '0.5%' },
          { name: 'Olive oil for the tray', amount: '30 g', pct: '—' }
        ]
      }
    ],
    timeline: [
      { when: 'Day 1 · evening', what: 'Stir together. 4 sets of folds, 30 min apart.' },
      { when: 'Day 1 · night', what: 'Fridge, 24–48 h.' },
      { when: 'Bake day · afternoon', what: 'Into the oiled tray, dimple, proof 2 h.' },
      { when: 'Bake day · evening', what: '250°C, bottom shelf, 15–18 min.' }
    ],
    steps: [
      'Stir everything (except the tray oil) with a spoon until no dry flour remains. It will look like thick sludge. Correct.',
      'Every 30 minutes for 2 hours: wet your hand, grab one edge, stretch it up and fold it over the middle. Quarter-turn the bowl, repeat 4 times. That\u2019s one set — do 4 sets. Watch it transform from sludge to satin.',
      'Cover and refrigerate 24–48 h.',
      'Pour the oil into a 23×33 cm metal tray. Tip the dough in, flip it once to coat, and gently stretch towards the corners — it won\u2019t reach. Wait 20 min and push again. Dimple all over with your fingertips like you\u2019re playing a tiny piano.',
      'Proof uncovered for 2 h until jiggly and bubbly.',
      'Top with crushed tomatoes and a drizzle of olive oil (add mozzarella only for the last 8 min to keep it milky). Bake at 250°C on the bottom shelf for 15–18 min until the top blisters and the bottom is golden-fried.',
      'Lift an edge with a spatula to check the base — it should be crisp enough to knock on. Cut into squares with scissors, like a true Roman.'
    ],
    science: 'You can\u2019t knead a dough this wet — mechanical kneading needs friction that 80% hydration destroys. Instead, folds align gluten sheets and the long rest lets glutenin bond on its own (autolysis never sleeps). All that water becomes steam in the oven and blows the crumb open into a fluffy, glossy honeycomb. Meanwhile the oiled tray effectively shallow-fries the base, delivering pizza-oven crunch at a mere 250°C. Bottom shelf = maximum heat under the tray, where you need it.',
    tips: [
      'Wet hands beat floured hands with sticky dough, every single time.',
      'The dough should fill about a third of your container before the fridge — it will double.',
      'Black or dark trays brown noticeably better than shiny aluminium.',
      'Day 2 vs day 1 in the fridge is a real, tasteable difference. Wait if you can.'
    ]
  }
];
