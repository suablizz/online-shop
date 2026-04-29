<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const editing = ref(false)
const form = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  phone: authStore.user?.phone || ''
})

function saveProfile() {
  authStore.updateProfile(form.value)
  editing.value = false
  if (window.$toast) window.$toast('Profile updated successfully!')
}
</script>

<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold">Profile Information</h2>
      <button
        v-if="!editing"
        @click="editing = true"
        class="text-rwanda-blue hover:underline text-sm"
      >
        Edit
      </button>
    </div>

    <div v-if="!editing" class="space-y-4">
      <div>
        <label class="block text-sm text-gray-500">Full Name</label>
        <p class="font-medium">{{ authStore.user?.name || 'Not set' }}</p>
      </div>
      <div>
        <label class="block text-sm text-gray-500">Email</label>
        <p class="font-medium">{{ authStore.user?.email }}</p>
      </div>
      <div>
        <label class="block text-sm text-gray-500">Phone</label>
        <p class="font-medium">{{ authStore.user?.phone || 'Not set' }}</p>
      </div>
      <div>
        <label class="block text-sm text-gray-500">Member Since</label>
        <p class="font-medium">{{ new Date().toLocaleDateString() }}</p>
      </div>
    </div>

    <form v-else @submit.prevent="saveProfile" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input v-model="form.name" type="text" class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input v-model="form.email" type="email" disabled class="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-50">
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input v-model="form.phone" type="tel" class="w-full border border-gray-200 rounded-lg px-3 py-2 focus:border-rwanda-blue focus:ring-2 focus:ring-rwanda-blue/20 outline-none">
      </div>
      <div class="flex space-x-3">
        <button type="submit" class="bg-rwanda-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">Save</button>
        <button @click="editing = false" type="button" class="px-4 py-2 rounded-lg font-semibold text-gray-600 hover:bg-gray-100">Cancel</button>
      </div>
    </form>
  </div>
</template>

