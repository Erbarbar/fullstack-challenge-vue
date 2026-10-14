<script setup lang="ts">
import BarChartCard from '@/components/BarChartCard.vue';
import BaseCard from '@/components/BaseCard.vue';
import { useProducts } from '@/features/products/useProducts';

const { analytics, isLoading } = useProducts();

</script>

<template>
    <div v-if="isLoading" data-testid="skeletons">
        <BaseCard is-loading title="" />
        <BaseCard is-loading title="" />
        <BaseCard is-loading title="" />
        <BaseCard is-loading title="" />
        <BaseCard is-loading title="" />
    </div>
    <div v-else-if="analytics" class="flex flex-col gap-6" data-testid="cards">
        <BaseCard :is-loading="isLoading" :title="`Total stock: ${analytics.total_inventory} products`" only-title>
        </BaseCard>
        <BarChartCard :is-loading="isLoading" title="Top Brands by Average Rating" :data="analytics.top_brands"
            :unit-label="'stars'" :total-count="5" />
        <BarChartCard :is-loading="isLoading" title="Available products by categories" :data="analytics.category_counts"
            :unit-label="'different products'" />
        <BarChartCard :is-loading="isLoading" title="Categories stock" :data="analytics.category_stock"
            :unit-label="'total stock'" :total-count="analytics.total_inventory" />
        <BarChartCard :is-loading="isLoading" title="Prices range by categories " :data="analytics.price_diffs"
            :unit-label="'$ difference'" />
    </div>
</template>
