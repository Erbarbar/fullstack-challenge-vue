<script setup lang="ts">
interface Props {
    title: string;
    isLoading?: boolean;
    onlyTitle?: boolean;
}

defineProps<Props>();
</script>

<template>
    <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden transition-all duration-300">
        <!-- Card Header -->
        <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="text-sm font-semibold text-gray-70_0 uppercase tracking-wider">
                {{ title }}
            </h3>
        </div>
        <div v-if="!onlyTitle" class="p-6">
            <div v-if="isLoading" class="animate-pulse space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-8 bg-gray-100 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div v-else>
                <slot />
            </div>
        </div>
    </div>
</template>