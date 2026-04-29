<script setup>
import { RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import Toast from '@/components/Toast.vue'

// Toast state
const toastProps = ref(null)

// Global toast function (for legacy window.$toast compatibility)
const showToast = (message, type = 'success', duration = 4000) => {
  toastProps.value = { message, type, duration }
}

onMounted(() => {
  // Expose $toast globally for backward compatibility
  window.$toast = showToast
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="flex-1">
      <RouterView />
    </main>
    <Footer />
    <Toast v-if="toastProps" v-bind="toastProps" @close="toastProps = null" />
  </div>
</template>

