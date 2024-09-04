// 封装购物车相关接口
import httpInstance from '@/utils/utils'
import type { Good } from '@/stores/cartStore'

// TODO: 待定

// 加入购物车
export const insertCartAPI = ({ skuId, count }: { skuId: number, count: number }) => {
  return httpInstance({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

interface CartItem {
    customerId: string;
    merchandiseId: string;
    quantity: number;
    selected?: boolean;
}

// 获取购物车列表
export const getCartItems = (customerId: string) => {
    return httpInstance({
        url: `/cart?customerId=${customerId}`,
        method: 'GET'
    });
};

// 删除购物车
export const delCartAPI = (ids: (number | Good)[]) => {
  return httpInstance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}
// 添加商品到购物车
export const addToCart = (cartItem: CartItem) => {
    return httpInstance({
        url: '/cart',
        method: 'POST',
        data: cartItem
    });
};

// 更新购物车中的商品数量和选中状态
export const updateCartItem = (cartItem: CartItem) => {
    return httpInstance({
        url: '/cart/update',
        method: 'POST',
        data: cartItem
    });
};

// 从购物车删除商品
export const removeFromCart = (customerId: string, merchandiseId: string) => {
    return httpInstance({
        url: `/cart/${customerId}/${merchandiseId}`,
        method: 'DELETE'
    });
};
