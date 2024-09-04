import { ElMessage } from 'element-plus'
import { httpInstance } from '@/utils/utils'
import { useRouter } from 'vue-router'
import 'element-plus/dist/index.css' //添加el组件的动画效果

const router = useRouter()

// 提交投诉
export const submitSellerComplaint = async (sellerId: string, complaintReason: string) => {
  try {
    const response = await httpInstance({
      url: '/api/sellercomplaints/submit',
      method: 'POST',
      data: {
        SellerId: sellerId,
        ComplaintReason: complaintReason
      }
    })

    if (response.status === 200) {
      ElMessage.success('投诉提交成功')
      router.push(`/profile/${sellerId}`) // 投诉提交成功后跳转回个人主页
    } else {
      ElMessage({
        type: 'warning',
        message: `提交失败，状态码：${response.status}`
      })
    }
  } catch (error) {
    ElMessage({
      type: 'warning',
      message: `提交失败，错误信息：${error}`
    })
  }
}

// 获取卖家的所有投诉
export const getComplaintsBySeller = async (sellerId: string) => {
  try {
    const response = await httpInstance({
      url: `/api/sellercomplaints/${sellerId}/complaints`,
      method: 'GET'
    })

    if (response.status === 200) {
      return response.data
    } else {
      ElMessage({
        type: 'warning',
        message: `获取投诉失败，状态码：${response.status}`
      })
    }
  } catch (error) {
    ElMessage({
      type: 'warning',
      message: `获取投诉失败，错误信息：${error}`
    })
  }
}

// 更新投诉状态（仅管理员使用）
export const updateComplaintStatus = async (
  complaintId: string,
  complaintState: string,
  complaintFeedback: string
) => {
  try {
    const response = await httpInstance({
      url: `/api/sellercomplaints/update/${complaintId}`,
      method: 'PUT',
      data: {
        ComplaintState: complaintState,
        ComplaintFeedback: complaintFeedback
      }
    })

    if (response.status === 200) {
      ElMessage.success('投诉状态更新成功')
    } else {
      ElMessage({
        type: 'warning',
        message: `更新投诉状态失败，状态码：${response.status}`
      })
    }
  } catch (error) {
    ElMessage({
      type: 'warning',
      message: `更新投诉状态失败，错误信息：${error}`
    })
  }
}
