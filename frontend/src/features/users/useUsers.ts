import { ref, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { userService } from '@/api'
import type { User, UserStats } from '@/types'

export function useUsers() {
    const usersQuery = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => userService.getUsers(),
    })

    const statsQuery = useQuery<UserStats>({
        queryKey: ['user-stats'],
        queryFn: () => userService.getUserStats(),
    })

    const searchQuery = ref('')
    const sortField = ref<keyof User>('name')
    const sortOrder = ref<'asc' | 'desc'>('asc')

    const filteredAndSortedUsers = computed(() => {
        const users = usersQuery.data.value ?? []

        // Filter logic
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )

        // Sort logic
        return [...filtered].sort((a, b) => {
            const field = sortField.value
            const modifier = sortOrder.value === 'asc' ? 1 : -1

            // We use a type-safe comparison
            if (a[field] < b[field]) return -1 * modifier
            if (a[field] > b[field]) return 1 * modifier
            return 0
        })
    })

    return {
        // Expose the processed data
        users: filteredAndSortedUsers,
        stats: computed(() => statsQuery.data.value ?? null),

        // Expose loading/error states
        isLoading: computed(() => usersQuery.isPending.value || statsQuery.isPending.value),
        isError: computed(() => usersQuery.isError.value || statsQuery.isError.value),
        error: computed(() => usersQuery.error.value || statsQuery.error.value),

        // Expose the controls (so UI components can trigger them)
        searchQuery,
        sortField,
        sortOrder,
        handleSort: (field: keyof User) => {
            if (sortField.value === field) {
                sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
            } else {
                sortField.value = field
                sortOrder.value = 'asc'
            }
        }
    }
}