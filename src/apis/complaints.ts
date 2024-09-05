import { httpInstance } from '@/utils/utils'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

// 明确指定参数的类型和返回类型
export const submitComplaint = async (sellerId: string, complaintReason: string): Promise<void> => {
  return httpInstance({
    url: '/SubmitComplaintsController/submit', // 确保URL与后端控制器的路由一致
    method: 'POST',
    data: {
      sellerId: sellerId,
      complaintReason: complaintReason
    }
  })
    .then((response) => {
      if (response.status === 200) {
        ElMessage.success(response.data || '投诉提交成功')
        router.push('/profile') // 提交成功后返回用户页面，或其他页面
      } else {
        ElMessage.error(`提交失败，状态码：${response.status}`)
      }
    })
    .catch((error) => {
      ElMessage.error(`提交失败，错误信息：${error}`)
    })
}
