import httpInstance from '@/utils/utils';

// 获取购物车列表
export const getCartItemsAPI = (customer_id: string) => {
  return httpInstance({
    url: `/cart/${customer_id}`,
    method: 'GET'
  });
};

// 添加商品到购物车
export const addToCartAPI = (cart_item: {
  customer_id: string;
  merchandise_id: string;
  merchandise_name: string;
  merchandise_price: number;
  picture: string;
  quanity: number;
  cart_time: string; // 可以使用 Date 对象，但发送到后端时需要序列化为字符串
  selected: boolean;
}) => {
  return httpInstance({
    url: '/cart',
    method: 'POST',
    data: cart_item
  });
};

// 从购物车删除商品
export const removeFromCartAPI = (customer_id: string, merchandise_id: string) => {
  return httpInstance({
    url: `/cart/${customer_id}/${merchandise_id}`,
    method: 'DELETE'
  });
};

// 修改购物车商品状态
export const updateCartItemAPI = (cart_item_update: {
  customer_id: string;
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
