<script setup>
// Footer with Rwanda/Kigali branding
</script>

<template>
  <footer class="bg-rwanda-blue text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-2 mb-4">
            <div class="w-10 h-10 bg-rwanda-yellow rounded-full flex items-center justify-center">
              <span class="text-rwanda-green font-bold text-lg">K</span>
            </div>
            <span class="font-bold text-xl">Kigali Tech Store</span>
          </div>
          <p class="text-blue-100 leading-relaxed">
            Your trusted source for quality tech products in Rwanda. 
            Fast delivery across Kigali and nationwide.
          </p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="font-bold text-lg mb-4">Quick Links</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/products" class="hover:text-rwanda-yellow transition-colors">Products</router-link></li>
            <li><router-link to="/cart" class="hover:text-rwanda-yellow transition-colors">Cart</router-link></li>
            <li><router-link to="/wishlist" class="hover:text-rwanda-yellow transition-colors">Wishlist</router-link></li>
            <li><router-link to="/profile" class="hover:text-rwanda-yellow transition-colors">Account</router-link></li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h4 class="font-bold text-lg mb-4">Categories</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/products/category/electronics" class="hover:text-rwanda-yellow transition-colors">Electronics</router-link></li>
            <li><router-link to="/products/category/jewelery" class="hover:text-rwanda-yellow transition-colors">Jewelery</router-link></li>
            <li><router-link to="/products/category/men&apos;s clothing" class="hover:text-rwanda-yellow transition-colors">Men&apos;s Clothing</router-link></li>
            <li><router-link to="/products/category/women&apos;s clothing" class="hover:text-rwanda-yellow transition-colors">Women&apos;s Clothing</router-link></li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-bold text-lg mb-4">Contact Us</h4>
          <div class="space-y-2 text-sm">
            <p class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Kigali, Rwanda
            </p>
            <p class="flex items-center">
              <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.27 7.27c.883.883 2.318.883 3.2 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              +250 788 123 456
            </p>
            <p>contact@kigalitechstore.rw</p>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-blue-200 pt-6 text-center text-sm text-blue-200">
        <p>&copy; 2024 Kigali Tech Store. All rights reserved. | Made with ❤️ in Rwanda</p>
        <p class="mt-1">
          <router-link to="/privacy" class="hover:text-rwanda-yellow mx-2">Privacy</router-link>
          <router-link to="/terms" class="hover:text-rwanda-yellow mx-2">Terms</router-link>
          <router-link to="/returns" class="hover:text-rwanda-yellow mx-2">Returns</router-link>
        </p>
      </div>
    </div>
  </footer>
</template>

