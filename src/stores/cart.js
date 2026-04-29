import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State
  const items = ref(JSON.parse(localStorage.getItem('cart') || '[]'))

  // Getters
  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))
  
  const subtotal = computed(() => 
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )
  
  const tax = computed(() => subtotal.value * 0.18) // 18% VAT
  
  const shipping = computed(() => subtotal.value > 50000 ? 0 : 2000) // Free shipping over 50k
  
  const total = computed(() => subtotal.value + tax.value + shipping.value)

  const isInCart = computed(() => (id) => items.value.some(item => item.id === id))

  // Actions
  function add(product, qty = 1) {
    const existing = items.value.find(item => item.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      items.value.push({ ...product, qty })
    }
  }

  function remove(id) {
    items.value = items.value.filter(item => item.id !== id)
  }

  function updateQty(id, qty) {
    const item = items.value.find(item => item.id === id)
    if (item) {
      if (qty <= 0) {
        remove(id)
      } else {
        item.qty = qty
      }
    }
  }

  function clear() {
    items.value = []
  }

  // Persist to localStorage
  watch(items, (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems))
  }, { deep: true })

  return {
    items,
    itemCount,
    subtotal,
    tax,
    shipping,
    total,
    isInCart,
    add,
    remove,
    updateQty,
    clear,
  }
})
