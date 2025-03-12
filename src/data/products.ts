export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPercentage?: number;
  imageUrl: string;
  category: string;
  featured?: boolean;
}

const products: Product[] = [
  {
    id: "door-001",
    name: "Classic Mahogany Entry Door",
    description:
      "Elegant solid mahogany door with traditional panel design, perfect for a sophisticated entrance.",
    price: 1299.99,
    discountPercentage: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?w=800&q=80",
    category: "Classic",
    featured: true,
  },
  {
    id: "door-002",
    name: "Modern Minimalist Door",
    description:
      "Clean lines and sleek design make this door perfect for contemporary homes.",
    price: 899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?w=800&q=80",
    category: "Modern",
  },
  {
    id: "door-003",
    name: "Rustic Barn Door",
    description:
      "Authentic barn-style sliding door with distressed wood finish for a rustic touch.",
    price: 749.99,
    discountPercentage: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80",
    category: "Barn-style",
  },
  {
    id: "door-004",
    name: "Carved Teak Masterpiece",
    description:
      "Intricately hand-carved teak door featuring traditional patterns and designs.",
    price: 1899.99,
    imageUrl:
      "https://images.unsplash.com/photo-1558346547-4439467bd1d5?w=800&q=80",
    category: "Carved",
    featured: true,
  },
  {
    id: "door-005",
    name: "Glass Panel Oak Door",
    description:
      "Solid oak door with frosted glass panels allowing light while maintaining privacy.",
    price: 1099.99,
    imageUrl:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    category: "Modern",
  },
  {
    id: "door-006",
    name: "French Double Doors",
    description:
      "Classic French-style double doors with multiple glass panels, perfect for patios or gardens.",
    price: 1599.99,
    discountPercentage: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
    category: "Classic",
  },
  {
    id: "door-007",
    name: "Contemporary Pivot Door",
    description:
      "Modern pivot door design with sleek hardware and clean lines for a dramatic entrance.",
    price: 2199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    category: "Modern",
    featured: true,
  },
  {
    id: "door-008",
    name: "Traditional Paneled Door",
    description:
      "Six-panel solid wood door with classic design that suits any traditional home.",
    price: 699.99,
    imageUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    category: "Classic",
  },
  {
    id: "door-009",
    name: "Custom Stained Glass Door",
    description:
      "Elegant door featuring custom stained glass artwork that creates beautiful light patterns.",
    price: 2499.99,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    category: "Custom",
  },
  {
    id: "door-010",
    name: "Reclaimed Wood Barn Door",
    description:
      "Eco-friendly sliding door made from authentic reclaimed barn wood with visible character.",
    price: 1299.99,
    discountPercentage: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Barn-style",
  },
  {
    id: "door-011",
    name: "Craftsman Style Door",
    description:
      "Arts and Crafts inspired door with characteristic details and quality craftsmanship.",
    price: 1199.99,
    imageUrl:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    category: "Classic",
  },
  {
    id: "door-012",
    name: "Minimalist Flush Door",
    description:
      "Clean, simple flush door design with hidden hinges for a seamless modern look.",
    price: 599.99,
    discountPercentage: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1600566752447-f4c9fb5d9b59?w=800&q=80",
    category: "Modern",
  },
];

export default products;
