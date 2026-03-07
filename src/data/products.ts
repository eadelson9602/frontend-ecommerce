export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  description: string;
  stock: number;
  featured?: boolean;
  isNew?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Oversized Wool Coat",
    brand: "NOIR Studio",
    price: 289,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=600&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80",
    ],
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Charcoal", hex: "#2D2D2D" },
      { name: "Camel", hex: "#C4A35A" },
    ],
    description: "Premium oversized wool coat with a relaxed silhouette. Crafted from Italian wool blend for exceptional warmth and style.",
    stock: 24,
    featured: true,
    isNew: true,
  },
  {
    id: "2",
    name: "Cashmere Knit Sweater",
    brand: "Essence",
    price: 195,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80"],
    category: "Knitwear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Sage", hex: "#9CAF88" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    description: "Luxuriously soft cashmere sweater with ribbed cuffs and hem. A timeless wardrobe essential.",
    stock: 18,
    featured: true,
  },
  {
    id: "3",
    name: "Tailored Wide-Leg Trousers",
    brand: "NOIR Studio",
    price: 165,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80"],
    category: "Bottoms",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Navy", hex: "#1B2A4A" },
    ],
    description: "Elegantly tailored wide-leg trousers with a high-rise waist. Perfect for both office and evening wear.",
    stock: 30,
    featured: true,
  },
  {
    id: "4",
    name: "Silk Button-Down Shirt",
    brand: "Atelier",
    price: 220,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80"],
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne", hex: "#F7E7CE" },
      { name: "Blush", hex: "#DE6FA1" },
    ],
    description: "Refined silk button-down with a fluid drape. Features mother-of-pearl buttons and French seams.",
    stock: 12,
    isNew: true,
  },
  {
    id: "5",
    name: "Leather Chelsea Boots",
    brand: "Maison Walk",
    price: 340,
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=600&q=80"],
    category: "Footwear",
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Brown", hex: "#8B4513" },
    ],
    description: "Handcrafted leather Chelsea boots with elastic side panels. Premium Italian leather upper with Goodyear welt construction.",
    stock: 15,
    featured: true,
  },
  {
    id: "6",
    name: "Merino Wool Scarf",
    brand: "Essence",
    price: 85,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=600&q=80"],
    category: "Accessories",
    sizes: ["One Size"],
    colors: [
      { name: "Camel", hex: "#C4A35A" },
      { name: "Grey", hex: "#808080" },
      { name: "Burgundy", hex: "#722F37" },
    ],
    description: "Ultra-soft merino wool scarf with a generous drape. Finished with subtle fringe detailing.",
    stock: 40,
  },
  {
    id: "7",
    name: "Structured Blazer",
    brand: "Atelier",
    price: 275,
    originalPrice: 320,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80"],
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Tan", hex: "#D2B48C" },
    ],
    description: "Sharply structured single-breasted blazer with peak lapels. A statement piece for the modern wardrobe.",
    stock: 8,
    isNew: true,
  },
  {
    id: "8",
    name: "Cotton Relaxed Tee",
    brand: "NOIR Studio",
    price: 65,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80"],
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Olive", hex: "#556B2F" },
    ],
    description: "Premium organic cotton tee with a relaxed fit. Garment-dyed for a lived-in look.",
    stock: 50,
  },
];

export const brands = [...new Set(products.map((p) => p.brand))];
export const categories = [...new Set(products.map((p) => p.category))];
export const allColors = [...new Map(products.flatMap((p) => p.colors).map((c) => [c.name, c])).values()];
export const allSizes = [...new Set(products.flatMap((p) => p.sizes))];
