import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useProducts } from '@/features/products/useProducts'
import { reactive } from 'vue'
import { mockProductAnalytics } from '@tests/mocks'
import ProductAnalytics from './ProductAnalytics.vue'

vi.mock('@/features/products/useProducts', () => ({
    useProducts: vi.fn()
}))

describe('ProductAnalytics Component', () => {
    let mockUseProducts: any

    beforeEach(() => {
        vi.clearAllMocks()
        mockUseProducts = reactive({
            isLoading: false,
            isError: false,
            analytics: { ...mockProductAnalytics },
            searchQuery: '',
            sortField: 'name',
            sortOrder: 'asc',
            handleSort: vi.fn()
        })
        vi.mocked(useProducts).mockReturnValue(mockUseProducts)
    })

    it('renders the charts when data is present', async () => {
        const wrapper = mount(ProductAnalytics)

        const skeletons = wrapper.find('[data-testid="skeletons"]')
        const cards = wrapper.find('[data-testid="cards"]')

        expect(skeletons.exists()).toBe(false)
        expect(cards.exists()).toBe(true)
    })

    it('renders the loading skeleton when isLoading is true', async () => {
        mockUseProducts.isLoading = true;

        const wrapper = mount(ProductAnalytics)

        const skeletons = wrapper.find('[data-testid="skeletons"]')
        const cards = wrapper.find('[data-testid="cards"]')

        expect(skeletons.exists()).toBe(true)
        expect(cards.exists()).toBe(false)
    })
})