import httpInstance from '@/utils/utils'

export const createPayAPI = (order_id: string) => {
  return httpInstance({
    url: '/pay/create-payment',
    method: 'GET',
    params: {
        order_id: order_id,
    }
  })
}

export const getOrderTotalAPI = (order_id: string) => {
    return httpInstance({
      url: '/pay/get-order-total',
      method: 'GET',
      params: {
          order_id: order_id,
      }
    })
}