// Sample signature cook-along recipes for V1

export const recipes = [
  {
    id: 'r1',
    title: 'Classic Personal Margherita',
    size: 'personal',
    serves: '1',
    doughWeight: '170 g',
    prepTime: '15 min active + ferment',
    bakeTime: '8-12 min',
    difficulty: 'Beginner-friendly',
    image: 'images/personal-margherita.jpg',
    description: 'The timeless balance of bright tomato, creamy mozzarella, and fresh basil. Perfect for learning the fundamentals.',
    ingredients: [
      '170 g pizza dough (65% hydration, cold proofed)',
      '80 g good canned tomatoes, crushed',
      '1 tsp olive oil',
      'Pinch of salt + tiny pinch sugar',
      '70 g low-moisture mozzarella, torn or sliced',
      'Fresh basil leaves',
      'Extra virgin olive oil to finish'
    ],
    steps: [
      {
        title: 'Prep your station & dough',
        time: '5 min',
        instruction: 'Take dough out of fridge 45-60 min before. Preheat oven to 230-250°C (convection) or use your multi-function oven\'s convection/pizza mode. Place baking steel or pizza stone on lowest rack if using.'
      },
      {
        title: 'Make the sauce',
        time: '3 min',
        instruction: 'Crush tomatoes with salt, sugar and olive oil. Taste — it should be bright and well-seasoned. No need to cook the sauce.'
      },
      {
        title: 'Shape the pizza',
        time: '3 min',
        instruction: 'On a floured surface or parchment, gently stretch dough to ~22 cm circle. Keep the edge slightly thicker for a nice cornicione (rim).'
      },
      {
        title: 'Top it',
        time: '2 min',
        instruction: 'Spread thin layer of sauce (leave 1 cm border). Add mozzarella. Keep it light — less is more for home ovens.'
      },
      {
        title: 'Launch & bake',
        time: '8-12 min',
        instruction: 'Slide onto hot steel/stone or baking tray. Bake until crust is leopard-spotted, cheese is bubbling and starting to brown. Rotate halfway if needed. Finish with fresh basil and good olive oil after baking.'
      }
    ],
    scienceNotes: 'The thin sauce layer + cheese barrier keeps the dough from getting soggy. Fresh basil added after baking preserves its bright aroma (heat destroys delicate flavours).',
    protocol: {
      convection: '230-245°C, lowest rack or on steel, 9-12 min, rotate once. No steam needed.',
      multiFunction: 'Convection or Pizza mode 220-235°C, 8-11 min. Use grill/broil for last 1-2 min if cheese needs more colour. Watch closely — smaller cavities heat fast.'
    }
  },
  {
    id: 'r2',
    title: 'Sharing Margherita for 3-4',
    size: 'sharing',
    serves: '3-4',
    doughWeight: '280 g',
    prepTime: '20 min active + ferment',
    bakeTime: '10-14 min',
    difficulty: 'Intermediate',
    image: 'images/sharing-pizza.jpg',
    description: 'One generous 30 cm pie or two personals. Same classic flavours, scaled for sharing without overwhelming your home oven.',
    ingredients: [
      '280 g pizza dough (or two 140 g balls)',
      '140 g good canned tomatoes, crushed',
      '1½ tsp olive oil',
      '1½ tsp salt + small pinch sugar',
      '120 g low-moisture mozzarella',
      'Fresh basil + good olive oil to finish'
    ],
    steps: [
      {
        title: 'Prep & preheat',
        time: '10 min',
        instruction: 'Remove dough from fridge 1 hr ahead. Preheat oven as hot as it safely goes (ideally 240°C+). Position baking steel or thick metal plate on the lowest rack or oven floor (if safe).'
      },
      {
        title: 'Sauce & toppings',
        time: '5 min',
        instruction: 'Mix sauce. Stretch dough to ~30 cm or make two smaller pies (easier to handle and bake evenly in most home ovens).'
      },
      {
        title: 'Bake the sharing pie',
        time: '10-14 min',
        instruction: 'Launch carefully. Bake until well spotted and cheese is golden. For multi-function ovens, you may need to bake one at a time or use two smaller pies. Rotate for even colour.'
      },
      {
        title: 'Finish & serve',
        time: '2 min',
        instruction: 'Rest 1-2 min, add torn basil and a generous drizzle of good olive oil. Cut into 6-8 slices.'
      }
    ],
    scienceNotes: 'Larger pies take longer and can have uneven spots in home ovens. Many experienced home cooks prefer two smaller pies for better texture and easier launching.',
    protocol: {
      convection: '235-250°C on steel, 11-14 min. Rotate 180° halfway. Steel makes a huge difference for crisp bottom.',
      multiFunction: 'Convection 220-235°C, 10-13 min. Smaller cavity may require baking in two batches or using two personal pies instead.'
    }
  }
];
