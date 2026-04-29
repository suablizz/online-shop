<script setup>
import { ref, onMounted } from 'vue'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const loading = ref(false)
const form = ref({
  firstName: '',
  lastName: '',
  email: authStore.user?.email || '',
  phone: '',
  address: '',
  city: 'Kigali',
  paymentMethod: 'card'
})

function formatPrice(price) {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    minimumFractionDigits: 0
  }).format(price * 1000)
}

async function placeOrder() {
  if (form.value.paymentMethod === 'card') {
    // Stripe payment mock
    const stripe = await loadStripe('pk_test_mock_key')
    const mockPayment = await stripe.createPaymentMethod({
      type: 'card',
      card: { number: '4242424242424242', exp_month: 12, exp_year: 2025, cvc: '123' }
    })
    console.log('Stripe payment:', mockPayment)
  }
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const order = {
      id: Date.now(),
      items: cartStore.items,
      total: cartStore.total,
      date: new Date().toISOString(),
      status: 'processing',
      shipping: form.value
    }
    
    const orders = JSON.parse(localStorage.getItem('orders') || '[]')
    orders.unshift(order)
    localStorage.setItem('orders', JSON.stringify(orders))
    
    cartStore.clear()
    
    router.push({ name: 'OrderSuccess', query: { orderId: order.id } })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

    <div v-if="cartStore.items.length === 0" class="text-center py-16">
      <p class="text-gray-500 text-lg">Your cart is empty</p>
      <router-link to="/products" class="inline-block mt-4 text-rwanda-blue underline">Continue Shopping</router-link>
    </div>

    <div v-else class="flex flex-col lg:flex-row gap-8">
      <!-- Shipping Form -->
      <div class="flex-1">
        <div class="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 class="text-lg font-bold mb-4">Shipping Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input v-model="form.firstName" type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input v-model="form.lastName" type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="form.email" type="email" required class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input v-model="form.phone" type="tel" placeholder="+250" class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input v-model="form.address" type="text" required class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select v-model="form.city" class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
                <option value="Kigali">Kigali</option>
                <option value="Butare">Butare</option>
                <option value="Gitarama">Gitarama</option>
                <option value="Ruhengeri">Ruhengeri</option>
              </select>
            </div>
          </div>
        </div>

<div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-lg font-bold mb-4">Payment Method</h2>
          <div id="stripe-container" class="space-y-3">
            <div v-if="form.paymentMethod === 'card'" class="p-3 border rounded-lg">
              <label class="block text-sm font-medium text-gray-700 mb-2">Card Information (Stripe Elements)</label>
              <div id="card-element" class="p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[120px] flex items-center justify-center text-gray-500">
                Secure Stripe Card Form Here
              </div>
              <div class="mt-2 text-xs text-gray-500">
                🔒 Test cards: 4242 4242 4242 4242 (Visa)
              </div>
            </div>
            <div v-else class="space-y-3">
              <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="form.paymentMethod" type="radio" value="mobile" class="text-rwanda-blue">
                <span class="font-medium">Mobile Money</span>
              </label>
              <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input v-model="form.paymentMethod" type="radio" value="cod" class="text-rwanda-blue">
                <span class="font-medium">Cash on Delivery</span>
              </label>
            </div>
            <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input v-model="form.paymentMethod" type="radio" value="mobile" class="text-rwanda-blue">
              <span class="font-medium">Mobile Money</span>
            </label>
            <label class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input v-model="form.paymentMethod" type="radio" value="cod" class="text-rwanda-blue">
              <span class="font-medium">Cash on Delivery</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:w-96">
        <div class="bg-white rounded-xl shadow-md p-6 sticky top-24">
          <h2 class="text-lg font-bold mb-4">Order Summary</h2>
          <div class="space-y-3 mb-4 max-h-60 overflow-y-auto">
            <div v-for="item in cartStore.items" :key="item.id" class="flex gap-3">
              <img :src="item.image" class="w-12 h-12 object-contain bg-gray-50 rounded">
              <div class="flex-1 min-w-0">
                <p class="text-sm truncate">{{ item.title }}</p>
                <p class="text-xs text-gray-500">Qty: {{ item.qty }}</p>
              </div>
              <p class="text-sm font-semibold">{{ formatPrice(item.price * item.qty) }}</p>
            </div>
          </div>
          <div class="border-t pt-4 space-y-2 text-sm">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ formatPrice(cartStore.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>{{ formatPrice(cartStore.tax) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span :class="cartStore.shipping === 0 ? 'text-rwanda-green' : ''">
                {{ cartStore.shipping === 0 ? 'Free' : formatPrice(cartStore.shipping) }}
              </span>
            </div>
            <div class="border-t pt-2 mt-2">
              <div class="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{{ formatPrice(cartStore.total) }}</span>
              </div>
            </div>
          </div>
          <button
            @click="placeOrder"
            :disabled="loading"
            class="w-full bg-rwanda-blue text-white py-3 rounded-lg font-bold mt-6 hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="loading">Processing...</span>
            <span v-else>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

