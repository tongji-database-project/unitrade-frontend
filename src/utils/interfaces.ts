// 消息类型，用于接收后端响应并正确显示
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


// 商品展示类型，用于商品展示时上传商品信息
export interface ProductOnsale {
  id: string
  name: string
  price: number
  stock: number
  productType: string
  cover: string
  description: string
  sales: number
}

//生成订单时，显示订单的所有信息
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  order_id: string;
  merchandise_id: string;
  order_quantity: number;
  state: string;
  order_time: string;
  receiving_time: string;
  items: OrderItem[];
}

export interface ConfirmReceiptParams {
  orderId: string;
  merchandiseId: string;
}

export interface AddCommentParams {
  orderId: string;
  merchandiseId: string;
  content: string;
  commentType: string;
}

export interface RefundRequest {
  order_id: string;
  refund_reason: string;
  refund_feedback?: string;
}

export interface ConfirmReceiptParams {
  orderId: string;
  merchandiseId: string;
}

export interface AddCommentParams {
  orderId: string;
  merchandiseId: string;
  content: string;
  commentType: string;
}

export interface RefundRequest {
  orderId: string;
  refundReason: string;
  refundFeedback?: string;
}

// 定义 CartItem 接口
export interface CartItem {
  merchandise_id: string;
  merchandise_name: string;
  merchandise_price: number;
  picture: string;
  quanity: number;
  cart_time: string;
  selected: boolean;
}

export interface OrderSummary {
  user_name: string;
  phone: string;
  address: string;
  cart_items: CartItem[];
  total_price: number;
  shipping_fee: number;
  grand_total: number;
}
