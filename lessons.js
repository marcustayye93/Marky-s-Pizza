// Pizza Essentials Curriculum Data - V1
// Practical, science-focused lessons for home cooks

export const chapters = [
  {
    id: 'ch1',
    title: 'Foundations of Great Dough',
    description: 'Understand flour, hydration, fermentation and why time and temperature create flavour.',
    lessons: [
      {
        id: 'l1-1',
        title: 'Flour Power',
        duration: '6 min',
        content: `
          <p>Protein content determines structure and chew. For home pizza, <strong>00 flour or strong bread flour (12-13% protein)</strong> gives the best balance of extensibility and strength.</p>
          <div class="science-callout">
            <strong>Why it matters:</strong> Lower protein = tender but weak dough. Higher protein = strong gluten network that traps gas during fermentation and baking for great oven spring.
          </div>
          <p><strong>Practical tip:</strong> In Singapore, look for Italian 00 or Australian/ local bread flour with high protein. Mix with a little semolina for extra crunch on the base if desired.</p>
        `,
        takeaway: 'Choose flour with 12%+ protein for structure that can handle long fermentation.'
      },
      {
        id: 'l1-2',
        title: 'Hydration & Gluten Development',
        duration: '7 min',
        content: `
          <p>Hydration (water % of flour weight) controls texture. 60-65% is forgiving for beginners; 68-72% gives lighter, airier crumb with practice.</p>
          <div class="science-callout">
            <strong>Science bite:</strong> Water activates gluten proteins (gliadin + glutenin). Proper hydration + time/kneading creates a network that stretches without tearing and holds steam for oven spring.
          </div>
          <p><strong>Home tip:</strong> Start at 65% hydration. Use room-temperature water. Autolyse (mix flour + water, rest 20-30 min) dramatically improves extensibility with less effort.</p>
        `,
        takeaway: 'Higher hydration = lighter crumb, but requires better technique and longer rests.'
      },
      {
        id: 'l1-3',
        title: 'Fermentation Magic',
        duration: '8 min',
        content: `
          <p>Yeast eats sugars and produces CO₂ (rise) and organic acids (flavour). Longer, cooler fermentation develops complex lactic and acetic notes that make pizza taste "more like itself".</p>
          <div class="science-callout">
            <strong>Flavour science:</strong> Cold proofing (fridge 24-72 hrs) slows yeast and encourages bacteria that create desirable sour-sweet balance and better crust colour via Maillard reaction.
          </div>
          <p><strong>Practical for Singapore kitchens:</strong> Bulk ferment 1.5-2 hrs at room temp (28-30°C is common here), then cold proof overnight or up to 3 days. The fridge slows everything nicely.</p>
        `,
        takeaway: 'Time + cool temperature = deeper flavour and better digestibility.'
      },
      {
        id: 'l1-4',
        title: 'Dough Troubleshooting',
        duration: '5 min',
        content: `
          <p>Common issues and science-based fixes:</p>
          <ul>
            <li><strong>Sticky dough:</strong> Usually too much water or under-mixed. Add flour 1 tbsp at a time or improve technique next batch.</li>
            <li><strong>Tears when stretching:</strong> Under-proofed or low hydration. Let it rest longer or increase water slightly.</li>
            <li><strong>Flat pizza, no bubbles:</strong> Weak gluten or dead yeast. Check flour strength and yeast freshness; improve fermentation time.</li>
          </ul>
        `,
        takeaway: 'Most problems are fixed by adjusting hydration, resting longer, or using stronger flour.'
      }
    ]
  },
  {
    id: 'ch2',
    title: 'Sauce, Cheese & Flavour Harmony',
    description: 'Balance acidity, fat, salt and umami so every bite sings.',
    lessons: [
      {
        id: 'l2-1',
        title: 'Tomato Sauce Science',
        duration: '6 min',
        content: `
          <p>Good pizza sauce is bright, slightly sweet, and well-seasoned. San Marzano or good quality canned tomatoes + salt + a touch of sugar or olive oil is often enough.</p>
          <div class="science-callout">
            <strong>Why acidity matters:</strong> Tomato acidity cuts through rich cheese and prevents the pizza from feeling heavy. Salt enhances sweetness and suppresses bitterness.
          </div>
          <p><strong>Quick recipe (enough for 4 personal pizzas):</strong> 400g good canned tomatoes, 1 tsp salt, ½ tsp sugar, 1 tbsp olive oil, optional pinch of oregano or fresh basil. Crush by hand, no cooking needed for Neapolitan-style.</p>
        `,
        takeaway: 'Let the tomatoes shine — minimal cooking preserves brightness and acidity.'
      },
      {
        id: 'l2-2',
        title: 'Cheese Choices & Melt',
        duration: '7 min',
        content: `
          <p>Mozzarella is king for stretch and mild creaminess. Low-moisture mozzarella melts cleanly without releasing too much water. Fresh mozzarella (fior di latte) is delicious but needs careful draining.</p>
          <div class="science-callout">
            <strong>Melt science:</strong> Casein proteins in cheese soften and flow when heated. Fat content affects how creamy vs stringy it becomes. Pairing mozzarella with a little aged cheese (parmesan, pecorino) adds umami depth.
          </div>
          <p><strong>Practical:</strong> Use 60-70% low-moisture mozzarella + 30-40% a flavourful aged cheese. Drain fresh mozzarella well and pat dry to avoid soggy spots.</p>
        `,
        takeaway: 'Balance stretchy mild cheese with savoury aged cheese for best flavour and texture.'
      },
      {
        id: 'l2-3',
        title: 'Topping Strategy & Moisture',
        duration: '6 min',
        content: `
          <p>Wet toppings (fresh tomatoes, mushrooms, pineapple, lots of sauce) release steam and can make the base soggy. Order and quantity matter.</p>
          <div class="science-callout">
            <strong>Moisture management:</strong> Sauce first (thin layer), then cheese (acts as barrier), then drier toppings. Wet items go on late or in smaller amounts. Pre-cook high-moisture vegetables if using lots.
          </div>
          <p><strong>Rule of thumb for home:</strong> Less is more. 3-5 well-chosen toppings maximum per pizza. Build flavour through quality ingredients rather than quantity.</p>
        `,
        takeaway: 'Cheese layer protects the dough; save the wettest items for the top or pre-cook them.'
      },
      {
        id: 'l2-4',
        title: 'Flavour Pairing Principles',
        duration: '5 min',
        content: `
          <p>Great pizza follows simple harmony rules:</p>
          <ul>
            <li><strong>Acid cuts fat</strong> — Tomato + mozzarella is the classic example.</li>
            <li><strong>Salt enhances sweet & suppresses bitter</strong> — A pinch in sauce or on vegetables transforms flavour.</li>
            <li><strong>Umami layers</strong> — Parmesan, anchovy, mushrooms, or a touch of miso in sauce build depth.</li>
            <li><strong>Texture contrast</strong> — Crispy base + creamy cheese + fresh herbs or peppery greens at the end.</li>
          </ul>
        `,
        takeaway: 'Build layers of acid, fat, salt, and umami while protecting texture.'
      }
    ]
  }
];

export const allLessons = chapters.flatMap(ch => ch.lessons);
