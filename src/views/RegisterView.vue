<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ name: '', email: '', password: '', confirmPassword: '' })
const error = ref('')

async function register() {
  error.value = ''
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  const result = await authStore.register(form.value)
  if (result.success) {
    router.push('/')
  } else {
    error.value = result.error || 'Registration failed'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-rwanda-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">K</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Create Account</h1>
          <p class="text-gray-500 mt-1">Join Kigali Tech Store</p>
        </div>

        <form @submit.prevent="register" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input v-model="form.name" type="text" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none" placeholder="John Doe">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none" placeholder="you@example.com">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input v-model="form.password" type="password" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none" placeholder="Min 6 characters">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input v-model="form.confirmPassword" type="password" required class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none" placeholder="Confirm password">
          </div>

          <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

          <button type="submit" :disabled="authStore.loading" class="w-full bg-rwanda-green text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors disabled:opacity-50">
            {{ authStore.loading ? 'Creating account...' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center mt-6 text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-rwanda-blue font-semibold hover:underline">Sign in</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

