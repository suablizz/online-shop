import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useWishlistStore = defineStore('wishlist', () => {
  // State
  const items = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))

  // Getters
  const count = computed(() => items.value.length)
  
  const isInWishlist = computed(() => (id) => items.value.some(item => item.id === id))

  // Actions
  function toggle(product) {
    const index = items.value.findIndex(item => item.id === product.id)
    if (index > -1) {
      items.value.splice(index, 1)
    } else {
      items.value.push(product)
    }
  }

  function remove(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function moveToCart(product, cartStore) {
    remove(product.id)
    cartStore.add(product)
  }

  // Persist to localStorage
  watch(items, (newItems) => {
    localStorage.setItem('wishlist', JSON.stringify(newItems))
  }, { deep: true })

  return {
    items,
    count,
    isInWishlist,
    toggle,
    remove,
    moveToCart,
  }
})
