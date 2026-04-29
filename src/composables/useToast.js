import { ref, onMounted, watch } from 'vue'

// Global toast instance
let toastInstance = null

export function useToast() {
  const show = (message, type = 'success', duration = 4000) => {
    if (toastInstance) {
      toastInstance.close?.()
    }
    
    toastInstance = {
      message,
      type,
      duration
    }
  }

  const types = ['success', 'error', 'info', 'warning']

  return {
    show,
    types
  }
}

// Global toast utility (for backward compatibility)
export function $toast(message, type = 'success', duration = 4000) {
  show(message, type, duration)
}

// Expose to window for legacy code
onMounted(() => {
  window.$toast = show
})

