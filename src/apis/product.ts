import { httpInstance } from '@/utils/utils'
import type { Product } from '@/utils/interfaces'
import { useRouter } from 'vue-router'
const router = useRouter()

export const submitProduct = async (product: Product) => {
  // 发起 POST 请求，将商品数据发送到后端
  const response = await httpInstance({
    url: '/seller/publish',
    method: 'POST',
    data: {
      name: product.name,
      price: product.price,
      inventory: product.stock,
      type: product.description,
      Picture: product.coverUrl
    }
  })
    .then((response) => {
      if (response.status === 200) {
        ElMessage.success(response.data.message || '商品发布成功')
        router.push('/onsale') // 发布成功后跳转到其他页面
        //return response.data
      } else if (response.status === 400) {
        ElMessage({
          type: 'warning',
          message: `无法获取用户信息状态码：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取,错误信息：${error}`
      })
    })
}
