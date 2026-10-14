import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserStats from './UserStats.vue'
import { useUsers } from '@/features/users/useUsers'

vi.mock('@/features/users/useUsers', () => ({
    useUsers: vi.fn()
}))

describe('UserStats Component', () => {
    let mockUseUsers: any;

    beforeEach(() => {
        vi.clearAllMocks()
        mockUseUsers = {
            isLoading: false,
            isError: false,
            stats: {
                states: { 'London': 5 },
                universities: { 'Oxford': 2 },
                total_users: 7
            }
        }
        vi.mocked(useUsers).mockReturnValue(mockUseUsers)
    })

    it('renders the charts when data is present', async () => {
        const wrapper = mount(UserStats)

        const skeletons = wrapper.find('[data-testid="skeletons"]')
        const cards = wrapper.find('[data-testid="cards"]')

        expect(skeletons.exists()).toBe(false)
        expect(cards.exists()).toBe(true)
    })

    it('renders the loading skeleton when isLoading is true', async () => {
        mockUseUsers.isLoading = true;

        const wrapper = mount(UserStats)

        const skeletons = wrapper.find('[data-testid="skeletons"]')
        const cards = wrapper.find('[data-testid="cards"]')

        expect(skeletons.exists()).toBe(true)
        expect(cards.exists()).toBe(false)
    })
})