export const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'mens', name: 'Mens Wear' },
  { id: 'women', name: 'Women Wear' },
  { id: 'kids', name: 'Kids Wear' },
  { id: 'seasonal', name: 'Seasonal Wear' }
];

export const PRODUCTS = [
  {
    id: 'drs-001',
    name: 'Royal Maroon Embroidered Silk Kurta Set',
    category: 'ethnic',
    categoryName: 'Royal Ethnic',
    gender: 'Men',
    price: 3499,
    originalPrice: 4999,
    discount: '30% OFF',
    rating: 4.9,
    reviewsCount: 128,
    images: [
      '/images/royal_silk_kurta_1784710967547.png',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Crafted from hand-selected raw silk, featuring intricate subtle zari hand-embroidery along the mandarin collar and placket. Paired with a tailored cream churidar pajama.',
    fabric: '100% Pure Raw Silk with Cotton Lining',
    colors: [
      { name: 'Royal Maroon', hex: '#800020' },
      { name: 'Cream Beige', hex: '#EDE4DD' },
      { name: 'Midnight Navy', hex: '#1B263B' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    isNewArrival: true,
    isTrending: true,
    outfitType: 'top',
    outfitPairIds: ['drs-005', 'drs-006']
  },
  {
    id: 'drs-002',
    name: 'Italian Tailored Navy Blue Linen Suit',
    category: 'suits',
    categoryName: 'Suits & Blazers',
    gender: 'Men',
    price: 6999,
    originalPrice: 9999,
    discount: '30% OFF',
    rating: 4.95,
    reviewsCount: 94,
    images: [
      '/images/tailored_linen_suit_1784710982724.png',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'An iconic 2-piece tailored suit crafted from lightweight breathable Italian linen blend. Structured shoulder alignment with modern slim taper fit trousers.',
    fabric: '70% Italian Linen, 30% Fine Wool Blend',
    colors: [
      { name: 'Navy Blue', hex: '#1B263B' },
      { name: 'Charcoal Black', hex: '#171717' },
      { name: 'Sand Khaki', hex: '#C2B280' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    inStock: true,
    isNewArrival: true,
    isTrending: true,
    outfitType: 'outerwear',
    outfitPairIds: ['drs-004', 'drs-007']
  },
  {
    id: 'drs-003',
    name: 'Heritage Gold Thread Embroidered Saree',
    category: 'women-ethnic',
    categoryName: 'Women Couture',
    gender: 'Women',
    price: 8499,
    originalPrice: 11999,
    discount: '29% OFF',
    rating: 4.88,
    reviewsCount: 142,
    images: [
      '/images/designer_ethnic_saree_1784710997737.png',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Bespoke Varanasi silk drape woven with antique gold zari work and rich scalloped border. Comes with an unstitched brocade blouse piece.',
    fabric: 'Pure Kanjivaram Silk',
    colors: [
      { name: 'Crimson Gold', hex: '#A31D24' },
      { name: 'Emerald Green', hex: '#004B49' }
    ],
    sizes: ['Free Size'],
    inStock: true,
    isNewArrival: true,
    isTrending: true,
    outfitType: 'full',
    outfitPairIds: []
  },
  {
    id: 'drs-004',
    name: 'Editorial Cream Cotton Linen Oxford Shirt',
    category: 'shirts',
    categoryName: 'Formal & Casual Shirts',
    gender: 'Men',
    price: 1899,
    originalPrice: 2499,
    discount: '24% OFF',
    rating: 4.75,
    reviewsCount: 86,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Signature relaxed-fit Oxford shirt designed with mother-of-pearl buttons, curved hemline, and breathable weave for effortlessly sharp look.',
    fabric: '100% Organic Egyptian Cotton',
    colors: [
      { name: 'Warm Cream', hex: '#EDE4DD' },
      { name: 'Powder Blue', hex: '#B0C4DE' },
      { name: 'Crisp White', hex: '#FFFFFF' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    isNewArrival: false,
    isTrending: true,
    outfitType: 'top',
    outfitPairIds: ['drs-002', 'drs-007']
  },
  {
    id: 'drs-005',
    name: 'Handcrafted Velvet Nehru Jacket',
    category: 'outerwear',
    categoryName: 'Jackets & Vests',
    gender: 'Men',
    price: 2999,
    originalPrice: 3999,
    discount: '25% OFF',
    rating: 4.92,
    reviewsCount: 67,
    images: [
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Plush Micro-Velvet Nehru Jacket with antique metal buttons and pocket square slot. Perfect layer for festive celebrations.',
    fabric: 'Micro-Velvet with Satin Inner Lining',
    colors: [
      { name: 'Deep Burgundy', hex: '#5C0017' },
      { name: 'Royal Emerald', hex: '#0B3B24' },
      { name: 'Obsidian Black', hex: '#0D0D0D' }
    ],
    sizes: ['38', '40', '42', '44'],
    inStock: true,
    isNewArrival: true,
    isTrending: false,
    outfitType: 'outerwear',
    outfitPairIds: ['drs-001', 'drs-004']
  },
  {
    id: 'drs-006',
    name: 'Raw Silk Tapered Churidar Trousers',
    category: 'ethnic',
    categoryName: 'Royal Ethnic',
    gender: 'Men',
    price: 1299,
    originalPrice: 1799,
    discount: '27% OFF',
    rating: 4.7,
    reviewsCount: 52,
    images: [
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Comfort-fit adjustable waist raw silk churidar with gathered ankle pleats.',
    fabric: 'Dupion Raw Silk Blend',
    colors: [
      { name: 'Ivory White', hex: '#F8F9FA' },
      { name: 'Golden Beige', hex: '#D2CAC3' }
    ],
    sizes: ['Free Size (Drawstring)'],
    inStock: true,
    isNewArrival: false,
    isTrending: false,
    outfitType: 'bottom',
    outfitPairIds: ['drs-001', 'drs-005']
  },
  {
    id: 'drs-007',
    name: 'Slim Tapered Italian Chino Trousers',
    category: 'shirts',
    categoryName: 'Formal & Casual Shirts',
    gender: 'Men',
    price: 2199,
    originalPrice: 2899,
    discount: '24% OFF',
    rating: 4.81,
    reviewsCount: 79,
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Stretch-cotton chino trousers with tailored coin pocket, secret phone sleeve, and wrinkle-resistant finish.',
    fabric: '98% Cotton Twill, 2% Elastane',
    colors: [
      { name: 'Charcoal Gray', hex: '#333333' },
      { name: 'Desert Sand', hex: '#D2CAC3' },
      { name: 'Midnight Navy', hex: '#1B263B' }
    ],
    sizes: ['30', '32', '34', '36'],
    inStock: true,
    isNewArrival: true,
    isTrending: true,
    outfitType: 'bottom',
    outfitPairIds: ['drs-002', 'drs-004']
  },
  {
    id: 'drs-008',
    name: 'Contemporary Indo-Western Bandhgala Jacket',
    category: 'ethnic',
    categoryName: 'Royal Ethnic',
    gender: 'Men',
    price: 5499,
    originalPrice: 7499,
    discount: '26% OFF',
    rating: 4.96,
    reviewsCount: 110,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80',
      '/images/hero_lookbook_banner_1784710931238.png'
    ],
    description: 'Asymmetric front cut Bandhgala featuring antique silver buttons and handcrafted textured weave.',
    fabric: 'Raw Jacquard Silk Blend',
    colors: [
      { name: 'Obsidian Black', hex: '#171717' },
      { name: 'Imperial Maroon', hex: '#800020' }
    ],
    sizes: ['38R', '40R', '42R', '44R'],
    inStock: true,
    isNewArrival: true,
    isTrending: true,
    outfitType: 'outerwear',
    outfitPairIds: ['drs-006', 'drs-007']
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Vikramaditya S.',
    rating: 5,
    date: '2 days ago',
    comment: 'The quality of the Maroon Raw Silk Kurta from Dinesh Readymade Store exceeded my expectations! The stitching and drape feel like custom boutique fitting.',
    verified: true
  },
  {
    id: 2,
    name: 'Ananya Roy',
    rating: 5,
    date: '1 week ago',
    comment: 'Ordered the Heritage Saree for my cousin wedding. Delivered in 2 days in a gorgeous velvet gift package. Absolute luxury aesthetic!',
    verified: true
  },
  {
    id: 3,
    name: 'Rajesh Sharma',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The Italian Linen suit cut is flawless. Fits like a glove. Will definitely recommend Dinesh Readymade Store to everyone!',
    verified: true
  }
];
