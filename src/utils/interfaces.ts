// 消息类型，用于接收后端响应并正确显示
// TODO: time 字段类型待定
export interface Message {
  sender: string
  receiver: string
  content: string
  time: string
}

// 发布商品类型，用于发布商品时上传商品信息
export interface Product {
  name: string
  description: string
  price: number
  stock: number
  productType: string
  images: string[]
  cover: string
}