export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Kingfisher Premium Lager",
    brand: "United Breweries",
    price: 165,
    category: "Beer",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=500&fit=crop&auto=format",
    badge: "Popular",
    description: "India’s top-selling lager — light, crisp, and refreshing.",
  },
  {
    id: 2,
    name: "Budweiser Magnum Strong",
    brand: "AB InBev",
    price: 200,
    category: "Beer",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=500&fit=crop&auto=format",
    badge: "Best Seller",
    description: "Strong lager with rich malt flavor and smooth finish.",
  },
  {
    id: 3,
    name: "Tuborg Strong",
    brand: "Carlsberg Group",
    price: 175,
    category: "Beer",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=500&fit=crop&auto=format",
    description: "Bold strong beer with smooth drinkability.",
  },
  {
    id: 4,
    name: "Blenders Pride Reserve Collection",
    brand: "Pernod Ricard",
    price: 1050,
    category: "Whisky",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=500&fit=crop&auto=format",
    badge: "Premium",
    description: "Smooth blend of Indian grain spirits and Scotch malts.",
  },
  {
    id: 5,
    name: "Royal Stag Barrel Select",
    brand: "Pernod Ricard",
    price: 820,
    category: "Whisky",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=400&h=500&fit=crop&auto=format",
    description: "Bold whisky with a rich and intense flavor profile.",
  },
  {
    id: 6,
    name: "Black Dog Triple Gold Reserve",
    brand: "Diageo",
    price: 3500,
    category: "Whisky",
    image: "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&h=500&fit=crop&auto=format",
    badge: "Luxury",
    description: "Aged Scotch whisky with smooth and complex notes.",
  },
  {
    id: 7,
    name: "Chivas Regal 12 Years",
    brand: "Chivas Brothers",
    price: 5000,
    category: "Whisky",
    image: "https://images.unsplash.com/photo-1598306442928-4d90f32c6866?w=400&h=500&fit=crop&auto=format",
    badge: "Scotch",
    description: "Premium Scotch with honey, vanilla, and fruity notes.",
  },
  {
    id: 8,
    name: "Absolut Original Vodka",
    brand: "Absolut Company",
    price: 2400,
    category: "Vodka",
    image: "https://images.unsplash.com/photo-1557499305-0af888c3d8ec?w=400&h=500&fit=crop&auto=format",
    badge: "Imported",
    description: "Swedish vodka made from winter wheat — pure & smooth.",
  },
  {
    id: 9,
    name: "Smirnoff No. 21 Vodka",
    brand: "Diageo",
    price: 1550,
    category: "Vodka",
    image: "",
    description: "Triple distilled vodka with clean and crisp taste.",
  },
  {
    id: 10,
    name: "Old Monk Supreme Rum",
    brand: "Mohan Meakin",
    price: 720,
    category: "Rum",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=500&fit=crop&auto=format",
    badge: "Classic",
    description: "Legendary Indian dark rum with rich vanilla notes.",
  },
  {
    id: 11,
    name: "Bacardi Carta Blanca",
    brand: "Bacardi Limited",
    price: 2000,
    category: "Rum",
    image: "https://images.unsplash.com/photo-1620315808304-66597517ce2b?w=400&h=500&fit=crop&auto=format",
    badge: "Imported",
    description: "Light white rum ideal for cocktails like Mojito.",
  },
  {
    id: 12,
    name: "Antiquity Blue",
    brand: "United Spirits",
    price: 1250,
    category: "Whisky",
    image: "",
    description: "Smooth blend of Scotch malts and Indian grain spirits.",
  },
];

export const categories = [
  {
    id: "beer",
    name: "Beer",
    image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=800&fit=crop&auto=format",
    description: "Chilled, refreshing brews",
    count: 3,
  },
  {
    id: "whisky",
    name: "Whisky",
    image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=600&h=800&fit=crop&auto=format",
    description: "Single malts & blends",
    count: 5,
  },
  {
    id: "vodka",
    name: "Vodka",
    image: "https://images.unsplash.com/photo-1557499305-0af888c3d8ec?w=600&h=800&fit=crop&auto=format",
    description: "Premium & imported",
    count: 2,
  },
  {
    id: "rum",
    name: "Rum",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=800&fit=crop&auto=format",
    description: "Dark & white spirits",
    count: 2,
  },
];