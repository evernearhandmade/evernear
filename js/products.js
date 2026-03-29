const PRODUCTS = {
  "midnight-dot": {
    name: 'Midnight Dot',
    collection: 'The Classic Collection',
    sizes: 'Le Classique · Le Voyage',
    price: 'From $45',
    images: ["img/midnight-dot-1.jpg","img/midnight-dot-2.jpg"],
    description: 'Bold, classic, and timeless. The Midnight Dot features a striking black fabric with oversized white polka dots, finished with an eyelet lace trim along the zipper. Each bag is carefully cut and sewn by hand in Southern California.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D<br>Le Voyage (Large): 10"W × 6"H × 5"D',
    details: 'Lined interior · Zipper closure · Quilted fabric · Handmade in SoCal'
  },
  "ivory-dot": {
    name: 'Ivory Dot',
    collection: 'The Classic Collection',
    sizes: 'Le Classique · Le Voyage',
    price: 'From $45',
    images: ["img/ivory-dot-1.jpg","img/ivory-dot-2.jpg"],
    description: "A lighter take on the classic dot. Ivory with small black polka dots creates a crisp, effortless look — the kind of bag that feels at home whether you're traveling or getting ready at your vanity.",
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D<br>Le Voyage (Large): 10"W × 6"H × 5"D',
    details: 'Lined interior · Zipper closure · Quilted fabric · Handmade in SoCal'
  },
  "cherry-blossom": {
    name: 'Cherry Blossom',
    collection: 'The Classic Collection',
    sizes: 'Le Classique · Le Voyage',
    price: 'From $45',
    images: ["img/cherry-blossom-1.jpg","img/cherry-blossom-2.jpg"],
    description: 'A celebration of bloom. The Cherry Blossom bag features a playful cherry and floral print on a crisp striped base, finished with white eyelet lace and a red zipper for a charming, feminine touch.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D<br>Le Voyage (Large): 10"W × 6"H × 5"D',
    details: 'Lined interior · Red zipper · Eyelet lace trim · Handmade in SoCal'
  },
  "blueberry": {
    name: 'Blueberry',
    collection: 'The Gingham Collection',
    sizes: 'Le Classique',
    price: '$46',
    images: ["img/blueberry-1.jpg"],
    description: 'Soft blue gingham with delicate white eyelet lace trim and a white zipper. The Blueberry is a dreamy, Parisian-inspired piece that brings a little joy to every morning routine.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D',
    details: 'Lined interior · White zipper · Eyelet lace trim · Handmade in SoCal'
  },
  "strawberry-shortcake": {
    name: 'Strawberry Shortcake',
    collection: 'The Gingham Collection',
    sizes: 'Le Classique',
    price: '$46',
    images: ["img/strawberry-shortcake-1.jpg"],
    description: 'Sweet and bold — red gingham with white eyelet lace trim and a clean white zipper. The Strawberry Shortcake is made for the girl who loves a little color in her everyday essentials.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D',
    details: 'Lined interior · White zipper · Eyelet lace trim · Handmade in SoCal'
  },
  "vanilla-creme": {
    name: 'Vanilla Crème',
    collection: 'The Gingham Collection',
    sizes: 'Le Classique',
    price: '$46',
    images: ["img/vanilla-creme-1.jpg"],
    description: 'Neutral, soft, and effortlessly elegant. The Vanilla Crème features a warm beige gingham with white eyelet lace and a cream zipper — a piece that pairs with everything and feels like a quiet luxury.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D',
    details: 'Lined interior · Cream zipper · Eyelet lace trim · Handmade in SoCal'
  },
  "pink": {
    name: 'Pink',
    collection: 'Ever Essentials',
    sizes: 'Le Essentials',
    price: '$32',
    images: ["img/pink-1.jpg"],
    description: 'A compact everyday essential in sweet pink gingham. The perfect size to toss in your bag for quick touch-ups — lipstick, a small mirror, and all the little things you keep close.',
    dimensions: 'Le Essentials (Small): 6"W × 3.5"H × 3"D',
    details: 'Lined interior · Fabric zipper tie · Handmade in SoCal'
  },
  "sorbet": {
    name: 'Sorbet',
    collection: 'Ever Essentials',
    sizes: 'Le Essentials',
    price: '$32',
    images: ["img/sorbet-1.jpg"],
    description: 'Fresh mint and red stripes — cheerful and summery. The Sorbet is a little burst of color made for life on the go.',
    dimensions: 'Le Essentials (Small): 6"W × 3.5"H × 3"D',
    details: 'Lined interior · Fabric zipper tie · Gold zipper · Handmade in SoCal'
  },
  "bluebell-essential": {
    name: 'Bluebell',
    collection: 'Ever Essentials',
    sizes: 'Le Essentials',
    price: '$32',
    images: ["img/bluebell-garden-essentials.jpg"],
    description: 'Tiny blue flowers on soft white muslin — gentle and sweet. The Bluebell Essential is made from a textured double-gauze fabric that feels as soft as it looks.',
    dimensions: 'Le Essentials (Small): 6"W × 3.5"H × 3"D',
    details: 'Double-gauze muslin · Fabric zipper tie · Handmade in SoCal'
  },
  "petal-essential": {
    name: 'Petal',
    collection: 'Ever Essentials',
    sizes: 'Le Essentials',
    price: '$32',
    images: ["img/petal-garden-essentials.jpg"],
    description: 'White lace stripe and delicate botanical embroidery — romantic and refined. The Petal Essential captures the quiet beauty of something handmade with care.',
    dimensions: 'Le Essentials (Small): 6"W × 3.5"H × 3"D',
    details: 'Embroidered fabric · Fabric zipper tie · Handmade in SoCal'
  },
  "bluebell-garden": {
    name: 'Bluebell',
    collection: 'The Garden Collection',
    sizes: 'Le Classique · Le Essentials',
    price: 'From $32',
    images: ["img/bluebell-garden-classique.jpg","img/bluebell-garden-essentials.jpg"],
    description: 'Soft and serene — tiny blue flowers scattered across white quilted fabric, with white eyelet lace trim and a gentle zipper. The Bluebell is made for the girl who finds beauty in quiet, delicate things.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D<br>Le Essentials (Small): 6"W × 3.5"H × 3"D',
    details: 'Quilted double-gauze · Lined interior · Eyelet lace trim · Handmade in SoCal'
  },
  "petal-garden": {
    name: 'Petal',
    collection: 'The Garden Collection',
    sizes: 'Le Classique · Le Essentials',
    price: 'From $32',
    images: ["img/petal-garden-classique.jpg","img/petal-garden-essentials.jpg"],
    description: 'White lace stripes and hand-stitched botanicals — the Petal is a piece that feels like a garden in the morning light. Made from a textured lace-stripe fabric with embroidered green florals and a delicate zipper.',
    dimensions: 'Le Classique (Medium): 8"W × 5"H × 4"D<br>Le Essentials (Small): 6"W × 3.5"H × 3"D',
    details: 'Embroidered lace fabric · Lined interior · Fabric zipper bow · Handmade in SoCal'
  },
};