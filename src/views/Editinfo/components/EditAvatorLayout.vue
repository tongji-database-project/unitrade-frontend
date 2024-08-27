<script>
  export default {
    data() {
      return {
        imageUrl: ''  // 存储图片的 URL
      };
    },
    methods: {
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageUrl = e.target.result;  // 设置图片 URL
          };
          reader.readAsDataURL(file);  // 读取文件为 Data URL
        }
      }
    }
  };
</script>
<template>
    <div>
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="Preview" style="max-width: 300px; max-height: 300px;" />
      </div> 
      <div v-else>
        <img src="https://via.placeholder.com/300" alt="Preview" style="max-width: 300px;max-height: 300px;">
      </div>
      <div class="button">
        <input type="file" @change="handleFileChange" />
        <div v-if="imageUrl">
            <button @click="submit">提交</button>
        </div>
     </div>
     
    </div>
</template>
  

  
<style>
.button{
    width:40%;
    display: flex; /* 使用弹性布局 */
    justify-content: space-between; /* 让子元素在容器内水平分布 */
}
 </style>
  