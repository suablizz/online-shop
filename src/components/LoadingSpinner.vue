<template>
  <div class="flex items-center justify-center py-12">
    <div class="spinner w-12 h-12 border-4 border-rwanda-blue border-t-transparent rounded-full" role="status" aria-label="Loading">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}
</style>

