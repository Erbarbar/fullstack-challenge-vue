<script setup lang="ts">
import { useUsers } from '../useUsers'
import type { User } from '@/types'
import DataTable from '@/components/DataTable.vue'
import BaseCard from '@/components/BaseCard.vue';

const { users, isLoading, searchQuery, sortField, sortOrder, handleSort } = useUsers()

const userColumns: Array<{
    key: keyof User | 'actions'
    label: string
    sortable?: boolean
    align?: 'left' | 'center' | 'right'
}> = [
        { key: 'image', label: 'Avatar', align: 'center' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'age', label: 'Age', sortable: true },
        { key: 'role', label: 'Role', sortable: true },
        { key: 'state', label: 'State', sortable: true },
        { key: 'university', label: 'University', sortable: true },
    ]
</script>

<template>
    <BaseCard v-if="isLoading" title="Users List" is-loading data-testid="skeleton" />
    <BaseCard v-else title="Users List" data-testid="card">
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search users by name..."
                data-testid="user-search-input"
                class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <DataTable :items="users" :columns="userColumns" :sort-key="sortField" :sort-order="sortOrder"
            @sort="handleSort">
            <template #image="{ value }">
                <img :src="(value as string)" class="w-10 h-10 rounded-full mx-auto object-cover border" />
            </template>
        </DataTable>
    </BaseCard>
</template>