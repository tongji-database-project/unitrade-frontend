import { httpInstance } from '@/utils/utils'

export const getUserInfo = (userId: string) => {
  return httpInstance({
    url: `/profile/${userId}`,
    method: 'GET'
  })
}
