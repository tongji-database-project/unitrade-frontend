import request from '@/utils/utils'

export const getOrderAPI = (id: string) => {
  return request({
    url: `/member/order/${id}`
  })
}
