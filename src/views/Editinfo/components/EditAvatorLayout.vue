<script setup lang="ts">
import {ref} from'vue'
import axios from "axios";


let submit=ref(false);
let transit=ref(false);
let result=ref('');
let file = ref<File | null>(null);
let imageUrl = ref<string | null>(null);
//   const imageUrl = ref<string | null>(null);

// const handleFileChange = (event: Event) => {
//   const input = event.target as HTMLInputElement;
//   const file = input.files ? input.files[0] : null;

//   if (file && file.type.startsWith('image/')) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       imageUrl.value = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   } else {
//     alert('Please select a valid image file.');
//   }
// };
function handleFileChange(event:Event){
  const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const selectedFile = input.files[0];
        if (selectedFile.type.startsWith('image/')) {
          const reader=new FileReader();
          reader.onload=(e)=>{
            imageUrl.value=e.target?.result as string
            console.log(imageUrl.value);
          }
          reader.readAsDataURL(selectedFile);
        } else {
          alert('请选择一个有效的图片文件');
        }
      }
}
function close(){
  submit.value=false;
}
const submitEdit =async()=>{
  try{
    submit.value=true;
    const response= await axios.post('/api/editAvator',{NewAvator:imageUrl});
        if(response.status===200){
            transit.value=false;
            result.value="成功";
        }
  }catch(error){
    console.log(error);
    transit.value=false;
    result.value="失败";
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
            <transition name="fade">
              <div v-if="submit" class="modal-overlay">
                <div class="modal-content" @click.stop>
                  <div v-if="transit">
                    <div class="centre">
                      <div class="spinner"></div>
                    </div>
                    <p>正在提交修改，请勿关闭当前页面</p>
                  </div>
                  <div v-else>
                    <div v-if="result=='成功'">
                      <p>修改成功</p>
                      <button @click="close">关闭</button>
                  </div>
                  <div v-else-if="result=='失败'">
                      <p>修改失败，请稍后重试</p>
                      <button @click="close">关闭</button>
                  </div>
                </div>
              </div>
           </div>
            </transition>
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
  