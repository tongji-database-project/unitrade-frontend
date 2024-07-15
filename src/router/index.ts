import { createRouter, createWebHistory } from 'vue-router'

import LayoutView from '@/views/Layout/LayoutView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import MerchandiseView from '@/views/Merchandise/MerchandiseView.vue'
import CommentsView from '@/views/Comments/CommentsView.vue'
import ProfileView from '@/views/Profile/ProfileView.vue'
import ComplaintSubmissionView from '@/views/ComplaintSubmission/ComplaintSubmissionView.vue'
import MyAccountView from '@/views/MyAccount/MyAccountView.vue'
import CartView from '@/views/Cart/CartView.vue'
import CheckoutView from '@/views/Checkout/CheckoutView.vue'
import PaymentView from '@/views/Payment/PaymentView.vue'
import OnsaleListView from '@/views/OnsaleList/OnsaleListView.vue'
import ProductSubmissionView from '@/views/ProductSubmission/ProductSubmissionView.vue'
import OrderListView from '@/views/OrderList/OrderListView.vue'
import OrderView from '@/views/Order/OrderView.vue'
import RefundRequestView from '@/views/RefundRequest/RefundRequestView.vue'
import MessageView from '@/views/Message/MessageView.vue'
import ChatView from '@/views/Chat/ChatView.vue'

import TestView from '@/views/TestView.vue'

// TODO: 页面路由配置，可能会频繁调整
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
        },
        {
          path: 'test',
          name: 'test',
          component: TestView,
        },
        {
          path: 'merchandise/:id',
          name: 'merchandise',
          component: MerchandiseView,
        },
        {
          path: 'comments/:id',
          name: 'comments',
          component: CommentsView,
        },
        {
          path: 'profile/:id',
          name: 'profile',
          component: ProfileView,
        },
        // 以下几个 URL 均结合当前的 token 来确定返回哪一个用户的信息
        {
          path: 'cart',
          name: 'cart',
          component: CartView,
        },
        {
          path: 'account',
          name: 'my-account',
          component: MyAccountView,
        },
        {
          path: 'onsale',
          name: 'on-sale-list',
          component: OnsaleListView,
        },
        {
          path: 'product-sub/:id',
          name: 'product-submission',
          component: ProductSubmissionView,
        },
        {
          path: 'order',
          name: 'order',
          component: OrderListView,
        },
        {
          path: '/order-detail/:id',
          name: 'OrderDetail',
          component: OrderView
        },
        {
          path: '/refund/:id',
          name: 'RefundRequest',
          component: RefundRequestView
        },
        {
          path: 'message',
          name: 'message',
          component: MessageView,
          children: [
            {
              path: ':user_id',
              name: 'chat',
              component: ChatView,
              props: true,
            },
          ]
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
