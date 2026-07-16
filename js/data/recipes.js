// Marco's Pizza Club — Cook-along recipes
// Step shape: { title, use?: [ingredient strings], actions: [...], note?, minutes?, video?, learn? }
// `use` lists exactly what goes in at this step, with quantities.
// `actions` are short, clear, do-one-thing instructions rendered as a numbered list.
// `minutes` triggers an in-step timer.
// `video` shows a short looping clip above the step content.
// Oven modes: each recipe is cooked in one of two modes chosen at the start:
//   "oven"  — full-size conventional/fan oven with a baking steel or stone
//   "combi" — convection microwave (e.g. Panasonic NN-CS89LB: 230 °C max, 31 L, enamel shelf, no steel)
// A step may carry a `combi: { use?, actions?, note?, minutes? }` override; when the
// combi mode is active those fields replace the base ones. Steps without `combi` are shared.

export const OVEN_MODES = [
  {
    id: "oven",
    icon: "🔥",
    title: "Full-size oven",
    desc: "Conventional or fan oven with a baking steel or stone. Maximum heat, classic method."
  },
  {
    id: "combi",
    icon: "📦",
    title: "Combi microwave",
    desc: "A convection microwave like the Panasonic CS89. Small chamber, 230 °C max, no steel — adjusted steps."
  }
];

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
      "2 tbsp semolina, for the peel",
      "A little flour, for your hands"
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
        title: "Preheat",
        actions: [
          "Place the baking steel (or stone) on a rack in the upper third of the oven.",
          "Set the oven to its maximum temperature — usually 250–275 °C.",
          "Preheat for a full 45 minutes without opening the door."
        ],
        note: "The steel needs every minute to load up with heat.",
        minutes: 45,
        combi: {
          actions: [
            "Put the enamel shelf on the upper shelf position — it will act as your baking surface (no steel needed).",
            "Select Convection mode and set 230 °C — the CS89's maximum.",
            "Preheat for 15 minutes. The small 31 L chamber heats fast, but the enamel shelf needs the extra time to soak up heat.",
            "Meanwhile, cut a sheet of baking paper slightly larger than your pizza — you'll build on it and slide it onto the hot shelf."
          ],
          note: "No steel in a combi — the preheated enamel shelf plus baking paper is the CS89 method. Never put the steel inside.",
          minutes: 15
        },
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "Make the 60-second sauce",
        use: ["80 g canned whole peeled tomatoes", "1 good pinch fine sea salt"],
        video: "./images/videos/crush-tomatoes.mp4",
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
        video: "./images/videos/stretch-dough.mp4",
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
        video: "./images/videos/shake-test.mp4",
        actions: [
          "Dust the peel with the semolina and lay the base on it.",
          "Give the peel a test shake — the base must slide freely.",
          "Spoon the sauce on in a thin spiral, dough still visible through it.",
          "Scatter the torn mozzarella with gaps between pieces.",
          "Tuck 2 basil leaves under the cheese so they don't burn."
        ],
        note: "Work fast: under 2 minutes on the peel or the dough starts sticking.",
        combi: {
          use: ["The baking paper sheet", "The sauce", "70 g mozzarella, torn", "2 basil leaves"],
          actions: [
            "Lay the stretched base on the sheet of baking paper — no peel or semolina needed.",
            "Spoon the sauce on in a thin spiral, dough still visible through it.",
            "Scatter the torn mozzarella with gaps between pieces.",
            "Tuck 2 basil leaves under the cheese so they don't burn."
          ],
          note: "The paper is your peel: you'll lift it straight onto the hot enamel shelf."
        },
        learn: { pack: "oven", lesson: "launch", slide: 1, label: "The shake test" }
      },
      {
        title: "Launch and bake",
        video: "./images/videos/launch.mp4",
        actions: [
          "Shake test one last time.",
          "Angle the peel to the far edge of the steel and slide the pizza off in one smooth pull.",
          "Bake 5–7 minutes until the rim is deep golden with leopard spots.",
          "If the top lags behind the base, switch to the grill for the final 90 seconds."
        ],
        note: "Pull when the cheese pools are bubbling with their first brown patches.",
        minutes: 7,
        combi: {
          actions: [
            "Open the door and quickly lift the pizza — paper and all — onto the hot enamel shelf.",
            "Bake at 230 °C Convection for 9–12 minutes. The lower max temperature means a longer bake than a steel oven — watch the cheese, not the clock.",
            "After 5 minutes, slide the baking paper out from under the pizza so the base crisps directly on the shelf.",
            "For the final 1–2 minutes, switch to Grill to colour the top — the CS89 grill is gentle, so give it the full 2 minutes if needed."
          ],
          note: "230 °C is the ceiling, so time does the work heat can't. Pull when the rim is deep golden and the cheese bubbles with brown patches.",
          minutes: 12
        },
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
      "2 tbsp semolina, for the peel",
      "A little flour, for your hands"
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
        minutes: 120,
        combi: {
          use: ["1 dough ball, 280 g"],
          actions: [
            "Take the dough ball out of the fridge.",
            "A 30 cm pizza will not fit in the CS89's 31 L chamber — divide the ball into two 140 g pieces and round each into a small ball.",
            "Cover both and let them stand at room temperature for 90 minutes.",
            "You'll bake two 22 cm pizzas back to back instead of one big one."
          ],
          note: "Two smaller pizzas beat one squashed one. The second bakes even better — the shelf is fully saturated with heat by then.",
          minutes: 90
        }
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
        combi: {
          actions: [
            "Enamel shelf on the upper shelf position.",
            "Convection mode, 230 °C — the maximum.",
            "Preheat 15 minutes, door closed.",
            "Cut two sheets of baking paper, one per pizza."
          ],
          note: "The small chamber recovers heat quickly between the two bakes — no need to re-preheat before pizza two.",
          minutes: 15
        },
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "Sauce and setup",
        use: ["130 g canned whole peeled tomatoes", "1 good pinch fine sea salt", "110 g mozzarella"],
        video: "./images/videos/crush-tomatoes.mp4",
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
        video: "./images/videos/stretch-dough.mp4",
        actions: [
          "Press out the centre, keeping a 2.5 cm rim.",
          "Stretch on your knuckles, rotating often and letting gravity work.",
          "Hold the disc up to the light — an even glow means even thickness.",
          "If you see one bright thin spot, lay it down and coax dough from the rim inward.",
          "Stop at about 30 cm."
        ],
        combi: {
          use: ["The two rested dough balls", "A little flour for your hands"],
          actions: [
            "Work one ball at a time; keep the other covered.",
            "Press out the centre, keeping a 2 cm rim.",
            "Stretch on your knuckles to about 22 cm.",
            "Lay it on its sheet of baking paper, then stretch the second ball the same way."
          ]
        },
        learn: { pack: "dough", lesson: "troubleshooting", slide: 1, label: "Dough ER: snap-back & tearing" }
      },
      {
        title: "Top with discipline",
        use: ["2 tbsp semolina", "The sauce", "The torn mozzarella", "3–4 basil leaves"],
        video: "./images/videos/shake-test.mp4",
        actions: [
          "Dust the peel with semolina and lay the base on it.",
          "Spread a thin sauce spiral, leaving generous bare dough at the rim.",
          "Scatter the cheese with restraint — plenty of red should show between the white.",
          "Tuck half the basil under the cheese.",
          "Shake test: it slides or it doesn't launch."
        ],
        combi: {
          use: ["The sauce", "The torn mozzarella", "3–4 basil leaves"],
          actions: [
            "Top both bases on their baking paper sheets, splitting sauce and cheese evenly.",
            "Spread a thin sauce spiral on each, leaving bare dough at the rim.",
            "Scatter the cheese with restraint — plenty of red between the white.",
            "Tuck half the basil under the cheese."
          ]
        },
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 1, label: "Manage the moisture budget" }
      },
      {
        title: "Bake and rotate",
        video: "./images/videos/cheese-bubbling.mp4",
        actions: [
          "Launch with one confident pull onto the steel.",
          "At the halfway mark (about 4–5 minutes), rotate the pizza 180° with tongs or a quick peel scoop.",
          "Pull when the rim is deeply golden and the centre cheese bubbles lazily."
        ],
        note: "Home ovens always have a hot side — rotating evens it out.",
        minutes: 9,
        combi: {
          actions: [
            "Lift pizza one — paper and all — onto the hot enamel shelf.",
            "Bake at 230 °C Convection for 9–12 minutes; slide the paper out after 5 minutes.",
            "Finish with 1–2 minutes of Grill for top colour, then remove.",
            "Repeat immediately with pizza two — the chamber is already saturated, so it may run a minute faster."
          ],
          note: "The CS89's fan bakes evenly, so no rotation needed — one less thing to juggle.",
          minutes: 12
        },
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
        combi: {
          use: ["3–4 remaining basil leaves", "2 tsp extra-virgin olive oil"],
          actions: [
            "Rest each pizza 60 seconds on a rack.",
            "Finish both with the remaining basil and the olive oil.",
            "Cut each into 4 wedges.",
            "Serve as a pair — twice the crust, twice the applause."
          ]
        },
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
      "2 tbsp semolina, for the peel",
      "A little flour, for your hands"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        use: ["1 dough ball, 170 g", "1 tbsp honey", "1 pinch chilli flakes"],
        actions: [
          "Take the dough out of the fridge, covered, 90 minutes before baking.",
          "Steel in the upper third of the oven; oven to maximum (250–275 °C); preheat the final 45 minutes.",
          "Warm the honey gently in a small pan with the chilli flakes.",
          "Take it off the heat and let it infuse while everything else happens."
        ],
        minutes: 90,
        combi: {
          use: ["1 dough ball, 170 g", "1 tbsp honey", "1 pinch chilli flakes"],
          actions: [
            "Take the dough out of the fridge, covered, 90 minutes before baking.",
            "For the final 15 minutes: enamel shelf on the upper position, Convection mode, 230 °C.",
            "Warm the honey gently in a small pan with the chilli flakes.",
            "Take it off the heat and let it infuse. Cut a sheet of baking paper for the build."
          ],
          minutes: 90
        }
      },
      {
        title: "Prep the toppings",
        use: ["80 g canned whole peeled tomatoes", "1 good pinch fine sea salt", "70 g mozzarella", "12–15 pepperoni slices"],
        video: "./images/videos/crush-tomatoes.mp4",
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
        video: "./images/videos/stretch-dough.mp4",
        actions: [
          "Stretch the dough to 22 cm with a 2 cm rim.",
          "Lay it on the semolina-dusted peel and shake test.",
          "Spread a thin layer of sauce.",
          "Scatter the cheese.",
          "Space the pepperoni evenly — they shrink toward their centres, so slight overlap is fine.",
          "Do NOT add the honey yet."
        ],
        note: "Honey burns; patience wins.",
        combi: {
          use: ["The baking paper sheet", "The sauce", "The torn mozzarella", "The pepperoni"],
          actions: [
            "Stretch the dough to 22 cm with a 2 cm rim.",
            "Lay it on the baking paper.",
            "Spread a thin layer of sauce, then scatter the cheese.",
            "Space the pepperoni evenly — slight overlap is fine.",
            "Do NOT add the honey yet."
          ],
          note: "Honey burns; patience wins."
        },
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 2, label: "Before the oven vs after" }
      },
      {
        title: "Bake to crispy cups",
        video: "./images/videos/cheese-bubbling.mp4",
        actions: [
          "Launch onto the steel in one smooth pull.",
          "Watch the pepperoni: the slices curl into cups with darkened, crisped edges.",
          "Pull when the rim is deep golden and the cups just start to char at their rims."
        ],
        minutes: 7,
        combi: {
          actions: [
            "Lift the pizza — paper and all — onto the hot enamel shelf.",
            "Bake at 230 °C Convection for 9–12 minutes; slide the paper out after 5 minutes.",
            "Switch to Grill for the final 2 minutes — this is what curls and crisps the pepperoni cups at 230 °C.",
            "Pull when the cups have darkened rims and the crust is deep golden."
          ],
          note: "The grill finish stands in for the top heat a steel oven gives naturally.",
          minutes: 12
        },
        learn: { pack: "oven", lesson: "doneness", slide: 1, label: "Cheese tells the truth" }
      },
      {
        title: "The honey moment",
        use: ["The infused hot honey"],
        video: "./images/videos/honey-drizzle.mp4",
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
      "2 tbsp semolina, for the peel",
      "A little flour, for your hands"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        use: ["1 dough ball, 170 g", "1 clove garlic", "1 tbsp olive oil"],
        actions: [
          "Dough out of the fridge, covered, 90 minutes before baking.",
          "Steel in the upper third; oven to maximum (250–275 °C); preheat the final 45 minutes.",
          "Finely grate the garlic into the olive oil and set aside to infuse."
        ],
        note: "The bianca relies on fierce base heat even more than red pizzas — there's no wet sauce layer to buffer it.",
        minutes: 90,
        combi: {
          use: ["1 dough ball, 170 g", "1 clove garlic", "1 tbsp olive oil"],
          actions: [
            "Dough out of the fridge, covered, 90 minutes before baking.",
            "For the final 15 minutes: enamel shelf on the upper position, Convection mode, 230 °C.",
            "Finely grate the garlic into the olive oil and set aside to infuse.",
            "Cut a sheet of baking paper for the build."
          ],
          note: "With no wet sauce layer, the bianca actually forgives the combi's lower heat better than red pizzas do.",
          minutes: 90
        },
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
        video: "./images/videos/stretch-dough.mp4",
        actions: [
          "Stretch the dough to 22 cm and lay it on the semolina-dusted peel.",
          "Brush the garlic oil across the base, right to the rim's edge.",
          "Scatter the mozzarella first.",
          "Spread the sautéed mushrooms over the cheese.",
          "Dot the ricotta in small dollops, spaced like little islands.",
          "Scatter half the thyme on top; save the rest for the finish."
        ],
        combi: {
          use: ["The baking paper sheet", "The garlic oil", "70 g mozzarella, torn", "The sautéed mushrooms", "30 g ricotta", "1 pinch thyme leaves"],
          actions: [
            "Stretch the dough to 22 cm and lay it on the baking paper.",
            "Brush the garlic oil across the base, right to the rim's edge.",
            "Scatter the mozzarella first, then the mushrooms.",
            "Dot the ricotta in small dollops, spaced like little islands.",
            "Scatter half the thyme on top; save the rest for the finish."
          ]
        }
      },
      {
        title: "Bake until golden",
        video: "./images/videos/cheese-bubbling.mp4",
        actions: [
          "Launch onto the steel.",
          "Start checking at the 5-minute mark — without tomato's moisture it bakes faster than a margherita.",
          "Pull when the crust is deeply golden and the mozzarella shows brown-spotted patches."
        ],
        minutes: 6,
        combi: {
          actions: [
            "Lift the pizza — paper and all — onto the hot enamel shelf.",
            "Bake at 230 °C Convection for 8–10 minutes; slide the paper out after 4 minutes.",
            "Finish with 1–2 minutes of Grill for brown-spotted cheese.",
            "Start checking early — the dry topping bakes faster than a saucy pizza."
          ],
          minutes: 10
        },
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

// ---- Three newer additions: Casa Vostra tribute, seafood, and the first non-pizza ----

RECIPES.push(
  {
    id: "burrata-parma",
    title: "Burrata, Parma Ham & Rocket",
    tagline: "The Casa Vostra move — hot crust, cold luxury",
    image: "./images/recipe-burrata-parma-sm.jpg",
    imageLg: "./images/recipe-burrata-parma.jpg",
    chips: ["22 cm", "Serves 1", "170 g dough", "After-oven magic"],
    intro: "Inspired by the Casa Vostra playbook: bake a lean, honest margherita-style base, then pile the luxury on AFTER the oven — torn burrata, silky Parma ham, peppery rocket and a ribbon of honey. Hot meets cold, crisp meets cream.",
    science: "Residual heat is the chef here. The 90 °C surface of a just-baked pizza softens burrata to the edge of collapse, turns prosciutto fat translucent, and gently wilts rocket — all without cooking any of them. Bake these toppings instead and you'd get rubber, jerky and slime. The honey bridges salt (ham), cream (burrata) and bitterness (rocket) in one drizzle.",
    ingredients: [
      "1 dough ball, 170 g (65% hydration, cold-fermented — or Newpolitan Tribute dough)",
      "60 g canned whole peeled tomatoes",
      "1 small pinch fine sea salt",
      "40 g low-moisture mozzarella",
      "1 ball burrata, 100 g (fridge-cold)",
      "3 slices Parma ham (about 45 g)",
      "20 g rocket (a generous handful)",
      "1 tsp extra-virgin olive oil (for the rocket)",
      "2 tsp honey",
      "Black pepper, 2–3 twists",
      "2 tbsp semolina, for the peel",
      "A little flour, for your hands"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        use: ["1 dough ball, 170 g"],
        actions: [
          "Dough out of the fridge, covered, 90 minutes before baking.",
          "Steel in the upper third; oven to maximum (250–275 °C); preheat the final 45 minutes.",
          "Take the burrata out of the fridge only when the pizza goes in the oven — cold burrata on hot pizza is the whole point."
        ],
        minutes: 90,
        combi: {
          use: ["1 dough ball, 170 g"],
          actions: [
            "Dough out of the fridge, covered, 90 minutes before baking.",
            "For the final 15 minutes: enamel shelf on the upper position, Convection mode, 230 °C.",
            "Cut a sheet of baking paper for the build.",
            "Keep the burrata in the fridge until the pizza comes out."
          ],
          minutes: 90
        },
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "The lean base",
        use: ["60 g canned whole peeled tomatoes", "1 small pinch fine sea salt", "40 g mozzarella"],
        video: "./images/videos/crush-tomatoes.mp4",
        actions: [
          "Crush the tomatoes by hand in a bowl.",
          "Mix the salt in while stirring.",
          "Tear the mozzarella into small pieces — this pizza carries less cheese than a margherita on purpose.",
          "The burrata is the star; the base is its stage."
        ],
        note: "Under-topping the bake leaves headroom for what comes after.",
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 2, label: "Before the oven vs after" }
      },
      {
        title: "Stretch, top, launch",
        use: ["2 tbsp semolina", "The sauce", "The torn mozzarella"],
        video: "./images/videos/shake-test.mp4",
        actions: [
          "Stretch the dough to 22 cm with a 2 cm rim.",
          "Lay it on the semolina-dusted peel and shake test.",
          "Spread a thin sauce spiral and scatter the mozzarella sparsely.",
          "Launch onto the steel in one smooth pull."
        ],
        combi: {
          use: ["The baking paper sheet", "The sauce", "The torn mozzarella"],
          actions: [
            "Stretch the dough to 22 cm with a 2 cm rim.",
            "Lay it on the baking paper.",
            "Spread a thin sauce spiral and scatter the mozzarella sparsely.",
            "Lift the pizza — paper and all — onto the hot enamel shelf."
          ]
        },
        learn: { pack: "oven", lesson: "launch", slide: 1, label: "The shake test" }
      },
      {
        title: "Bake it honest",
        video: "./images/videos/cheese-bubbling.mp4",
        actions: [
          "Bake 5–7 minutes until the rim is deep golden with leopard spots.",
          "The light topping means it may bake a touch faster than a full margherita — watch it.",
          "Pull it onto a board, not a rack: you want a stable stage for the toppings."
        ],
        minutes: 7,
        combi: {
          actions: [
            "Bake at 230 °C Convection for 9–11 minutes; slide the paper out after 5 minutes.",
            "Finish with 1–2 minutes of Grill for rim colour.",
            "Pull it onto a board, not a rack — you want a stable stage for the toppings."
          ],
          minutes: 11
        },
        learn: { pack: "oven", lesson: "doneness", slide: 0, label: "Ignore the clock, read the pizza" }
      },
      {
        title: "The cold luxury layer",
        use: ["1 ball burrata, 100 g", "3 slices Parma ham", "20 g rocket", "1 tsp olive oil"],
        actions: [
          "Wait 60 seconds — hot enough to soften, not hot enough to melt everything to soup.",
          "Tear the burrata over the centre and let it slump.",
          "Drape the Parma ham slices loosely in folds — never flat.",
          "Toss the rocket with the olive oil and scatter it over the top."
        ],
        note: "Draped ham stays silky; flattened ham turns sweaty.",
        minutes: 1
      },
      {
        title: "Honey and pepper finish",
        use: ["2 tsp honey", "2–3 twists black pepper"],
        video: "./images/videos/honey-drizzle.mp4",
        actions: [
          "Drizzle the honey in thin ribbons across the ham, burrata and rim.",
          "Finish with the black pepper straight over the burrata.",
          "Slice through the cold toppings with one confident stroke per cut.",
          "Eat immediately — this pizza waits for no one."
        ],
        note: "Salt, cream, pepper, sweet — that drizzle is what ties all four together.",
        minutes: 1
      }
    ]
  },
  {
    id: "seafood-pizza",
    title: "Frutti di Mare",
    tagline: "The seafood pizza that isn't rubbery",
    image: "./images/recipe-seafood-sm.jpg",
    imageLg: "./images/recipe-seafood.jpg",
    chips: ["22 cm", "Serves 1", "170 g dough", "Seafood"],
    intro: "Most seafood pizzas fail the same way: prawns and squid go in at minute zero and come out as erasers. The fix is a mid-bake addition — the pizza gets its head start, the seafood gets exactly the minutes it needs and not one more.",
    science: "Prawn and squid proteins seize and squeeze out moisture past about 60 °C internal — and they hit that in 4–6 oven minutes. Squid is the strangest of all: tender under 2 minutes, rubber between 2 and 20, tender again after 45. On a pizza you only get one shot at the first window, so the seafood boards the pizza halfway through the bake.",
    ingredients: [
      "1 dough ball, 170 g (65% hydration, cold-fermented)",
      "80 g raw peeled prawns, patted dry",
      "80 g squid rings, patted dry",
      "1 clove garlic, finely grated",
      "Zest of ½ lemon (plus wedges to serve)",
      "1 tbsp olive oil (for the marinade)",
      "80 g canned whole peeled tomatoes",
      "1 good pinch fine sea salt",
      "40 g low-moisture mozzarella (optional but good)",
      "1 tbsp chopped flat-leaf parsley",
      "1 pinch chilli flakes",
      "2 tbsp semolina, for the peel",
      "A little flour, for your hands"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        use: ["1 dough ball, 170 g"],
        actions: [
          "Dough out of the fridge, covered, 90 minutes before baking.",
          "Steel in the upper third; oven to maximum (250–275 °C); preheat the final 45 minutes."
        ],
        minutes: 90,
        combi: {
          use: ["1 dough ball, 170 g"],
          actions: [
            "Dough out of the fridge, covered, 90 minutes before baking.",
            "For the final 15 minutes: enamel shelf on the upper position, Convection mode, 230 °C.",
            "Cut a sheet of baking paper for the build."
          ],
          minutes: 90
        },
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "The 10-minute marinade",
        use: ["80 g prawns", "80 g squid rings", "1 clove garlic, grated", "Zest of ½ lemon", "1 tbsp olive oil"],
        actions: [
          "Pat the prawns and squid thoroughly dry with kitchen paper — drier seafood means browning, not steaming.",
          "Mix the garlic, lemon zest and olive oil in a bowl.",
          "Toss the seafood through the marinade.",
          "Set aside for 10 minutes — no longer, or the surface starts to cure."
        ],
        note: "Zest, not juice: acid this early would start 'cooking' the seafood ceviche-style.",
        minutes: 10,
        learn: { pack: "sauce", lesson: "topping-strategy", slide: 1, label: "Manage the moisture budget" }
      },
      {
        title: "Sauce and stretch",
        use: ["80 g canned whole peeled tomatoes", "1 good pinch fine sea salt", "2 tbsp semolina"],
        video: "./images/videos/crush-tomatoes.mp4",
        actions: [
          "Crush the tomatoes by hand and stir in the salt.",
          "Stretch the dough to 22 cm with a 2 cm rim.",
          "Lay it on the semolina-dusted peel and shake test.",
          "Spread a thin sauce spiral, leaving the rim bare."
        ],
        combi: {
          use: ["80 g canned whole peeled tomatoes", "1 good pinch fine sea salt", "The baking paper sheet"],
          actions: [
            "Crush the tomatoes by hand and stir in the salt.",
            "Stretch the dough to 22 cm with a 2 cm rim.",
            "Lay it on the baking paper.",
            "Spread a thin sauce spiral, leaving the rim bare."
          ]
        },
        learn: { pack: "dough", lesson: "troubleshooting", slide: 1, label: "Dough ER: snap-back & tearing" }
      },
      {
        title: "First bake — no seafood yet",
        use: ["40 g mozzarella (optional)"],
        video: "./images/videos/launch.mp4",
        actions: [
          "Scatter the mozzarella sparsely, if using.",
          "Launch onto the steel.",
          "Bake 3 minutes — the crust sets and the sauce concentrates.",
          "The seafood stays on the counter. Trust the process."
        ],
        note: "This head start is the entire trick of the recipe.",
        minutes: 3,
        combi: {
          use: ["40 g mozzarella (optional)"],
          actions: [
            "Scatter the mozzarella sparsely, if using.",
            "Lift the pizza — paper and all — onto the hot enamel shelf.",
            "Bake at 230 °C Convection for 6 minutes; slide the paper out at the 4-minute mark.",
            "The seafood stays on the counter. Trust the process."
          ],
          minutes: 6
        },
        learn: { pack: "oven", lesson: "launch", slide: 2, label: "The Launch: commit like a pizzaiolo" }
      },
      {
        title: "Seafood boards mid-flight",
        use: ["The marinated prawns and squid"],
        actions: [
          "Slide the rack out (or pull the pizza to the oven mouth with the peel).",
          "Working fast, scatter the prawns and squid evenly over the pizza.",
          "Push it back and bake 3–4 more minutes.",
          "Pull when the prawns are just pink and curled into loose Cs — a tight O means overdone."
        ],
        note: "Loose C = juicy. Tight O = rubber. The shape never lies.",
        minutes: 4,
        combi: {
          use: ["The marinated prawns and squid"],
          actions: [
            "Open the door and scatter the prawns and squid evenly over the pizza — be quick, the small chamber dumps heat fast.",
            "Bake 5–6 more minutes at 230 °C Convection.",
            "Switch to Grill for the final 1–2 minutes to blister the seafood's surface.",
            "Pull when the prawns are just pink and curled into loose Cs."
          ],
          note: "Loose C = juicy. Tight O = rubber. The shape never lies.",
          minutes: 6
        },
        learn: { pack: "oven", lesson: "doneness", slide: 1, label: "Cheese tells the truth" }
      },
      {
        title: "Finish like the coast",
        use: ["1 tbsp chopped parsley", "1 pinch chilli flakes", "Lemon wedges"],
        actions: [
          "Rest the pizza 60 seconds.",
          "Shower the parsley and chilli flakes over the top.",
          "Serve with lemon wedges — squeeze at the table, not before, so the crust stays crisp.",
          "No parmesan. On seafood pizza, that's the law."
        ],
        minutes: 1
      }
    ]
  },
  {
    id: "lasagne",
    title: "Marco's Sunday Lasagne",
    tagline: "The first non-pizza in the club",
    image: "./images/recipe-lasagne-sm.jpg",
    imageLg: "./images/recipe-lasagne.jpg",
    chips: ["20×25 cm dish", "Serves 4", "~2 hours", "Comfort classic"],
    intro: "Pizza taught you heat and dough. Lasagne teaches you layers and patience: a slow ragù, a silky béchamel, and the discipline to let it rest before you cut. This is Sunday food — start it early, eat it proud.",
    science: "Lasagne is a moisture-management system. The dry pasta sheets drink liquid from the ragù and béchamel as they bake, which is why both sauces must be looser than you'd serve on their own. The 15-minute rest at the end isn't optional: it lets the starches set so slices hold their layers instead of sliding apart.",
    ingredients: [
      "250 g dried lasagne sheets (no pre-cooking needed)",
      "— The ragù —",
      "2 tbsp olive oil",
      "1 onion (120 g), finely diced",
      "1 carrot (80 g), finely diced",
      "1 celery stick (60 g), finely diced",
      "2 cloves garlic, finely chopped",
      "400 g beef mince (15–20% fat)",
      "2 tbsp tomato paste",
      "100 ml red wine (optional — swap for water)",
      "400 g canned chopped tomatoes",
      "1 tsp fine sea salt",
      "— The béchamel —",
      "50 g butter",
      "50 g plain flour",
      "600 ml whole milk",
      "¼ tsp grated nutmeg",
      "½ tsp fine sea salt",
      "— The top —",
      "60 g parmesan, finely grated",
      "125 g mozzarella, torn"
    ],
    steps: [
      {
        title: "Build the ragù base",
        use: ["2 tbsp olive oil", "1 onion, diced", "1 carrot, diced", "1 celery stick, diced", "2 cloves garlic, chopped"],
        actions: [
          "Heat the oil in a wide pan over medium heat.",
          "Add the onion, carrot and celery.",
          "Cook 8–10 minutes, stirring now and then, until soft and sweet but not browned.",
          "Add the garlic and cook 1 more minute."
        ],
        note: "This is soffritto — the flavour foundation of half of Italian cooking. Don't rush it.",
        minutes: 10
      },
      {
        title: "Brown the beef, simmer the ragù",
        use: ["400 g beef mince", "2 tbsp tomato paste", "100 ml red wine (optional)", "400 g canned chopped tomatoes", "1 tsp salt"],
        actions: [
          "Turn the heat up, add the mince and break it apart.",
          "Cook until properly browned in patches, not just grey — about 6 minutes.",
          "Stir in the tomato paste and cook 1 minute until brick-red.",
          "Pour in the wine (if using) and let it bubble away for 2 minutes.",
          "Add the tomatoes, half a can of water and the salt.",
          "Simmer gently, uncovered, for 30 minutes, stirring occasionally. It should end loose, not dry."
        ],
        note: "A ragù that looks slightly too wet is exactly right — the pasta sheets will drink it.",
        minutes: 40
      },
      {
        title: "Whisk the béchamel",
        use: ["50 g butter", "50 g plain flour", "600 ml whole milk", "¼ tsp nutmeg", "½ tsp salt"],
        actions: [
          "Melt the butter in a saucepan over medium heat.",
          "Whisk in the flour and cook 1 minute — it should smell biscuity.",
          "Add the milk in 4–5 additions, whisking each fully smooth before the next.",
          "Simmer 2 minutes, whisking, until it coats the back of a spoon like thick cream.",
          "Season with the nutmeg and salt, then take it off the heat."
        ],
        note: "Pourable, not gloopy. If it mounds on a spoon, whisk in another splash of milk.",
        minutes: 8
      },
      {
        title: "Preheat the oven",
        actions: [
          "Set the oven to 180 °C fan (200 °C conventional).",
          "Give it a full 20 minutes to come to temperature while you assemble.",
          "Shelf in the middle of the oven."
        ],
        note: "Lasagne wants moderate, even heat — this is a bake, not a blast.",
        minutes: 20,
        combi: {
          actions: [
            "Put the wire shelf in the lower shelf position (the dish needs headroom).",
            "Select Convection mode and set 180 °C.",
            "Preheat for 10 minutes — the CS89's small chamber gets there fast.",
            "Check your dish fits: a 20×25 cm ceramic or metal dish is ideal for the 31 L chamber. No lid, no cling film."
          ],
          note: "Lasagne is where a combi oven genuinely shines — even fan heat, fast preheat, and 180 °C is well within its range.",
          minutes: 10
        },
        learn: { pack: "oven", lesson: "heat-transfer", slide: 1, label: "Preheat like you mean it" }
      },
      {
        title: "Layer with discipline",
        use: ["The ragù", "The béchamel", "250 g lasagne sheets", "60 g parmesan"],
        actions: [
          "Spread a thin layer of ragù over the base of a 20×25 cm dish.",
          "Cover with a single layer of pasta sheets, breaking pieces to fill gaps.",
          "Spread on a third of the remaining ragù, then a quarter of the béchamel, then a sprinkle of parmesan.",
          "Repeat twice more: sheets, ragù, béchamel, parmesan.",
          "Finish with a final layer of sheets and all the remaining béchamel spread right to the edges."
        ],
        note: "Béchamel to the very edges — exposed pasta corners bake into roof tiles.",
        minutes: 10
      },
      {
        title: "Top and bake",
        use: ["125 g mozzarella, torn", "The remaining parmesan"],
        video: "./images/videos/cheese-bubbling.mp4",
        actions: [
          "Scatter the mozzarella and remaining parmesan over the top.",
          "Bake at 180 °C fan for 35 minutes, until deep golden with bubbling edges.",
          "If the top browns too fast, loosely cover with foil for the remaining time.",
          "A knife pushed into the centre should meet no resistance from the pasta."
        ],
        minutes: 35,
        combi: {
          use: ["125 g mozzarella, torn", "The remaining parmesan"],
          actions: [
            "Scatter the mozzarella and remaining parmesan over the top.",
            "Bake at 180 °C Convection for 30 minutes — the compact chamber runs slightly more efficient than a big oven.",
            "Faster option: use Combination mode (Convection 180 °C + 300 W microwave) and cut the bake to about 25 minutes — the microwave heats the middle while the fan browns the top.",
            "Either way: a knife pushed into the centre should meet no resistance from the pasta."
          ],
          note: "Combination mode is the CS89's party trick — through-heat and browning at the same time.",
          minutes: 30
        },
        learn: { pack: "oven", lesson: "doneness", slide: 1, label: "Cheese tells the truth" }
      },
      {
        title: "The sacred rest",
        actions: [
          "Take the lasagne out and put it somewhere everyone can smell it.",
          "Rest for 15 full minutes. No exceptions, no 'just a small corner'.",
          "Cut into 4 portions with a sharp knife and lift with a wide spatula.",
          "Admire the layers. You earned them."
        ],
        note: "Cut at minute 5 and it floods the dish. Cut at minute 15 and every layer stands to attention.",
        minutes: 15
      }
    ]
  }
);

export function findRecipe(id) {
  return RECIPES.find(r => r.id === id) || null;
}
