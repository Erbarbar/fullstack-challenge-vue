import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useProducts } from '@/features/products/useProducts.ts'
import { mockProducts } from '@tests/mocks'
import ProductList from './ProductList.vue'
import { reactive } from 'vue'

vi.mock('@/features/products/useProducts', () => ({
    useProducts: vi.fn()
}))

describe('ProductList Component', () => {
    let mockUseProducts: any

    beforeEach(() => {
        vi.clearAllMocks()
        mockUseProducts = reactive({
            isLoading: false,
            isError: false,
            products: [...mockProducts],
            searchQuery: '',
            sortField: 'name',
            sortOrder: 'asc',
            handleSort: vi.fn()
        })
        vi.mocked(useProducts).mockReturnValue(mockUseProducts)
    })

    it('renders the charts when data is present', async () => {
        const wrapper = mount(ProductList)

        const input = wrapper.find('input')

        await input.setValue('Apple');
    })

    it('renders the loading skeleton when isLoading is true', async () => {
        mockUseProducts.isLoading = true;

        const wrapper = mount(ProductList)

        const skeletons = wrapper.find('[data-testid="skeleton"]')
        const cards = wrapper.find('[data-testid="card"]')

        expect(skeletons.exists()).toBe(true)
        expect(cards.exists()).toBe(false)
    })

})