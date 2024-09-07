import { httpInstance } from "@/utils/utils";
import type { Order,AddCommentParams,RefundRequest } from '@/utils/interfaces';
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

export const getUserAddress = async (): Promise<string | null> => {  // 返回类型为字符串或 null
  try {
    const response = await httpInstance({
      url: '/order/user/address',
      method: 'GET',  // 使用 GET 方法
    });

    if (response.status === 200) {
      ElMessage.success('获取用户地址成功');
      return response.data;  // 返回用户地址（字符串）
    } else if (response.status === 401) {
      ElMessage({
        type: 'warning',
        message: `用户未认证，状态码：${response.status}`
      });
    } else if (response.status === 404) {
      ElMessage({
        type: 'warning',
        message: `未找到用户地址信息，状态码：${response.status}`
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
      type: 'error',
      message: `无法获取用户地址，错误信息：${error}`
    });
  }

  return null;  // 如果出现错误或者状态码不为 200，返回 null
};

// 上传评论的 API
export const addComment = async (order_id: string , merchandise_id: string, content: string,comment_type: string,quality_rating: number,attitude_rating:number,price_rating:number,logistic_speed_rating:number,conformity_rating:number): Promise<void> => {
  try {
    const response = await httpInstance({
      url: '/order/addComment',
      method: 'POST',
      params:{
        order_id: order_id,
        merchandise_id: merchandise_id,
        content:content,
        comment_type:comment_type
      }
    });

    if (response.status === 200) {
      ElMessage.success(response.data.message || '评论提交成功');
    } else {
      ElMessage.error(`请求失败，状态码：${response.status}`);
    }
  } catch (error) {
    ElMessage.error(`提交评论失败，错误信息：${error || '未知错误'}`);
  }
};

// 确认收货API请求
export const confirmReceipt = async (order_id: string, merchandise_id: string): Promise<void> => {
  try {
    const response = await httpInstance({
      url: '/order/confirmReceipt',
      method: 'POST',
      params: {
        order_id: order_id,
        merchandise_id: merchandise_id
      },
    });

    if (response.status === 200) {
      ElMessage.success('收货确认成功');
    } else {
      ElMessage.error(`请求失败，状态码：${response.status}`);
    }
  } catch (error) {
    ElMessage.error(`收货确认失败，错误信息：${error}`);
  }
};

// 申请退款的 API 请求
export const requestRefund = async (order_id: string, refund_reason: string, refund_feedback: string): Promise<void> => {
  try {
    const response = await httpInstance({
      url: '/order/requestRefund',
      method: 'POST',
      params:{
        order_id: order_id,
        refund_reason: refund_reason,
        refund_feedback: refund_feedback,
      }
    });

    if (response.status === 200) {
      ElMessage.success('退款申请成功');
    } else {
      ElMessage.error(`请求失败，状态码：${response.status}`);
    }
  } catch (error) {
    ElMessage.error(`退款申请失败，错误信息：${error}`);
  }
};
