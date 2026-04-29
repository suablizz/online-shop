<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWishlistStore } from '@/stores/wishlist'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const wishlistStore = useWishlistStore()
const cartStore = useCartStore()

const hasItems = computed(() => wishlistStore.items.length > 0)

function moveToCart(product) {
  wishlistStore.moveToCart(product, cartStore)
  if (window.$toast) window.$toast(`${product.title} moved to cart!`)
}

function remove(product) {
  wishlistStore.remove(product.id)
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0
  }).format(price * 1000)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

    <div v-if="!hasItems" class="text-center py-16">
      <svg class="h-20 w-20 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <p class="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
      <router-link
        to="/products"
        class="inline-block bg-rwanda-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
      >
        Explore Products
      </router-link>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in wishlistStore.items"
        :key="product.id"
        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      >
        <div class="relative aspect-square bg-gray-50">
          <router-link :to="`/products/${product.id}`">
            <img :src="product.image" :alt="product.title" class="w-full h-full object-contain p-6">
          </router-link>
        </div>
        <div class="p-4">
          <router-link :to="`/products/${product.id}`">
            <h3 class="font-bold text-gray-900 text-sm mb-2 line-clamp-2 hover:text-rwanda-blue">{{ product.title }}</h3>
          </router-link>
          <p class="text-rwanda-green font-bold text-lg mb-4">{{ formatPrice(product.price) }}</p>
          <div class="flex gap-2">
            <button
              @click="moveToCart(product)"
              class="flex-1 bg-rwanda-blue text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Move to Cart
            </button>
            <button
              @click="remove(product)"
              class="px-3 py-2 border border-gray-200 rounded-lg text-gray-500 hover:text-red-500 hover:border-red-200 transition-colors"
              aria-label="Remove from wishlist"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

