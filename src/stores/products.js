import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productApi } from '@/services/api'

export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedCategory = ref('')

  // Getters
  const filteredProducts = computed(() => {
    if (!selectedCategory.value) return products.value
    return products.value.filter(p => p.category === selectedCategory.value)
  })

  const productById = computed(() => (id) => {
    return products.value.find(p => p.id === Number(id))
  })

  // Actions
  async function fetchProducts() {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getAll()
      products.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const response = await productApi.getCategories()
      categories.value = response.data
    } catch (err) {
      console.error('Failed to fetch categories:', err)
    }
  }

  async function fetchByCategory(category) {
    loading.value = true
    error.value = null
    try {
      const response = await productApi.getByCategory(category)
      products.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  function setCategory(category) {
    selectedCategory.value = category
  }

  return {
    products,
    categories,
    loading,
    error,
    selectedCategory,
    filteredProducts,
    productById,
    fetchProducts,
    fetchCategories,
    fetchByCategory,
    setCategory,
  }
})
