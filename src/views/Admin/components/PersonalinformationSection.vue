<script lang="ts" setup>
  import { ref, onMounted } from 'vue';  
  import { useRouter } from 'vue-router'; 
  import { useTokenStore } from '@/stores/token'
  import { getAdminInfo } from '@/apis/user'
  import { ElMessageBox } from 'element-plus'

  const router = useRouter();
  const TokenStore = useTokenStore()

  let id=ref("1");
  let name=ref("管理员1");
  let level=ref(1);
  let isloading=ref(true);

  onMounted(async () => {  
    const admininfo = await getAdminInfo();
    id.value=admininfo.data.admin_id;
    name.value=admininfo.data.admin_name;
    level.value=admininfo.data.admin_level?1:0;
    isloading.value=false;
  });

  function quit(){
    TokenStore.deletetoken();
    router.push('/adminlogin');
  }
</script>

<template>
  <div class="main">
    <div class="spinner" v-if="isloading"></div>
    <div class="content" v-else>
      <div class="information">
        ID:{{ id }}
      </div>
      <div class="information">
        用户名：{{ name }}
      </div>
      <div class="information">
        权限等级：{{ level }}
      </div>
      <div class="quit" v-on:click="quit">
        退出登录
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main{
    position: relative;
    width: 100%;
  }

  .content{
    height: 500px;
    background-color:rgb(246, 245, 245);
    border: 3px solid #515151;
    border-radius: 20px;
  }

  .information{
    font-size: 30px; 
    font-weight: bold;
    margin-top: 60px;
    margin-left: 100px;
  }

  .quit{
    color: #6c6b6b;
    font-size: 20px; 
    font-weight: bold;
    margin-top: 60px;
    margin-left: 120px;
    width: 150px;
    border: 5px solid #9e9e9e;
    border-radius: 5px;
    display: flex;  
    justify-content: center; 
    align-items: center;
    transition: transform 0.2s ease;
  }

  .quit:hover{
    transform: scale(1.1);
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top: 4px solid #3498db;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
    position: absolute;
    top: 100px;  
    left: 50%; 
    transform: translateX(-50%);
  }
</style> 