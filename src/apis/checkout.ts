import httpInstance from '@/utils/utils';

// 获取订单结算信息，包括用户信息和购物车选中商品信息
export const getCheckoutSummaryAPI = () => {
  return httpInstance({
    url: `/checkout`,
    method: 'GET'
  });
};

// 创建订单
export const createOrderAPI = (order_summary: any) => {
  return httpInstance({
    url: '/checkout/create-order',
    method: 'POST',
    data: order_summary
  });
};
