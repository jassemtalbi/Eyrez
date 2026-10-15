export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAt?: number;
  description: string;
  details: string[];
  active?: boolean;
  colors: { name: string; hex: string }[];
  sizes: string[];
  images: string[];
  isNew?: boolean;
  bestseller?: boolean;
  stock: number;
  rating: number;
  reviews: number;
};

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const categories: Category[] = [
  {
    slug: "dresses",
    name: "Dresses",
    description: "Flowing silhouettes for every occasion.",
    image: u("1595777457583-95e059d581b8"),
  },
  {
    slug: "sets",
    name: "Co-ord Sets",
    description: "Effortless matching pieces.",
    image: u("1509631179647-0177331693ae"),
  },
  {
    slug: "outerwear",
    name: "Outerwear",
    description: "Coats and blazers with structure.",
    image: u("1539109136881-3be0616acf4b"),
  },
  {
    slug: "tops",
    name: "Tops & Shirts",
    description: "Refined essentials, daily.",
    image: u("1581044777550-4cfa60707c03"),
  },
  {
    slug: "accessories",
    name: "Accessories",
    description: "The finishing touch.",
    image: u("1584917865442-de89df76afd3"),
  },
];

const neutral = [
  { name: "Cream", hex: "#F3E9DA" },
  { name: "Camel", hex: "#B8875A" },
  { name: "Espresso", hex: "#4A2E1C" },
];

/** Initial catalogue, copied into the database on first run. */
export const seedProducts: Product[] = [
  {
    id: "p1",
    slug: "aurelia-satin-maxi-dress",
    name: "Aurelia Satin Maxi Dress",
    category: "dresses",
    price: 289,
    description:
      "A fluid satin maxi dress with a softly draped neckline and a flattering bias cut that moves beautifully with you.",
    details: ["100% satin polyester, silky finish", "Bias cut, ankle length", "Hidden side zip", "Dry clean recommended"],
    colors: [{ name: "Champagne", hex: "#E8D3B0" }, { name: "Espresso", hex: "#4A2E1C" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [u("1595777457583-95e059d581b8"), u("1566174053879-31528523f8ae")],
    isNew: true,
    bestseller: true,
    stock: 12,
    rating: 4.9,
    reviews: 64,
  },
  {
    id: "p2",
    slug: "selene-linen-wrap-dress",
    name: "Selene Linen Wrap Dress",
    category: "dresses",
    price: 219,
    compareAt: 259,
    description:
      "Breathable linen wrap dress with a tie waist and fluttered sleeves — made for sunlit days and warm evenings.",
    details: ["Linen blend", "Adjustable wrap tie", "Midi length", "Machine wash cold"],
    colors: neutral,
    sizes: ["S", "M", "L", "XL"],
    images: [u("1566174053879-31528523f8ae"), u("1496747611176-843222e1e57c")],
    bestseller: true,
    stock: 7,
    rating: 4.7,
    reviews: 41,
  },
  {
    id: "p3",
    slug: "noor-pleated-midi-dress",
    name: "Noor Pleated Midi Dress",
    category: "dresses",
    price: 249,
    description:
      "Delicately pleated midi dress with long sleeves and a defined waist, an elegant choice from day to night.",
    details: ["Fine crepe fabric", "Permanent pleats", "Elasticated cuffs", "Hand wash"],
    colors: [{ name: "Sand", hex: "#D9C2A0" }, { name: "Olive", hex: "#6B6A45" }],
    sizes: ["XS", "S", "M", "L"],
    images: [u("1496747611176-843222e1e57c"), u("1485968579580-b6d095142e6e")],
    isNew: true,
    stock: 15,
    rating: 4.8,
    reviews: 22,
  },
  {
    id: "p4",
    slug: "lina-two-piece-set",
    name: "Lina Two-Piece Set",
    category: "sets",
    price: 239,
    description:
      "A relaxed shirt and wide-leg trouser set cut from soft crepe — polished, comfortable and endlessly versatile.",
    details: ["Crepe fabric", "Oversized shirt + wide-leg trouser", "Elastic waistband", "Machine wash 30°"],
    colors: neutral,
    sizes: ["S", "M", "L", "XL"],
    images: [u("1509631179647-0177331693ae"), u("1515886657613-9f3515b0c78f")],
    bestseller: true,
    stock: 20,
    rating: 4.9,
    reviews: 88,
  },
  {
    id: "p5",
    slug: "yasmine-knit-set",
    name: "Yasmine Knit Set",
    category: "sets",
    price: 199,
    compareAt: 239,
    description: "Ribbed knit cardigan and straight skirt set with a cosy, sculpted feel.",
    details: ["Soft rib knit", "Button-front cardigan", "Midi skirt", "Hand wash cold"],
    colors: [{ name: "Oat", hex: "#E3D4BC" }, { name: "Mocha", hex: "#7B5A44" }],
    sizes: ["S", "M", "L"],
    images: [u("1515886657613-9f3515b0c78f"), u("1469334031218-e382a71b716b")],
    isNew: true,
    stock: 9,
    rating: 4.6,
    reviews: 19,
  },
  {
    id: "p6",
    slug: "camille-wool-coat",
    name: "Camille Wool-Blend Coat",
    category: "outerwear",
    price: 449,
    description:
      "A tailored long coat in a warm wool blend with notched lapels and a belted waist. A forever piece.",
    details: ["Wool blend", "Fully lined", "Removable belt", "Dry clean only"],
    colors: [{ name: "Camel", hex: "#B8875A" }, { name: "Ivory", hex: "#F4EEE3" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [u("1539109136881-3be0616acf4b"), u("1525507119028-ed4c629a60a3")],
    bestseller: true,
    stock: 6,
    rating: 5,
    reviews: 37,
  },
  {
    id: "p7",
    slug: "ines-tailored-blazer",
    name: "Inès Tailored Blazer",
    category: "outerwear",
    price: 319,
    description: "A sharply tailored single-breasted blazer with softly padded shoulders.",
    details: ["Structured twill", "Single button", "Flap pockets", "Dry clean"],
    colors: neutral,
    sizes: ["S", "M", "L", "XL"],
    images: [u("1594633312681-425c7b97ccd1"), u("1539109136881-3be0616acf4b")],
    isNew: true,
    stock: 11,
    rating: 4.8,
    reviews: 28,
  },
  {
    id: "p8",
    slug: "mira-silk-touch-shirt",
    name: "Mira Silk-Touch Shirt",
    category: "tops",
    price: 129,
    description: "An oversized shirt with a fluid silk-touch drape and pearl-effect buttons.",
    details: ["Silk-touch viscose", "Relaxed fit", "Pearl-effect buttons", "Machine wash delicate"],
    colors: [{ name: "White", hex: "#FAF7F2" }, { name: "Champagne", hex: "#E8D3B0" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    images: [u("1581044777550-4cfa60707c03"), u("1485968579580-b6d095142e6e")],
    bestseller: true,
    stock: 25,
    rating: 4.7,
    reviews: 53,
  },
  {
    id: "p9",
    slug: "sara-ribbed-top",
    name: "Sara Ribbed Top",
    category: "tops",
    price: 79,
    compareAt: 99,
    description: "A sculpting ribbed top with a square neckline — the essential layering piece.",
    details: ["Stretch rib cotton", "Slim fit", "Square neckline", "Machine wash"],
    colors: neutral,
    sizes: ["XS", "S", "M", "L"],
    images: [u("1469334031218-e382a71b716b"), u("1483985988355-763728e1935b")],
    stock: 30,
    rating: 4.5,
    reviews: 17,
  },
  {
    id: "p10",
    slug: "eyrez-signature-tote",
    name: "Eyrez Signature Tote",
    category: "accessories",
    price: 179,
    description: "A structured vegan-leather tote with gold hardware and the embossed Eyrez monogram.",
    details: ["Vegan leather", "Gold-tone hardware", "Inner zip pocket", "W 38 × H 28 cm"],
    colors: [{ name: "Caramel", hex: "#A86F3D" }, { name: "Black", hex: "#1C1714" }],
    sizes: ["One size"],
    images: [u("1584917865442-de89df76afd3"), u("1548036328-c9fa89d128fa")],
    bestseller: true,
    stock: 14,
    rating: 4.9,
    reviews: 71,
  },
  {
    id: "p11",
    slug: "luna-mini-bag",
    name: "Luna Mini Bag",
    category: "accessories",
    price: 119,
    description: "A petite shoulder bag with a curved silhouette and a detachable chain strap.",
    details: ["Vegan leather", "Detachable chain", "Magnetic closure", "W 22 × H 14 cm"],
    colors: [{ name: "Cream", hex: "#F3E9DA" }, { name: "Espresso", hex: "#4A2E1C" }],
    sizes: ["One size"],
    images: [u("1548036328-c9fa89d128fa"), u("1584917865442-de89df76afd3")],
    isNew: true,
    stock: 18,
    rating: 4.6,
    reviews: 12,
  },
  {
    id: "p12",
    slug: "rania-trench-coat",
    name: "Rania Trench Coat",
    category: "outerwear",
    price: 389,
    compareAt: 429,
    description: "The classic double-breasted trench, reimagined with a softer drape and longer line.",
    details: ["Water-repellent cotton blend", "Double-breasted", "Storm flap & belt", "Dry clean"],
    colors: [{ name: "Beige", hex: "#D8C3A0" }],
    sizes: ["S", "M", "L", "XL"],
    images: [u("1525507119028-ed4c629a60a3"), u("1594633312681-425c7b97ccd1")],
    stock: 4,
    rating: 4.8,
    reviews: 31,
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const heroImages = {
  main: u("1490481651871-ab68de25d43d", 1800),
  story: u("1445205170230-053b83016050", 1400),
  lookbook: [u("1483985988355-763728e1935b", 1000), u("1485968579580-b6d095142e6e", 1000), u("1469334031218-e382a71b716b", 1000)],
};
