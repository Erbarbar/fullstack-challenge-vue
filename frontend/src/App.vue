<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Top Navigation Bar -->
    <header class="bg-white shadow border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h1 class="text-xl font-bold tracking-tight">Full Stack Home Exercise</h1>
      <nav class="flex gap-4">
        <RouterLink to="/users" class="px-3 py-2 rounded-md font-medium text-sm hover:bg-gray-100"
          active-class="bg-blue-50 text-blue-600">
          Users
        </RouterLink>
        <RouterLink to="/products" class="px-3 py-2 rounded-md font-medium text-sm hover:bg-gray-100"
          active-class="bg-blue-50 text-blue-600">
          Products
        </RouterLink>
      </nav>
    </header>
    <main class="max-w-7xl mx-auto p-6">
      <RouterView />
    </main>
  </div>
</template>