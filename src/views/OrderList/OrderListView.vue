<template>
  <h1>全部订单</h1>
  <el-container class="myOrder" style="height: 500px">
    <el-container>
      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="ordeR_ID" label="订单号" width="150" />
            <el-table-column prop="merchandise_name" label="商品名称" width="300"/>
            <el-table-column prop="state" label="订单状态" width="150">
              <template #default="scope">
                <!-- 根据 state 显示相应的文本 -->
                {{ formatState(scope.row.state) }}
              </template>
            </el-table-column>
            <el-table-column prop="ordeR_TIME" label="下单时间" width="220" />
            <el-table-column prop="receivinG_TIME" label="收货时间" width="220" />
            <el-table-column prop="ordeR_QUANITY" label="订单数量" width="100"/>
            <el-table-column prop="userAddress" label="用户地址" />

            <el-table-column width="150">
              <template #default="scope">
                <el-button size="small" type="primary" @click="handleOrderClick(scope.row)">订单详情</el-button>
                <el-button size="small" type="danger" @click="handleRefundClick(scope.row)">申请退款</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getOrderInfo,getUserAddress,getMerchandiseNameById } from '@/apis/order';
import type { Order } from '@/utils/interfaces';
const router = useRouter()
// 定义包含多个商品的订单数据
const tableData = ref<Order[]>([])

// 获取订单数据的函数
const fetchOrders = async () => {
  try {
    // 调用 API 方法并传递查询参数
    const response = await getOrderInfo({
      order_id: '',
      state: '',
      merchandise: '',
      order_quantity: undefined,
      order_time: undefined,
      receiving_time: undefined
    });

    if (response) {
      // 获取用户地址
      const address = await getUserAddress();

      if (address) {
        // 为每个订单添加用户地址和商品名信息
        const ordersWithDetails = await Promise.all(response.map(async (order) => {
          const merchandise_name = await getMerchandiseNameById(order.merchandisE_ID);
          return {
            ...order,
            userAddress: address,
            merchandise_name:merchandise_name // 添加商品名到订单数据对象中
          };
        }));

        tableData.value = ordersWithDetails;
        console.log('成功获取地址和商品名', tableData.value);
      } else {
        tableData.value = response; // 如果未获取到地址，只显示订单数据
      }
    } else {
      console.error('无法获取订单数据');
    }
  } catch (error) {
    console.error('获取订单数据失败:', error);
  }
};

const handleOrderClick = (order: any) => {
  console.log('点击订单详情，订单号:', order.ordeR_ID);
  const encodedOrderData = encodeURIComponent(JSON.stringify(order));
  router.push({ 
    name: 'OrderDetail', 
    params: { id: order.ordeR_ID }, 
    query: { order: encodedOrderData } 
  });
};

const handleRefundClick = (order: any) => {
  console.log('点击申请退款，订单号:', order.ordeR_ID);
  const encodedOrderData = encodeURIComponent(JSON.stringify(order));
  router.push({ 
    name: 'RefundRequest', 
    params: { id: order.ordeR_ID }, 
    query: { order: encodedOrderData } 
  });
};

const statusMap: { [key: string]: string } = {
  'ysh': '已收货',
  'Rec': '已收货',
  'yjs': '已拒收',
  'Tra': '运输中',
  'UNP': '未付款',
  'WAI': '待发货'
  // 添加更多状态
};

const formatState = (state: string) => {
  return statusMap[state] || '未知状态';
};

// 页面加载时获取订单数据
onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.myOrder .el-header {
  display: flex;
  align-items: center;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
  padding: 10px;
  border-bottom: 0px solid var(--el-color-primary-light-5);
}
.myOrder .el-menu {
  border-right: none;
}
.myOrder .el-main {
  padding: 0;
}
.myOrder .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 0px;
}
.myOrder .header-title {
  margin-right: 20px;
  font-weight: bold;
  padding-right: 10px;
}
.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
