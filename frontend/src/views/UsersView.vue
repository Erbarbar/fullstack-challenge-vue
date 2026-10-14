<script setup lang="ts">
import UserList from '@/features/users/components/UserList.vue'
import UserStats from '@/features/users/components/UserStats.vue'
</script>
<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold text-gray-800">Users Dashboard</h1>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <UserList />
      </div>
      <div class="lg:col-span-1">
        <UserStats />
      </div>
    </div>
  </div>
</template>