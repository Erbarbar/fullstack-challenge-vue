import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { userService } from '@/api'
import { handlers } from '@tests/handlers'
import { mockUsers } from '@tests/mocks'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

describe('userService', () => {
    it('should fetch and return a list of users', async () => {
        const users = await userService.getUsers()
        expect(users.length).toBe(mockUsers.length)
        expect(users[0].id).toBe(mockUsers[0].id)
    })

    it('should handle 500 error from the server for users', async () => {
        server.use(
            http.get('http://localhost:8000/api/users/', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        try {
            await userService.getUsers()
            expect.fail('Expected error to be thrown')
        } catch (e: any) {
            expect(e).toBeDefined()
        }
    })

    it('should fetch and return user analytics', async () => {
        const analytics = await userService.getUserStats()
        expect(analytics).toBeDefined()
    })

    it('should handle 500 error from the server for analytics', async () => {
        server.use(
            http.get('http://localhost:8000/api/users/stats/', () => {
                return new HttpResponse(null, { status: 500 })
            })
        )

        try {
            await userService.getUserStats()
            expect.fail('Expected error to be thrown')
        } catch (e: any) {
            expect(e).toBeDefined()
        }
    })
})