<script setup lang="ts" generic="T extends Record<string, any>">
defineProps<{
    items: T[]
    columns: { key: keyof T | 'actions'; label: string; sortable?: boolean }[]
    sortKey?: keyof T | null
    sortOrder?: 'asc' | 'desc'
}>()

defineEmits<{ (e: 'sort', key: keyof T): void }>()

</script>

<template>
    <table class="w-full border-collapse border border-gray-200">
        <thead class="bg-gray-50">
            <tr>
                <th v-for="col in columns" :key="String(col.key)"
                    class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-r last:border-r-0 border-gray-200 transition-colors"
                    :class="{
                        'cursor-pointer hover:bg-gray-100': col.sortable,
                        'bg-blue-50': sortKey === col.key
                    }" @click="col.sortable && $emit('sort', col.key)">
                    <div class="flex items-center gap-1">
                        {{ col.label }}
                        <span v-if="col.sortable" class="text-gray-400 text-xs">
                            {{ sortKey === col.key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                        </span>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-50 transition-colors">
                <td v-for="col in columns" :key="String(col.key)"
                    class="px-4 py-3 text-sm text-gray-600 border-r last:border-r-0 border-gray-200">
                    <slot :name="String(col.key)" :item="item" :value="item[col.key]">
                        {{ item[col.key] }}
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>