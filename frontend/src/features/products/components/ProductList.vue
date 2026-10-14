<script setup lang="ts">
import { useProducts } from '../useProducts'
import type { Product } from '@/types'
import BaseCard from '@/components/BaseCard.vue';
import DataTable from '@/components/DataTable.vue'

const { products, isLoading, searchQuery, sortField, sortOrder, handleSort } = useProducts()

// Configuration is kept localized to the component that uses it
const productColumns: Array<{
    key: keyof Product | 'actions'
    label: string
    sortable?: boolean
    align?: 'left' | 'center' | 'right'
}> = [
        { key: 'image', label: 'Avatar', align: 'center' },
        { key: 'title', label: 'Name', sortable: true },
        { key: 'brand', label: 'Brand', sortable: true },
        { key: 'category', label: 'Category', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'stock', label: 'Stock', sortable: true },
    ]


</script>
<template>
    <BaseCard v-if="isLoading" title="Products List" is-loading data-testid="skeleton" />
    <BaseCard v-else title="Products List" data-testid="card">
        <div class="mb-4">
            <input v-model="searchQuery" type="text" placeholder="Search products by name..."
                class="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <DataTable :items="products" :columns="productColumns" :sort-key="sortField" :sort-order="sortOrder"
            @sort="handleSort">
            <template #image="{ value }">
                <img :src="(value as string)" class="w-10 h-10 rounded-full mx-auto object-cover border" />
            </template>
        </DataTable>
    </BaseCard>
</template>
