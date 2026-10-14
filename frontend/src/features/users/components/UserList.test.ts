import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { useUsers } from '@/features/users/useUsers'
import { mockUsers } from '@tests/mocks/index.ts'
import UserList from './UserList.vue'
import { reactive } from 'vue'

vi.mock('@/features/users/useUsers', () => ({
    useUsers: vi.fn()
}))

describe('UserList Component', () => {
    let mockUseUsers: any

    beforeEach(() => {
        vi.clearAllMocks()
        mockUseUsers = reactive({
            isLoading: false,
            isError: false,
            users: [...mockUsers],
            searchQuery: '',
            sortField: 'title',
            sortOrder: 'asc',
            handleSort: vi.fn()
        })
        vi.mocked(useUsers).mockReturnValue(mockUseUsers)
    })

    it('renders the charts when data is present', async () => {
        const wrapper = mount(UserList)

        const input = wrapper.find('[data-testid="user-search-input"]')

        await input.setValue('John');
    })

    it('renders the loading skeleton when isLoading is true', async () => {
        mockUseUsers.isLoading = true;

        const wrapper = mount(UserList)

        const skeletons = wrapper.find('[data-testid="skeleton"]')
        const cards = wrapper.find('[data-testid="card"]')

        expect(skeletons.exists()).toBe(true)
        expect(cards.exists()).toBe(false)
    })

})