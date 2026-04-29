<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import ProductCard from '@/components/ProductCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const route = useRoute()
const productsStore = useProductsStore()

const sortBy = ref('default')
const priceRange = ref('all')

const currentCategory = computed(() => route.params.category || '')

const filteredProducts = computed(() => {
  let products = productsStore.filteredProducts

  // Filter by search query
  const searchQuery = route.query.q?.toLowerCase()
  if (searchQuery) {
    products = products.filter(p =>
      p.title.toLowerCase().includes(searchQuery) ||
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery)
    )
  }

  // Filter by price range
  if (priceRange.value !== 'all') {
    const [min, max] = priceRange.value.split('-').map(Number)
    if (max) {
      products = products.filter(p => p.price >= min && p.price <= max)
    } else {
      products = products.filter(p => p.price >= min)
    }
  }

  // Sort
  switch (sortBy.value) {
    case 'price-low':
      products = [...products].sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      products = [...products].sort((a, b) => b.price - a.price)
      break
    case 'rating':
      products = [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
      break
    default:
      break
  }

  return products
})

function clearFilters() {
  sortBy.value = 'default'
  priceRange.value = 'all'
}

watch(currentCategory, (newCategory) => {
  if (newCategory) {
    productsStore.fetchByCategory(newCategory)
  } else {
    productsStore.fetchProducts()
  }
})

onMounted(() => {
  productsStore.fetchCategories()
  if (currentCategory.value) {
    productsStore.fetchByCategory(currentCategory.value)
  } else {
    productsStore.fetchProducts()
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb -->
    <div class="flex items-center text-sm text-gray-500 mb-6">
      <router-link to="/" class="hover:text-rwanda-blue">Home</router-link>
      <span class="mx-2">/</span>
      <router-link to="/products" class="hover:text-rwanda-blue">Products</router-link>
      <template v-if="currentCategory">
        <span class="mx-2">/</span>
        <span class="capitalize">{{ currentCategory }}</span>
      </template>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Sidebar Filters -->
      <aside class="lg:w-64 flex-shrink-0">
        <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
          <h3 class="font-bold text-lg mb-4">Filters</h3>

          <!-- Search -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <SearchBar />
          </div>

          <!-- Categories -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Categories</label>
            <div class="space-y-2">
              <router-link
                to="/products"
                :class="[
                  'block px-3 py-2 rounded-lg text-sm transition-colors',
                  !currentCategory ? 'bg-rwanda-blue text-white' : 'hover:bg-gray-100'
                ]"
              >
                All Products
              </router-link>
              <router-link
                v-for="cat in productsStore.categories"
                :key="cat"
                :to="`/products/category/${cat}`"
                :class="[
                  'block px-3 py-2 rounded-lg text-sm capitalize transition-colors',
                  currentCategory === cat ? 'bg-rwanda-blue text-white' : 'hover:bg-gray-100'
                ]"
              >
                {{ cat }}
              </router-link>
            </div>
          </div>

          <!-- Price Range -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
            <select v-model="priceRange" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="all">All Prices</option>
              <option value="0-50">Under RWF 50,000</option>
              <option value="50-100">RWF 50,000 - 100,000</option>
              <option value="100-200">RWF 100,000 - 200,000</option>
              <option value="200">Over RWF 200,000</option>
            </select>
          </div>

          <!-- Sort -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select v-model="sortBy" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <button
            v-if="sortBy !== 'default' || priceRange !== 'all'"
            @click="clearFilters"
            class="mt-4 text-rwanda-blue text-sm hover:underline w-full text-center"
          >
            Clear Filters
          </button>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-6">
          <p class="text-gray-600">
            {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }} found
          </p>
        </div>

        <LoadingSpinner v-if="productsStore.loading" />

        <div v-else-if="productsStore.error" class="text-center py-12">
          <p class="text-red-600">{{ productsStore.error }}</p>
          <button @click="productsStore.fetchProducts()" class="mt-4 text-rwanda-blue underline">Retry</button>
        </div>

        <div v-else-if="filteredProducts.length === 0" class="text-center py-12">
          <svg class="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-gray-500 text-lg">No products found</p>
          <button @click="clearFilters" class="mt-2 text-rwanda-blue underline">Clear filters</button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

