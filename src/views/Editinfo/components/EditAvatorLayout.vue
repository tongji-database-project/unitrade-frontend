<script setup lang="ts">
import { useTokenStore } from '@/stores/token'
import { ElMessage, ElMessageBox } from 'element-plus';
import {ref} from'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';
import 'element-plus/dist/index.css'; 

let file = ref<File | null>(null);
let imageUrl = ref<string | null>(null);
const router = useRouter();
const ToAccount = () => {
  setTimeout(() => {
    router.push('/account')
  }, 2000); // 延迟时间为 2000 毫秒（2 秒）
}
function handleFileChange(event:Event){
  const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        file.value = input.files[0];
        if (file.value.type.startsWith('image/')) {
          const reader=new FileReader();
          reader.onload=(e)=>{
            imageUrl.value=e.target?.result as string
          }
          reader.readAsDataURL(file.value);
        } else {
          alert('请选择一个有效的图片文件');
        }
      }
}
const submitEdit =async()=>{
  if (!file.value) {
    return;
  }
  const formData = new FormData();
  formData.append('file', file.value);
  try {
    // const response =await axios.post('/api/setpicture', {File:formData})
    const tokenStore = useTokenStore()
    const token = tokenStore.token
    const response = await fetch('/api/setpicture', {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}` // 添加 token 到请求头
    },
    body:formData
    });
    if(response.status===200){
      ElMessageBox({
        type:"success",
        message:"头像修改成功，即将跳转个人中心"
      })
      ToAccount()
    }
    else{
      ElMessage({
        type: 'warning',
        message: `头像修改失败,换个头像再试一下吧`
    })
    }
  } catch (error) {
    ElMessage({
        type: 'warning',
        message: `头像修改失败，错误信息：${error}`
    })
    console.error('Error uploading file:', error);
  }
}

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
            <button @click="submitEdit">提交</button>

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
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
}
.centre
{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 居中于视口 */
}
 </style>
  
   <!-- <script setup lang="ts">
   import { ref } from 'vue';
   
   const file = ref<File | null>(null);
   const uploadStatus = ref("无反应aaaaaaaaaaaaa")
   
   const handleFileChange = (event: Event) => {
         const input = event.target as HTMLInputElement;
         if (input.files && input.files.length > 0) {
           file.value = input.files[0];
         }
       };
 
   const upload = async ()=>{
         if (!file.value) {
           uploadStatus.value = 'No file selected';
           return;
         }
         console.log("asd")
   
         const formData = new FormData();
         formData.append('file', file.value);
         try {
            const response = await fetch('/api/setpicture', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('File uploaded successfully');
            } else {
                console.error('Upload failed:', await response.text());
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
       };

</script>
<template>
  <div>
    <input type="file" @change="handleFileChange"/>
    <button @click="upload">提交</button>
  </div>
</template> -->
  
