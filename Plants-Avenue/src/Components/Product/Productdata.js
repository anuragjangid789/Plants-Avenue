import p1 from "../../assets/p1.png";
import p2 from "../../assets/p2.png";
import p3 from "../../assets/p3.png";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";
import p6 from "../../assets/p6.png";
import p7 from "../../assets/p7.png";
import p8 from "../../assets/p8.png";

export const CATEGORIES = [
  "All Plants",
  "Indoor",
  "Succulents",
  "Air Purifying",
  "Pet Friendly",
  "Low Maintenance"
];

const productsData = [
  {
    id: 1,
    name: "Golden Pothos Deluxe",
    scientificName: "Epipremnum aureum",
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.9,
    reviewsCount: 142,
    category: "Air Purifying",
    categories: ["Indoor", "Air Purifying", "Low Maintenance"],
    badge: "Bestseller",
    badgeType: "hot",
    image: p1,
    care: {
      light: "Low to Bright Indirect",
      water: "Every 1-2 weeks",
      humidity: "Average (40-60%)",
      difficulty: "Very Easy",
      petSafe: false
    },
    description: "Known as the ultimate beginner plant, the Golden Pothos features cascading marbled heart-shaped leaves that thrive in almost any light condition and actively purifies indoor air toxins.",
    benefits: ["NASA-certified air cleaner", "Tolerates neglect & dim corners", "Fast trailing grower"],
    height: "10-14 inches",
    potSize: "6 inch nursery pot",
    inStock: true
  },
  {
    id: 2,
    name: "Calathea Orbifolia",
    scientificName: "Goeppertia orbifolia",
    price: 28.50,
    originalPrice: 35.00,
    rating: 4.8,
    reviewsCount: 98,
    category: "Pet Friendly",
    categories: ["Indoor", "Pet Friendly"],
    badge: "Pet Safe 🐾",
    badgeType: "safe",
    image: p2,
    care: {
      light: "Medium to Bright Indirect",
      water: "Keep soil consistently moist",
      humidity: "High (60%+)",
      difficulty: "Moderate",
      petSafe: true
    },
    description: "Famous for its oversized, rounded leaves patterned with subtle metallic silver stripes, Calathea Orbifolia is a stunning prayer plant that is 100% non-toxic to cats and dogs.",
    benefits: ["Completely safe for pets", "Fascinating prayer leaf movement", "Lush tropical focal point"],
    height: "12-16 inches",
    potSize: "7 inch nursery pot",
    inStock: true
  },
  {
    id: 3,
    name: "Weeping Fig (Ficus)",
    scientificName: "Ficus benjamina",
    price: 34.00,
    originalPrice: 42.00,
    rating: 4.7,
    reviewsCount: 76,
    category: "Indoor",
    categories: ["Indoor", "Air Purifying"],
    badge: "Sale -20%",
    badgeType: "sale",
    image: p3,
    care: {
      light: "Bright Indirect Light",
      water: "When top 2 inches feel dry",
      humidity: "Medium (50%)",
      difficulty: "Moderate",
      petSafe: false
    },
    description: "An elegant, tree-like indoor specimen with slender branches arching gracefully with glossy teardrop foliage. Perfect for adding vertical drama to bright living rooms or office suites.",
    benefits: ["Architectural focal point", "Effective formaldehyde filter", "Long-lived perennial"],
    height: "20-28 inches",
    potSize: "8 inch nursery pot",
    inStock: true
  },
  {
    id: 4,
    name: "Monstera Deliciosa",
    scientificName: "Monstera deliciosa",
    price: 29.99,
    originalPrice: 38.00,
    rating: 5.0,
    reviewsCount: 215,
    category: "Indoor",
    categories: ["Indoor", "Air Purifying"],
    badge: "Trending 🌱",
    badgeType: "trending",
    image: p4,
    care: {
      light: "Moderate to Bright Indirect",
      water: "Every 1-2 weeks",
      humidity: "Medium to High",
      difficulty: "Easy",
      petSafe: false
    },
    description: "The Swiss Cheese Plant is an iconic statement plant with iconic fenestrated, split-gloss leaves that evoke lush tropical jungles. Thrives with minimal effort and rewards with fast growth.",
    benefits: ["Striking natural leaf fenestrations", "Quick vigorous grower", "Thrives in most modern rooms"],
    height: "16-22 inches",
    potSize: "7 inch nursery pot",
    inStock: true
  },
  {
    id: 5,
    name: "Echeveria Rosette Succulent",
    scientificName: "Echeveria elegans",
    price: 16.50,
    originalPrice: 20.00,
    rating: 4.9,
    reviewsCount: 164,
    category: "Succulents",
    categories: ["Succulents", "Low Maintenance", "Pet Friendly"],
    badge: "Easy Care",
    badgeType: "easy",
    image: p5,
    care: {
      light: "Full Direct Sun",
      water: "Every 2-3 weeks (Soak & Dry)",
      humidity: "Low / Dry",
      difficulty: "Super Easy",
      petSafe: true
    },
    description: "Drought-tolerant, compact, and geometric. Features plump, pastel blue-green fleshy leaves arranged in a rose-like pattern. Ideal for sunny windowsills, terrariums, or work desks.",
    benefits: ["Needs very little water", "Pet friendly & non-toxic", "Compact desk-friendly size"],
    height: "4-6 inches",
    potSize: "4 inch terracotta pot",
    inStock: true
  },
  {
    id: 6,
    name: "Healing Aloe Vera",
    scientificName: "Aloe barbadensis Miller",
    price: 18.00,
    originalPrice: 24.00,
    rating: 4.8,
    reviewsCount: 189,
    category: "Succulents",
    categories: ["Succulents", "Air Purifying", "Low Maintenance"],
    badge: "Medicinal",
    badgeType: "hot",
    image: p6,
    care: {
      light: "Bright Direct to Indirect",
      water: "Every 3 weeks",
      humidity: "Low (dry air is fine)",
      difficulty: "Very Easy",
      petSafe: false
    },
    description: "A timeless multi-purpose succulent packed with soothing natural gel inside its thick, serrated fleshy spears. Highly resilient, it cleans indoor air and produces baby aloe pups naturally.",
    benefits: ["Soothing topical gel for skin", "Produces nighttime oxygen", "Extremely drought tolerant"],
    height: "8-12 inches",
    potSize: "5 inch ceramic pot",
    inStock: true
  },
  {
    id: 7,
    name: "Dracaena Marginata",
    scientificName: "Dracaena marginata",
    price: 26.00,
    originalPrice: 32.00,
    rating: 4.7,
    reviewsCount: 63,
    category: "Air Purifying",
    categories: ["Air Purifying", "Low Maintenance", "Indoor"],
    badge: "Air Cleaner",
    badgeType: "safe",
    image: p7,
    care: {
      light: "Low to Moderate Light",
      water: "Allow top 50% to dry",
      humidity: "Average room humidity",
      difficulty: "Easy",
      petSafe: false
    },
    description: "The Dragon Tree features slender, cane-like woody stems topped with explosive crowns of ribbon-like green leaves edged with subtle red borders. Thrives in moderate indoor light.",
    benefits: ["Removes benzene & trichloroethylene", "Requires minimal attention", "Sculptural silhouette"],
    height: "18-24 inches",
    potSize: "6 inch nursery pot",
    inStock: true
  },
  {
    id: 8,
    name: "Polka Dot Begonia",
    scientificName: "Begonia maculata",
    price: 31.50,
    originalPrice: 39.00,
    rating: 4.9,
    reviewsCount: 112,
    category: "Indoor",
    categories: ["Indoor", "Low Maintenance"],
    badge: "Collector Pick ✨",
    badgeType: "trending",
    image: p8,
    care: {
      light: "Bright Indirect Light",
      water: "Once a week",
      humidity: "Moderate to High",
      difficulty: "Easy to Moderate",
      petSafe: false
    },
    description: "One of the most photogenic houseplants in existence, boasting angel-wing olive leaves adorned with bright silver polka dots and dramatic crimson-red undersides.",
    benefits: ["Stunning silvery metallic spots", "Produces delicate white blossoms", "Eye-catching conversation starter"],
    height: "12-18 inches",
    potSize: "6 inch nursery pot",
    inStock: true
  }
];

export default productsData;
