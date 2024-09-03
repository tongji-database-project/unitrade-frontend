<script setup lang="ts"></script>
<template>
  <p>已收货订单</p>
  <div class="list">
    <p>示例订单</p>
    <div class="show-order">
      <div class="head">
        <div class="id">
          <p>订单号：{{ 12345 }}</p>
        </div>
        <p>time:2015:21:21</p>
      </div>
      <div class="detail">
        <div class="picture">
          <img src="https://via.placeholder.com/300" class="picture-size" />
        </div>
        <div class="name">
          <p>商品名称：</p>
          <p>
            {{
              '文本长度展示：哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦哦'
            }}
          </p>
        </div>
        <div class="number">
          <p>数量：</p>
          <p>{{ 1231 }}</p>
        </div>
        <div class="price">
          <p>价格：</p>
          <p>{{ 1231 }}元</p>
        </div>
        <div class="options">
          <div class="refund">
            <button>退款</button>
          </div>
          <div class="complain">
            <button>投诉</button>
          </div>
        </div>
      </div>
    </div>
    <div v-for="i in 30" :key="i" style="padding-top: 1rem">填充内容，用于拉长页面长度</div>
  </div>
</template>

<style>
.list {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh; /* 或者你需要的高度 */
  overflow-y: auto; /* 只允许垂直滚动 */
}
.show-order {
  font-size: 12px; /* 调整文本大小 */
  width: 95%;
  background-color: white;
  height: 100px;
  border-radius: 10px; /* 设置所有四个角的圆角半径为 10px */
  padding: 5px;
}
.head {
  display: flex;
  justify-content: space-between;
  justify-content: flex-start;
  border: 1px solid black;
}
.id {
  width: 25%;
  margin-left: 10px;
}
.detail {
  width: 100%;
  height: 12vh;
  display: flex;
  justify-content: space-between;
  justify-content: flex-start;
}
.picture {
  border-left: 1px solid black;
  border-bottom: 1px solid black;
  width: 10%;
}
.picture-size {
  margin: 3px;
  width: 90%; /* 设置图片的宽度 */
  height: auto; /* 自动调整高度以保持比例 */
}
.name {
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  overflow-wrap: break-word; /* 强制单词在边界处换行 */
  width: 40%;
}
.number {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  width: 5%;
}
.price {
  overflow-wrap: break-word;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  width: 5%;
}
.options {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  border-bottom: 1px solid black;
  border-right: 1px solid black;
  width: 40%;
}
.refund {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%;
  height: 50%;
}
.complain {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100%;
  height: 50%;
}
</style>
