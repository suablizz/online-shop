<script setup>
import { onMounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const productsStore = useProductsStore()

const featuredProducts = computed(() => productsStore.products.slice(0, 6))
const categories = computed(() => [
  { name: 'Electronics', icon: '💻', image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg' },
  { name: 'Jewelery', icon: '💍', image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
  { name: "Men's Clothing", icon: '👔', image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' },
  { name: "Women's Clothing", icon: '👗', image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg' },
])

onMounted(() => {
  productsStore.fetchProducts()
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="rwanda-gradient text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02di00aC00djRoNHptLTYgNmgtNHYyaDR2LTJ6bTAtNnYtNGgtNHY0aDR6Ii8+PC9nPjwvZz48L3N2Zz4=')]"></div>
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Tech for Everyone in <span class="text-rwanda-yellow">Kigali</span>
          </h1>
          <p class="text-lg md:text-xl text-blue-100 mb-8">
            Discover affordable smartphones, laptops, and accessories delivered to your doorstep in Rwanda.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/products" class="bg-rwanda-yellow text-rwanda-green px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-white transition-colors shadow-lg">
              Shop Now
            </router-link>
            <router-link to="/products/category/electronics" class="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-white/30 transition-colors">
              Electronics
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Shop by Category</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        <router-link
          v-for="category in categories"
          :key="category.name"
          :to="`/products/category/${category.name.toLowerCase()}`"
          class="group relative rounded-xl overflow-hidden shadow-lg aspect-[4/3]"
        >
          <img :src="category.image" :alt="category.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div class="absolute bottom-4 left-4 text-white">
            <span class="text-3xl mb-1 block">{{ category.icon }}</span>
            <h3 class="font-bold text-lg">{{ category.name }}</h3>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="bg-gray-50 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Featured Products</h2>
          <router-link to="/products" class="text-rwanda-blue font-semibold hover:underline">
            View All
          </router-link>
        </div>

        <LoadingSpinner v-if="productsStore.loading" />

        <div v-else-if="productsStore.error" class="text-center py-12">
          <p class="text-red-600">{{ productsStore.error }}</p>
          <button @click="productsStore.fetchProducts()" class="mt-4 text-rwanda-blue underline">Retry</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-rwanda-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-rwanda-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2">Free Delivery</h3>
          <p class="text-gray-600">Free shipping on orders over RWF 50,000 in Kigali</p>
        </div>
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-rwanda-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-rwanda-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2">Secure Payment</h3>
          <p class="text-gray-600">100% secure checkout with Stripe encryption</p>
        </div>
        <div class="text-center p-6">
          <div class="w-16 h-16 bg-rwanda-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="h-8 w-8 text-rwanda-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2">24/7 Support</h3>
          <p class="text-gray-600">Dedicated support team for all your needs</p>
        </div>
      </div>
    </section>
  </div>
</template>

