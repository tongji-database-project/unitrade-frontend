import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getCartItemsAPI, addToCartAPI, updateCartItemAPI, removeFromCartAPI } from '@/apis/cart';
import type { CartItem } from '@/utils/interfaces';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref<CartItem[]>();

    // 加载购物车
    const loadCart = async () => {
      //console.log('开始加载购物车...');
        try {
            const response = await getCartItemsAPI(); // 使用 API 函数获取购物车
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
            const response = await addToCartAPI(cartItem);
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
            const response = await updateCartItemAPI(item);
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
            const response = await removeFromCartAPI(merchandiseId);
            if (response.status === 200) {
                await loadCart(); // 更新购物车
            }
        } catch (error) {
            console.error('从购物车删除商品失败:', error);
        }
    };

    // 清空购物车（重置本地状态）
    const clearCart = () => {
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
