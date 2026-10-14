import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query'
import { mount } from '@vue/test-utils'

export function createTestQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false, // Prevents tests from hanging on automatic retries
                gcTime: 0,    // Disables garbage collection cache delays during tests
            },
        },
    })
}

export function mountWithQuery(component: any, options = {}) {
    const queryClient = createTestQueryClient()

    const wrapper = mount(component, {
        global: {
            plugins: [[VueQueryPlugin, { queryClient }]],
            ...(options as any).global,
        },
        ...options,
    })

    return {
        wrapper,
        queryClient,
    }
}