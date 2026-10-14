import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useProducts } from '@/features/products/useProducts'
import { mountWithQuery } from '@tests/utils/mountWithQuery'
import { productService } from '@/api'
import { mockProducts, mockProductAnalytics } from '@tests/mocks'

vi.mock('@/api', () => ({
    productService: {
        getProducts: vi.fn(),
        getProductAnalytics: vi.fn(),
    },
}))

describe('useProducts Composable (Logic & Data)', () => {
    let queryResult: ReturnType<typeof useProducts>

    const setupTest = async () => {
        const TestComponent = {
            setup() {
                queryResult = useProducts()
                return {}
            },
            template: '<div />',
        }
        mountWithQuery(TestComponent)
        await flushPromises()
        return queryResult
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('successfully fetches and returns users and analytics data', async () => {
        vi.mocked(productService.getProducts).mockResolvedValueOnce(mockProducts)
        vi.mocked(productService.getProductAnalytics).mockResolvedValueOnce(mockProductAnalytics)

        await setupTest()

        expect(queryResult!.isError.value).toBe(false)
        expect(queryResult!.isLoading.value).toBe(false)
        expect(queryResult!.products.value).toEqual(mockProducts)
        expect(queryResult!.analytics.value).toEqual(mockProductAnalytics)
    })

    it('handles searching logic correctly', async () => {
        vi.mocked(productService.getProducts).mockResolvedValueOnce(mockProducts)
        vi.mocked(productService.getProductAnalytics).mockResolvedValueOnce(mockProductAnalytics)

        await setupTest()

        queryResult!.searchQuery.value = 'Ap'
        expect(queryResult!.products.value.length).toBeLessThanOrEqual(mockProducts.length)

        queryResult!.searchQuery.value = 'NonExistentProduct_XYZ'
        expect(queryResult!.products.value).toEqual([])
    })

    describe('loading and errors', () => {
        it('returns loading state correctly when promises are pending', async () => {
            vi.mocked(productService.getProducts).mockReturnValue(new Promise(() => { }))
            vi.mocked(productService.getProductAnalytics).mockReturnValue(new Promise(() => { }))

            await setupTest()

            expect(queryResult!.analytics.value).toBeNull()
            expect(queryResult!.isLoading.value).toBe(true)
            expect(queryResult!.isError.value).toBe(false)

        })

        it('handles null data by returning an empty array fallback', async () => {
            vi.mocked(productService.getProducts).mockResolvedValueOnce(null as any)
            vi.mocked(productService.getProductAnalytics).mockResolvedValueOnce(mockProductAnalytics)

            await setupTest()

            expect(queryResult!.products.value).toEqual([])
        })
    })

    describe('sorting', () => {
        it('handles sorting direction toggling properly', async () => {
            vi.mocked(productService.getProducts).mockResolvedValueOnce(mockProducts)
            vi.mocked(productService.getProductAnalytics).mockResolvedValueOnce(mockProductAnalytics)

            await setupTest()

            expect(queryResult!.sortOrder.value).toBe('asc')

            queryResult!.handleSort('title')
            expect(queryResult!.sortOrder.value).toBe('desc')

            queryResult!.handleSort('price')
            expect(queryResult!.sortOrder.value).toBe('asc')
        })

        it('handles identical values during sorting without crashing', async () => {
            const duplicateProducts = [
                { ...mockProducts[0], title: 'Same Title' },
                { ...mockProducts[0], title: 'Same Title' },
                { ...mockProducts[0], title: 'Different Title', }
            ]
            vi.mocked(productService.getProducts).mockResolvedValueOnce(duplicateProducts)
            vi.mocked(productService.getProductAnalytics).mockResolvedValueOnce(mockProductAnalytics)

            await setupTest()

            queryResult!.handleSort('title')

            expect(queryResult!.products.value.length).toBe(3)
            expect(queryResult!.products.value[0].title).toBe('Same Title')
            expect(queryResult!.products.value).toContainEqual(duplicateProducts[0])
        })

    })

    it('handles the direction modifier logic for both directions', async () => {
        const collisionProducts = [
            { ...mockProducts[0], title: 'B', price: 10 },
            { ...mockProducts[1], title: 'A', price: 20, }
        ];

        vi.mocked(productService.getProducts).mockResolvedValueOnce(collisionProducts)
        vi.mocked(productService.getProductAnalytics).mockResolvedValueOnce(mockProductAnalytics)
        await setupTest()

        queryResult!.handleSort('title')
        expect(queryResult!.sortOrder.value).toBe('desc')

        queryResult!.handleSort('title')
        expect(queryResult!.sortOrder.value).toBe('asc')
    })

})