<script setup lang="ts">
import BaseCard from '@/components/BaseCard.vue';

defineProps<{
  title: string
  data: Record<string, number> | null
  totalCount?: number
  colorClass?: string
  unitLabel?: string
}>()
</script>

<template>
  <BaseCard :title="title" :is-loading="!data">
    <div class="space-y-3 max-h-60 overflow-y-auto pr-2">
      <div v-for="(count, label) in data" :key="label" class="text-sm">
        <div class="flex justify-between">
          <span class="font-medium text-gray-700 truncate max-w-[250px]" :title="String(label)">
            {{ label }}
          </span>
          <span class="text-gray-500">{{ count }} {{ unitLabel || 'items' }}</span>
        </div>
        <div v-if="totalCount" class="w-full bg-gray-100 rounded-full h-2">
          <div :class="colorClass || 'bg-blue-600'" class="h-2 rounded-full transition-all duration-300"
            :style="{ width: `${Math.min(100, (Number(count) / totalCount) * 100)}%` }"></div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>