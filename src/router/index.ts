import { createRouter, createWebHistory } from 'vue-router'
import { roleJudgeAPI } from '@/apis/user'
import LayoutView from '@/views/Layout/LayoutView.vue'
import HomeView from '@/views/Home/HomeView.vue'
import HomeSearch from '@/views/Home/HomeSearch.vue'
import HomeSearchStore from '@/views/Home/HomeSearchStore.vue'
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
import ProductModifyView from '@/views/ProductSubmission/ProductModifyView.vue'
import OrderListView from '@/views/OrderList/OrderListView.vue'
import OrderView from '@/views/Order/OrderView.vue'
import RefundRequestView from '@/views/RefundRequest/RefundRequestView.vue'
import MessageView from '@/views/Message/MessageView.vue'
import ChatView from '@/views/Chat/ChatView.vue'

import EditInfoView from '@/views/Editinfo/EditInfoView.vue'
import ReceivedView from '@/views/Received/ReceivedView.vue'
import TransitView from '@/views/Transit/TransitView.vue'
import UncommandView from '@/views/Uncommand/UncommandView.vue'

import { ElMessage,ElMessageBox } from 'element-plus'
import 'element-plus/dist/index.css';
import MyapplicationView from '@/views/MyApplication/MyapplicationView.vue'
import MyfollowView from '@/views/Myfollow/MyfollowView.vue';
import PayBack from '@/views/Payment/PayBack.vue'

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
          component: HomeView
        },
        {
          path: 'homeSearch',
          name: 'homeSearch',
          component: HomeSearch
        },
        {
          path: 'homeSearchStore',
          name: 'homeSearchStore',
          component: HomeSearchStore
        },
        {
          path: 'merchandise/:id',
          name: 'merchandise',
          component: MerchandiseView
        },
        {
          path: 'comments/:id',
          name: 'comments',
          component: CommentsView
        },
        {
          path: 'profile/:id',
          name: 'profile',
          component: ProfileView
        },
        {
          path: 'complaintsubmission/:seller_id',
          name: 'complaintsubmission',
          component: ComplaintSubmissionView
        },
        // 以下几个 URL 均结合当前的 token 来确定返回哪一个用户的信息
        {
          path: 'cart',
          name: 'cart',
          component: CartView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'checkout',
          name: 'checkout',
          component: CheckoutView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'payment/:id',
          name: 'payment',
          component: PaymentView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'payback',
          name: 'payback',
          component: PayBack,
          props: route => ({ order_id: route.query.order_id }) // 从查询参数获取 order_id

        },
        {
          path: 'account',
          name: 'my-account',
          component: MyAccountView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'onsale',
          name: 'on-sale-list',
          component: OnsaleListView
        },
        {
          path: 'product-sub',
          name: 'product-submission',
          component: ProductSubmissionView
        },
        {
          path: 'product-mod/:id',
          name: 'product-modify',
          component: ProductModifyView
        },
        {
          path: 'order',
          name: 'order',
          component: OrderListView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
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
              props: true
            }
          ],
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'myapplication',
          name: 'myapplication',
          component: MyapplicationView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'Editinfo',
          name: 'Editinfo',
          component: EditInfoView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'Myfollow',
          name: 'Myfollow',
          component: MyfollowView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'received',
          name: 'received',
          component: ReceivedView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'transit',
          name: 'transit',
          component: TransitView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        },
        {
          path: 'uncommand',
          name: 'uncommand',
          component: UncommandView,
          beforeEnter: async (to, from, next) => {
            const role = await roleJudgeAPI()
            if (role !== 'User') {
              next('/login')
              ElMessage({
                type: 'error',
                message: `请先登录账户`
              })
            } else {
              next()
            }
          }
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login/LoginView.vue')
    },
    {
      path: '/adminlogin',
      name: 'adminlogin',
      component: () => import('../views/Login/AdminloginView.vue')
    },
    {
      path: '/admin/:id',
      name: 'admin',
      component: () => import('../views/Admin/AdminView.vue'),
      beforeEnter: async (to, from, next) => {
        const role = await roleJudgeAPI()
        if (role !== 'Admin') {
          next('/adminlogin')
          ElMessage({
            type: 'error',
            message: `请先登录管理员账户`
          })
        } else {
          next()
        }
      }
    }
  ]
})

export default router
