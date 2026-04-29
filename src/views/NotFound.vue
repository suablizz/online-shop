<template>
  <div class="max-w-2xl mx-auto px-4 py-16 text-center">
    <div class="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
      <span class="text-4xl font-bold text-gray-400">404</span>
    </div>

    <h1 class="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
    <p class="text-gray-600 mb-8">The page you are looking for doesn't exist or has been moved.</p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <router-link
        to="/"
        class="inline-block bg-rwanda-blue text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
      >
        Go Home
      </router-link>
      <router-link
        to="/products"
        class="inline-block bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
      >
        Browse Products
      </router-link>
    </div>
  </div>
</template>

