<script setup>
import { ref, onMounted } from 'vue'

const orders = ref([])

onMounted(() => {
  orders.value = JSON.parse(localStorage.getItem('orders') || '[]')
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0
  }).format(price * 1000)
}

function getStatusColor(status) {
  const colors = {
    processing: 'bg-rwanda-yellow text-rwanda-green',
    shipped: 'bg-rwanda-blue text-white',
    delivered: 'bg-rwanda-green text-white',
    cancelled: 'bg-red-500 text-white'
  }
  return colors[status] || 'bg-gray-200 text-gray-700'
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-xl font-bold mb-6">Order History</h2>

    <div v-if="orders.length === 0" class="text-center py-12">
      <svg class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p class="text-gray-500">No orders yet</p>
      <router-link to="/products" class="text-rwanda-blue hover:underline mt-2 inline-block">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="order in orders"
        :key="order.id"
        class="border border-gray-200 rounded-lg p-4"
      >
        <div class="flex items-center justify-between mb-3">
          <div>
            <p class="font-bold">Order #{{ order.id }}</p>
            <p class="text-sm text-gray-500">{{ new Date(order.date).toLocaleDateString() }}</p>
          </div>
          <span :class="['px-3 py-1 rounded-full text-xs font-semibold capitalize', getStatusColor(order.status)]">
            {{ order.status }}
          </span>
        </div>
        <div class="space-y-2">
          <div v-for="item in order.items" :key="item.id" class="flex items-center space-x-3">
            <img :src="item.image" class="w-10 h-10 object-contain bg-gray-50 rounded" :alt="item.title">
            <div class="flex-1 min-w-0">
              <p class="text-sm truncate">{{ item.title }}</p>
            </div>
            <p class="text-sm font-semibold">x{{ item.qty }}</p>
          </div>
        </div>
        <div class="border-t mt-3 pt-3 flex justify-between">
          <span class="text-sm text-gray-500">{{ order.items.length }} item(s)</span>
          <span class="font-bold">{{ formatPrice(order.total) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

