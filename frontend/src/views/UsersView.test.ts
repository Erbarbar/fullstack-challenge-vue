import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UsersView from './UsersView.vue'

// 1. Mocking the child components strictly as UI placeholders
vi.mock('@/features/users/components/UserList.vue', () => ({
    default: { name: 'UserList', template: '<div class="user-list-container" />' }
}))

vi.mock('@/features/users/components/UserStats.vue', () => ({
    default: {
        name: 'UserStats', template: '<div class="user-stats-container" />'
    }
}))

describe('UsersView Component (Black-Box Test)', () => {

    it('confirms the presence of child component placeholders', async () => {
        const wrapper = mount(UsersView)

        const userList = wrapper.findComponent({ name: 'UserList' })
        const userStats = wrapper.findComponent({ name: 'UserStats' })

        expect(userList.exists()).toBe(true)
        expect(userStats.exists()).toBe(true)
    })
})