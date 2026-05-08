import jarImage1 from "@/assets/0d50403659dbeb714860454d0322380314619c03.png";
import imgPistachio from "@/assets/roasted_pistachios.png";

export interface Product {
  _id: string;
  id: string;
  category: string;
  name: string;
  subtitle: string;
  price: string;
  oldPrice: string;
  discount: string;
  rating: number;
  reviews: number;
  description: string;
  weight: string;
  images: string[];
  features: string[];
  ingredients: string;
  benefits: { title: string }[];
}

export const products: Product[] = [
  {
    id: "premium-dates",
    category: "Dates",
    name: "Premium Royal Dates",
    subtitle: "Hand-picked from the finest farms in Medina",
    price: "₹899",
    oldPrice: "₹1,099",
    discount: "18% OFF",
    rating: 4.8,
    reviews: 124,
    weight: "500g",
    description: "Experience the ultimate luxury with our Premium Royal Dates. Naturally sweet, incredibly soft, and packed with essential nutrients. Perfect for gifting or daily healthy snacking.",
    images: [jarImage1.src, jarImage1.src],
    features: [
      "100% Natural & Organic",
      "No Added Sugar",
      "Rich in Fiber & Potassium",
      "Premium Vacuum Packaging"
    ],
    ingredients: "100% Pure Natural Dates. No preservatives, artificial colors, or added sugars.",
    benefits: [
      { title: "Diabetic friendly" },
      { title: "Potassium packed" },
      { title: "Digestive boost" },
      { title: "Vitamin K rich" }
    ]
  },
  {
    id: "roasted-pistachios",
    category: "Nuts",
    name: "Premium Roasted Pistachios",
    subtitle: "Lightly Salted & Perfectly Roasted Saudi Arabian Pistachios",
    price: "₹899",
    oldPrice: "₹1,199",
    discount: "25% OFF",
    rating: 4.9,
    reviews: 218,
    weight: "500g",
    description: "Savor the crunch of our Premium Roasted Pistachios. Lightly salted to perfection and roasted in small batches to ensure maximum freshness and flavor. A powerhouse of protein and healthy fats.",
    images: [imgPistachio.src, imgPistachio.src],
    features: [
      "Freshly Roasted in Small Batches",
      "Lightly Salted (Low Sodium)",
      "High Protein & Healthy Fats",
      "100% Natural & Gluten-Free"
    ],
    ingredients: "Roasted Saudi Arabian Pistachios, Sea Salt. No artificial flavors or preservatives.",
    benefits: [
      { title: "Healthy Heart" },
      { title: "Protein Rich" },
      { title: "Weight Control" },
      { title: "Anti-oxidants" }
    ]
  },
  {
    id: "premium-almonds",
    category: "Nuts",
    name: "Premium California Almonds",
    subtitle: "Crispy, Crunchy & Nutrient-Dense Almonds",
    price: "₹799",
    oldPrice: "₹999",
    discount: "20% OFF",
    rating: 4.7,
    reviews: 156,
    weight: "500g",
    description: "Our Premium California Almonds are carefully selected for their size and crunch. Perfectly dried to preserve their natural oils and high nutrient content. A perfect brain food.",
    images: [jarImage1.src, jarImage1.src],
    features: [
      "High in Vitamin E",
      "Good for Brain Health",
      "Rich in Omega-3 Fats",
      "Premium Export Quality"
    ],
    ingredients: "100% Natural California Almonds. No additives or preservatives.",
    benefits: [
      { title: "Brain Booster" },
      { title: "Skin Health" },
      { title: "Energy Rich" },
      { title: "Fiber Packed" }
    ]
  },
  {
    id: "premium-saffron",
    category: "Spices",
    name: "Premium Kashmiri Saffron",
    subtitle: "Pure Grade-A Mongra Saffron",
    price: "₹1,299",
    oldPrice: "₹1,599",
    discount: "19% OFF",
    rating: 4.9,
    reviews: 89,
    weight: "1g",
    description: "Experience the magic of Kashmiri Saffron. Handpicked threads from the Pampore fields, offering unmatched aroma, color, and medicinal benefits.",
    images: [jarImage1.src, jarImage1.src],
    features: [
      "100% Pure Mongra Quality",
      "Natural Color & Aroma",
      "Mood Enhancer",
      "Rich in Anti-oxidants"
    ],
    ingredients: "100% Pure Saffron Filaments.",
    benefits: [
      { title: "Stress Relief" },
      { title: "Skin Glow" },
      { title: "Immunity Boost" },
      { title: "Antioxidant Rich" }
    ]
  }
];
