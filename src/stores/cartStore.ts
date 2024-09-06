import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import { getCartItemsAPI, addToCartAPI, updateCartItemAPI, removeFromCartAPI } from '@/apis/cart';

// 定义 CartItem 接口
interface CartItem {
  merchandise_id: string;
  merchandise_name: string;
  merchandise_price: number;
  picture: string;
  quanity: number;
  picture: string;
  cart_time: DateTime;
  selected: boolean;
}

// 定义 API 响应类型
interface ApiResponse<T> {
  status: number;
  data: T;
}

export const useCartStore = defineStore('cart', () => {
  const cartItems: Ref<CartItem[]> = ref([]); // 定义购物车商品列表的类型

    // 加载购物车
    const loadCart = async () => {
      //console.log('开始加载购物车...');
        try {
            const response: ApiResponse<CartItem[]> = await getCartItemsAPI(); // 使用 API 函数获取购物车
            if (response.status === 200) {
                cartItems.value = response.data;
                //console.log('购物车加载成功');
            } else {
                cartItems.value = []; // 处理错误或无数据情况
            }
        } catch (error) {
            console.error('加载购物车失败:', error);
            cartItems.value = []; // 错误处理
        }
    };

    // 添加商品到购物车
    const addProductToCart = async (cartItem: CartItem) => {
        try {
            const response: ApiResponse<null> = await addToCartAPI(cartItem);
            if (response.status === 200) {
                await loadCart(); // 更新购物车
            }
        } catch (error) {
            console.error('添加商品到购物车失败:', error);
        }
    };

    // 更新购物车中的商品
    const updateProductInCart = async (item: CartItem) => {
        try {
            const response: ApiResponse<null> = await updateCartItemAPI(item);
            if (response.status === 200) {
                await loadCart(); // 更新购物车
            }
        } catch (error) {
            console.error('更新购物车商品失败:', error);
        }
    };

    // 从购物车删除商品
    const removeProductFromCart = async (merchandiseId: string) => {
        try {
            const response: ApiResponse<null> = await removeFromCartAPI(merchandiseId);
            if (response.status === 200) {
                await loadCart(); // 更新购物车
            }
        } catch (error) {
            console.error('从购物车删除商品失败:', error);
        }
    };

    // 清空购物车（重置本地状态）
    const clearCart = (): void => {
        cartItems.value = [];
    };

    return {
        cartItems,
        addProductToCart,
        updateProductInCart,
        removeProductFromCart,
        clearCart,
        loadCart
    };
});
