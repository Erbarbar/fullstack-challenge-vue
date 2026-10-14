import { http, HttpResponse } from 'msw'
import { mockProductAnalytics, mockProducts } from './mocks/products.mock'
import { mockUsers, mockUserStats } from './mocks'

export const handlers = [
    // Intercept GET /api/users/
    http.get('http://localhost:8000/api/users/', () => {
        return HttpResponse.json(mockUsers)
    }),

    // Intercept GET /api/users/stats/
    http.get('http://localhost:8000/api/users/stats/', () => {
        return HttpResponse.json(mockUserStats)
    }),

    // Intercept GET /api/products/
    http.get('http://localhost:8000/api/products/', () => {
        return HttpResponse.json(mockProducts)
    }),

    // Intercept GET /api/products/analytics/
    http.get('http://localhost:8000/api/products/analytics/', () => {
        return HttpResponse.json(mockProductAnalytics)
    }),
]