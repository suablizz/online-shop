<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const searchQuery = ref(route.query.q || '')

watch(searchQuery, (newVal) => {
  const query = newVal ? { q: newVal } : {}
  router.replace({ query: { ...route.query, ...query } })
})
</script>

<template>
  <div class="relative">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search products..."
      class="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none transition-all"
      aria-label="Search products"
    >
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
</template>
