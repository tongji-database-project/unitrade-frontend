import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref({})

  // 登录并加载购物车数据
  const login = async ({ account, password }: { account: string; password: string }) => {
    const res = await loginAPI({ account, password });
    if (res.status === 200) {
      userInfo.value = res.result; // 设置用户信息
      await cartStore.loadCart();  // 加载购物车数据
    } else {
      throw new Error('登录失败，请检查您的账号和密码。');
    }
  }

  // 退出时清除用户信息和购物车数据
  const logout = () => {
    userInfo.value = {};
    cartStore.clearCart(); // 清空购物车
  }

  return {
    userInfo,
    login,
    logout
  }
}, {
  persist: true,
})
