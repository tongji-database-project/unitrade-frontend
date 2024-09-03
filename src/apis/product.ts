import { httpInstance } from '@/utils/utils'
import type { Product } from '@/utils/interfaces'
import { useRouter } from 'vue-router'
const router = useRouter()

export const submitProduct = (product: Product) => {
  // 发起 POST 请求，将商品数据发送到后端
  return httpInstance({
    url: '/seller/publish',
    method: 'POST',
    data: {
      name: product.name,
      price: product.price,
      inventory: product.stock,
      type: product.productType,
      cover_image_url: product.cover,
      product_image_urls: product.images,
      product_details:product.description,
    }
  })
    
}
