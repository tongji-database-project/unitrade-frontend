import { ref } from 'vue'
import { defineStore } from 'pinia'
import { httpInstance } from '@/utils/utils'
import { ElMessage } from 'element-plus'

export const getCategoryAPI = async () => {
  return await httpInstance({
    url: '/category/get',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'warning',
          message: `无法获取商品类型名：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取商品类型名：${error}`
      })
    })
}

export const getMerchandiseIdAPI = async () => {
  return await httpInstance({
    url: '/merchandiseId/get-id',
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'warning',
          message: `无法获取商品id：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取商品id：${error}`
      })
    })
}

export const getMerchandiseCardAPI = async (merchandiseId: string) => {
  return await httpInstance({
    url: `/merchandiseCard/${merchandiseId}`,
    method: 'GET'
  })
    .then((response) => {
      if (response.status === 200) {
        return response.data
      } else {
        ElMessage({
          type: 'warning',
          message: `无法获取商品卡片信息：${response.status}`
        })
      }
    })
    .catch((error) => {
      ElMessage({
        type: 'warning',
        message: `无法获取商品卡片信息：${error}`
      })
    })
}

export const getSpecialProductID = (specialName: string) => {
  // 发起 POST 请求，将商品数据发送到后端
  return httpInstance({
    url: '/merchandiseId/getSpecialId',
    method: 'POST',
    data: {
      SpecialName: specialName,
    }
  })
}

// export function getCategoryAPI () {
//     return httpInstance({
//       url: '/home/category/head'
//     })
//   }

// export const useCategoryStore = defineStore('category', () => {
//   // 导航列表的数据管理
//   // state 导航列表数据
//   const categoryList = ref([])

//   // action 获取导航数据的方法
//   const getCategory = async () => {
//     //const res = await getCategoryAPI()
//     //categoryList.value = res.result
//   }

//   return {
//     categoryList,
//     getCategory
//   }
// })
