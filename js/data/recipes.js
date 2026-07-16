// Marco's Pizza Club — Cook-along recipes
// Step shape: { title, use?: [ingredient strings], actions: [numbered action strings], note?, minutes? }
// `use` lists exactly what goes in at this step, with quantities.
// `actions` are short, clear, do-one-thing instructions rendered as a numbered list.
// `minutes` triggers an in-step timer.

export const RECIPES = [
  {
    id: "personal-margherita",
    title: "Personal Margherita",
    tagline: "The one that teaches you everything",
    image: "./images/hero-margherita-sm.jpg",
    imageLg: "./images/hero-margherita.jpg",
    chips: ["22 cm", "Serves 1", "170 g dough", "Beginner friendly"],
    intro: "The margherita is the pizzaiolo's handshake — nowhere to hide, nothing to fix in post. Master this and every other pizza is a variation.",
    science: "Three ingredients only works because of umami synergy: tomato glutamates plus cheese glutamates taste far more savoury together than either alone. This recipe uses a 65% hydration cold-fermented dough for maximum flavour with manageable handling.",
    ingredients: [
      "1 dough ball, 170 g (65% hydration, cold-fermented 24–72 h)",
      "80 g canned whole peeled tomatoes",
      "1 good pinch fine sea salt",
      "70 g low-moisture mozzarella",
      "4–5 fresh basil leaves",
      "1 tsp extra-virgin olive oil",
      "2 tbsp semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough",
        use: ["1 dough ball, 170 g"],
        actions: [
          "Take the dough ball out of the fridge.",
          "Keep it covered in its container.",
          "Let it sit at room temperature for 90 minutes."
        ],
        note: "Cold dough is stiff dough — it fights your stretch and bakes up dense. Use this time to preheat.",
        minutes: 90
      },
      {
        title: "Preheat the steel",
        actions: [
          "Place the baking steel (or stone) on a rack in the upper third of the oven.",
          "Set the oven to its maximum temperature — usually 250–275 °C.",
          "Preheat for a full 45 minutes without opening the door."
        ],
        note: "The steel needs every minute to load up with heat.",
        minutes: 45,
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "Make the 60-second sauce",
        use: ["80 g canned whole peeled tomatoes", "1 good pinch fine sea salt"],
        actions: [
          "Tip the tomatoes into a bowl.",
          "Crush them by hand until saucy but still textured.",
          "Mix the salt in while stirring.",
          "Taste — it should taste like sunshine and salt."
        ],
        note: "No cooking, no garlic, no oregano — this is the pure, bright version.",
        learn: { pack: "sauce", lesson: "sauce-science", slide: 0, label: "Sauce: Don't Cook It — the 60-second sauce" }
      },
      {
        title: "Stretch the base",
        use: ["The rested dough ball", "A little flour for your hands"],
        actions: [
          "Flour your hands and the counter.",
          "Press the dough from the centre outward, leaving a 2 cm rim untouched.",
          "Lift the disc onto your knuckles and rotate, letting gravity stretch it.",
          "Stop at about 22 cm across.",
          "If it springs back, rest it 10 minutes and continue."
        ],
        note: "That untouched rim becomes your puffy crust.",
        learn: { pack: "dough", lesson: "troubleshooting", slide: 1, label: "Dough ER: snap-back & tearing" }
      },
      {
        title: "Top on the peel",
        use: ["2 tbsp semolina", "The sauce", "70 g mozzarella, torn", "2 basil leaves"],
        actions: [
          "Dust the peel with the semolina and lay the base on it.",
          "Give the peel a test shake — the base must slide freely.",
          "Spoon the sauce on in a thin spiral, dough still visible through it.",
          "Scatter the torn mozzarella with gaps between pieces.",
          "Tuck 2 basil leaves under the cheese so they don't burn."
        ],
        note: "Work fast: under 2 minutes on the peel or the dough starts sticking.",
        learn: { pack: "oven", lesson: "launch", slide: 1, label: "The shake test" }
      },
      {
        title: "Launch and bake",
        actions: [
          "Shake test one last time.",
          "Angle the peel to the far edge of the steel and slide the pizza off in one smooth pull.",
          "Bake 5–7 minutes until the rim is deep golden with leopard spots.",
          "If the top lags behind the base, switch to the grill for the final 90 seconds."
        ],
        note: "Pull when the cheese pools are bubbling with their first brown patches.",
        minutes: 7,
        learn: { pack: "oven", lesson: "launch", slide: 2, label: "The Launch: commit like a pizzaiolo" }
      },
      {
        title: "Finish and rest",
        use: ["2–3 remaining basil leaves", "1 tsp extra-virgin olive oil"],
        actions: [
          "Move the pizza onto a rack or board.",
          "Scatter the remaining basil leaves on top.",
          "Swirl the olive oil over in a thin thread.",
          "Wait 60 seconds before cutting so the crumb sets and the base stays crisp.",
          "Slice, fold, taste — then log it in your Journal."
        ],
        minutes: 1
      }
    ]
  },
  {
    id: "sharing-margherita",
    title: "Sharing Margherita",
    tagline: "The 30 cm centrepiece",
    image: "./images/recipe-sharing-margherita-sm.jpg",
    imageLg: "./images/recipe-sharing-margherita.jpg",
    chips: ["30 cm", "Serves 2–3", "280 g dough", "Intermediate"],
    intro: "Same soul as the personal margherita, bigger physics problem. A larger disc means more stretching skill, a longer bake, and a sauce-to-crust ratio that punishes over-topping.",
    science: "Doubling a pizza's diameter quadruples its area — but you should only roughly double the toppings. Topping density per square centimetre must go down as size goes up, or the centre never crisps. This is the mistake behind almost every soggy party pizza.",
    ingredients: [
      "1 dough ball, 280 g (65% hydration, cold-fermented 24–72 h)",
      "130 g canned whole peeled tomatoes",
      "1 good pinch fine sea salt",
      "110 g low-moisture mozzarella",
      "6–8 fresh basil leaves",
      "2 tsp extra-virgin olive oil",
      "2 tbsp semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough",
        use: ["1 dough ball, 280 g"],
        actions: [
          "Take the dough ball out of the fridge.",
          "Keep it covered.",
          "Let it stand at room temperature for 1.5–2 hours."
        ],
        note: "A 280 g ball takes the full 2 hours to lose its chill — plan around it, don't rush it.",
        minutes: 120
      },
      {
        title: "Preheat properly",
        actions: [
          "Steel or stone on a rack in the upper third of the oven.",
          "Oven to maximum temperature.",
          "Preheat 50 minutes, door closed."
        ],
        note: "A bigger pizza pulls more heat out of the steel at launch, so the full preheat matters even more.",
        minutes: 50,
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "Sauce and setup",
        use: ["130 g canned whole peeled tomatoes", "1 good pinch fine sea salt", "110 g mozzarella"],
        actions: [
          "Crush the tomatoes by hand in a bowl.",
          "Mix the salt in while stirring.",
          "Tear the mozzarella and let it sit on kitchen paper to shed surface moisture.",
          "Line up sauce, cheese, basil and peel within arm's reach."
        ],
        note: "Big pizzas punish slow assembly.",
        learn: { pack: "sauce", lesson: "cheese-melt", slide: 0, label: "Two mozzarellas, two missions" }
      },
      {
        title: "The big stretch",
        use: ["The rested dough ball", "A little flour for your hands"],
        actions: [
          "Press out the centre, keeping a 2.5 cm rim.",
          "Stretch on your knuckles, rotating often and letting gravity work.",
          "Hold the disc up to the light — an even glow means even thickness.",
          "If you see one bright thin spot, lay it down and coax dough from the rim inward.",
          "Stop at about 30 cm."
        ],
        learn: { pack: "dough", lesson: "troubleshooting", slide: 1, label: "Dough ER: snap-back & tearing" }
      },
      {
        title: "Top with discipline",
        use: ["2 tbsp semolina", "The sauce", "The torn mozzarella", "3–4 basil leaves"],
        actions: [
          "Dust the peel with semolina and lay the base on it.",
          "Spread a thin sauce spiral, leaving generous bare dough at the rim.",
          "Scatter the cheese with restraint — plenty of red should show between the white.",
          "Tuck half the basil under the cheese.",
          "Shake test: it slides or it doesn't launch."
        ],
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 1, label: "Manage the moisture budget" }
      },
      {
        title: "Bake and rotate",
        actions: [
          "Launch with one confident pull onto the steel.",
          "At the halfway mark (about 4–5 minutes), rotate the pizza 180° with tongs or a quick peel scoop.",
          "Pull when the rim is deeply golden and the centre cheese bubbles lazily."
        ],
        note: "Home ovens always have a hot side — rotating evens it out.",
        minutes: 9,
        learn: { pack: "oven", lesson: "doneness", slide: 0, label: "Ignore the clock, read the pizza" }
      },
      {
        title: "Rest, dress, serve",
        use: ["3–4 remaining basil leaves", "2 tsp extra-virgin olive oil"],
        actions: [
          "Rest the pizza 90 seconds on a rack — big pizzas hold more steam.",
          "Finish with the remaining basil and the olive oil.",
          "Cut into 6 wedges with decisive strokes.",
          "Serve immediately and accept the applause graciously."
        ],
        minutes: 2
      }
    ]
  },
  {
    id: "pepperoni-hot-honey",
    title: "Pepperoni & Hot Honey",
    tagline: "Salt, fat, sweet, heat — the full fireworks",
    image: "./images/recipe-pepperoni-honey-sm.jpg",
    imageLg: "./images/recipe-pepperoni-honey.jpg",
    chips: ["22 cm", "Serves 1", "170 g dough", "Crowd pleaser"],
    intro: "The modern classic. Cupped pepperoni crisps into little chalices of spiced oil, then a drizzle of chilli-infused honey sets the whole thing alight. Balance in every bite.",
    science: "Choose small-diameter, natural-casing pepperoni if you can find it: the casing shrinks faster than the meat in the oven, curling each slice into a cup that crisps at the rim and pools flavour in the middle. Flat wide pepperoni just goes greasy.",
    ingredients: [
      "1 dough ball, 170 g (65% hydration, cold-fermented)",
      "80 g canned whole peeled tomatoes",
      "1 good pinch fine sea salt",
      "70 g low-moisture mozzarella",
      "12–15 slices small pepperoni (natural casing if possible)",
      "1 tbsp honey",
      "1 pinch chilli flakes (or use ready-made hot honey)",
      "2 tbsp semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        use: ["1 dough ball, 170 g", "1 tbsp honey", "1 pinch chilli flakes"],
        actions: [
          "Take the dough out of the fridge, covered, 90 minutes before baking.",
          "Steel in the upper third; oven to maximum.",
          "Warm the honey gently in a small pan with the chilli flakes.",
          "Take it off the heat and let it infuse while everything else happens."
        ],
        minutes: 90
      },
      {
        title: "Prep the toppings",
        use: ["80 g canned whole peeled tomatoes", "1 good pinch fine sea salt", "70 g mozzarella", "12–15 pepperoni slices"],
        actions: [
          "Crush the tomatoes by hand in a bowl.",
          "Mix the salt in while stirring.",
          "Tear the cheese into rough chunks.",
          "Lay the pepperoni slices on kitchen paper to blot surface oil."
        ],
        note: "Blotting now means crispier cups later, not a greasy flood.",
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 1, label: "Manage the moisture budget" }
      },
      {
        title: "Stretch and top",
        use: ["2 tbsp semolina", "The sauce", "The torn mozzarella", "The pepperoni"],
        actions: [
          "Stretch the dough to 22 cm with a 2 cm rim.",
          "Lay it on the semolina-dusted peel and shake test.",
          "Spread a thin layer of sauce.",
          "Scatter the cheese.",
          "Space the pepperoni evenly — they shrink toward their centres, so slight overlap is fine.",
          "Do NOT add the honey yet."
        ],
        note: "Honey burns; patience wins.",
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 2, label: "Before the oven vs after" }
      },
      {
        title: "Bake to crispy cups",
        actions: [
          "Launch onto the steel in one smooth pull.",
          "Watch the pepperoni: the slices curl into cups with darkened, crisped edges.",
          "Pull when the rim is deep golden and the cups just start to char at their rims."
        ],
        minutes: 7,
        learn: { pack: "oven", lesson: "doneness", slide: 1, label: "Cheese tells the truth" }
      },
      {
        title: "The honey moment",
        use: ["The infused hot honey"],
        actions: [
          "Rest the pizza 60 seconds.",
          "Drizzle the hot honey in thin ribbons across the whole surface — crust rim included.",
          "Slice and serve while the hot-salty vs sweet-spicy contrast is at its peak."
        ],
        note: "Honey on the rim is not decoration, it's strategy.",
        minutes: 1
      }
    ]
  },
  {
    id: "mushroom-bianca",
    title: "Mushroom & Thyme Bianca",
    tagline: "No sauce. No problem.",
    image: "./images/recipe-mushroom-bianca-sm.jpg",
    imageLg: "./images/recipe-mushroom-bianca.jpg",
    chips: ["22 cm", "Serves 1", "170 g dough", "No tomato"],
    intro: "A white pizza is naked pizza-making: with no tomato to hide behind, the dough, cheese and toppings must each earn their place. Earthy sautéed mushrooms, garlic oil and thyme make this one sing.",
    science: "Mushrooms are ~92% water. Sautéing them first does two jobs: it evaporates the water that would otherwise swamp the crust, and it drives Maillard browning that creates deep savoury flavour a raw mushroom will never develop in 7 oven minutes.",
    ingredients: [
      "1 dough ball, 170 g (65% hydration, cold-fermented)",
      "150 g brown (chestnut) mushrooms, sliced 5 mm",
      "1 clove garlic",
      "1 tbsp olive oil (for the garlic oil) + a splash for the pan",
      "70 g low-moisture mozzarella",
      "30 g ricotta",
      "2 generous pinches fresh thyme leaves",
      "1 pinch flaky salt, to finish",
      "2 tbsp semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        use: ["1 dough ball, 170 g", "1 clove garlic", "1 tbsp olive oil"],
        actions: [
          "Dough out of the fridge, covered, 90 minutes before baking.",
          "Steel in the upper third; oven to maximum.",
          "Finely grate the garlic into the olive oil and set aside to infuse."
        ],
        note: "The bianca relies on fierce base heat even more than red pizzas — there's no wet sauce layer to buffer it.",
        minutes: 90,
        learn: { pack: "oven", lesson: "heat-transfer", slide: 2, label: "Position is everything" }
      },
      {
        title: "Sauté the mushrooms",
        use: ["150 g sliced mushrooms", "A splash of olive oil", "1 pinch salt (added at the end)"],
        actions: [
          "Heat a pan until properly hot, then add the oil.",
          "Add the mushrooms in a single layer.",
          "Don't stir for the first 2 minutes — contact makes browning.",
          "Cook until shrunk by half with golden edges.",
          "Season with the salt only at the end."
        ],
        note: "Salting early draws water out and blocks browning.",
        minutes: 6,
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 1, label: "Manage the moisture budget" }
      },
      {
        title: "Stretch and layer",
        use: ["2 tbsp semolina", "The garlic oil", "70 g mozzarella, torn", "The sautéed mushrooms", "30 g ricotta", "1 pinch thyme leaves"],
        actions: [
          "Stretch the dough to 22 cm and lay it on the semolina-dusted peel.",
          "Brush the garlic oil across the base, right to the rim's edge.",
          "Scatter the mozzarella first.",
          "Spread the sautéed mushrooms over the cheese.",
          "Dot the ricotta in small dollops, spaced like little islands.",
          "Scatter half the thyme on top; save the rest for the finish."
        ]
      },
      {
        title: "Bake until golden",
        actions: [
          "Launch onto the steel.",
          "Start checking at the 5-minute mark — without tomato's moisture it bakes faster than a margherita.",
          "Pull when the crust is deeply golden and the mozzarella shows brown-spotted patches."
        ],
        minutes: 6,
        learn: { pack: "oven", lesson: "doneness", slide: 2, label: "The lift test" }
      },
      {
        title: "Finish bright",
        use: ["1 pinch remaining thyme leaves", "1 pinch flaky salt", "A final thread of olive oil"],
        actions: [
          "Rest the pizza 60 seconds.",
          "Scatter the remaining thyme and the flaky salt over the top.",
          "Add a final thin thread of olive oil.",
          "Slice and enjoy the quiet sophistication."
        ],
        note: "The residual heat blooms the thyme's aroma without cooking away its freshness.",
        minutes: 1
      }
    ]
  }
];

export function findRecipe(id) {
  return RECIPES.find(r => r.id === id) || null;
}
