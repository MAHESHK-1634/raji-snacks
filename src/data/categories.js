export const categories = [
  {
    id: 'murukku',
    name: 'Murukku',
    slug: 'murukku',
    tagline: 'Spiral Perfection',
    tamilName: 'முறுக்கு வகைகள்',
    description: 'Crispy, golden South Indian spirals hand-crafted with rice flour, roasted urad dal, cumin, and fragrant spices.',
    image: '/images/category_murukku.jpg',
    bannerImage: '/images/hero_snack_spread.jpg',
    productCount: 5,
    highlight: '5 Artisanal Varieties'
  },
  {
    id: 'mixture',
    name: 'Mixture',
    slug: 'mixture',
    tagline: 'Madurai Royal Blend',
    tamilName: 'மதுரை மிக்சர்',
    description: 'A savory medley of crunchy sev, roasted peanuts, fried boondi, cashews, and aromatic curry leaves with Madurai spices.',
    image: '/images/category_mixture.jpg',
    bannerImage: '/images/madurai_special_mixture.jpg',
    productCount: 1,
    highlight: 'Signature Spice Recipe'
  },
  {
    id: 'kara-sevu',
    name: 'Kara Sevu',
    slug: 'kara-sevu',
    tagline: 'Bold Pepper Crunch',
    tamilName: 'மானாமதுரை காராசேவு',
    description: 'Hearty, bold gram flour sticks generously seasoned with freshly crushed black pepper, garlic cloves, and cumin.',
    image: '/images/category_kara_sevu.jpg',
    bannerImage: '/images/manamadurai_kara_sevu.jpg',
    productCount: 1,
    highlight: 'Crushed Black Pepper & Garlic'
  }
];

export const getCategoryBySlug = (slug) => {
  return categories.find(cat => cat.slug === slug || cat.id === slug);
};
