// 消息类型，用于接收后端响应并正确显示
// TODO: time 字段类型待定
export interface Message {
  sender: string,
  receiver: string,
  content: string,
  time: string,
}
