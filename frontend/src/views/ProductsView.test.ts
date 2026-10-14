import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductsView from './ProductsView.vue'

vi.mock('@/features/products/components/ProductList.vue', () => ({
    default: { name: 'ProductList', template: '<div class="product-list-container" />' }
}))

vi.mock('@/features/products/components/ProductAnalytics.vue', () => ({
    default: {
        name: 'ProductAnalytics', template: '<div class="product-analytics-container" />'
    }
}))

describe('ProductsView Component (Black-Box Test)', () => {

    it('confirms the presence of child component placeholders', async () => {
        const wrapper = mount(ProductsView)

        const productList = wrapper.findComponent({ name: 'ProductList' })
        const productAnalytics = wrapper.findComponent({ name: 'ProductAnalytics' })

        expect(productList.exists()).toBe(true)
        expect(productAnalytics.exists()).toBe(true)
    })
})