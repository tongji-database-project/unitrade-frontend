import request from '@/utils/utils'

export const getOrderAPI = (id) => {
  return request({
    url: `/member/order/${id}`
  })
}