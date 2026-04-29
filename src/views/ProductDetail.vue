<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ProductCard from '@/components/ProductCard.vue'

const props = defineProps(['id'])
const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()

const quantity = ref(1)
const imageLoaded = ref(false)

const product = computed(() => productsStore.productById(props.id))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsStore.products
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

const ratingStars = computed(() => {
  if (!product.value) return []
  const rating = Math.round(product.value.rating?.rate || 0)
  return Array(5).fill(0).map((_, i) => i < rating)
})

function addToCart() {
  if (!product.value) return
  for (let i = 0; i < quantity.value; i++) {
    cartStore.add(product.value)
  }
  if (window.$toast) window.$toast(`${quantity.value} × ${product.value.title} added to cart!`)
}

function toggleWishlist() {
  if (!product.value) return
  wishlistStore.toggle(product.value)
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0
  }).format(price * 1000)
}

onMounted(() => {
  if (productsStore.products.length === 0) {
    productsStore.fetchProducts()
  }
})

watch(() => props.id, () => {
  quantity.value = 1
  imageLoaded.value = false
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center text-sm text-gray-500 mb-6">
      <router-link to="/" class="hover:text-rwanda-blue">Home</router-link>
      <span class="mx-2">/</span>
      <router-link to="/products" class="hover:text-rwanda-blue">Products</router-link>
      <span class="mx-2">/</span>
      <span v-if="product" class="truncate max-w-xs">{{ product.title }}</span>
    </div>

    <LoadingSpinner v-if="productsStore.loading" />

    <div v-else-if="!product" class="text-center py-12">
      <p class="text-gray-500 text-lg">Product not found</p>
      <router-link to="/products" class="mt-4 text-rwanda-blue underline inline-block">Browse products</router-link>
    </div>

    <div v-else>
      <!-- Product Info -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <!-- Image -->
          <div class="bg-gray-50 rounded-xl p-8 flex items-center justify-center aspect-square">
            <img
              :src="product.image"
              :alt="product.title"
              class="max-w-full max-h-full object-contain"
              @load="imageLoaded = true"
            >
          </div>

          <!-- Details -->
          <div class="flex flex-col">
            <p class="text-sm text-rwanda-blue font-semibold uppercase tracking-wide mb-2">{{ product.category }}</p>
            <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{{ product.title }}</h1>

            <!-- Rating -->
            <div class="flex items-center mb-4">
              <div class="flex space-x-0.5">
                <svg v-for="(filled, i) in ratingStars" :key="i" class="h-5 w-5" :class="filled ? 'text-rwanda-yellow' : 'text-gray-300'" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              </div>
              <span class="text-sm text-gray-500 ml-2">{{ product.rating?.rate || 0 }} ({{ product.rating?.count || 0 }} reviews)</span>
            </div>

            <p class="text-gray-600 mb-6 leading-relaxed">{{ product.description }}</p>

            <div class="text-3xl font-bold text-rwanda-green mb-6">{{ formatPrice(product.price) }}</div>

            <!-- Quantity -->
            <div class="flex items-center space-x-4 mb-6">
              <span class="font-medium text-gray-700">Quantity:</span>
              <div class="flex items-center border border-gray-200 rounded-lg">
                <button
                  @click="quantity > 1 && quantity--"
                  class="px-3 py-2 hover:bg-gray-100 transition-colors"
                  :disabled="quantity <= 1"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="px-4 py-2 font-semibold min-w-[3rem] text-center">{{ quantity }}</span>
                <button
                  @click="quantity++"
                  class="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                @click="addToCart"
                class="flex-1 bg-rwanda-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Add to Cart</span>
              </button>

              <button
                @click="toggleWishlist"
                :class="[
                  'flex-1 sm:flex-initial px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 border-2',
                  wishlistStore.isInWishlist(product.id)
                    ? 'border-red-500 text-red-500 hover:bg-red-50'
                    : 'border-gray-200 text-gray-700 hover:border-rwanda-blue hover:text-rwanda-blue'
                ]"
              >
                <svg class="h-5 w-5" :fill="wishlistStore.isInWishlist(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{{ wishlistStore.isInWishlist(product.id) ? 'Saved' : 'Wishlist' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products -->
      <div v-if="relatedProducts.length > 0">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

