import httpInstance from '@/utils/utils';
import type { CartItem } from '@/utils/interfaces';

// 获取购物车列表
export const getCartItemsAPI = () => {
  return httpInstance({
    url: `/cart`,
    method: 'GET'
  });
};

// 添加商品到购物车
export const addToCartAPI = (cart_item: CartItem) => {
  return httpInstance({
    url: '/cart',
    method: 'POST',
    data: cart_item
  });
};

// 从购物车删除商品
export const removeFromCartAPI = (merchandise_id: string) => {
  return httpInstance({
    url: `/cart/${merchandise_id}`,
    method: 'DELETE'
  });
};

// 修改购物车商品状态
export const updateCartItemAPI = (cart_item_update: {
  merchandise_id: string;
  quanity: number;
  selected: boolean;
}) => {
  return httpInstance({
    url: '/cart/update',
    method: 'POST',
    data: cart_item_update
  });
};
