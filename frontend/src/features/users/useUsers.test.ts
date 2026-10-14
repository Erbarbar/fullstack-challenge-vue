import { describe, it, expect, vi, beforeEach } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { useUsers } from '@/features/users/useUsers'
import { mountWithQuery } from '@tests/utils/mountWithQuery'
import { userService } from '@/api'
import { mockUsers, mockUserStats } from '@tests/mocks'

vi.mock('@/api', () => ({
    userService: {
        getUsers: vi.fn(),
        getUserStats: vi.fn(),
    },
}))

describe('useUsers Composable (Logic & Data)', () => {
    let queryResult: ReturnType<typeof useUsers>

    const setupTest = async () => {
        const TestComponent = {
            setup() {
                queryResult = useUsers()
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

    it('successfully fetches and returns users and stats data', async () => {
        vi.mocked(userService.getUsers).mockResolvedValueOnce(mockUsers)
        vi.mocked(userService.getUserStats).mockResolvedValueOnce(mockUserStats)

        await setupTest()

        expect(queryResult!.isError.value).toBe(false)
        expect(queryResult!.isLoading.value).toBe(false)
        expect(queryResult!.users.value).toEqual(mockUsers)
        expect(queryResult!.stats.value).toEqual(mockUserStats)
    })

    it('handles searching logic correctly', async () => {
        vi.mocked(userService.getUsers).mockResolvedValueOnce(mockUsers)
        vi.mocked(userService.getUserStats).mockResolvedValueOnce(mockUserStats)

        await setupTest()

        queryResult!.searchQuery.value = 'Jo'
        expect(queryResult!.users.value.length).toBeLessThanOrEqual(mockUsers.length)

        queryResult!.searchQuery.value = 'NonExistentPerson_XYZ'
        expect(queryResult!.users.value).toEqual([])
    })

    describe('Loading and errors', () => {
        it('returns empty array and null fallbacks during the loading state', async () => {
            vi.mocked(userService.getUsers).mockReturnValue(new Promise(() => { }))
            vi.mocked(userService.getUserStats).mockReturnValue(new Promise(() => { }))

            await setupTest()

            expect(queryResult!.users.value).toEqual([])
            expect(queryResult!.stats.value).toBeNull()
            expect(queryResult!.isLoading.value).toBe(true)
        })

        it('handles an error in the STATS service call (Covers the second branch of the error OR)', async () => {
            vi.mocked(userService.getUsers).mockResolvedValueOnce(mockUsers)
            const statsError = new Error('Stats API Failure')
            vi.mocked(userService.getUserStats).mockRejectedValueOnce(statsError)

            await setupTest()

            expect(queryResult!.isError.value).toBe(true)
            expect(queryResult!.error.value).toEqual(statsError)
        })

        it('handles an error in the USERS service call (Covers the first branch of the error OR)', async () => {
            const usersError = new Error('Users API Failure')
            vi.mocked(userService.getUsers).mockRejectedValueOnce(usersError)
            vi.mocked(userService.getUserStats).mockResolvedValueOnce(mockUserStats)

            await setupTest()

            expect(queryResult!.isError.value).toBe(true)
            expect(queryResult!.error.value).toEqual(usersError)
        })
    })

    describe('sorting', () => {
        it('handles sorting direction toggling (Covers BOTH directions of the ternary)', async () => {
            vi.mocked(userService.getUsers).mockResolvedValueOnce(mockUsers)
            vi.mocked(userService.getUserStats).mockResolvedValueOnce(mockUserStats)

            await setupTest()

            queryResult!.handleSort('name')
            expect(queryResult!.sortOrder.value).toBe('desc')

            queryResult!.handleSort('name')
            expect(queryResult!.sortOrder.value).toBe('asc')

        })

        it('handles sorting direction toggling and verifies actual array re-ordering', async () => {
            const multiUsers = [
                { id: 1, name: 'Zebra', age: 50, gender: 'M', image: '', university: '', state: '', role: '' },
                { id: 2, name: 'Apple', age: 20, gender: 'F', image: '', university: '', state: '', role: '' }
            ]
            vi.mocked(userService.getUsers).mockResolvedValueOnce(multiUsers)
            vi.mocked(userService.getUserStats).mockResolvedValueOnce(mockUserStats)

            await setupTest()

            expect(queryResult!.users.value[0].name).toBe('Apple')
            expect(queryResult!.users.value[1].name).toBe('Zebra')

            queryResult!.handleSort('name')

            expect(queryResult!.users.value[0].name).toBe('Zebra')
            expect(queryResult!.users.value[1].name).toBe('Apple')
        })

        it('handles identical values during sorting without crashing', async () => {
            const duplicateAgeUser = {
                ...mockUsers[0],
                name: 'Duplicate Age User',
                age: mockUsers[0].age
            }

            vi.mocked(userService.getUsers).mockResolvedValueOnce([...mockUsers, duplicateAgeUser])
            vi.mocked(userService.getUserStats).mockResolvedValueOnce(mockUserStats)

            await setupTest()

            queryResult!.handleSort('age')

            expect(queryResult!.users.value).toContainEqual(duplicateAgeUser)
            expect(queryResult!.users.value.length).toBe(mockUsers.length + 1)
        })
    })
})