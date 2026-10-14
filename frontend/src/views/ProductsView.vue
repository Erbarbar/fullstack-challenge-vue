<script setup lang="ts">
import ProductList from '@/features/products/components/ProductList.vue'
import ProductAnalytics from '@/features/products/components/ProductAnalytics.vue'
</script>
<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Products Dashboard</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <ProductList />
      </div>
      <div class="lg:col-span-1">
        <ProductAnalytics />
      </div>
    </div>
  </div>
</template>