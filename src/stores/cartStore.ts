import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getCartItems, addToCart, updateCartItem, removeFromCart } from '@/apis/cart';

export const useCartStore = defineStore('cart', () => {
    const cartItems = ref([]);

    const loadCart = async () => {
        const response = await getCartItems(); // 假设 getCartItems 自动处理用户身份
        if (response.status === 200) {
            cartItems.value = response.data;
        } else {
            cartItems.value = []; // 处理错误或无数据情况
        }
    };

    const addProductToCart = async (item) => {
        const response = await addToCart(item);
        if (response.status === 200) {
            loadCart();
        }
    };

    const updateProductInCart = async (item) => {
        const response = await updateCartItem(item);
        if (response.status === 200) {
            loadCart();
        }
    };

    const removeProductFromCart = async (productId) => {
        const response = await removeFromCart(productId);
        if (response.status === 200) {
            loadCart();
        }
    };

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
