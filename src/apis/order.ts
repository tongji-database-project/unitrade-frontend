import { httpInstance } from "@/utils/utils";
import type { Order } from '@/utils/interfaces';
import { ElMessage } from "element-plus";

export const getOrderInfo = async (params: { 
  order_id?: string, 
  state?: string, 
  merchandise?: string, 
  order_quantity?: number, 
  order_time?: Date, 
  receiving_time?: Date 
}): Promise<Order[] | null> => { // 更新返回类型为 Order 数组
  try {
    const response = await httpInstance({
      url: '/order',
      method: 'POST',  // 改为 POST 方法
      data: params  // 请求体参数，传递完整的对象
    });

    if (response.status === 200) {
      ElMessage.success('生成订单成功');
      return response.data;  // 返回订单数据（数组）
    } else if (response.status === 400) {
      ElMessage({
        type: 'warning',
        message: `无法获取用户信息，状态码：${response.status}`
      });
    } else {
      // 处理其他状态码的情况
      ElMessage({
        type: 'warning',
        message: `请求失败，状态码：${response.status}`
      });
    }
  } catch (error) {
    ElMessage({
      type: "warning",
      message: `无法获取，错误信息：${error}`
    });
  }

  return null;  // 如果出现错误或者状态码不为 200，返回 null
};
