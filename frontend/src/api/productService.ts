import { apiClient } from '@/api';
import type { Product, ProductAnalytics } from '@/types';

export const productService = {
    async getProducts(): Promise<Product[]> {
        const response = await apiClient.get<Product[]>('/products/');
        return response.data;
    },

    async getProductAnalytics(): Promise<ProductAnalytics> {
        const response = await apiClient.get<ProductAnalytics>('/products/analytics/');
        return response.data;
    }
};