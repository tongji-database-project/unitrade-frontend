import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCartStore } from './cartStore'

export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  const userInfo = ref<{ id: string; access_token: string }>({ id: '', access_token: '' }); // 初始化用户信息

  // 登录并加载用户信息
  const login = async (response: { access_token: string; id: string }) => {
    userInfo.value = {
      id: response.id, // 设置用户ID
      access_token: response.access_token, // 设置访问令牌
    }
    console.log('用户信息已保存', userInfo.value)
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
})
