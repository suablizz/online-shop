<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Sidebar -->
      <aside class="md:w-64 flex-shrink-0">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex items-center space-x-3 mb-6">
            <div class="w-12 h-12 bg-rwanda-blue rounded-full flex items-center justify-center">
              <span class="text-white font-bold text-lg">{{ authStore.userName.charAt(0).toUpperCase() }}</span>
            </div>
            <div>
              <p class="font-semibold">{{ authStore.userName }}</p>
              <p class="text-sm text-gray-500">{{ authStore.user?.email }}</p>
            </div>
          </div>

          <nav class="space-y-1">
            <RouterLink to="/profile" :class="['block px-4 py-2 rounded-lg text-sm font-medium', $route.path === '/profile' ? 'bg-rwanda-blue text-white' : 'text-gray-600 hover:bg-gray-50']">
              Profile
            </RouterLink>
            <RouterLink to="/profile/orders" :class="['block px-4 py-2 rounded-lg text-sm font-medium', $route.path === '/profile/orders' ? 'bg-rwanda-blue text-white' : 'text-gray-600 hover:bg-gray-50']">
              Orders
            </RouterLink>
            <RouterLink to="/wishlist" class="block px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
              Wishlist
            </RouterLink>
          </nav>
        </div>
      </aside>

      <!-- Content -->
      <div class="flex-1">
        <RouterView />
      </div>
    </div>
  </div>
</template>

