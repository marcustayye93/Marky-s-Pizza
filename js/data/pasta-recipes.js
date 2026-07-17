// Marco's Pizza Club — Pasta recipes
// Same shape as RECIPES in recipes.js. Stovetop recipes carry `noOven: true`
// so the cook flow skips the oven-choice screen; the lasagne keeps it.

export const PASTA_RECIPES = [
  {
    id: "carbonara",
    title: "Classic Carbonara",
    tagline: "A masterclass in residual heat and emulsion",
    image: "./images/pasta/recipe-carbonara-sm.jpg",
    imageLg: "./images/pasta/recipe-carbonara.jpg",
    chips: ["Serves 2", "25 min", "Stovetop", "No cream — ever"],
    noOven: true,
    intro: "No cream. No garlic. No peas. Carbonara is eggs, cheese, cured pork and pepper — held together by technique alone. Master the temper and you'll never fear it again.",
    science: "The sauce is a delicate emulsion: egg proteins thicken at 65–70 °C, but scramble at 75 °C. Residual heat from the pasta plus starchy water keeps you in the safe zone — that's why the pan comes off the heat before the eggs go in.",
    ingredients: [
      "200 g spaghetti (dried or fresh)",
      "100 g guanciale (or pancetta)",
      "50 g Pecorino Romano, finely grated",
      "50 g Parmigiano Reggiano, finely grated",
      "3 large egg yolks + 1 whole egg",
      "1 tbsp coarse sea salt",
      "Lots of freshly cracked black pepper"
    ],
    steps: [
      {
        title: "The prep",
        use: ["100 g guanciale", "50 g Pecorino, grated", "50 g Parmigiano, grated", "3 egg yolks + 1 whole egg"],
        actions: [
          "Slice the guanciale into thick matchsticks.",
          "In a large bowl, whisk the whole egg and the yolks until smooth.",
          "Stir the grated cheeses into the eggs until you have a thick paste. Set aside."
        ],
        note: "The paste looks too thick now — pasta water will loosen it into silk later."
      },
      {
        title: "Render the fat",
        use: ["The sliced guanciale"],
        actions: [
          "Place a large, cold frying pan on the stove over medium-low heat.",
          "Add the guanciale. Let the fat render slowly until the meat is crispy but not burnt — about 8 minutes.",
          "Remove the pan from the heat. Leave the fat in the pan."
        ],
        note: "Starting cold renders the fat gently instead of scorching the outside.",
        minutes: 8
      },
      {
        title: "The boil",
        use: ["200 g spaghetti", "1 tbsp coarse sea salt"],
        actions: [
          "Bring a large pot of water to a rolling boil. Add the salt.",
          "Drop in the spaghetti. Cook until just before al dente — check the packet time and subtract two minutes."
        ],
        note: "The pasta finishes cooking in the pan, so pull it early.",
        minutes: 8,
        learn: { pack: "al-dente", lesson: "perfect-bite", slide: 0, label: "The Perfect Bite — why al dente matters" }
      },
      {
        title: "The marriage",
        use: ["1 ladle starchy pasta water", "The cooked pasta", "The egg & cheese paste", "Lots of black pepper"],
        actions: [
          "Transfer the hot pasta directly into the pan with the guanciale fat. Toss well.",
          "Add half a ladle of pasta water to the egg paste and whisk quickly to temper the eggs.",
          "Pour the egg mixture over the pasta. Toss vigorously off the heat until a creamy sauce forms — add more pasta water if it's too thick.",
          "Finish with a landslide of black pepper and serve immediately."
        ],
        note: "OFF the heat. The pan's residual warmth is exactly enough — direct flame means scrambled eggs.",
        learn: { pack: "sauce-science", lesson: "liquid-gold", slide: 0, label: "Liquid Gold — the pasta water secret" }
      }
    ]
  },
  {
    id: "tagliatelle-butter-sage",
    title: "Fresh Tagliatelle, Butter & Sage",
    tagline: "The simplest test of your fresh dough skills",
    image: "./images/pasta/recipe-tagliatelle-butter-sage-sm.jpg",
    imageLg: "./images/pasta/recipe-tagliatelle-butter-sage.jpg",
    chips: ["Serves 2", "1 h incl. rest", "Fresh dough", "3 ingredients"],
    noOven: true,
    intro: "Burro e salvia is how Italians judge fresh pasta: nowhere for bad dough to hide. If your tagliatelle can carry butter and sage alone, your dough has arrived.",
    science: "Foaming butter is the visual cue that its water has boiled off — from here the milk solids begin to toast, adding nutty notes. Sage's aromatic oils infuse into the fat in seconds, which is why the leaves go in right at the foam.",
    ingredients: [
      "200 g 00 flour",
      "2 whole eggs",
      "50 g unsalted butter",
      "8 fresh sage leaves",
      "1 tbsp coarse sea salt",
      "Extra flour for dusting"
    ],
    steps: [
      {
        title: "The dough",
        use: ["200 g 00 flour", "2 whole eggs"],
        actions: [
          "Mound the flour on the bench and make a well in the centre.",
          "Crack the eggs into the well. Beat them gently with a fork, slowly pulling in flour from the edges.",
          "Once it forms a shaggy dough, knead by hand for ten minutes until smooth."
        ],
        note: "Dry and stubborn at first is correct — don't add water.",
        minutes: 15,
        learn: { pack: "egg-flour", lesson: "knead-rest", slide: 0, label: "The Knead and The Rest" }
      },
      {
        title: "The rest and roll",
        use: ["The rested dough", "Extra flour for dusting"],
        actions: [
          "Wrap the dough and let it rest for 30 minutes at room temperature.",
          "Cut the dough in half. Roll it through a pasta machine, folding and rolling until you reach the second-thinnest setting.",
          "Dust with flour, fold loosely, and cut into 1 cm wide ribbons."
        ],
        note: "No machine? A rolling pin and patience work — roll until you can see your hand through the sheet.",
        minutes: 45
      },
      {
        title: "The quick cook",
        use: ["50 g unsalted butter", "8 sage leaves", "1 tbsp sea salt"],
        actions: [
          "Melt the butter in a wide pan over medium heat until it foams. Add the sage leaves and let them crisp slightly.",
          "Boil the pasta in heavily salted water for exactly 2 minutes.",
          "Transfer the pasta to the butter pan with a splash of pasta water. Toss vigorously until glossy. Serve immediately."
        ],
        note: "Fresh pasta cooks in a blink — stand by the pot.",
        minutes: 5,
        learn: { pack: "sauce-science", lesson: "liquid-gold", slide: 1, label: "The emulsifier in disguise" }
      }
    ]
  },
  {
    id: "cacio-e-pepe",
    title: "Cacio e Pepe",
    tagline: "The three-ingredient Roman test of starch and temperature",
    image: "./images/pasta/recipe-cacio-e-pepe-sm.jpg",
    imageLg: "./images/pasta/recipe-cacio-e-pepe.jpg",
    chips: ["Serves 2", "20 min", "Stovetop", "3 ingredients"],
    noOven: true,
    intro: "Cheese, pepper, pasta. Rome's most deceptive dish — three ingredients and a hundred ways to end up with clumps. The starch concentration is your safety net.",
    science: "Pecorino clumps when its proteins hit high heat and seize. The fix is twofold: concentrate the pasta water's starch by using less water, and make the cheese paste away from direct heat so it melts into the sauce instead of splitting.",
    ingredients: [
      "200 g tonnarelli or spaghetti",
      "100 g Pecorino Romano, very finely grated",
      "2 tsp whole black peppercorns",
      "1 tsp coarse sea salt"
    ],
    steps: [
      {
        title: "Toast the pepper",
        use: ["2 tsp whole black peppercorns"],
        actions: [
          "Crush the peppercorns coarsely in a mortar or under a heavy pan.",
          "Toast the crushed pepper in a large, dry frying pan over medium heat for 2 minutes until fragrant.",
          "Remove from heat and set aside."
        ],
        note: "Toasting blooms the pepper's aromatics — this is where the dish's backbone comes from.",
        minutes: 3
      },
      {
        title: "The shallow boil",
        use: ["200 g tonnarelli or spaghetti", "1 tsp coarse sea salt"],
        actions: [
          "Bring a wide, shallow pan of water to a boil — use less water than usual to concentrate the starch. Add the salt.",
          "Add the pasta and cook until very al dente, about 3 minutes before packet time."
        ],
        note: "Less water = starchier water = a sauce that actually binds.",
        minutes: 7,
        learn: { pack: "sauce-science", lesson: "liquid-gold", slide: 0, label: "Liquid Gold — concentrated starch" }
      },
      {
        title: "The emulsion",
        use: ["100 g Pecorino, finely grated", "The toasted pepper", "The starchy pasta water"],
        actions: [
          "Ladle a little hot pasta water into the toasted pepper pan. Transfer the pasta into this pan and finish cooking it in the pepper water.",
          "In a bowl, slowly whisk a few spoons of cooler pasta water into the grated Pecorino to form a thick, smooth paste.",
          "Remove the pasta pan from the heat. Stir in the cheese paste vigorously until a creamy, glossy sauce coats every strand."
        ],
        note: "Cooler water for the paste — hot water seizes the cheese instantly.",
        minutes: 5
      }
    ]
  },
  {
    id: "ragu",
    title: "Tagliatelle al Ragù",
    tagline: "The slow Sunday meat sauce from Bologna — no tomatoes, just time",
    image: "./images/pasta/recipe-ragu-sm.jpg",
    imageLg: "./images/pasta/recipe-ragu.jpg",
    chips: ["Serves 4", "3.5 h", "Stovetop", "Sunday project"],
    noOven: true,
    intro: "Real ragù bolognese is barely red. It's meat, soffritto, wine, milk and hours of patience. The tomato is a supporting actor, not the star.",
    science: "Three hours of sub-simmer heat slowly converts tough collagen into gelatine, which gives the sauce its silky body. The milk step isn't odd — its proteins and lactose tenderise the meat and round off the wine's acidity.",
    ingredients: [
      "300 g coarse minced beef (chuck is best)",
      "150 g minced pork",
      "50 g pancetta, minced",
      "50 g butter + 1 tbsp olive oil",
      "1 small onion, 1 celery stalk, 1 small carrot — all finely diced",
      "120 ml dry white wine",
      "120 ml whole milk",
      "2 tbsp tomato paste (concentrato)",
      "250 ml beef or chicken stock",
      "300 g fresh tagliatelle",
      "Parmigiano Reggiano for serving"
    ],
    steps: [
      {
        title: "The soffritto",
        use: ["50 g butter + 1 tbsp olive oil", "50 g pancetta, minced", "Diced onion, celery, carrot"],
        actions: [
          "Melt the butter and oil in a heavy pot over low heat.",
          "Add the pancetta and render for 5 minutes.",
          "Add the onion, celery, and carrot. Cook very slowly for 15 minutes until soft and sweet. Do not let them brown."
        ],
        note: "The soffritto is the flavour foundation — rushing it is the number one ragù mistake.",
        minutes: 20
      },
      {
        title: "The meat and wine",
        use: ["300 g minced beef", "150 g minced pork", "120 ml dry white wine"],
        actions: [
          "Turn the heat up to medium-high. Add the beef and pork.",
          "Cook until the meat is browned and all the liquid has evaporated.",
          "Pour in the white wine and scrape the bottom of the pot. Let it bubble until the smell of alcohol is gone."
        ],
        note: "White wine, not red — Bologna's way. It lifts without staining the sauce.",
        minutes: 15
      },
      {
        title: "The slow simmer",
        use: ["120 ml whole milk", "2 tbsp tomato paste", "250 ml stock"],
        actions: [
          "Stir in the milk and let it reduce completely.",
          "Stir in the tomato paste, then add the stock.",
          "Turn the heat to the lowest setting, cover partially, and simmer for at least 3 hours. Check occasionally and add a splash of water if it looks dry."
        ],
        note: "The surface should barely tremble — a lazy bubble every few seconds, no more.",
        minutes: 180
      },
      {
        title: "The toss",
        use: ["300 g fresh tagliatelle", "The finished ragù", "Parmigiano for serving"],
        actions: [
          "Boil the fresh tagliatelle in salted water for 2 to 3 minutes.",
          "Transfer the pasta to a wide pan with a few ladles of the hot ragù. Toss gently to coat.",
          "Serve immediately with freshly grated Parmigiano."
        ],
        note: "Ragù coats tagliatelle; it never drowns it. Sauce clings, plate stays clean.",
        minutes: 5,
        learn: { pack: "al-dente", lesson: "perfect-bite", slide: 1, label: "Finish in the pan" }
      }
    ]
  },
  {
    id: "aglio-olio",
    title: "Aglio e Olio",
    tagline: "Five ingredients, infinite technique — garlic colour is everything",
    image: "./images/pasta/recipe-aglio-olio-sm.jpg",
    imageLg: "./images/pasta/recipe-aglio-olio.jpg",
    chips: ["Serves 2", "15 min", "Stovetop", "Midnight classic"],
    noOven: true,
    intro: "The midnight pasta of Naples. Its entire success hangs on one visual cue: garlic that stops at pale blonde. One shade darker and you start again.",
    science: "Garlic's sugars caramelise fast and its sulfur compounds turn bitter beyond light gold. Starting in cold oil gives you a slow, controllable infusion — the garlic flavours the oil rather than frying in it.",
    ingredients: [
      "200 g spaghetti",
      "80 ml good extra virgin olive oil",
      "4 large garlic cloves, thinly sliced",
      "1 tsp dried chilli flakes",
      "1 handful fresh parsley, finely chopped",
      "1 tbsp coarse sea salt"
    ],
    steps: [
      {
        title: "The garlic infusion",
        use: ["80 ml extra virgin olive oil", "4 garlic cloves, sliced", "1 tsp chilli flakes"],
        actions: [
          "Place the olive oil and sliced garlic in a cold, wide frying pan.",
          "Turn the heat to medium-low. Let the garlic slowly come up to temperature and sizzle gently.",
          "When the garlic turns pale blonde — not brown! — add the chilli flakes and remove the pan from the heat immediately."
        ],
        note: "Pale blonde. The garlic keeps cooking in the hot oil even off the heat.",
        minutes: 6
      },
      {
        title: "The pasta",
        use: ["200 g spaghetti", "1 tbsp coarse sea salt"],
        actions: [
          "Boil the spaghetti in salted water until just before al dente.",
          "Save a large mug of the starchy pasta water before draining."
        ],
        note: "That mug of cloudy water IS the sauce — don't tip it away.",
        minutes: 8,
        learn: { pack: "al-dente", lesson: "perfect-bite", slide: 1, label: "Pull it early, finish in the pan" }
      },
      {
        title: "The emulsion",
        use: ["The infused garlic oil", "The cooked pasta", "1 handful chopped parsley"],
        actions: [
          "Return the garlic oil pan to medium heat. Add a splash of the starchy pasta water to stop the garlic from cooking further.",
          "Add the pasta to the pan. Toss vigorously, adding more pasta water as needed, until the oil and water emulsify into a creamy sauce.",
          "Stir in the chopped parsley and serve immediately."
        ],
        note: "Vigorous tossing is what turns oil + water into cream. Lazy tossing = oily pasta.",
        minutes: 3,
        learn: { pack: "sauce-science", lesson: "liquid-gold", slide: 1, label: "The emulsifier in disguise" }
      }
    ]
  },
  {
    id: "squid-ink-tagliolini",
    title: "Squid Ink Tagliolini with Prawns",
    tagline: "The hero recipe — fresh black dough meets sweet seafood",
    image: "./images/pasta/recipe-squid-ink-tagliolini-sm.jpg",
    imageLg: "./images/pasta/recipe-squid-ink-tagliolini.jpg",
    chips: ["Serves 2–3", "1.5 h incl. rest", "Fresh black dough", "Show-stopper"],
    noOven: true,
    intro: "This is the one you invite people over for. Jet-black ribbons, sweet prawns, and a story to tell at the table. The ink goes in the dough itself — start with the Black Gold lessons if you haven't.",
    science: "Ink counts as liquid: 20 g of ink adds roughly 15 g of water, so this dough uses extra yolks for structure. The ink's glutamates season the pasta from within — the flavour is elegant and briny, never fishy.",
    ingredients: [
      "280 g 00 flour",
      "2 whole eggs + 4 egg yolks",
      "20 g squid or cuttlefish ink (about 4 tsp)",
      "12 large prawns, peeled and deveined",
      "10 cherry tomatoes, halved",
      "2 tbsp olive oil + 1 tbsp butter",
      "1 garlic clove, smashed",
      "60 ml dry white wine",
      "Fresh parsley",
      "Extra flour for dusting"
    ],
    steps: [
      {
        title: "The black dough",
        use: ["280 g 00 flour", "2 whole eggs + 4 yolks", "20 g squid ink"],
        actions: [
          "In a bowl, whisk the whole eggs, yolks, and squid ink together until completely uniform and black.",
          "Mound the flour on the bench, make a well, and pour in the black egg mixture.",
          "Gradually mix the flour into the liquid. Knead for 10 minutes until smooth, then wrap and rest for 30 minutes."
        ],
        note: "It will smell like the sea while raw. Trust the process — the cooked flavour is subtle.",
        minutes: 45,
        learn: { pack: "squid-ink", lesson: "ink-in-dough", slide: 0, label: "Ink in the Dough — ratios & technique" }
      },
      {
        title: "Roll and cut",
        use: ["The rested black dough", "Extra flour for dusting"],
        actions: [
          "Roll the dough through a pasta machine to the second-thinnest setting.",
          "Cut the sheets into thin tagliolini ribbons, about 2–3 mm wide.",
          "Dust with flour and form into loose nests."
        ],
        note: "Wear an apron you don't love. Ink dough is beautiful and it knows it.",
        minutes: 20
      },
      {
        title: "The prawn sauce",
        use: ["2 tbsp olive oil", "1 garlic clove, smashed", "12 prawns", "60 ml white wine", "10 cherry tomatoes, halved"],
        actions: [
          "Heat the olive oil and smashed garlic in a wide pan over medium heat until fragrant. Remove the garlic.",
          "Add the prawns and sear for 1 minute per side. Remove the prawns and set aside.",
          "Add the cherry tomatoes to the pan. Pour in the white wine and let it reduce by half, crushing the tomatoes slightly to release their juices."
        ],
        note: "Prawns overcook in a heartbeat — they finish in the final toss.",
        minutes: 8
      },
      {
        title: "The assembly",
        use: ["The fresh tagliolini", "The prawn sauce", "1 tbsp butter", "Fresh parsley"],
        actions: [
          "Boil the fresh tagliolini in salted water for exactly 2 minutes.",
          "Transfer the pasta to the tomato sauce pan with a splash of pasta water. Add the butter and toss vigorously.",
          "Return the prawns to the pan to warm through. Garnish with parsley and serve."
        ],
        note: "Black ribbons, pink prawns, red tomatoes — let the plate do the talking.",
        minutes: 5,
        learn: { pack: "sauce-science", lesson: "liquid-gold", slide: 1, label: "The glossy finish" }
      }
    ]
  },
  {
    id: "nero-spaghetti",
    title: "Nero di Seppia Spaghetti",
    tagline: "The Venetian way — store-bought pasta, rich inky sauce",
    image: "./images/pasta/recipe-nero-spaghetti-sm.jpg",
    imageLg: "./images/pasta/recipe-nero-spaghetti.jpg",
    chips: ["Serves 2", "40 min", "Stovetop", "No pasta machine"],
    noOven: true,
    intro: "The easier road to black pasta: the ink lives in the sauce, not the dough. This is how Venice does it — dried spaghetti, tender squid, and a glaze the colour of a canal at midnight.",
    science: "Ink is naturally salty and savoury, so taste before seasoning. The short 2-minute sear followed by a gentle simmer keeps the squid tender — squid toughens between 3 and 15 minutes of cooking, then relaxes again past 20.",
    ingredients: [
      "200 g dried spaghetti",
      "300 g fresh squid or cuttlefish, cleaned and cut into small rings",
      "10 g squid or cuttlefish ink (about 2 tsp, jar or sachet)",
      "3 tbsp olive oil",
      "1 small onion, finely chopped",
      "1 garlic clove, minced",
      "60 ml dry white wine",
      "100 ml fish stock or water"
    ],
    steps: [
      {
        title: "The base",
        use: ["3 tbsp olive oil", "1 small onion, chopped", "1 garlic clove, minced", "300 g squid rings"],
        actions: [
          "Heat the olive oil in a wide pan over medium heat.",
          "Add the onion and garlic. Sauté gently until soft and translucent, about 5 minutes.",
          "Add the squid rings and cook for 2 minutes until they turn opaque."
        ],
        note: "Fresh sotong from the wet market? Ask the fishmonger to keep the ink sac — free ink!",
        minutes: 8,
        learn: { pack: "squid-ink", lesson: "sg-sourcing", slide: 1, label: "The wet market route" }
      },
      {
        title: "The ink sauce",
        use: ["60 ml dry white wine", "10 g squid ink", "100 ml fish stock or water"],
        actions: [
          "Pour in the white wine and let it bubble until the alcohol smell dissipates.",
          "Lower the heat. Stir in the squid ink and the stock.",
          "Simmer gently for 15 to 20 minutes until the squid is tender and the sauce has thickened into a rich, black glaze. Taste before salting — the ink is naturally salty."
        ],
        note: "The sauce is ready when it coats the back of a spoon in glossy black.",
        minutes: 20,
        learn: { pack: "squid-ink", lesson: "what-is-ink", slide: 0, label: "What Is Squid Ink?" }
      },
      {
        title: "The toss",
        use: ["200 g dried spaghetti", "The inky sauce"],
        actions: [
          "Boil the spaghetti in salted water until just before al dente.",
          "Transfer the pasta directly into the black sauce pan.",
          "Toss vigorously over low heat for 1 minute until the pasta absorbs the flavour and turns jet black. Serve immediately."
        ],
        note: "A lemon wedge on the side cuts the richness beautifully.",
        minutes: 10
      }
    ]
  },
  {
    id: "seafood-linguine",
    title: "Seafood Linguine",
    tagline: "White wine, fresh shellfish, and the strict no-cheese rule",
    image: "./images/pasta/recipe-seafood-linguine-sm.jpg",
    imageLg: "./images/pasta/recipe-seafood-linguine.jpg",
    chips: ["Serves 2", "35 min", "Stovetop", "No cheese!"],
    noOven: true,
    intro: "Linguine allo scoglio — pasta 'of the rocks'. The shellfish make their own broth, the pasta drinks it up, and cheese is banned by ancient coastal law.",
    science: "Clams and mussels release concentrated, briny glutamate-rich liquor as they steam open — a ready-made stock. Cheese's casein would coat and mask those delicate marine flavours, which is why Italians never mix the two.",
    ingredients: [
      "200 g dried linguine",
      "200 g fresh clams",
      "200 g fresh mussels",
      "8 large prawns, peeled",
      "2 tbsp olive oil",
      "2 garlic cloves, thinly sliced",
      "120 ml dry white wine",
      "1 handful fresh parsley, chopped"
    ],
    steps: [
      {
        title: "The shellfish prep",
        use: ["200 g clams", "200 g mussels", "8 prawns, peeled"],
        actions: [
          "Scrub the clams and mussels under cold water. Discard any that are open and refuse to close when tapped.",
          "Ensure the prawns are deveined. Set all seafood aside in the fridge."
        ],
        note: "An open shell that won't close is a dead shell — out it goes.",
        minutes: 10
      },
      {
        title: "The steam",
        use: ["2 tbsp olive oil", "2 garlic cloves, sliced", "120 ml white wine", "The clams and mussels"],
        actions: [
          "Heat the olive oil and garlic in a large, deep pan with a tight-fitting lid over medium heat.",
          "When the garlic is fragrant, add the clams, mussels, and white wine.",
          "Cover immediately and steam for 3 to 4 minutes until the shells open. Discard any that remain closed.",
          "Use a slotted spoon to remove the shellfish to a bowl, leaving the flavourful broth in the pan."
        ],
        note: "That broth left in the pan is liquid treasure — the whole dish is built on it.",
        minutes: 6
      },
      {
        title: "The pasta and prawns",
        use: ["200 g dried linguine", "The prawns", "1 handful chopped parsley"],
        actions: [
          "Boil the linguine in salted water until 2 minutes before al dente.",
          "While the pasta cooks, return the seafood broth pan to medium heat and add the prawns. Cook for 2 minutes until pink.",
          "Transfer the linguine directly into the broth pan. Toss vigorously to emulsify the starchy water with the seafood juices.",
          "Return the clams and mussels to the pan, toss with fresh parsley, and serve immediately. Never add cheese!"
        ],
        note: "No cheese here — it would mask the delicate shellfish broth. Trust the coast on this one.",
        minutes: 12,
        learn: { pack: "al-dente", lesson: "perfect-bite", slide: 1, label: "Finish in the pan" }
      }
    ]
  },
  {
    id: "bolognese",
    title: "Spaghetti Bolognese",
    tagline: "The global comfort classic — faster and tomato-rich",
    image: "./images/pasta/recipe-bolognese-sm.jpg",
    imageLg: "./images/pasta/recipe-bolognese.jpg",
    chips: ["Serves 4", "50 min", "Stovetop", "Weeknight hero"],
    noOven: true,
    intro: "Purists will tell you this dish doesn't exist in Bologna — and they're right. But done well, spag bol is honest, generous comfort food. This is the weeknight cousin of the 3-hour ragù.",
    science: "The 30-minute simmer is the minimum for the tomato's raw acidity to mellow and the flavours to fuse. Browning the mince properly first (Maillard reaction) is what separates rich bolognese from grey mince in tomato water.",
    ingredients: [
      "400 g dried spaghetti",
      "400 g beef mince",
      "2 tbsp olive oil",
      "1 small onion, finely diced",
      "2 garlic cloves, minced",
      "1 tbsp tomato paste",
      "400 g tinned crushed tomatoes",
      "1 tsp dried oregano",
      "1 beef stock cube",
      "1 tbsp coarse sea salt",
      "Grated Parmesan to serve"
    ],
    steps: [
      {
        title: "The base",
        use: ["2 tbsp olive oil", "1 onion, diced", "2 garlic cloves, minced", "400 g beef mince"],
        actions: [
          "Heat the olive oil in a large pan over medium heat.",
          "Add the onion and garlic, cooking until softened — about 5 minutes.",
          "Turn the heat up slightly, add the beef mince, and cook until browned, breaking it up with a wooden spoon."
        ],
        note: "Let the mince actually brown — colour is flavour.",
        minutes: 12
      },
      {
        title: "The red sauce",
        use: ["1 tbsp tomato paste", "400 g crushed tomatoes", "1 tsp dried oregano", "1 beef stock cube"],
        actions: [
          "Stir the tomato paste into the browned meat and cook for 1 minute.",
          "Pour in the crushed tomatoes, oregano, and crumble in the stock cube.",
          "Lower the heat, cover partially, and let it simmer gently for 30 minutes to develop the flavours."
        ],
        note: "Cooking the paste first caramelises it and kills the tinny edge.",
        minutes: 32
      },
      {
        title: "The pasta and serve",
        use: ["400 g dried spaghetti", "1 tbsp coarse sea salt", "Grated Parmesan"],
        actions: [
          "Boil the spaghetti in salted water until al dente.",
          "Drain the pasta (saving a little water) and toss it through the Bolognese sauce until well coated.",
          "Serve immediately with plenty of grated Parmesan on top."
        ],
        note: "Toss the pasta IN the sauce — never sauce ladled on naked pasta.",
        minutes: 10,
        learn: { pack: "al-dente", lesson: "perfect-bite", slide: 0, label: "The Perfect Bite" }
      }
    ]
  },
  {
    id: "lasagne-pasta",
    title: "Marco's Sunday Lasagne",
    tagline: "Meat sauce, béchamel, pasta — a baked masterpiece",
    image: "./images/pasta/recipe-lasagne-sm.jpg",
    imageLg: "./images/pasta/recipe-lasagne.jpg",
    chips: ["Serves 6", "1.5 h + sauce", "Oven or combi", "Sunday project"],
    intro: "The cathedral of pasta dishes. Layers of meat sauce, silky béchamel and pasta, baked until the top blisters gold. Use the slow ragù for the full Sunday experience, or the quicker bolognese on a busy week.",
    science: "Béchamel is a starch-thickened emulsion: cooking the roux removes the raw flour taste, and gradual milk addition prevents lumps. In the bake, the dry pasta sheets hydrate by stealing moisture from both sauces — which is why a watery meat sauce means a collapsing slice.",
    ingredients: [
      "1 batch ragù (see Tagliatelle al Ragù) or bolognese sauce (see Spaghetti Bolognese)",
      "250 g dried lasagne sheets",
      "50 g butter",
      "50 g plain flour",
      "500 ml whole milk",
      "A pinch of ground nutmeg",
      "100 g grated mozzarella",
      "50 g grated Parmesan"
    ],
    steps: [
      {
        title: "The meat sauce",
        use: ["1 batch ragù or bolognese sauce"],
        actions: [
          "Prepare the meat sauce in advance — it needs to be thick, not watery, so the lasagne holds its shape when sliced.",
          "Set aside to cool slightly."
        ],
        note: "Slow ragù = deeper flavour. Bolognese = faster Sunday. Both work beautifully."
      },
      {
        title: "The béchamel sauce",
        use: ["50 g butter", "50 g plain flour", "500 ml whole milk", "A pinch of nutmeg"],
        actions: [
          "Melt the butter in a saucepan over medium heat. Whisk in the flour and cook for 1 minute to form a paste (roux).",
          "Gradually whisk in the milk, a little at a time, until smooth.",
          "Bring to a gentle simmer, whisking constantly until thickened. Stir in the nutmeg and season with salt."
        ],
        note: "Patience with the milk — a splash at a time keeps it lump-free.",
        minutes: 12
      },
      {
        title: "The assembly",
        use: ["250 g lasagne sheets", "100 g grated mozzarella", "50 g grated Parmesan"],
        actions: [
          "Spoon a thin layer of meat sauce into the base of a baking dish.",
          "Cover with a single layer of lasagne sheets — break them to fit if needed.",
          "Add another layer of meat sauce, then drizzle over some béchamel. Repeat these layers (pasta, meat, béchamel) until the dish is full, finishing with a layer of béchamel on top.",
          "Scatter the mozzarella and Parmesan evenly over the final béchamel layer."
        ],
        note: "Sauce touches the dish first — it stops the bottom layer from scorching.",
        minutes: 15
      },
      {
        title: "The bake",
        use: ["The assembled lasagne"],
        actions: [
          "Bake at 180 °C for 35–40 minutes until the top is golden and bubbling.",
          "Let the lasagne rest for 10 minutes before slicing so the layers set."
        ],
        note: "The 10-minute rest is not optional — cut early and the layers slide apart.",
        minutes: 50,
        combi: {
          actions: [
            "Use Combination mode: Convection 180 °C + 300 W microwave, for about 25 minutes. The microwave energy speeds the middle while convection crisps the cheese top.",
            "If the top needs more colour, finish with 3–4 minutes of grill.",
            "Let the lasagne rest for 10 minutes before slicing so the layers set."
          ],
          note: "Timings are calibrated for a Panasonic CS89-class combi (230 °C convection max). Other models vary — watch the top and aim for a piping-hot centre (75–80 °C on a probe) before the grill finish.",
          minutes: 40
        }
      }
    ]
  },
  {
    id: "mushroom-soup",
    title: "Rich Umami Mushroom Soup",
    tagline: "Deep, earthy and velvety — the umami trifecta",
    image: "./images/pasta/recipe-mushroom-soup-sm.jpg",
    imageLg: "./images/pasta/recipe-mushroom-soup.jpg",
    chips: ["Serves 4", "1 h", "Stovetop", "Vegetarian option"],
    noOven: true,
    intro: "Not pasta, but it belongs in the Italian kitchen: a mushroom soup built on three layers of umami — dried porcini, deeply browned fresh mushrooms, and a quiet dash of soy sauce nobody will ever detect.",
    science: "Dried porcini concentrate glutamates far beyond fresh mushrooms; browning fresh mushrooms hard (before salting!) drives the Maillard reaction; and dark soy adds fermented glutamates. Three umami sources, one bowl.",
    ingredients: [
      "20 g dried porcini mushrooms + 500 ml boiling water",
      "500 g mixed fresh mushrooms (button, cremini, shiitake), sliced",
      "50 g butter + 1 tbsp olive oil",
      "1 large onion, finely diced",
      "2 garlic cloves, minced",
      "1 tbsp plain flour",
      "1 tbsp dark soy sauce",
      "500 ml vegetable or chicken stock",
      "100 ml double cream",
      "Fresh thyme or parsley, chopped",
      "Truffle oil (optional)"
    ],
    steps: [
      {
        title: "The porcini broth",
        use: ["20 g dried porcini", "500 ml boiling water"],
        actions: [
          "Place the dried porcini in a heatproof bowl.",
          "Pour the boiling water over them and cover with a plate.",
          "Let them steep for 20 minutes to create a dark, intensely mushroom-flavoured broth."
        ],
        note: "This broth is umami layer number one — the soup's backbone.",
        minutes: 20
      },
      {
        title: "The sauté",
        use: ["50 g butter + 1 tbsp olive oil", "1 onion, diced", "2 garlic cloves, minced", "500 g mixed mushrooms, sliced"],
        actions: [
          "Melt the butter and oil in a large pot over medium heat.",
          "Add the onion and garlic, cooking until soft and sweet — about 8 minutes.",
          "Turn the heat to medium-high and add the fresh mushrooms. Cook until they release their moisture and turn deeply browned, about 10 minutes. Do not salt them yet!"
        ],
        note: "Salt draws out water and stops browning — season later, brown now.",
        minutes: 18
      },
      {
        title: "The umami bomb",
        use: ["The steeped porcini + broth", "1 tbsp plain flour", "1 tbsp dark soy sauce", "500 ml stock"],
        actions: [
          "Remove the porcini from the broth, chop them roughly, and add them to the pot.",
          "Stir the flour into the mushrooms and cook for 1 minute to form a roux.",
          "Carefully pour in the porcini broth (leaving any grit at the bottom of the bowl), the stock, and the soy sauce. Simmer gently for 15 minutes."
        ],
        note: "The soy sauce disappears into the background — nobody will guess, everybody will notice.",
        minutes: 18
      },
      {
        title: "The velvet finish",
        use: ["100 ml double cream", "Fresh herbs", "Truffle oil (optional)"],
        actions: [
          "Remove the pot from the heat. Use an immersion blender to blitz the soup until smooth, or leave it slightly chunky if you prefer texture.",
          "Stir in the double cream and gently warm through — do not boil.",
          "Serve in warm bowls, garnished with fresh herbs and a few drops of truffle oil."
        ],
        note: "Boiling after the cream goes in risks splitting — warm, don't bubble.",
        minutes: 6
      }
    ]
  }
];

export function findPastaRecipe(id) {
  return PASTA_RECIPES.find(r => r.id === id) || null;
}
