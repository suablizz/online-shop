<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const props = defineProps(['product'])
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const ratingStars = computed(() => {
  const rating = Math.round(props.product.rating?.rate || 0)
  return Array(5).fill(0).map((_, i) => i < rating)
})

const isInCart = computed(() => cartStore.isInCart(props.product.id))
const isInWishlist = computed(() => wishlistStore.isInWishlist(props.product.id))

function addToCart() {
  cartStore.add(props.product)
  if (window.$toast) window.$toast(`${props.product.title} added to cart!`)
}

function toggleWishlist() {
  wishlistStore.toggle(props.product)
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
  <div class="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 product-card">
    <!-- Image -->
    <div class="relative aspect-square bg-gray-50 p-6">
      <RouterLink :to="`/products/${product.id}`">
        <img 
          :src="product.image" 
          :alt="product.title" 
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        >
      </RouterLink>
      
      <!-- Quick Actions -->
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200 space-x-1">
        <button
          @click.stop="toggleWishlist"
          :class="[
            'w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-lg transition-all',
            isInWishlist 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-white/80 hover:bg-white text-gray-600 hover:text-red-500'
          ]"
          :aria-label="isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <button
          @click.stop="addToCart"
          :class="[
            'w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-lg transition-all',
            isInCart 
              ? 'bg-rwanda-blue/90 hover:bg-rwanda-blue' 
              : 'bg-rwanda-blue hover:bg-rwanda-blue/90'
          ]"
          aria-label="Add to cart"
        >
          <svg v-if="!isInCart" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L9.414 10l7.293 7.293a1 1 0 01-1.414 1.414l-8-8a1 1 0 010-1.414l8-8a1 1 0 011.414 0z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-center justify-between mb-2">
        <!-- Category Badge -->
        <span class="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-full capitalize">
          {{ product.category }}
        </span>
        
        <!-- Rating -->
        <div class="flex items-center space-x-1">
          <div class="flex -space-x-1">
            <svg 
              v-for="(filled, i) in ratingStars" 
              :key="i" 
              class="h-4 w-4 flex-shrink-0" 
              :class="filled ? 'text-rwanda-yellow fill-current' : 'text-gray-300'" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <span class="text-xs text-gray-500 ml-1">{{ product.rating?.rate || 0 }}</span>
        </div>
      </div>

      <RouterLink :to="`/products/${product.id}`">
        <h3 class="font-bold text-gray-900 mb-2 text-sm leading-tight line-clamp-2 hover:text-rwanda-blue transition-colors group-hover:underline">
          {{ product.title }}
        </h3>
      </RouterLink>

      <p class="text-2xl font-bold text-rwanda-green mb-4">{{ formatPrice(product.price) }}</p>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

