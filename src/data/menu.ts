export type MenuCategory = {
  slug: string;
  name: string;
  note?: string;
  items: Array<{
    name: string;
    description?: string;
    pricePkr?: number;
    featured?: boolean;
    popular?: boolean;
    details?: string;
    tags?: string[];
  }>;
};

export const menu: MenuCategory[] = [
  {
    slug: "artisanal-coffee",
    name: "Artisanal Coffee",
    note: "Clean, origin-forward brews.",
    items: [
      { name: "V60 Pour Over", description: "Clean and bright, highlighting origin notes.", pricePkr: 950 },
      { name: "Chemex Brew", description: "Smooth, light-bodied, naturally sweet.", pricePkr: 950 },
      { name: "French Press", description: "Rich, full-bodied brew with strong flavor extraction.", pricePkr: 850 },
      { name: "AeroPress", description: "Smooth, concentrated, fast-brewed cup.", pricePkr: 850 },
      { name: "Ristretto", description: "Short, intense espresso shot with rich flavor.", pricePkr: 550 },
      { name: "Long Black", description: "Longer pull mild but aromatic.", pricePkr: 600 },
      { name: "Macchiato", description: "Espresso marked with a touch of foam.", pricePkr: 600 },
      { name: "Cortado", description: "Equal parts espresso and warm milk for a bold yet balanced sip.", pricePkr: 650 },
      { name: "Affogato", description: "Vanilla ice cream drowned in a bold, hot espresso shot.", pricePkr: 950 },
    ],
  },
  {
    slug: "signature-lattes",
    name: "Signature Lattes",
    items: [
      {
        name: "Turtle Mocha",
        description: "Rich mocha with chocolate, caramel, and toasted pecan.",
        pricePkr: 1050,
        featured: true,
        popular: true,
        tags: ["Signature", "Chocolate", "Caramel"],
        details:
          "A dessert-like latte built on espresso and mocha, layered with caramel sweetness and a toasted pecan finish. Great with cheesecake or a butter croissant.",
      },
      { name: "Berry White Mocha", description: "White chocolate mocha with a sweet hint of mixed berries.", pricePkr: 1050 },
      { name: "Caramel High Rise", description: "Espresso with caramel blended into steamed milk.", pricePkr: 1080 },
      { name: "Campfire Mocha", description: "Rich chocolate with toasted marshmallow flavor.", pricePkr: 1080 },
      { name: "Mint Condition Mocha", description: "Cool peppermint swirled into a chocolate mocha.", pricePkr: 1050 },
      { name: "Zebra Mocha", description: "White and dark chocolate mocha balanced & creamy.", pricePkr: 1050 },
    ],
  },
  {
    slug: "flavoured-coffees",
    name: "Flavoured Coffees",
    items: [
      {
        name: "Hazelnut Latte",
        description: "Classic latte infused with roasted hazelnut sweetness.",
        pricePkr: 950,
        popular: true,
        tags: ["Nutty", "Classic"],
        details:
          "A smooth latte with warm hazelnut notes—balanced sweetness and a clean finish. Pairs well with blueberry loaf or a chocolate croissant.",
      },
      { name: "Butternut Latte", description: "Warm, buttery nut flavor blended into a creamy latte.", pricePkr: 950 },
      { name: "Vanilla Latte", description: "Silky latte enhanced with soft, aromatic vanilla.", pricePkr: 980 },
      { name: "Spanish Latte", description: "Sweetened milk with a bold espresso base.", pricePkr: 1000 },
      { name: "Caramel Latte", description: "A smooth fusion of espresso & buttery caramel.", pricePkr: 950 },
      { name: "Irish Cream Latte", description: "Velvety latte with a creamy, Irish-inspired profile.", pricePkr: 1000 },
      { name: "Almond Latte", description: "Espresso richness paired with creamy almond sweetness.", pricePkr: 950 },
      { name: "Matcha", description: "Authentic Japanese matcha with a crisp, grounded flavor.", pricePkr: 1000 },
    ],
  },
  {
    slug: "hot-beverages-teas",
    name: "Hot Beverages & Teas",
    items: [
      { name: "English Breakfast Tea", description: "Classic, full-bodied black tea.", pricePkr: 650 },
      { name: "Strawberry Tea", description: "Light, fruity infusion with sweet strawberry notes.", pricePkr: 650 },
      { name: "Green Tea", description: "Smooth, earthy and refreshing daily classic.", pricePkr: 630 },
      { name: "Oolong Tea", description: "Delicately floral and lightly roasted.", pricePkr: 650 },
      { name: "Green Mint Tea", description: "Cooling mint blended with smooth green tea.", pricePkr: 650 },
      { name: "Herbal Tea", description: "Calming caffeine-free blend of soothing herbs.", pricePkr: 650 },
      { name: "Hot Chocolate", description: "Rich, creamy chocolate blended warm.", pricePkr: 950 },
    ],
  },
  {
    slug: "classic-coffees",
    name: "Classic Coffees",
    items: [
      { name: "Cappuccino", description: "Bold espresso topped with airy foam.", pricePkr: 850 },
      { name: "Mocha", description: "Espresso blended with chocolate and steamed milk.", pricePkr: 850 },
      { name: "Flat White", description: "Smooth micro foam over a double espresso.", pricePkr: 850 },
      { name: "Breve Coffee", description: "Robust double-shot coffee with bold espresso character.", pricePkr: 850 },
      { name: "Latte", description: "Silky steamed milk over a shot of espresso.", pricePkr: 850 },
      { name: "Americano", description: "Espresso diluted with hot water.", pricePkr: 750 },
      { name: "Espresso Double Shot", description: "Bold, rich espresso pulled twice.", pricePkr: 950 },
    ],
  },
  {
    slug: "cold-coffees",
    name: "Cold Coffees",
    note: "Iced favorites (prices not provided).",
    items: [
      { name: "Iced Americano" },
      { name: "Iced Latte" },
      { name: "Iced Cappuccino" },
      { name: "Iced Mocha" },
      { name: "Iced Vanilla Latte" },
      { name: "Iced Caramel Latte" },
      { name: "Creamy Mocha Cold Coffee" },
      { name: "Caramel Cold Coffee" },
      { name: "Chocolate Cold Coffee" },
      { name: "Vanilla Cold Coffee" },
      { name: "Iced Hazelnut Latte" },
      { name: "Iced White Mocha" },
      { name: "Iced Cinnamon Latte" },
      { name: "Iced Irish Cream Latte" },
      { name: "Iced Espresso" },
      { name: "Double Shot Iced Coffee" },
      { name: "Iced Black Coffee" },
    ],
  },
  {
    slug: "fruit-chillers-smoothies",
    name: "Fruit Chillers / Smoothies",
    items: [
      { name: "Passion Fruit Chiller", description: "Tropical, tangy, and bright.", pricePkr: 950 },
      { name: "Blueberry Chiller", description: "Rich blueberry notes blended vibrant.", pricePkr: 950 },
      { name: "Peach Chiller", description: "Smooth and mellow peach over ice.", pricePkr: 950 },
      { name: "Mango Chiller", description: "Classic tropical mango—sweet and smooth.", pricePkr: 950 },
      { name: "Strawberry Chiller", description: "Refreshing strawberry blended icy.", pricePkr: 950 },
      { name: "Pomegranate Chiller", description: "Bright, tangy pomegranate served ice-cold.", pricePkr: 950 },
      { name: "Banana Chiller", description: "Creamy banana with a cool, icy twist.", pricePkr: 950 },
    ],
  },
  {
    slug: "snowdrifts",
    name: "Snowdrifts",
    items: [
      { name: "Caramel Snowdrift", description: "Buttery caramel blended frosty.", pricePkr: 1150 },
      { name: "Hazelnut Snowdrift", description: "Roasted hazelnut swirled icy.", pricePkr: 1150 },
      { name: "Dark Chocolate Snowdrift", description: "Bold dark chocolate dessert-like frost.", pricePkr: 1250 },
      { name: "Tiramisu Snowdrift", description: "Tiramisu-inspired with cocoa and espresso.", pricePkr: 1250 },
      { name: "Oreo Snowdrift", description: "Crushed Oreo cookies blended creamy.", pricePkr: 1250 },
      { name: "Red Velvet Snowdrift", description: "Velvety cocoa and cream.", pricePkr: 1250 },
      { name: "Vanilla Snowdrift", description: "Vanilla and cream, smooth icy blend.", pricePkr: 1250 },
    ],
  },
  {
    slug: "cheesecakes-loaves",
    name: "Cheesecakes & Loaves",
    items: [
      { name: "Basque Cheesecake", description: "Burnt-top, creamy custard-like center.", pricePkr: 1150 },
      { name: "Blueberry Cheesecake", description: "Creamy cheesecake with blueberry compote.", pricePkr: 1150 },
      { name: "Strawberry Cheesecake", description: "Creamy cheesecake topped with strawberry.", pricePkr: 1150 },
      { name: "New York Cheesecake", description: "Classic rich NY-style cheesecake.", pricePkr: 1150 },
      { name: "Lotus Cheesecake", description: "Silky mousse layered with Lotus Biscoff.", pricePkr: 1400 },
      { name: "Banana Loaf", description: "Soft home-style loaf baked to perfection.", pricePkr: 480 },
      { name: "Blueberry Loaf", description: "Moist loaf infused with blueberry flavor.", pricePkr: 480 },
    ],
  },
  {
    slug: "classic-cakes",
    name: "Classic Cakes",
    items: [
      { name: "Red Velvet Cake", description: "Classic red velvet with cream cheese frosting.", pricePkr: 780 },
      { name: "Chocolate Swiss Roll", description: "Soft chocolate sponge rolled creamy.", pricePkr: 680 },
      { name: "Carrot Cake", description: "Moist spiced carrot cake with smooth frosting.", pricePkr: 680 },
      { name: "Fudge Brownie", description: "Dense rich brownie with fudgy center.", pricePkr: 580 },
      { name: "Chocolate Malt Cake", description: "Moist chocolate cake with nostalgic malt.", pricePkr: 780 },
    ],
  },
  {
    slug: "sundaes-desserts-bakes",
    name: "Sundaes, Desserts & Bakes",
    items: [
      { name: "Bread Pudding", description: "Warm baked dessert with bread & custard.", pricePkr: 780 },
      { name: "Fresh Fruit Tart", description: "Crisp tart shell with cream & fresh fruit.", pricePkr: 750 },
      { name: "Vanilla Muffin", description: "Soft classic vanilla muffin.", pricePkr: 480 },
      { name: "Chocolate Muffin", description: "Rich moist chocolate muffin.", pricePkr: 480 },
      { name: "Blueberry Muffin", description: "Fluffy muffin with juicy blueberries.", pricePkr: 480 },
      { name: "Chocolate Chip Cookie", description: "Soft cookie loaded with chocolate chips.", pricePkr: 380 },
      { name: "Double Chocolate Chip Cookie", description: "Extra indulgent double chocolate.", pricePkr: 420 },
    ],
  },
  {
    slug: "toasty-sandwiches",
    name: "Toasty & Sandwiches",
    items: [
      { name: "Mushroom Toasty", description: "Toasted sandwich with creamy seasoned mushrooms.", pricePkr: 900 },
      { name: "Egg Salad Sandwich", description: "Classic egg salad with fresh greens.", pricePkr: 680 },
      { name: "Tandoori Toasty", description: "Toasted bread with tandoori-style chicken.", pricePkr: 1080 },
      { name: "Sundried Sandwich", description: "Sundried tomatoes + Mediterranean flair.", pricePkr: 1280 },
      { name: "Fajita Sandwich", description: "Fajita-style chicken with sautéed peppers.", pricePkr: 1180 },
      { name: "Tikka Sandwich", description: "Flavorful tikka chicken with aromatic spices.", pricePkr: 1180 },
      { name: "Jalapeño Grill Chicken Sandwich", description: "Grilled chicken with jalapeño kick.", pricePkr: 1180 },
      { name: "Smoke Roast Beef Sandwich", description: "Smoked roast beef with cheese and sauce.", pricePkr: 1380 },
      { name: "Roast Chicken Sandwich", description: "Roasted chicken with crisp lettuce & dressing.", pricePkr: 1280 },
    ],
  },
  {
    slug: "paninis-sandwiches",
    name: "Paninis & Sandwiches",
    items: [
      {
        name: "Peri Peri Panini",
        description: "Pressed panini with spicy peri peri chicken.",
        pricePkr: 1180,
        featured: true,
        popular: true,
        tags: ["Savory", "Spicy"],
        details:
          "A bold peri peri chicken panini with a crisp press and juicy bite. Best with an iced americano or a classic cappuccino.",
      },
      { name: "Philly Cheesesteak Panini", description: "Beef, onions, and cheese in toasted panini.", pricePkr: 1380 },
      { name: "Lime Chicken Croissant Sandwich", description: "Zesty lime chicken in flaky croissant.", pricePkr: 1080 },
      { name: "Grilled Chicken Cheese Bagel", description: "Grilled chicken and melted cheese in bagel.", pricePkr: 1080 },
    ],
  },
  {
    slug: "wraps-specialties",
    name: "Wraps & Specialties",
    items: [
      { name: "Cajun Chicken Wrap", description: "Spicy Cajun chicken rolled in a soft wrap.", pricePkr: 980 },
      { name: "Egg Scramble Smoke Beef", description: "Soft scrambled eggs paired with smoked beef.", pricePkr: 1180 },
    ],
  },
  {
    slug: "croissants-pastries",
    name: "Croissants & Pastries",
    items: [
      { name: "Butter Croissant", description: "Flaky, buttery, classic croissant.", pricePkr: 580 },
      { name: "Chocolate Croissant", description: "Layered pastry filled with rich chocolate.", pricePkr: 680 },
      { name: "Almond Croissant", description: "Croissant with almond cream & almond flakes.", pricePkr: 780 },
      { name: "Pain Aux Raisins + Sauce", description: "Buttery pastry with raisins, served with sauce.", pricePkr: 580 },
    ],
  },
  {
    slug: "salads",
    name: "Salads",
    items: [
      { name: "Caesar Salad", description: "Lettuce, Parmesan, croutons, Caesar dressing.", pricePkr: 1080 },
      { name: "Trio Salad", description: "A combination of three fresh, vibrant salad mixes.", pricePkr: 1080 },
    ],
  },
  {
    slug: "donuts-rolls",
    name: "Donuts & Rolls",
    items: [
      { name: "Nutella Donut", description: "Soft donut filled with creamy Nutella.", pricePkr: 480 },
      { name: "Strawberry Donut", description: "Soft donut with sweet strawberry glaze.", pricePkr: 420 },
      { name: "Cinnamon Donut", description: "Sweet donut dusted with warm cinnamon.", pricePkr: 380 },
      { name: "Bright lemon-glazed Donut", description: "Bright lemon-glazed donut.", pricePkr: 420 },
      { name: "Chocolate Sprinkle Donut", description: "Classic donut topped with chocolate sprinkles.", pricePkr: 420 },
      { name: "Cinnamon Roll + Sauce", description: "Warm cinnamon roll served with creamy sauce.", pricePkr: 420 },
      { name: "Caramelized Cookie Donut", description: "Donut topped with caramelized cookie crumble.", pricePkr: 420 },
      { name: "Chocolate Donut", description: "Chocolate-glazed soft donut.", pricePkr: 380 },
    ],
  },
  {
    slug: "add-ons-water",
    name: "Add-ons & Water",
    items: [
      { name: "Evian Extra Small", description: "Natural mineral water from the French Alps.", pricePkr: 450 },
      { name: "Evian Small", description: "Natural mineral water from the French Alps.", pricePkr: 500 },
      { name: "Evian Large", description: "Natural mineral water from the French Alps.", pricePkr: 1200 },
      { name: "Murree Sparkletts", description: "Pure refreshing bottled water.", pricePkr: 250 },
      { name: "Voss", description: "Premium artesian water in iconic bottle.", pricePkr: 1500 },
      { name: "Perrier", description: "Iconic French sparkling water.", pricePkr: 800 },
      { name: "Maison Perrier Lime & Ginger", description: "Sparkling blend with lime & ginger.", pricePkr: 1000 },
      { name: "Mineral Water", description: "Naturally sourced mineral water.", pricePkr: 120 },
      { name: "Ice", description: "Chilled ice cubes.", pricePkr: 100 },
      { name: "Whipped Cream", description: "Light, fluffy whipped cream.", pricePkr: 250 },
      { name: "Ice Cream", description: "Creamy, smooth ice cream.", pricePkr: 250 },
      { name: "Espresso Shot", description: "Bold, concentrated espresso shot.", pricePkr: 450 },
      { name: "Milk", description: "Rich dairy milk.", pricePkr: 100 },
      { name: "Syrup", description: "Flavored syrup.", pricePkr: 250 },
      { name: "Sauce", description: "Luscious flavor drizzle.", pricePkr: 250 },
    ],
  },
];

