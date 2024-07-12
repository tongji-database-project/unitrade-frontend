<template>
  <div class="sales-info">
    <h3>销售信息</h3>
    <p>总销售：{{ sales.totalSales }}</p>
    <p>销售金额：{{ sales.salesAmount }}</p>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SalesInfo',
  props: {
    sales: {
      type: Object,
      required: true
    }
  }
});
</script>

<style scoped>
.sales-info {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  max-width: 600px;
}
</style>
