// Marco's Pizza Club — Pasta School lesson packs
// 4 packs. Each lesson is a set of story slides.
// Slide shape: { kicker, title, body, science?, image? }

export const PASTA_PACKS = [
  {
    id: "egg-flour",
    title: "The Egg & The Flour",
    subtitle: "The foundational science of fresh pasta dough",
    image: "./images/pasta/pack-egg-flour-sm.jpg",
    imageLg: "./images/pasta/pack-egg-flour.jpg",
    lessons: [
      {
        id: "golden-ratio",
        title: "The Golden Ratio",
        minutes: 2,
        summary: "The weight-based rule that makes fresh pasta foolproof.",
        slides: [
          {
            kicker: "The Egg & The Flour · Lesson 1",
            title: "Forget cups. Weigh it.",
            image: "./images/pasta/slide-flour-well.jpg",
            body: "Ciao! Marco here, trading the peel for a rolling pin. The golden rule of fresh pasta is weight: <strong>100 grams of fine 00 flour for every whole egg</strong>. That's it. That's the recipe.",
            science: "<b>The science:</b> a large egg weighs 55–60 g, giving a hydration of about 55–57% — firm enough to roll paper-thin, moist enough to seal and bind. The exact number shifts slightly depending on the hens."
          },
          {
            kicker: "The Egg & The Flour · Lesson 1",
            title: "Want it richer? Add yolks.",
            image: "./images/pasta/slide-extra-yolks.jpg",
            body: "Swap some whole eggs for pure yolks and the dough turns supple and golden. The extra fat tenderises it and gives that deep yellow glow that makes people think you're a genius.",
            science: "<b>The trade:</b> yolk fat shortens gluten strands, so extra-yolk dough is silkier but slightly less elastic. Great for tagliolini and filled shapes; keep more whole egg for sturdy ribbons like pappardelle."
          }
        ]
      },
      {
        id: "knead-rest",
        title: "The Knead and The Rest",
        minutes: 3,
        summary: "Why the dough fights you at first — and why walking away wins.",
        slides: [
          {
            kicker: "The Egg & The Flour · Lesson 2",
            title: "Dry and stubborn is correct",
            image: "./images/pasta/slide-knead-shaggy.jpg",
            body: "At first the dough will feel dry and stubborn. <strong>Don't panic and don't add water.</strong> Just keep pushing. You are aligning the gluten proteins to give the pasta its bite.",
            science: "<b>The science:</b> pasta dough is far drier than pizza dough by design. The low hydration is what lets you roll it to a translucent sheet without tearing — but it means gluten development takes honest elbow grease."
          },
          {
            kicker: "The Egg & The Flour · Lesson 2",
            title: "Smooth as a baby's cheek",
            image: "./images/pasta/slide-dough-wrapped.jpg",
            body: "After ten minutes of kneading it should feel smooth as a baby's cheek. Now wrap it tight and <strong>walk away for thirty minutes</strong>. The flour needs time to fully absorb the moisture, and the gluten needs to relax before we roll.",
            science: "<b>The science:</b> resting lets water migrate evenly through the dough (autolysis) and lets tensioned gluten strands relax. Skip the rest and the dough snaps back off the roller like an elastic band."
          }
        ]
      }
    ]
  },
  {
    id: "al-dente",
    title: "The Art of Al Dente",
    subtitle: "The science of cooking pasta perfectly",
    image: "./images/pasta/pack-al-dente-sm.jpg",
    imageLg: "./images/pasta/pack-al-dente.jpg",
    lessons: [
      {
        id: "salty-sea",
        title: "The Salty Sea",
        minutes: 2,
        summary: "Why your pasta water should taste like the Mediterranean.",
        slides: [
          {
            kicker: "The Art of Al Dente · Lesson 1",
            title: "Salt like you mean it",
            image: "./images/pasta/slide-salt-water.jpg",
            body: "Your pasta water should taste like the sea — aim for about <strong>one percent salinity</strong> (10 g per litre). This is the only chance to season the pasta itself, not just the sauce.",
            science: "<b>The science:</b> salt inhibits the starch on the pasta's surface from gelatinising too quickly, which stops the noodles from sticking together — and seasoned pasta needs less salt in the sauce."
          },
          {
            kicker: "The Art of Al Dente · Lesson 1",
            title: "Wait for the fury",
            image: "./images/pasta/slide-rolling-boil.jpg",
            body: "Never add the pasta until the water is <strong>furious</strong>. A gentle simmer lets pasta sit and stick; a rolling boil keeps it dancing while the heat sets the starches.",
            science: "<b>The science:</b> rapid convection keeps strands separated in the critical first minute, when surface starch is stickiest. It also recovers the temperature faster after the cold pasta drops in."
          }
        ]
      },
      {
        id: "perfect-bite",
        title: "The Perfect Bite",
        minutes: 3,
        summary: "What al dente actually means — and the one-minute rule.",
        slides: [
          {
            kicker: "The Art of Al Dente · Lesson 2",
            title: "To the tooth",
            image: "./images/pasta/slide-bite-test.jpg",
            body: "Al dente means <strong>'to the tooth'</strong>. Scientifically: the outer layer has fully gelatinised, but the very core stays slightly firm. Bite a strand — you want a thin, pale centre line, not a chalky white ring.",
            science: "<b>The science:</b> starch gelatinises from the outside in. That firm core is ungelatinised starch — it gives resistance, slows digestion, and keeps the pasta from turning to mush in the sauce."
          },
          {
            kicker: "The Art of Al Dente · Lesson 2",
            title: "Pull it early, finish in the pan",
            image: "./images/pasta/slide-toss-sauce.jpg",
            body: "Always pull the pasta from the water <strong>one minute before it's done</strong> and finish it directly in the sauce pan. The pasta acts like a sponge, absorbing the sauce instead of just wearing it like a coat.",
            science: "<b>The science:</b> pasta keeps cooking in the hot sauce, and its surface starch is still active — it thickens the sauce and glues it to every strand. This is how restaurant pasta tastes 'married', not dressed."
          }
        ]
      }
    ]
  },
  {
    id: "sauce-science",
    title: "The Sauce Science",
    subtitle: "The magic of emulsions",
    image: "./images/pasta/pack-sauce-science-sm.jpg",
    imageLg: "./images/pasta/pack-sauce-science.jpg",
    lessons: [
      {
        id: "liquid-gold",
        title: "Liquid Gold (Pasta Water)",
        minutes: 3,
        summary: "The cloudy secret ingredient in every great Italian kitchen.",
        slides: [
          {
            kicker: "The Sauce Science · Lesson 1",
            title: "Save the water!",
            image: "./images/pasta/slide-pasta-water.jpg",
            body: "Before you drain your pasta, <strong>save a mug of the water</strong>. That cloudy liquid is full of starch washed off the noodles. It is the secret ingredient in every great Italian kitchen — and most people pour it down the sink.",
            science: "<b>The science:</b> a litre of pasta water can carry 3–5 g of dissolved starch by the end of cooking. Cook the pasta in less water (or use a wide shallow pan) and you concentrate it further — more thickening power per ladle."
          },
          {
            kicker: "The Sauce Science · Lesson 1",
            title: "The emulsifier in disguise",
            image: "./images/pasta/slide-glossy-sauce.jpg",
            body: "That starchy water is an <strong>emulsifier</strong>. It binds the fat in your sauce — olive oil, butter, or cheese — with water, creating a glossy, creamy coating without a drop of actual cream.",
            science: "<b>The science:</b> starch molecules coat fat droplets and stop them separating, the same job egg yolk does in mayonnaise. Vigorous tossing over heat shears the fat into tiny droplets; the starch locks them in place. That's the shine."
          }
        ]
      }
    ]
  },
  {
    id: "squid-ink",
    title: "The Black Gold: Squid Ink",
    subtitle: "Umami from the deep — a Singapore sourcing special",
    image: "./images/pasta/pack-squid-ink-sm.jpg",
    imageLg: "./images/pasta/pack-squid-ink.jpg",
    lessons: [
      {
        id: "what-is-ink",
        title: "What Is Squid Ink?",
        minutes: 3,
        summary: "A defence mechanism that became culinary gold.",
        slides: [
          {
            kicker: "The Black Gold · Lesson 1",
            title: "The ocean's umami bomb",
            image: "./images/pasta/slide-black-pasta-bowl.jpg",
            body: "It's a cephalopod's defence mechanism, but to us it's pure culinary gold. The ink is mostly melanin for colour, but it's packed with <strong>glutamic acid</strong> — that means umami, a deep briny flavour that tastes like the ocean in the most pleasant way.",
            science: "<b>The science:</b> squid ink contains free glutamates and amino acids alongside melanin. The flavour is savoury-briny rather than fishy — closer to oyster than to anchovy."
          },
          {
            kicker: "The Black Gold · Lesson 1",
            title: "The cuttlefish secret",
            image: "./images/pasta/slide-cuttlefish-squid.jpg",
            body: "Here's a secret: most commercial 'squid ink' is actually <strong>cuttlefish ink</strong> (nero di seppia). Cuttlefish ink is smoother and more rounded, while true squid ink can taste slightly metallic. Both work beautifully — but cuttlefish is the traditional Sicilian and Venetian choice.",
            science: "<b>Buying note:</b> labels often say 'squid ink' regardless of the source. If the jar says <i>nero di seppia</i> or lists cuttlefish, you're getting the classic, gentler ink."
          }
        ]
      },
      {
        id: "choosing-ink",
        title: "Choosing Your Ink",
        minutes: 3,
        summary: "Jars, sachets, or the whole animal — how to buy well.",
        slides: [
          {
            kicker: "The Black Gold · Lesson 2",
            title: "Jar, sachet, or sac?",
            image: "./images/pasta/slide-ink-jar-sachet.jpg",
            body: "You have options. For regular use, buy a <strong>small glass jar</strong> (Spanish brands like Nortindal are the benchmark). The ingredient list should be short: ink, water, salt. Just trying it out? Look for <strong>4 g single-use foil sachets</strong> — no waste, no commitment.",
            science: "<b>Quality check:</b> good jarred ink is thick, glossy and jet black — never grey or watery. Once opened, keep it in the fridge and use within a few weeks, or freeze teaspoon-sized portions."
          },
          {
            kicker: "The Black Gold · Lesson 2",
            title: "The real experience",
            image: "./images/pasta/slide-ink-sacs.jpg",
            body: "Want the full experience? Harvest it fresh from the <strong>ink sac</strong> of a whole squid or cuttlefish — a small silvery pouch between the gills. It's messy, it stains everything including your teeth, and it is absolutely worth doing once.",
            science: "<b>Technique:</b> pull the sac free gently, pierce it into a small bowl with a teaspoon of water, and press out the ink. One cuttlefish sac yields roughly 1–2 teaspoons — enough for a dough batch."
          }
        ]
      },
      {
        id: "sg-sourcing",
        title: "Singapore Sourcing Guide",
        minutes: 3,
        summary: "Where to buy ink in Singapore — from supermarket to wet market.",
        slides: [
          {
            kicker: "The Black Gold · Lesson 3",
            title: "The grocer route",
            image: "./images/pasta/slide-sg-shelf.jpg",
            body: "In Singapore, foil sachets (like La Mar de Tapas, about <strong>$3.50 for two</strong>) are stocked at Ryan's Grocery. For jars, check the specialty grocers — <strong>Culina</strong> at COMO Dempsey and <strong>Little Farms</strong> are your best bets. Mainstream supermarkets rarely carry it, so call ahead.",
            science: "<b>Marco's tip:</b> sachets are perfect for the Nero di Seppia sauce recipe (10 g), while a jar makes sense once you're making black dough regularly (20 g per batch)."
          },
          {
            kicker: "The Black Gold · Lesson 3",
            title: "The wet market route",
            image: "./images/pasta/slide-wet-market.jpg",
            body: "For the freshest ink, head to the wet markets — <strong>Tekka</strong> or <strong>Tiong Bahru</strong>. Sotong is abundant and cheap here. Just ask your friendly fishmonger for whole cuttlefish and tell them to <strong>please leave the ink sac intact</strong>!",
            science: "<b>Bonus:</b> you get the ink AND 300 g of fresh squid rings for the sauce in one purchase — exactly what the Nero di Seppia Spaghetti recipe needs. Go early; the best sotong is gone by 9 am."
          }
        ]
      },
      {
        id: "ink-in-dough",
        title: "Ink in the Dough",
        minutes: 3,
        summary: "The ratios and technique for jet-black fresh pasta.",
        slides: [
          {
            kicker: "The Black Gold · Lesson 4",
            title: "Blend it with the eggs",
            image: "./images/pasta/slide-ink-eggs.jpg",
            body: "To make black dough, use about <strong>4 teaspoons (20 g) of ink for every 280 g of flour</strong>. The trick: blend the ink thoroughly with your eggs first, so the colour distributes evenly — no grey marbling.",
            science: "<b>Why it works:</b> ink is water-based, so it disperses in the egg rather than the flour. Whisk until the mixture is uniformly black before it touches the flour and every strand comes out evenly jet-dark."
          },
          {
            kicker: "The Black Gold · Lesson 4",
            title: "Ink counts as liquid",
            image: "./images/pasta/slide-black-dough.jpg",
            body: "Remember: <strong>the ink counts as liquid</strong>! You may need a touch more flour to balance the dough. It will smell strongly of the sea while raw — don't worry. The final taste is incredibly subtle and elegant.",
            science: "<b>The science:</b> 20 g of ink adds roughly 15 g of water to the dough, nudging hydration up ~5%. If the dough feels tacky after kneading, work in flour a tablespoon at a time until it's smooth and firm again."
          }
        ]
      }
    ]
  }
];

export const TOTAL_PASTA_LESSONS = PASTA_PACKS.reduce((n, p) => n + p.lessons.length, 0);

export function findPastaLesson(packId, lessonId) {
  const pack = PASTA_PACKS.find(p => p.id === packId);
  if (!pack) return null;
  const idx = pack.lessons.findIndex(l => l.id === lessonId);
  if (idx < 0) return null;
  return { pack, lesson: pack.lessons[idx], index: idx };
}
