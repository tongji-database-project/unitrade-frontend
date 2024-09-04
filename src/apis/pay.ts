import httpInstance from '@/utils/utils'

export const getOrderAPI = (order_id: string) => {
  return httpInstance({
    url: '/pay/create-payment',
    method: 'GET',
    params: {
        order_id: order_id,
    }
  })
}
