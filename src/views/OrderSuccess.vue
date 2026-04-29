<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const orderId = computed(() => route.query.orderId)
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 py-16 text-center">
    <div class="w-20 h-20 bg-rwanda-green rounded-full flex items-center justify-center mx-auto mb-6">
      <svg class="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <h1 class="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
    <p class="text-gray-600 mb-2">Thank you for shopping with Kigali Tech Store.</p>
    <p v-if="orderId" class="text-sm text-gray-500 mb-8">Order ID: #{{ orderId }}</p>

    <div class="space-y-3">
      <router-link
        to="/products"
        class="inline-block bg-rwanda-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
      >
        Continue Shopping
      </router-link>
      <div>
        <router-link
          to="/profile/orders"
          class="text-rwanda-blue hover:underline"
        >
          View Orders
        </router-link>
      </div>
    </div>
  </div>
</template>

