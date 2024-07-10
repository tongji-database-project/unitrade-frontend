import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/seller/Dashboard.vue'
import ProductManagement from '../views/seller/ProductManagement.vue'
import OrderManagement from '../views/seller/OrderManagement.vue'
import ProfileSettings from '../views/seller/ProfileSettings.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    { path: '/', component: Dashboard },
    { path: '/products', component: ProductManagement },
    { path: '/orders', component: OrderManagement },
    { path: '/profile', component: ProfileSettings }
  ]
})

export default router
