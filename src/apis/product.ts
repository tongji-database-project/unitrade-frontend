import { httpInstance } from '@/utils/utils'
import type { Product } from '@/utils/interfaces'
import { useRouter } from 'vue-router'
const router = useRouter()

export const submitProduct = (product: Product) => {
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
      product_details: product.description
    }
  })
}

export const getUserProducts = () => {
  return httpInstance({
    url: '/seller/getUserProducts',
    method: 'GET'
  })
}

export const getModifyProduct = (productID: string) => {
  return httpInstance({
    url: '/seller/modify',
    method: 'POST',
    data: {
      ProductID: productID
    }
  })
}

export const cancelProduct = (productID: string) => {
  return httpInstance({
    url: '/seller/cancel',
    method: 'POST',
    data: {
      ProductID: productID
    }
  })
}

export const seekUserProducts = (seekName: string) => {
  return httpInstance({
    url: '/seller/seek',
    method: 'POST',
    data: {
      SpecialName: seekName
    }
  })
}
