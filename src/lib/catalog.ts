/**
 * Sample catalogue for the storefront until the commerce schema exists.
 *
 * Everything here is placeholder content: product names, prices, stock and
 * copy are invented, and photos are hotlinked from Unsplash (credited per
 * image). When catalog tables land in `src/lib/db/`, replace these exports
 * with queries that return the same shapes.
 */

export type Photo = {
  src: string;
  alt: string;
  /** CSS object-position for crops that should not centre, e.g. "60% 40%". */
  focus?: string;
  /** Unsplash photographer. */
  credit: string;
};

export type CategorySlug = "outerwear" | "knitwear" | "bags" | "shoes";

export type Variant = {
  /** "One size" for products that come in only one. */
  size: string;
  /** Units available to sell. */
  stock: number;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  colour: string;
  /** Whole US dollars. */
  price: number;
  description: string;
  details: string[];
  /** The first image is the one listings show. */
  images: [Photo, ...Photo[]];
  variants: Variant[];
};

export type Collection = {
  slug: string;
  title: string;
  season: string;
  description: string;
  image: Photo;
  products: Product[];
};

/** An image tile that links to a department or category listing. */
export type Tile = {
  slug: string;
  title: string;
  image: Photo;
};

export type Category = Tile & { slug: CategorySlug };

/**
 * Every Unsplash image is requested at one fixed size, so next.config.ts can
 * allow exactly this query string and nothing else.
 */
export const UNSPLASH_QUERY = "?fm=jpg&w=2400&q=80";

function unsplash(id: string, alt: string, credit: string, focus?: string): Photo {
  return { src: `https://images.unsplash.com/${id}${UNSPLASH_QUERY}`, alt, credit, focus };
}

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatPrice(price: number): string {
  return priceFormat.format(price);
}

// Stock ---------------------------------------------------------------------

/** At or below this many units, stock is shown as low. */
export const LOW_STOCK = 3;

export type StockState = "in-stock" | "low-stock" | "sold-out";

export function stockState(units: number): StockState {
  if (units <= 0) return "sold-out";
  if (units <= LOW_STOCK) return "low-stock";
  return "in-stock";
}

export function totalStock(product: Product): number {
  return product.variants.reduce((sum, variant) => sum + variant.stock, 0);
}

/** True for bags and other products without a size choice. */
export function isOneSize(product: Product): boolean {
  return product.variants.length === 1 && product.variants[0].size === "One size";
}

const clothing = (stock: [number, number, number, number, number]): Variant[] =>
  ["XS", "S", "M", "L", "XL"].map((size, index) => ({ size, stock: stock[index] }));

const shoes = (from: number, stock: number[]): Variant[] =>
  stock.map((units, index) => ({ size: `EU ${from + index}`, stock: units }));

const oneSize = (stock: number): Variant[] => [{ size: "One size", stock }];

// Products ------------------------------------------------------------------

export const products: Product[] = [
  {
    slug: "croc-embossed-top-handle-bag",
    name: "Croc-embossed top-handle bag",
    category: "bags",
    colour: "Mimosa yellow",
    price: 2150,
    description:
      "A structured top-handle bag in croc-embossed calf, closed with a turn lock and carried by hand or on its detachable shoulder strap.",
    details: [
      "Croc-embossed calf leather",
      "Suede lining with one flat pocket",
      "Palladium-finish turn lock",
      "Detachable, adjustable shoulder strap",
      "W 26 × H 20 × D 11 cm",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1640901555365-cbbb76b0009b",
        "Yellow croc-embossed leather bag with a single top handle, from the front.",
        "Pablo Figueroa",
      ),
      unsplash(
        "photo-1640901555383-7335ec5a6476",
        "The yellow top-handle bag from three-quarters, showing its gusseted side.",
        "Pablo Figueroa",
      ),
      unsplash(
        "photo-1640901556395-f0e709c33494",
        "The yellow top-handle bag with its shoulder strap clipped on.",
        "Pablo Figueroa",
      ),
    ],
    variants: oneSize(4),
  },
  {
    slug: "ribbed-cashmere-turtleneck",
    name: "Ribbed cashmere turtleneck",
    category: "knitwear",
    colour: "Black",
    price: 790,
    description:
      "A relaxed turtleneck knitted in wide ribs of two-ply cashmere, with a long collar that folds over twice.",
    details: [
      "100% cashmere",
      "Two-ply yarn, 7-gauge rib",
      "Relaxed fit through the body and sleeves",
      "Hand wash cold or dry clean",
      "Made in Scotland",
    ],
    images: [
      unsplash(
        "photo-1774897795463-e6e4618a4997",
        "A woman wearing the black ribbed turtleneck, arms folded.",
        "Alex Larrondo",
        "50% 20%",
      ),
      unsplash(
        "photo-1774897778836-3b13763e71b3",
        "The black turtleneck in profile, showing the folded collar.",
        "Alex Larrondo",
        "50% 30%",
      ),
      unsplash(
        "photo-1774897796159-b295bc2a587c",
        "Close-up of the turtleneck's ribbed collar pulled up to the chin.",
        "Alex Larrondo",
        "50% 35%",
      ),
    ],
    variants: clothing([2, 0, 5, 1, 3]),
  },
  {
    slug: "nappa-slouch-boots",
    name: "Nappa leather slouch boots",
    category: "shoes",
    colour: "Black",
    price: 1350,
    description:
      "Pull-on boots in soft nappa that gathers into slouches at the ankle, on a 55 mm block heel.",
    details: [
      "Nappa lambskin",
      "Leather lining and sole",
      "55 mm block heel",
      "Fits true to size",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1763661300203-aa3e2702f510",
        "Black leather slouch boots with a pointed toe and block heel.",
        "Christine Zhang",
      ),
    ],
    variants: shoes(36, [0, 1, 0, 2, 0, 0]),
  },
  {
    slug: "horn-handle-tote",
    name: "Horn-handle tote in grained leather",
    category: "bags",
    colour: "Cognac",
    price: 2400,
    description:
      "An open tote in pebble-grained calf, carried on a single leather handle capped in horn.",
    details: [
      "Grained calf leather",
      "Handle caps in natural horn; each pair differs",
      "Unlined, with an inside zip pocket",
      "W 34 × H 30 × D 14 cm",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1746880223690-359948154c53",
        "Tan grained-leather tote with a black leather handle.",
        "Leonie Giardini",
      ),
    ],
    variants: oneSize(6),
  },
  {
    slug: "chunky-wool-jumper",
    name: "Chunky wool jumper",
    category: "knitwear",
    colour: "Ecru",
    price: 690,
    description:
      "A crew-neck jumper hand-knitted in undyed British wool, cut generously through the body and sleeves.",
    details: [
      "100% undyed British wool",
      "Hand-knitted, 3-gauge",
      "Oversized fit: take your usual size",
      "Hand wash cold and dry flat",
      "Made in the United Kingdom",
    ],
    images: [
      unsplash(
        "photo-1574201635302-388dd92a4c3f",
        "An ivory hand-knitted wool jumper held up against a white wall.",
        "Valna Studio",
      ),
    ],
    variants: clothing([4, 6, 3, 0, 2]),
  },
  {
    slug: "calf-leather-penny-loafers",
    name: "Penny loafers in calf leather",
    category: "shoes",
    colour: "Chestnut",
    price: 820,
    description:
      "Goodyear-welted penny loafers in hand-burnished calf, on a leather sole that can be replaced when it wears through.",
    details: [
      "Hand-burnished calf leather",
      "Goodyear-welted leather sole",
      "Leather lining",
      "Take half a size down",
      "Made in Portugal",
    ],
    images: [
      unsplash(
        "photo-1777987601447-266e128de448",
        "Brown calf-leather penny loafers on a black stool.",
        "Husien Bisky",
      ),
    ],
    variants: shoes(39, [3, 5, 4, 2, 6, 1]),
  },
  {
    slug: "smooth-leather-crossbody",
    name: "Smooth leather crossbody bag",
    category: "bags",
    colour: "Chalk",
    price: 1480,
    description:
      "A soft crossbody bag in smooth calf, sized for a phone, cards and keys, on a slim adjustable strap.",
    details: [
      "Smooth calf leather",
      "Cotton canvas lining",
      "Magnetic closure",
      "Adjustable strap, 52–60 cm drop",
      "W 22 × H 16 × D 4 cm",
      "Made in Spain",
    ],
    images: [
      unsplash(
        "photo-1604176424472-17cd740f74e9",
        "White smooth-leather crossbody bag with a thin strap.",
        "Maude Frédérique Lavoie",
      ),
    ],
    variants: oneSize(0),
  },
  {
    slug: "polished-calf-chelsea-boots",
    name: "Chelsea boots in polished calf",
    category: "shoes",
    colour: "Tobacco",
    price: 980,
    description:
      "Chelsea boots in polished calf with elastic side gussets and a pull tab, on a stacked leather heel.",
    details: [
      "Polished calf leather",
      "Elastic side gussets",
      "Blake-stitched leather sole",
      "Fits true to size",
      "Made in Portugal",
    ],
    images: [
      unsplash(
        "photo-1777987601677-3059be0e1388",
        "Polished brown calf-leather Chelsea boots.",
        "Husien Bisky",
      ),
    ],
    variants: shoes(40, [1, 0, 2, 1, 0, 1]),
  },
  {
    slug: "double-faced-wool-coat-ivory",
    name: "Double-faced wool coat",
    category: "outerwear",
    colour: "Ivory",
    price: 2650,
    description:
      "A long, unlined coat cut from double-faced wool, with hand-closed seams and a single concealed button.",
    details: [
      "100% virgin wool, double-faced",
      "Unlined; seams closed by hand",
      "Concealed single-button fastening",
      "Relaxed fit, falls below the knee",
      "Dry clean only",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1776273920142-f30bceff0cf3",
        "A woman in the long ivory wool coat over matching trousers.",
        "Shane Ryan Herilalaina",
        "50% 30%",
      ),
      unsplash(
        "photo-1776273920158-510b171e936f",
        "The ivory coat worn open, showing its length and drape.",
        "Shane Ryan Herilalaina",
        "50% 30%",
      ),
    ],
    variants: clothing([2, 4, 4, 2, 1]),
  },
  {
    slug: "single-breasted-overcoat-camel",
    name: "Single-breasted overcoat",
    category: "outerwear",
    colour: "Camel",
    price: 2400,
    description:
      "A three-button overcoat in double-faced wool and cashmere, cut straight with a notch lapel and patch pockets.",
    details: [
      "90% virgin wool, 10% cashmere, double-faced",
      "Unlined; seams closed by hand",
      "Horn buttons",
      "Regular fit, falls to the knee",
      "Dry clean only",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1619603364904-c0498317e145",
        "A man in the camel single-breasted overcoat and a roll-neck.",
        "Taras Chernus",
        "50% 25%",
      ),
    ],
    variants: clothing([3, 5, 4, 2, 4]),
  },
  {
    slug: "double-breasted-wool-jacket",
    name: "Double-breasted wool jacket",
    category: "outerwear",
    colour: "Black",
    price: 1950,
    description:
      "A six-button double-breasted jacket in double-faced wool, with a peak lapel and softly rounded shoulders.",
    details: [
      "100% virgin wool, double-faced",
      "Half-lined in cupro",
      "Metal shank buttons",
      "Relaxed fit",
      "Dry clean only",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1639040538847-a47ef0dc004e",
        "A woman in the black double-breasted wool jacket, in black and white.",
        "Justin Essah",
      ),
      unsplash(
        "photo-1639039186034-27f98b6e5a2f",
        "Close-up of the black double-breasted jacket's lapel, in black and white.",
        "Justin Essah",
        "50% 30%",
      ),
    ],
    variants: clothing([1, 3, 2, 3, 1]),
  },
  {
    slug: "short-double-faced-coat",
    name: "Short double-faced coat",
    category: "outerwear",
    colour: "Ecru",
    price: 2200,
    description:
      "A hip-length double-breasted coat in brushed double-faced wool, with dropped shoulders and deep patch pockets.",
    details: [
      "80% virgin wool, 20% alpaca, double-faced",
      "Unlined; seams closed by hand",
      "Horn buttons",
      "Oversized fit",
      "Dry clean only",
      "Made in Italy",
    ],
    images: [
      unsplash(
        "photo-1680690395101-1b2a56c0ac21",
        "A woman in the short cream wool coat, one hand in a pocket.",
        "Valentina Schick",
        "50% 35%",
      ),
      unsplash(
        "photo-1680690599369-8878cf3eeb59",
        "The short cream coat worn with white jeans, from the front.",
        "Valentina Schick",
        "50% 30%",
      ),
    ],
    variants: clothing([0, 2, 1, 0, 0]),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

function pick(slugs: string[]): Product[] {
  return slugs.map((slug) => {
    const product = getProduct(slug);
    if (!product) throw new Error(`Unknown product: ${slug}`);
    return product;
  });
}

/** Other products to show on a product page: same category first. */
export function relatedProducts(product: Product, limit = 8): Product[] {
  const others = products.filter((other) => other.slug !== product.slug);
  const sameCategory = others.filter((other) => other.category === product.category);
  const rest = others.filter((other) => other.category !== product.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

// Merchandising -------------------------------------------------------------

export const campaign = {
  season: "Autumn–Winter 2026",
  title: "High Ground",
  image: unsplash(
    "photo-1763152750611-fea3ec4b914c",
    "A woman in an ivory wool coat rests on a rocky summit above the clouds.",
    "Mohsen Karimi",
    "58% 40%",
  ),
};

export const departments: Tile[] = [
  {
    slug: "women",
    title: "Women",
    image: unsplash(
      "photo-1659522761084-79196b64abe4",
      "A woman in white wide-leg tailoring, photographed in black and white.",
      "Alina Bordunova",
      "50% 30%",
    ),
  },
  {
    slug: "men",
    title: "Men",
    image: unsplash(
      "photo-1713267471503-0e9ac8e79467",
      "A man in a textured wool jacket and open-collar shirt, in black and white.",
      "Bùi Hoàng Long",
      "50% 25%",
    ),
  },
];

export const newArrivals: Product[] = pick([
  "croc-embossed-top-handle-bag",
  "ribbed-cashmere-turtleneck",
  "nappa-slouch-boots",
  "horn-handle-tote",
  "chunky-wool-jumper",
  "calf-leather-penny-loafers",
  "smooth-leather-crossbody",
  "polished-calf-chelsea-boots",
]);

export const featuredCollection: Collection = {
  slug: "double-faced-wool",
  title: "Double-faced wool",
  season: "The collection",
  description:
    "Coats cut from one cloth woven with two faces, so there is no lining to add weight. Every seam is finished by hand.",
  image: unsplash(
    "photo-1703517425319-d3ceeb9e5ee3",
    "A woman in a long double-faced wool coat walks across a green hillside.",
    "Collins Lesulie",
    "45% 50%",
  ),
  products: pick([
    "double-faced-wool-coat-ivory",
    "single-breasted-overcoat-camel",
    "double-breasted-wool-jacket",
    "short-double-faced-coat",
  ]),
};

export const categories: Category[] = [
  {
    slug: "outerwear",
    title: "Outerwear",
    image: unsplash(
      "photo-1615105690055-ee1c0b3f8c5a",
      "A woman in a long black coat walks through snow under a concrete canopy.",
      "Estonia Incorporated",
      "52% 50%",
    ),
  },
  {
    slug: "knitwear",
    title: "Knitwear",
    image: unsplash(
      "photo-1601379327928-bedfaf9da2d0",
      "A stack of folded knitwear in grey, oatmeal and cream.",
      "Tijana Drndarski",
    ),
  },
  {
    slug: "bags",
    title: "Bags",
    image: unsplash(
      "photo-1612902457341-ed7bf0608be3",
      "A sand leather flap bag with a black clasp, in soft window light.",
      "Farah Samy",
    ),
  },
  {
    slug: "shoes",
    title: "Shoes",
    image: unsplash(
      "photo-1675947258177-aa8120ddefa3",
      "A pair of burgundy penny loafers on a white surface.",
      "Lily Johnson",
    ),
  },
];

export function getCategory(slug: CategorySlug): Category {
  const category = categories.find((candidate) => candidate.slug === slug);
  if (!category) throw new Error(`Unknown category: ${slug}`);
  return category;
}

export const repairs = {
  image: unsplash(
    "photo-1568288796918-03e7d93306bd",
    "A tailor's hands drawing a needle and thread through white cloth.",
    "Elio Santos",
    "45% 50%",
  ),
};
