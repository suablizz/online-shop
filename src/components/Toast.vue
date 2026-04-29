<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 4000
  }
})

const visible = ref(false)
const timer = ref(null)

const colors = {
  success: 'bg-rwanda-green border-rwanda-green/20',
  error: 'bg-red-500 border-red-400/20',
  info: 'bg-rwanda-blue border-rwanda-blue/20',
  warning: 'bg-rwanda-yellow text-rwanda-green border-rwanda-yellow/20'
}

const icon = {
  success: '✅',
  error: '❌',
  info: 'ℹ️',
  warning: '⚠️'
}

onMounted(() => {
  visible.value = true
  timer.value = setTimeout(() => {
    visible.value = false
  }, props.duration)
})

onUnmounted(() => {
  if (timer.value) clearTimeout(timer.value)
})

defineExpose({
  close: () => {
    visible.value = false
    if (timer.value) clearTimeout(timer.value)
  }
})
</script>

<template>
  <transition name="toast">
    <div 
      v-if="visible"
      class="fixed top-4 right-4 z-50 max-w-sm w-full shadow-2xl border rounded-xl backdrop-blur-sm p-4 cursor-pointer hover:scale-[1.02] transition-all"
      :class="colors[type]"
    >
      <div class="flex items-start space-x-3">
        <span class="text-lg flex-shrink-0 mt-0.5">{{ icon[type] }}</span>
        <div class="flex-1 min-w-0">
          <p class="font-medium text-sm leading-5 break-words">{{ message }}</p>
        </div>
        <button 
          @click="close"
          class="ml-2 p-1 -my-1 text-white/70 hover:text-white hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
          aria-label="Close"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.toast-enter-active {
  animation: toastSlideIn 0.3s ease-out;
}

.toast-leave-active {
  animation: toastSlideOut 0.3s ease-in;
}

@keyframes toastSlideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toastSlideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>

