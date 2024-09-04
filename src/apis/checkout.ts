import httpInstance from '@/utils/utils'


// 获取详情接口
export const getCheckInfoAPI = () => {
  return httpInstance({
    url: '/member/order/pre'

  })
}


// 创建订单
export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}