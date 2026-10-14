export interface Product {
    id: number;
    title: string;
    brand: string;
    category: string;
    price: number;
    stock: number;
    image: string;
}

export interface ProductAnalytics {
    top_brands: Record<Product['brand'], number>;
    category_counts: Record<Product['category'], number>;
    price_diffs: Record<Product['category'], number>;
    category_stock: Record<Product['category'], number>;
    total_inventory: number;
}
