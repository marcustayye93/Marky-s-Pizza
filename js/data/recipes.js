// Marco's Pizza Club — Cook-along recipes
// Step shape: { title, text, minutes? } — minutes triggers an in-step timer.

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
      "80 g canned whole peeled tomatoes, hand-crushed with a pinch of salt",
      "70 g low-moisture mozzarella, torn or cubed",
      "4–5 fresh basil leaves",
      "1 tsp extra-virgin olive oil",
      "Semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough",
        text: "Take your dough ball out of the fridge, keep it covered, and let it come to room temperature. Cold dough is stiff dough — it will fight your stretch and bake up dense. Use this time to preheat.",
        minutes: 90
      },
      {
        title: "Preheat the steel",
        text: "Baking steel (or stone) on a rack in the upper third of the oven. Maximum temperature — usually 250–275 °C. Start the timer and do not open that door. The steel needs every minute to load up with heat.",
        minutes: 45
      },
      {
        title: "Make the 60-second sauce",
        text: "Crush the tomatoes by hand into a bowl with a good pinch of fine sea salt. Stop while it still has texture. No cooking, no garlic, no oregano — this is the pure, bright version. Taste it: it should taste like sunshine and salt."
      },
      {
        title: "Stretch the base",
        text: "Flour your hands and the counter. Press from the centre outward, leaving a 2 cm rim untouched — that rim becomes your puffy crust. Lift the disc onto your knuckles and rotate, letting gravity stretch it to about 22 cm. Springy? Rest it 10 minutes and return."
      },
      {
        title: "Top on the peel",
        text: "Dust the peel with semolina, lay the base on it, and give it a test shake — it must slide. Sauce in a thin spiral (dough visible through it), cheese scattered with gaps, 2 basil leaves tucked under cheese so they don't burn. Work fast: under 2 minutes on the peel."
      },
      {
        title: "Launch and bake",
        text: "Shake test. Then one smooth confident pull — angle the peel to the far edge of the steel and slide the pizza off. Bake until the rim is deep golden with leopard spots and the cheese pools are bubbling with the first brown patches. Switch to grill for the final 90 seconds if your top is lagging.",
        minutes: 7
      },
      {
        title: "Finish and rest",
        text: "Out of the oven, onto a rack or board. Remaining basil leaves on top, a thin swirl of olive oil. Now the hard part: wait 60 seconds before cutting so the crumb sets and the base stays crisp. Slice, fold, taste. Log it in your Journal — every bake teaches something.",
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
      "130 g canned whole peeled tomatoes, hand-crushed with salt",
      "110 g low-moisture mozzarella, torn",
      "6–8 fresh basil leaves",
      "2 tsp extra-virgin olive oil",
      "Semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough",
        text: "Out of the fridge, covered, 1.5–2 hours before baking. A 280 g ball takes the full 2 hours to lose its chill — plan around it, don't rush it.",
        minutes: 120
      },
      {
        title: "Preheat properly",
        text: "Steel or stone in the upper third, oven at maximum. A bigger pizza pulls more heat out of the steel at launch, so the full preheat matters even more than for a personal pizza.",
        minutes: 50
      },
      {
        title: "Sauce and setup",
        text: "Hand-crush the tomatoes with salt. Tear the mozzarella and let it sit on kitchen paper — even low-moisture cheese benefits from losing surface moisture before a longer bake. Line up everything within arm's reach: big pizzas punish slow assembly."
      },
      {
        title: "The big stretch",
        text: "Press out the centre, keeping a 2.5 cm rim. Use knuckles and gravity, rotating often. At 30 cm the middle gets thin — hold the disc up to the light; an even glow means even thickness. A bright spot means a coming tear: lay it down and coax dough from the rim inward."
      },
      {
        title: "Top with discipline",
        text: "On the semolina-dusted peel: thin sauce spiral leaving generous bare dough at the rim, cheese scattered with restraint — you should see plenty of red between the white. Half the basil under the cheese. Shake test. It slides or it doesn't launch."
      },
      {
        title: "Bake and rotate",
        text: "Launch with one confident pull. At the halfway mark, rotate the pizza 180° with tongs or a quick peel scoop — home ovens always have a hot side. Pull when the rim is deeply golden and the centre cheese bubbles lazily.",
        minutes: 9
      },
      {
        title: "Rest, dress, serve",
        text: "Rest 90 seconds on a rack — a big pizza holds more steam and needs the extra time. Finish with the remaining basil and olive oil. Cut into 6 wedges with decisive strokes. Serve immediately and accept the applause graciously.",
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
      "80 g canned whole peeled tomatoes, hand-crushed with salt",
      "70 g low-moisture mozzarella, torn",
      "12–15 slices small pepperoni (natural casing if possible)",
      "1 tbsp honey + a pinch of chilli flakes (or ready-made hot honey)",
      "Semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        text: "Dough out of the fridge, covered, while the steel preheats in the upper third at maximum temperature. Make the hot honey now: warm the honey gently with chilli flakes and let it infuse off the heat.",
        minutes: 90
      },
      {
        title: "Prep the toppings",
        text: "Hand-crush the tomatoes with salt. Tear the cheese. Lay the pepperoni slices on kitchen paper — blotting surface oil now means crispier cups later, not a greasy flood."
      },
      {
        title: "Stretch and top",
        text: "Stretch to 22 cm with a 2 cm rim. On the semolina-dusted peel: thin layer of sauce, then cheese, then pepperoni spaced evenly with room to curl — they shrink toward their centres, so a slight overlap of coverage is fine. No honey yet. Honey burns; patience wins."
      },
      {
        title: "Bake to crispy cups",
        text: "Launch. Watch the pepperoni: the slices will curl into cups with darkened, crisped edges while the pools inside stay glistening. Pull when the rim is deep golden and the cups are just starting to char at their rims.",
        minutes: 7
      },
      {
        title: "The honey moment",
        text: "Rest the pizza 60 seconds, then drizzle the hot honey in thin ribbons across the whole surface — over the crust rim too, it's not decoration, it's strategy. Slice and serve while the contrast between hot-salty and sweet-spicy is at its peak.",
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
      "1 clove garlic, finely grated into 1 tbsp olive oil",
      "70 g low-moisture mozzarella, torn",
      "30 g ricotta, in small dollops",
      "Fresh thyme leaves, a generous pinch",
      "Semolina, for the peel"
    ],
    steps: [
      {
        title: "Wake the dough & preheat",
        text: "Dough out of the fridge, covered. Steel in the upper third, oven at maximum. The bianca relies on fierce base heat even more than red pizzas — there's no wet sauce layer to buffer it.",
        minutes: 90
      },
      {
        title: "Sauté the mushrooms",
        text: "Hot pan, splash of oil, mushrooms in a single layer. Resist stirring for the first 2 minutes — contact makes browning. Cook until they've shrunk by half and their edges are golden. Season with salt at the end (salting early draws water and blocks browning).",
        minutes: 6
      },
      {
        title: "Stretch and layer",
        text: "Stretch to 22 cm on the semolina-dusted peel. Brush the garlic oil across the base, right to the rim's edge. Mozzarella first, then the sautéed mushrooms, then the ricotta dollops spaced like little islands. Half the thyme on now, half saved for the finish."
      },
      {
        title: "Bake until golden",
        text: "Launch and bake until the crust is deeply golden and the mozzarella shows brown-spotted patches. Without tomato's moisture the pizza bakes slightly faster than a margherita — start checking at the 5-minute mark.",
        minutes: 6
      },
      {
        title: "Finish bright",
        text: "Rest 60 seconds. Scatter the remaining fresh thyme and a few grains of flaky salt over the top, plus a final thread of olive oil. The heat blooms the thyme's aroma without cooking away its freshness. Slice and enjoy the quiet sophistication.",
        minutes: 1
      }
    ]
  }
];

export function findRecipe(id) {
  return RECIPES.find(r => r.id === id) || null;
}
