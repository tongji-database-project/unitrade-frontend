<!-- 对我的投诉 -->
<script lang="ts" setup>
  import type { getcomplationinformation } from './getComplationSection.vue';
  import { ref } from 'vue';  
  import axios from 'axios';
  import 'element-plus/dist/index.css';
  import { ElMessage,ElMessageBox } from 'element-plus'

  const props=defineProps({
    onecomplationinformation:{
      type:Object as () => getcomplationinformation,
      default:null,
    },
    num:{
      type:Number,
      default:0,
    }
  })

  const complation_id=props.onecomplationinformation.complation_id;
  const have_appealed = ref(props.onecomplationinformation.have_appealed);
  const appealDialogVisible = ref(false);

  const appealForm = ref({
    reason: ''
  });

  const openAppealDialog = () => {
    appealDialogVisible.value = true;
  };

  const pushappeal = async () => {  
    try{
      const response = await axios.post('/api/pushappeal', {complation_id:complation_id,appeal_reason:appealForm.value.reason });
      if (response.status === 200) {
      ElMessage({
        type:"success",
        message: `提交申诉成功`
      })
      appealDialogVisible.value = false;
      have_appealed.value = true;
    } else {
      ElMessage({
        type:"error",
        message: `提交申诉失败，请重试`
      })
    }
  } catch (error) {
    console.error('提交申诉失败:', error);
    ElMessage({
      type:"error",
      message: `数据库连接失败`
    })
  }
  }
</script>

<template>
  <div class="main">
    <div class="introduce">
      投诉人：{{ onecomplationinformation.complainant }}
    </div>
    <div class="introduce">
      投诉原因：{{ onecomplationinformation.reason }}
    </div>
    <div class="introduce">
      投诉时间：{{ onecomplationinformation.time }}
    </div>
    <div v-if="!have_appealed" @click="openAppealDialog" class="button">
      提交申诉
    </div>
    <div v-else class="button appealed-button">
      已申诉
    </div>
    <el-dialog title="提交申诉" v-model="appealDialogVisible">
      <el-form :model="appealForm">
        <el-form-item label="申诉理由">
          <el-input type="textarea" v-model="appealForm.reason" placeholder="请输入申诉理由"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="appealDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="pushappeal">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
  .main{
    height: auto; 
    background-color:rgb(246, 246, 246);
    margin-bottom: 10px;
    border: 2px solid #a4a4a4b7;
    border-radius: 15px;
  }

  .introduce{
    font-weight: bold;  
    font-size: 15px; 
    margin-left: 5%;
    margin-top: 1.5%;
  }

  .button{
    width: 100px;
    height: 30px;
    border: 1.5px solid rgb(100, 100, 100);
    background-color: #e9e9e9;;
    color: rgb(0, 0, 0);
    transition: transform 0.3s ease;
    text-align: center;  
    margin-top: 1.5%;
    margin-left: 5%;
    display: inline-block;
  }

  .button:hover{
    transform: scale(1.1);
  }

  .appealed-button {
  cursor: not-allowed; /* 禁用鼠标点击效果 */
  background-color: #dfe2e5; /* 改变背景颜色 */
  pointer-events: none; /* 禁用所有交互 */
}
</style> 