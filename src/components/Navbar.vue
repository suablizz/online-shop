<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
const cartStore = { itemCount: 0 }
</script>

<template>
  <nav class="bg-rwanda-blue text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex justify-between items-center h-16">
        <router-link to="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-rwanda-yellow rounded-full flex items-center justify-center">
            <span class="text-rwanda-green font-bold text-sm">K</span>
          </div>
          <span class="font-bold text-xl tracking-tight">Kigali Tech Store</span>
        </router-link>

        <div class="hidden md:flex items-center space-x-6">
          <router-link to="/">Home</router-link>
          <router-link to="/products">Products</router-link>
          <router-link to="/cart">
            Cart ({{ cartStore.itemCount }})
          </router-link>
        </div>

        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2">
          <span v-if="!mobileMenuOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="md:hidden border-t border-blue-500">
        <div class="px-4 py-3 space-y-2">
          <router-link to="/" @click="mobileMenuOpen = false" class="block py-2">Home</router-link>
          <router-link to="/products" @click="mobileMenuOpen = false" class="block py-2">Products</router-link>
          <router-link to="/cart" @click="mobileMenuOpen = false" class="block py-2">
            Cart ({{ cartStore.itemCount }})
          </router-link>
        </div>
      </div>

    </div>
  </nav>
</template>
