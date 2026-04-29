<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const subtotal = computed(() => cartStore.subtotal)
const tax = computed(() => cartStore.tax)
const shipping = computed(() => cartStore.shipping)
const total = computed(() => cartStore.total)

function formatPrice(price) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0
  }).format(price * 1000)
}

function proceedToCheckout() {
  router.push('/checkout')
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <svg class="h-20 w-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <p class="text-gray-500 text-lg mb-4">Your cart is empty</p>
      <router-link
        to="/products"
        class="inline-block bg-rwanda-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Continue Shopping
      </router-link>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      <!-- Cart Items -->
      <div class="flex-1">
        <div class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="p-6 space-y-6">
            <div
              v-for="item in cartStore.items"
              :key="item.id"
              class="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <router-link :to="`/products/${item.id}`" class="w-24 h-24 bg-gray-50 rounded-lg flex-shrink-0">
                <img :src="item.image" :alt="item.title" class="w-full h-full object-contain p-2">
              </router-link>
              <div class="flex-1 min-w-0">
                <router-link :to="`/products/${item.id}`" class="font-semibold text-gray-900 hover:text-rwanda-blue truncate block">
                  {{ item.title }}
                </router-link>
                <p class="text-rwanda-green font-bold mt-1">{{ formatPrice(item.price) }}</p>
                <div class="flex items-center space-x-2 mt-2">
                  <button
                    @click="cartStore.updateQty(item.id, item.qty - 1)"
                    class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span class="w-10 text-center font-semibold">{{ item.qty }}</span>
                  <button
                    @click="cartStore.updateQty(item.id, item.qty + 1)"
                    class="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                  <button
                    @click="cartStore.remove(item.id)"
                    class="ml-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-gray-900">{{ formatPrice(item.price * item.qty) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:w-80">
        <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
          <h2 class="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-600">Subtotal</span>
              <span>{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tax (18%)</span>
              <span>{{ formatPrice(tax) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Shipping</span>
              <span :class="shipping === 0 ? 'text-rwanda-green' : ''">
                {{ shipping === 0 ? 'Free' : formatPrice(shipping) }}
              </span>
            </div>
            <div v-if="shipping > 0" class="text-xs text-gray-500">
              Free shipping on orders over RWF 50,000
            </div>
            <div class="border-t pt-3 mt-3">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{{ formatPrice(total) }}</span>
              </div>
            </div>
          </div>
          <button
            @click="proceedToCheckout"
            class="w-full bg-rwanda-blue text-white py-3 rounded-lg font-bold mt-6 hover:bg-blue-600 transition-colors"
          >
            Proceed to Checkout
          </button>
          <router-link
            to="/products"
            class="block text-center text-rwanda-blue mt-3 hover:underline"
          >
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

