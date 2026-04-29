import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/products',
      component: () => import('@/views/ProductsLayout.vue'),
      children: [
        {
          path: '',
          name: 'Products',
          component: () => import('@/views/ProductsList.vue')
        },
        {
          path: 'category/:category',
          name: 'Category',
          component: () => import('@/views/ProductsList.vue')
        },
        {
          path: ':id',
          name: 'ProductDetail',
          component: () => import('@/views/ProductDetail.vue'),
          props: true
        }
      ]
    },
    {
      path: '/cart',
      name: 'Cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/wishlist',
      name: 'Wishlist',
      component: () => import('@/views/WishlistView.vue')
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: () => import('@/views/CheckoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/order-success',
      name: 'OrderSuccess',
      component: () => import('@/views/OrderSuccess.vue')
    },
    {
      path: '/profile',
      component: () => import('@/views/ProfileLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Profile',
          component: () => import('@/views/ProfileView.vue')
        },
        {
          path: 'orders',
          name: 'Orders',
          component: () => import('@/views/OrdersView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

// Navigation guards
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  } else if (to.meta.guestOnly && authStore.isLoggedIn) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

export default router
