import type { Product, ProductAnalytics } from '../../src/types/product';

export const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Apple',
        brand: 'Continente',
        category: 'Food',
        price: 10,
        stock: 5,
        image: "",
    },
    {
        id: 2,
        title: 'Pear',
        brand: 'Aldi',
        category: 'Food',
        price: 20,
        stock: 2,
        image: "",
    }
];

export const mockProductAnalytics: ProductAnalytics = {
    top_brands: { 'brand_1': 4.5, 'brand_2': 4.0 },
    category_counts: { 'category_1': 4, 'category_2': 3 },
    price_diffs: { 'category_1': 4, 'category_2': 3 },
    category_stock: { 'category_1': 40, 'category_2': 30 },
    total_inventory: 100
};