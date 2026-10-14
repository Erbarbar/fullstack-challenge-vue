<script setup lang="ts">
import BarChartCard from '@/components/BarChartCard.vue';
import BaseCard from '@/components/BaseCard.vue';
import { useUsers } from '@/features/users/useUsers';

const { stats, isLoading } = useUsers()

</script>
<template>
    <div v-if="isLoading" data-testid="skeletons" class="flex flex-col gap-6">
        <BaseCard title="User Distribution by State" is-loading />
        <BaseCard title="User Distribution by University" is-loading />
    </div>
    <div v-else-if="stats" data-testid="cards" class="flex flex-col gap-6">
        <BarChartCard title="User Distribution by State" :data="stats.states" :total-count="stats.total_users"
            :unit-label="'users'" />
        <BarChartCard title="User Distribution by University" :data="stats.universities"
            :total-count="stats.total_users" :unit-label="'users'" />
    </div>
</template>