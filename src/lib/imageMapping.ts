 /**
 * Dynamic image mapping for grocery products.
 * Uses local assets for consistent and reliable display.
 */

// Category Fallbacks
import fruitsFallback from '../assets/product-images/categories/fruits.jpg';
import vegetablesFallback from '../assets/product-images/categories/vegetables.jpg';
import dairyFallback from '../assets/product-images/categories/dairy.jpg';
import bakeryFallback from '../assets/product-images/categories/bakery.jpg';
import leafyFallback from '../assets/product-images/categories/leafy-greens.jpg';
import organicFallback from '../assets/product-images/categories/organic.jpg';

// Fruits
import mangoImg from '../assets/product-images/mango.jpg';
import bananaImg from '../assets/product-images/banana.jpg';
import appleImg from '../assets/product-images/apple.jpg';
import grapesImg from '../assets/product-images/grapes.jpg';
import pomegranateImg from '../assets/product-images/pomegranate.jpg';
import papayaImg from '../assets/product-images/papaya.jpg';
import watermelonImg from '../assets/product-images/watermelon.jpg';
import muskmelonImg from '../assets/product-images/muskmelon.jpg';
import guavaImg from '../assets/product-images/guava.jpg';
import orangeImg from '../assets/product-images/orange.jpg';
import pineappleImg from '../assets/product-images/pineapple.jpg';
import pearImg from '../assets/product-images/pear.jpg';
import kiwiImg from '../assets/product-images/kiwi.jpg';
import strawberryImg from '../assets/product-images/strawberry.jpg';
import dragonFruitImg from '../assets/product-images/dragon-fruit.jpg';
import avocadoImg from '../assets/product-images/avocado.jpg';
import passionFruitImg from '../assets/product-images/passion-fruit.jpg';

// Vegetables
import onionImg from '../assets/product-images/onion.jpg';
import tomatoImg from '../assets/product-images/tomato.jpg';
import potatoImg from '../assets/product-images/potato.jpg';
import carrotImg from '../assets/product-images/carrot.jpg';
import cabbageImg from '../assets/product-images/cabbage.jpg';
import cauliflowerImg from '../assets/product-images/cauliflower.jpg';
import brinjalImg from '../assets/product-images/brinjal.jpg';
import capsicumImg from '../assets/product-images/capsicum.jpg';
import cucumberImg from '../assets/product-images/cucumber.jpg';
import garlicImg from '../assets/product-images/garlic.jpg';
import gingerImg from '../assets/product-images/ginger.jpg';
import spinachImg from '../assets/product-images/spinach.jpg';
import broccoliImg from '../assets/product-images/broccoli.jpg';
import mushroomImg from '../assets/product-images/mushroom.jpg';
import cornImg from '../assets/product-images/corn.jpg';
import ladyFingerImg from '../assets/product-images/lady-finger.jpg';

const CATEGORY_FALLBACKS: Record<string, string> = {
  fruits: fruitsFallback,
  vegetables: vegetablesFallback,
  dairy: dairyFallback,
  bakery: bakeryFallback,
  'leafy greens': leafyFallback,
  organic: organicFallback,
};

const IMAGE_MAP: Record<string, string> = {
  // --- FRUITS ---
  "alphonso mango": mangoImg,
  "mango": mangoImg,
  "cavendish banana": bananaImg,
  "banana": bananaImg,
  "red delicious apple": appleImg,
  "apple": appleImg,
  "green apple": appleImg,
  "green grapes": grapesImg,
  "black grapes": grapesImg,
  "pomegranate": pomegranateImg,
  "anar": pomegranateImg,
  "papaya": papayaImg,
  "watermelon": watermelonImg,
  "muskmelon": muskmelonImg,
  "cantaloupe": muskmelonImg,
  "guava": guavaImg,
  "amrud": guavaImg,
  "sweet lime": orangeImg,
  "mosambi": orangeImg,
  "orange": orangeImg,
  "pineapple": pineappleImg,
  "pear": pearImg,
  "naspati": pearImg,
  "sapota": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "chiku": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "custard apple": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "sitaphal": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "kiwi": kiwiImg,
  "dragon fruit": dragonFruitImg,
  "avocado": avocadoImg,
  "passion fruit": passionFruitImg,
  "strawberry": strawberryImg,
  "blueberry": "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800",
  "raspberry": "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800",
  "blackberry": "https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800",
  "cherry": "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=800",
  "plum": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "peach": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "apricot": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "fig": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",
  "anjeer": "https://images.pexels.com/photos/1266741/pexels-photo-1266741.jpeg?auto=compress&cs=tinysrgb&w=800",

  // --- VEGETABLES ---
  "red onion": onionImg,
  "onion": onionImg,
  "white onion": onionImg,
  "tomato": tomatoImg,
  "potato": potatoImg,
  "carrot": carrotImg,
  "broccoli": broccoliImg,
  "cauliflower": cauliflowerImg,
  "green cabbage": cabbageImg,
  "cabbage": cabbageImg,
  "red cabbage": cabbageImg,
  "purple cabbage": cabbageImg,
  "green capsicum": capsicumImg,
  "bell pepper": capsicumImg,
  "red capsicum": capsicumImg,
  "yellow capsicum": capsicumImg,
  "brinjal": brinjalImg,
  "eggplant": brinjalImg,
  "lady finger": ladyFingerImg,
  "bhindi": ladyFingerImg,
  "okra": ladyFingerImg,
  "cucumber": cucumberImg,
  "bottle gourd": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "lauki": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "bitter gourd": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "karela": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "ridge gourd": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "turai": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "pumpkin": "https://images.pexels.com/photos/619418/pexels-photo-619418.jpeg?auto=compress&cs=tinysrgb&w=800",
  "sweet potato": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "beetroot": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "radish": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "drumstick": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "green peas": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "french beans": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "sweet corn": cornImg,
  "baby corn": cornImg,
  "mushroom": mushroomImg,
  "green zucchini": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",
  "yellow zucchini": "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=800",

  // --- LEAFY GREENS ---
  "spinach": spinachImg,
  "palak": spinachImg,
  "coriander": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "kothmir": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "cilantro": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "mint": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "pudina": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "fenugreek": spinachImg,
  "methi": spinachImg,
  "curry leaves": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "lettuce": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "kale": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",

  // --- HERBS & SPICES ---
  "ginger": gingerImg,
  "garlic": garlicImg,
  "turmeric": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "green chilli": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "red chilli": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "lemongrass": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "cinnamon": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",
  "black pepper": "https://images.pexels.com/photos/2122294/pexels-photo-2122294.jpeg?auto=compress&cs=tinysrgb&w=800",

  // --- DAIRY ---
  "milk": dairyFallback,
  "butter": dairyFallback,
  "cheese": dairyFallback,
  "paneer": dairyFallback,
  "curd": dairyFallback,
  "yogurt": dairyFallback,
  "ghee": dairyFallback,

  // --- BAKERY ---
  "white bread": bakeryFallback,
  "brown bread": bakeryFallback,
  "burger bun": bakeryFallback,
  "chocolate cake": bakeryFallback,
  "croissant": bakeryFallback,

  // --- OTHERS ---
  "honey": "https://images.pexels.com/photos/1123260/pexels-photo-1123260.jpeg?auto=compress&cs=tinysrgb&w=800",
  "almond": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "badam": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "cashew": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "kaju": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "walnut": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "pistachio": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "dates": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800",
  "khajoor": "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=800"
};

const DEFAULT_IMAGE = fruitsFallback;

/**
 * Returns a high-quality local image based on the product name.
 * Handles singular/plural forms and provides category-based fallbacks.
 * 
 * @param name Product name
 * @param category Product category (optional fallback)
 * @returns Image URL/Path
 */
export function getProductImage(name: string, category?: string): string {
  const lowerName = name.toLowerCase().trim();
  
  // Sort keys by length (descending) to match longest keywords first
  const sortedKeys = Object.keys(IMAGE_MAP).sort((a, b) => b.length - a.length);

  // 1. Try to find a match in the IMAGE_MAP
  for (const keyword of sortedKeys) {
    const plural = keyword + 's';
    const esPlural = keyword + 'es';
    
    if (
      lowerName === keyword || 
      lowerName === plural || 
      lowerName === esPlural ||
      lowerName.includes(keyword)
    ) {
      return IMAGE_MAP[keyword];
    }
  }
  
  // 2. Try category-based fallback
  if (category) {
    const lowerCategory = category.toLowerCase().trim();
    if (CATEGORY_FALLBACKS[lowerCategory]) {
      return CATEGORY_FALLBACKS[lowerCategory];
    }
  }
  
  // 3. Final default fallback
  return DEFAULT_IMAGE;
}
