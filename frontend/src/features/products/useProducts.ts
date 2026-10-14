import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { productService } from '@/api'
import type { Product, ProductAnalytics } from '@/types'

export function useProducts() {
    const productsQuery = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: () => productService.getProducts(),
    })

    const analyticsQuery = useQuery<ProductAnalytics>({
        queryKey: ['product-analytics'],
        queryFn: () => productService.getProductAnalytics(),
    })

    const searchQuery = ref('')
    const sortField = ref<keyof Product>('title')
    const sortOrder = ref<'asc' | 'desc'>('asc')

    const filteredAndSortedProducts = computed(() => {
        const products = productsQuery.data.value ?? []

        // Filter logic
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )

        // Sort logic
        return [...filtered].sort((a, b) => {
            const field = sortField.value
            const modifier = sortOrder.value === 'asc' ? 1 : -1

            // We use a type-safe comparison
            if (a[field] < b[field]) return -1 * modifier
            if (a[field] > b[field]) return 1 * modifier
            return 0
        })
    })

    return {
        // Expose the processed data
        products: filteredAndSortedProducts,
        analytics: computed(() => analyticsQuery.data.value ?? null),

        // Expose loading/error states
        isLoading: computed(() => productsQuery.isPending.value || analyticsQuery.isPending.value),
        isError: computed(() => productsQuery.isError.value || analyticsQuery.isError.value),

        // Expose the controls (so UI components can trigger them)
        searchQuery,
        sortField,
        sortOrder,
        handleSort: (field: keyof Product) => {
            if (sortField.value === field) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
            } else {
                sortField.value = field
                sortOrder.value = 'asc'
            }
        }
    }
}