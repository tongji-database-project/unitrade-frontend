
<script lang="ts" setup>
import { getImageUrl } from '@/utils/utils'
import type{ followinformation } from './MyfollowLayout.vue';
import { denyfollow } from '@/apis/user';
import 'element-plus/dist/index.css';

const props=defineProps({
    onefollowinformation:{
      type:Object as () => followinformation,
      default:null,
    },
    num:{
      type:Number,
      default:0,
    }
})
const emit = defineEmits(['delete'])
const deleteconfirm = () => {
  emit('delete', props.num)
}
const deny_follow=async()=>{
    const response=await denyfollow(props.onefollowinformation.seller_id)
    if(response===200){
        deleteconfirm()
    }
}
</script>

<template>
  <div class="main">
    <div class="follow-info">
        <div class="introduce">
           <el-avatar :size="60" :src="getImageUrl(onefollowinformation.seller_avator)"></el-avatar>
        </div>
        <div class="introduce">
            <p>关注商家id:{{ onefollowinformation.seller_id }}</p>
        </div>
        <div class="introduce">
            <p>关注商家名称：{{ onefollowinformation.seller_name }}</p>
        </div>
    </div>
    <div class="button">
        <button @click="deny_follow">取消关注</button>
    </div>
  </div>
</template>

<style scoped>
  .main{
    
    height: auto; 
    background-color:rgb(246, 246, 246);
    margin-bottom: 10px;
    border: 2px solid #a4a4a4b7;
    border-radius: 15px;
    display: flex; /* 启用 Flexbox 布局 */
    justify-content: space-around; /* 在主轴上均匀分布子元素 */
    align-items: center; /* 在交叉轴上居中对齐子元素 */
  }

  .introduce{
    font-weight: bold;  
    font-size: 15px; 
    margin-left: 5%;
    margin-top: 1.5%;
  }
  .follow-info{
    width:70%;
  }

  .button{
    width:30%;
  }
</style> 