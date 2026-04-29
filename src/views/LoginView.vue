<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const form = ref({ email: '', password: '' })
const error = ref('')

async function login() {
  error.value = ''
  const result = await authStore.login(form.value)
  if (result.success) {
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } else {
    error.value = result.error || 'Invalid credentials'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-rwanda-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-white font-bold text-2xl">K</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p class="text-gray-500 mt-1">Sign in to your account</p>
        </div>

        <form @submit.prevent="login" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none transition-all"
              placeholder="you@example.com"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="form.password"
              type="password"
              required
              class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none transition-all"
              placeholder="Enter your password"
            >
          </div>

          <p v-if="error" class="text-red-600 text-sm">{{ error }}</p>

          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full bg-rwanda-blue text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            {{ authStore.loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center mt-6 text-sm text-gray-600">
          Don't have an account?
          <router-link to="/register" class="text-rwanda-blue font-semibold hover:underline">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

