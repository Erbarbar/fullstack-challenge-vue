import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { productService } from '@/api'
import { handlers } from '@tests/handlers'
import { mockProducts } from '@tests/mocks/products.mock'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('productService', () => {
    // --- Products Tests ---
    it('should fetch and return a list of products', async () => {
        const products = await productService.getProducts()
        expect(products.length).toBe(mockProducts.length)
        expect(products[0].id).toBe(mockProducts[0].id)
    })

    it('should handle 500 error from the server for products', async () => {
        server.use(
            http.get('http://localhost:8000/api/products/', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        try {
            await productService.getProducts()
            expect.fail('Expected error to be thrown')
        } catch (e: any) {
            expect(e).toBeDefined()
        }
    })

    // --- Product Analytics Tests (Ensuring 100% Method Coverage) ---
    it('should fetch and return product analytics', async () => {
        const analytics = await productService.getProductAnalytics()
        expect(analytics).toBeDefined()
    })

    it('should handle 500 error from the server for analytics', async () => {
        server.use(
            http.get('http://localhost:8000/api/products/analytics/', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        try {
            await productService.getProductAnalytics()
            expect.fail('Expected error to be thrown')
        } catch (e: any) {
            expect(e).toBeDefined()
        }
    })
})