// Marco's Pizza Club — Lesson packs
// 3 packs × 4 lessons. Each lesson is a set of story slides.
// Slide shape: { kicker, title, body, science?, image? }

export const PACKS = [
  {
    id: "dough",
    title: "Dough School",
    subtitle: "Flour, water, time — the holy trinity",
    image: "./images/learn-dough-sm.jpg",
    imageLg: "./images/learn-dough.jpg",
    lessons: [
      {
        id: "flour-power",
        title: "Flour Power",
        minutes: 3,
        summary: "Why protein content decides your crust's destiny.",
        slides: [
          {
            kicker: "Dough School · Lesson 1",
            title: "Flour is not just flour",
            image: "./images/learn-dough.jpg",
            body: "Ciao! Marco here. Every great pizza starts with a bag of flour — and most pizza heartbreak starts with the <strong>wrong</strong> bag. The single number that matters most is printed right on the label: protein percentage.",
            science: "<b>The science:</b> wheat proteins (glutenin and gliadin) link into <b>gluten</b> when hydrated and kneaded. More protein means a stronger, stretchier network that traps fermentation gas — that is what gives you a puffy, chewy rim."
          },
          {
            kicker: "Dough School · Lesson 1",
            title: "Pick your fighter",
            body: "For pizza you want <strong>11.5–13% protein</strong>. Bread flour sits right in this zone. Italian \"00\" flour with 12%+ protein is the classic Neapolitan choice — finely milled, silky to stretch. Plain or cake flour (8–10%) makes a fragile dough that tears when you stretch it and bakes up more cracker than crust.",
            science: "<b>Rule of thumb:</b> supermarket bread flour ≈ 12–13% protein. \"00\" pizzeria flour ≈ 12.5%. All-purpose ≈ 10–11% — workable, but expect less chew and less puff."
          },
          {
            kicker: "Dough School · Lesson 1",
            title: "Strong flour, patient hands",
            body: "Stronger flour absorbs more water and takes longer to relax. If your dough keeps springing back when you stretch it, it is not being stubborn — the gluten is just wound up tight. Rest it 15 minutes and it will surrender beautifully.",
            science: "<b>The science:</b> gluten is viscoelastic. Stretching aligns and tensions the strands; resting lets bonds relax and re-form in the new shape. Bakers call this <b>stress relaxation</b> — time does the kneading for you."
          }
        ]
      },
      {
        id: "hydration",
        title: "Hydration Decoded",
        minutes: 4,
        summary: "The water-to-flour ratio that controls texture, char and handling.",
        slides: [
          {
            kicker: "Dough School · Lesson 2",
            title: "The number bakers tattoo on their hearts",
            body: "Hydration is water weight divided by flour weight. 650 g water for 1000 g flour? That is <strong>65% hydration</strong>. This one ratio quietly decides how your dough feels in your hands and how your crust eats.",
            science: "<b>Why weight, not cups:</b> a \"cup of flour\" can vary by 30 g depending on how you scoop. A cheap kitchen scale is the best pizza upgrade money can buy."
          },
          {
            kicker: "Dough School · Lesson 2",
            title: "Low, medium, high",
            body: "<strong>55–60%:</strong> firm, easy to handle — great for beginners and crisp thin bases. <strong>62–67%:</strong> the sweet spot for home ovens — open crumb, manageable stickiness. <strong>70%+:</strong> gorgeous blistered airy crusts, but the dough handles like a water balloon with trust issues.",
            science: "<b>The science:</b> more water = more steam in the oven = bigger bubbles and a lighter crumb. It also speeds up enzyme activity, so high-hydration doughs ferment faster and brown more deeply."
          },
          {
            kicker: "Dough School · Lesson 2",
            title: "Home oven wisdom",
            body: "Wood-fired ovens at 450 °C flash-bake high-hydration dough before it can dry out. Your home oven at 250 °C bakes for 6–8 minutes, so very wet dough can turn gummy. Marco's advice: <strong>start at 62–65%</strong>, master the handling, then climb the hydration ladder one rung at a time.",
            science: "<b>Humid kitchen?</b> In tropical climates like Singapore, flour already holds extra moisture from the air. Knock 2–3% off the recipe's hydration and the dough will behave the way the recipe author intended."
          }
        ]
      },
      {
        id: "fermentation",
        title: "The Fermentation Game",
        minutes: 4,
        summary: "Cold ferment: how time turns flour paste into flavour.",
        slides: [
          {
            kicker: "Dough School · Lesson 3",
            title: "Flavour is not an ingredient. It's a schedule.",
            body: "A same-day dough tastes like… flour. The same recipe, rested in the fridge for two days, tastes complex, gently tangy, almost nutty. Nothing was added. Only <strong>time</strong>.",
            science: "<b>The science:</b> yeast eats sugars and makes CO₂ (puff) plus ethanol and aromatic compounds (flavour). Meanwhile enzymes break starch into sugars — which is also what caramelises into those beautiful leopard spots."
          },
          {
            kicker: "Dough School · Lesson 3",
            title: "Why cold is kind",
            body: "At room temperature yeast parties hard and burns out in hours. At fridge temperature (3–5 °C) it sips slowly, so fermentation stretches over days. That slow burn is where flavour compounds pile up — and the schedule becomes <strong>yours</strong>: make dough Thursday, eat pizza Saturday.",
            science: "<b>The protocol:</b> mix → 1 hour covered at room temp → divide into balls → sealed containers → fridge 24–72 h. Take balls out <b>1.5–2 h before baking</b> so the gluten relaxes and the yeast wakes up."
          },
          {
            kicker: "Dough School · Lesson 3",
            title: "Reading the bubbles",
            body: "A well-fermented ball is puffy, domed, and dotted with small bubbles under the skin. It smells faintly of beer and bread. Poke it gently: the dimple should spring back <strong>slowly</strong>. Fast spring-back = underproofed. No spring at all = it partied too long.",
            science: "<b>Overproofed rescue:</b> the gluten is weakening but the flavour is great — stretch it thinner, top it lighter, and bake it as a crispier pizza. Never waste dough, only redirect it."
          }
        ]
      },
      {
        id: "troubleshooting",
        title: "Dough ER",
        minutes: 3,
        summary: "Tears, snap-back, stickiness — diagnose and fix on the fly.",
        slides: [
          {
            kicker: "Dough School · Lesson 4",
            title: "Every dough problem is a message",
            body: "Dough cannot talk, but it communicates loudly. Marco has torn, over-flopped, and ripped his way through hundreds of doughs so you don't have to. Here is the field guide.",
            science: "<b>Golden rule:</b> 90% of dough problems are fixed by one of two things — <b>more rest</b> or <b>more practice with less flour on your hands</b>."
          },
          {
            kicker: "Dough School · Lesson 4",
            title: "Snap-back & tearing",
            body: "<strong>Dough springs back like elastic?</strong> Gluten is too tense. Cover it, walk away 15 minutes, try again. <strong>Dough tears when stretched?</strong> Either underdeveloped gluten (knead more next time) or overproofed (handle gently, patch the hole, carry on — sauce hides sins).",
            science: "<b>The science:</b> tension in gluten is like a stretched rubber band; time lets polymer chains slide and relax. Tearing means the network is either too weak (undermixed) or partially digested by enzymes (overproofed)."
          },
          {
            kicker: "Dough School · Lesson 4",
            title: "The sticky truth",
            body: "Sticky dough tempts you to shower it in flour. Resist! Extra flour toughens the crust and burns on the baking steel. Instead: use a light dusting of <strong>semolina</strong>, work fast with confident fingertips, and remember — a slightly tacky dough bakes into a better crust than a dry one.",
            science: "<b>Pro move:</b> stretch on a floured surface but keep the peel dusted with semolina. It acts like tiny ball bearings so the pizza launches cleanly instead of gluing itself down."
          }
        ]
      }
    ]
  },
  {
    id: "sauce",
    title: "Sauce, Cheese & Toppings",
    subtitle: "Restraint is a flavour",
    image: "./images/learn-sauce-sm.jpg",
    imageLg: "./images/learn-sauce.jpg",
    lessons: [
      {
        id: "sauce-science",
        title: "Sauce: Don't Cook It",
        minutes: 3,
        summary: "The rawest sauce wins. Tomato choice, crushing, seasoning.",
        slides: [
          {
            kicker: "Sauce & Cheese · Lesson 1",
            title: "The 60-second sauce",
            image: "./images/learn-sauce.jpg",
            body: "Here is the secret that shocks everyone: great pizzerias <strong>don't cook their sauce</strong>. Canned whole peeled tomatoes, crushed by hand, a pinch of salt — done. It cooks on the pizza, in the oven, exactly once.",
            science: "<b>The science:</b> fresh tomato aroma comes from volatile compounds that are destroyed by long simmering. Pre-cooking your sauce means cooking it <b>twice</b> — you trade brightness for a dull, paste-like flavour."
          },
          {
            kicker: "Sauce & Cheese · Lesson 1",
            title: "Choosing your tomatoes",
            body: "Buy <strong>whole peeled tomatoes</strong>, not pre-crushed or \"pizza sauce\". Whole tomatoes are packed from better fruit; crushed products often hide broken, watery ones. San Marzano is famous, but any good Italian canned tomato beats a mediocre \"authentic\" label.",
            science: "<b>Taste test:</b> good canned tomatoes taste sweet-tart straight from the can. If they taste tinny or bitter, a pinch of salt helps — sugar rarely needed with quality fruit."
          },
          {
            kicker: "Sauce & Cheese · Lesson 1",
            title: "Crush, season, stop",
            body: "Crush by hand or pulse <em>briefly</em> — you want texture, not smoothie. Season with fine sea salt only. Basil and olive oil go <strong>on the pizza</strong>, not in the sauce. And spread it thin: 2–3 tablespoons for a personal pizza. The crust is the star; sauce is the supporting actor.",
            science: "<b>Moisture math:</b> every extra spoon of sauce is water your oven must evaporate. Too much = the dreaded soggy centre. Thin layer, visible dough through the swirl — that's the pro look."
          }
        ]
      },
      {
        id: "cheese-melt",
        title: "Cheese & The Melt",
        minutes: 4,
        summary: "Fresh vs low-moisture mozzarella, and when to use each.",
        slides: [
          {
            kicker: "Sauce & Cheese · Lesson 2",
            title: "Two mozzarellas, two missions",
            body: "<strong>Fresh mozzarella</strong> (the ball in liquid): milky, delicate, melts into soft creamy pools — but carries a lot of water. <strong>Low-moisture mozzarella</strong> (the block): saltier, stretchier, browns beautifully, releases far less liquid. Different tools for different pizzas.",
            science: "<b>The science:</b> fresh mozzarella is ~60% water. In a 90-second wood-fired bake there's no time for it to flood the pizza. In your 7-minute home bake, that water has time to escape — straight into your crust."
          },
          {
            kicker: "Sauce & Cheese · Lesson 2",
            title: "The home oven playbook",
            body: "For home ovens Marco recommends: <strong>low-moisture mozzarella as the base layer</strong>, torn fresh mozzarella sparingly on top if you want those creamy pools. Or go full fresh — but drain it: slice, then rest on kitchen paper for 30+ minutes before it goes anywhere near dough.",
            science: "<b>Browning bonus:</b> low-moisture mozzarella has more concentrated proteins and sugars, so it develops those golden-brown spots (Maillard reaction) that fresh mozzarella rarely achieves at 250 °C."
          },
          {
            kicker: "Sauce & Cheese · Lesson 2",
            title: "The supporting cast",
            body: "A light grating of <strong>parmesan or pecorino</strong> under or over the mozzarella adds savoury depth without moisture. Go easy — these are seasoning cheeses, not blanket cheeses. Total cheese for a personal pizza: about <strong>80–100 g</strong>. More than that and the slice flops.",
            science: "<b>Umami stacking:</b> aged cheeses are rich in glutamates — the same savoury compounds as in tomatoes. Tomato + parmesan is a natural umami power couple, which is why a margherita needs so few ingredients."
          }
        ]
      },
      {
        id: "topping-strategy",
        title: "Topping Strategy",
        minutes: 3,
        summary: "Less is more: moisture budgets and the before/after-bake split.",
        slides: [
          {
            kicker: "Sauce & Cheese · Lesson 3",
            title: "The three-topping rule",
            body: "Marco's iron law: sauce, cheese, plus <strong>at most three toppings</strong>. Every topping competes for heat, space and structural integrity. The best pizzas in Naples usually carry one or two. Confidence is a topping.",
            science: "<b>The physics:</b> toppings shield the dough from radiant heat and add weight and water. Overloaded pizzas bake slower on top, steam instead of crisp, and sag when lifted. Restraint is not style — it's thermodynamics."
          },
          {
            kicker: "Sauce & Cheese · Lesson 3",
            title: "Manage the moisture budget",
            body: "Watery toppings — fresh tomato, mushrooms, courgette — need pre-treatment. Salt fresh tomato slices and let them drain. Sauté mushrooms first to evaporate their water (they shrink to half — that's the point). Your pizza has a strict moisture budget; spend it wisely.",
            science: "<b>The science:</b> mushrooms are ~92% water. Raw slices release it exactly when the crust needs dry heat most. A 3-minute sauté removes most of it and pre-concentrates flavour via Maillard browning."
          },
          {
            kicker: "Sauce & Cheese · Lesson 3",
            title: "Before the oven vs after",
            body: "Some things should never see the inside of an oven. <strong>Bake:</strong> pepperoni, mushrooms, onions — things that improve with heat. <strong>After the bake:</strong> prosciutto (turns to cardboard if baked), rocket, fresh basil, a swirl of hot honey or good olive oil. The contrast of hot crust and cool topping is half the pleasure.",
            science: "<b>Basil timing:</b> its aroma comes from delicate volatile oils that vaporise above ~60 °C. Add half before baking (mellow, infused) and half after (bright, perfumed) for a two-layer basil experience."
          }
        ]
      },
      {
        id: "flavour-pairing",
        title: "Flavour Pairing",
        minutes: 3,
        summary: "Balance salt, fat, acid and heat like a pizzaiolo.",
        slides: [
          {
            kicker: "Sauce & Cheese · Lesson 4",
            title: "The balance wheel",
            body: "Every memorable pizza balances four forces: <strong>salt</strong> (cheese, cured meat), <strong>fat</strong> (cheese, oil), <strong>acid</strong> (tomato), and <strong>something bright or hot</strong> (basil, chilli, honey, rocket). When one dominates, the slice tires your palate after two bites.",
            science: "<b>The science:</b> fat coats the tongue and mutes flavour perception; acid cuts through fat and resets the palate. That's why tomato sauce makes cheese taste cheesier — and why a squeeze of brightness rescues rich pizzas."
          },
          {
            kicker: "Sauce & Cheese · Lesson 4",
            title: "Classic power couples",
            body: "<strong>Pepperoni + hot honey:</strong> salt-fat meets sweet-heat. <strong>Mushroom + thyme:</strong> earthy meets aromatic. <strong>Prosciutto + rocket:</strong> salty-rich meets peppery-fresh. <strong>Tomato + basil + mozzarella:</strong> the original, unbeatable, acid-herb-fat triangle.",
            science: "<b>Why sweet + spicy works:</b> capsaicin's heat and sugar's sweetness are processed by different receptors; sugar slightly tames the burn while heat makes sweetness more interesting. Your brain reads it as fireworks."
          },
          {
            kicker: "Sauce & Cheese · Lesson 4",
            title: "Design your own",
            body: "Pick one anchor (usually cheese or cured meat), one contrast (acid, heat or freshness), and at most one texture (crunch, cream). Then head to the <strong>Pizza Builder</strong> and watch the balance meters as you compose. Marco believes in you. Now go make something delicious.",
            science: "<b>Homework:</b> build a two-topping pizza in the Builder and check the moisture-risk meter. If it's in the red, decide what to drain, sauté, or drop. That's real pizzaiolo thinking."
          }
        ]
      }
    ]
  },
  {
    id: "oven",
    title: "Oven Mastery",
    subtitle: "Squeeze pro results from a home oven",
    image: "./images/learn-oven-sm.jpg",
    imageLg: "./images/learn-oven.jpg",
    lessons: [
      {
        id: "heat-transfer",
        title: "How Heat Actually Works",
        minutes: 3,
        summary: "Conduction, radiation and why preheating is non-negotiable.",
        slides: [
          {
            kicker: "Oven Mastery · Lesson 1",
            title: "Three kinds of heat, one pizza",
            image: "./images/learn-oven.jpg",
            body: "Your oven attacks a pizza three ways: <strong>conduction</strong> (hot surface touching the base), <strong>radiation</strong> (glowing elements toasting the top), and <strong>convection</strong> (moving hot air). A great bake choreographs all three to finish at the same moment.",
            science: "<b>The problem:</b> a pizza on a cold tray gets mostly convection — the slowest of the three. Result: pale, dry, biscuit-like base. The fix is thermal mass under the pizza, which brings us to…"
          },
          {
            kicker: "Oven Mastery · Lesson 1",
            title: "Preheat like you mean it",
            body: "Set your oven to its <strong>maximum</strong> (usually 250–275 °C) and preheat for a full <strong>45–60 minutes</strong> with your steel or stone inside. Yes, really. The air heats up in 15 minutes; the slab of metal or stone needs three times longer to soak up its full energy payload.",
            science: "<b>The science:</b> a baking steel stores heat in proportion to its mass and specific heat capacity. A half-heated steel dumps half the energy into your first pizza — which is why pizza #2 often mysteriously beats pizza #1."
          },
          {
            kicker: "Oven Mastery · Lesson 1",
            title: "Position is everything",
            body: "Put the steel or stone on a rack in the <strong>upper third</strong> of the oven, 10–15 cm below the top element. The base cooks by contact while the top element's radiation crisps the cheese. Bottom-shelf baking gives you a burnt base and pale, sad cheese.",
            science: "<b>Grill finish:</b> for the final 1–2 minutes, switch to the grill/broiler. It mimics the 400 °C+ dome radiation of a pizzeria oven and gives you leopard spots on the rim."
          }
        ]
      },
      {
        id: "steel-stone",
        title: "Steel vs Stone",
        minutes: 3,
        summary: "The single best hardware upgrade for home pizza.",
        slides: [
          {
            kicker: "Oven Mastery · Lesson 2",
            title: "The upgrade that changes everything",
            image: "./images/bake-steel-oven.jpg",
            body: "If you buy one piece of pizza kit, make it a <strong>baking steel</strong> (6–10 mm thick). Second choice: a cordierite baking stone. Both transform a home oven; the steel just does it faster and harder.",
            science: "<b>The science:</b> steel conducts heat roughly <b>15× faster</b> than ceramic stone. At the same 250 °C, steel delivers energy into the dough so quickly that you get oven-spring and browning a stone can only dream of at home temperatures."
          },
          {
            kicker: "Oven Mastery · Lesson 2",
            title: "When stone still makes sense",
            body: "Steel is so aggressive that above ~290 °C it can scorch the base before the top finishes — which is why pizzerias with 450 °C ovens use stone. At home-oven temperatures (250–275 °C), steel wins almost every time. Stone remains a fine, cheaper, lighter option.",
            science: "<b>No steel? No stone?</b> Use a heavy cast-iron pan or an upturned thick baking tray, preheated just as long. Thermal mass is the goal; the material is negotiable."
          },
          {
            kicker: "Oven Mastery · Lesson 2",
            title: "Care and feeding",
            body: "A steel needs the same love as cast iron: dry it after wiping, rub with a whisper of neutral oil, and let it build a dark patina — that's seasoning, not dirt. Never wash a hot stone with cold water unless you enjoy the sound of cracking ceramic.",
            science: "<b>Semolina, not flour:</b> dust the peel with semolina. Regular flour burns bitter at steel temperatures; semolina's coarser grains roll like ball bearings and toast rather than scorch."
          }
        ]
      },
      {
        id: "launch",
        title: "The Launch",
        minutes: 3,
        summary: "Peel technique: the 10 seconds that make or break a pizza.",
        slides: [
          {
            kicker: "Oven Mastery · Lesson 3",
            title: "Fear of the launch is normal",
            body: "Every home pizzaiolo has lived the nightmare: the confident flick, the pizza that stays glued to the peel, toppings avalanching onto glowing steel. Breathe. The launch is pure technique, and technique can be learned in three moves.",
            science: "<b>Move 1 — Work fast:</b> dough sitting on a peel is actively gluing itself down. From \"dough lands on peel\" to \"launch\" should be under <b>2 minutes</b>. Top the pizza on the peel, not the counter."
          },
          {
            kicker: "Oven Mastery · Lesson 3",
            title: "The shake test",
            body: "Before you open the oven, give the peel a gentle jiggle. The pizza should slide freely, like a puck on ice. If it sticks, lift the edge and blow a puff of air underneath, or tuck a pinch of semolina under the stuck spot. <strong>Never launch a stuck pizza.</strong>",
            science: "<b>Move 2 — Semolina bearings:</b> a light, even dusting under the dough. Too much burns; too little grips. You want the dough floating on a layer of rolling grains."
          },
          {
            kicker: "Oven Mastery · Lesson 3",
            title: "Commit like a pizzaiolo",
            body: "Angle the peel down onto the far edge of the steel, then pull back with one smooth, confident stroke — like pulling a tablecloth from under dishes. Hesitation folds pizzas; commitment lands them. Close the door fast. You've got this.",
            science: "<b>Move 3 — The physics:</b> the pizza's inertia keeps it moving forward while the peel retreats. A slow, timid pull drags the pizza back with the peel. Speed is your friend."
          }
        ]
      },
      {
        id: "doneness",
        title: "Reading Doneness",
        minutes: 3,
        summary: "Colour, char and structure: when to pull it out.",
        slides: [
          {
            kicker: "Oven Mastery · Lesson 4",
            title: "Ignore the clock, read the pizza",
            body: "Recipes say \"6–8 minutes\", but ovens lie and steels vary. Learn to read the pizza itself. Three signals: <strong>rim colour</strong>, <strong>cheese behaviour</strong>, and <strong>base check</strong>.",
            science: "<b>Signal 1 — The rim:</b> deep golden brown with scattered dark spots (leoparding). Uniform pale = underbaked. Uniform black = your steel is too close to the grill."
          },
          {
            kicker: "Oven Mastery · Lesson 4",
            title: "Cheese tells the truth",
            body: "Perfect cheese is fully melted, bubbling at the edges of each pool, with the first golden-brown patches just appearing. If the cheese is browning everywhere but the rim is pale, drop the rack lower next time. If the rim is dark and the cheese looks raw, raise it.",
            science: "<b>Signal 2 — Bubbles:</b> steady lazy bubbling means moisture is done evaporating. Furious spitting means there's still too much water — often a sign of undrained fresh mozzarella."
          },
          {
            kicker: "Oven Mastery · Lesson 4",
            title: "The lift test",
            body: "Slide a spatula under the centre and lift. A finished pizza holds a <strong>gentle arc</strong> — firm at the rim with a slight, elegant droop at the tip. A floppy fold-in-half means an underdone centre; a rigid cracker means you left it too long. Aim for the arc. Then slice, admire, and log it in your Journal.",
            science: "<b>Rest 60 seconds before cutting:</b> steam pressure inside the crumb needs a moment to equalise. Cut immediately and the escaping steam softens your crisp base from below."
          }
        ]
      }
    ]
  }
];

export const TOTAL_LESSONS = PACKS.reduce((n, p) => n + p.lessons.length, 0);

export function findLesson(packId, lessonId) {
  const pack = PACKS.find(p => p.id === packId);
  if (!pack) return null;
  const idx = pack.lessons.findIndex(l => l.id === lessonId);
  if (idx < 0) return null;
  return { pack, lesson: pack.lessons[idx], index: idx };
}
