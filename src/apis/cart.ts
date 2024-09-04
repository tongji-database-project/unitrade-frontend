// 封装购物车相关接口
import request from '@/utils/utils'
import type { Good } from '@/stores/cartStore'

// TODO: 待定

// 加入购物车
export const insertCartAPI = ({ skuId, count }: { skuId: number; count: number }) => {
  return request({
    url: '/member/cart',
    method: 'POST',
    data: {
      skuId,
      count
    }
  })
}

// 获取最新的购物车列表
export const findNewCartListAPI = () => {
  return request({
    url: '/member/cart'
  })
}

// 删除购物车
export const delCartAPI = (ids: (number | Good)[]) => {
  return request({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车

export const mergeCartAPI = (data: { skuId: number; selected: boolean; count: number }[]) => {
  return request({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}
