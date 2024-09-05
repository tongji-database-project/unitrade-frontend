<script setup lang="ts">
import { ref , computed} from 'vue'
import { useTokenStore } from '@/stores/token'
import EditAvatorLayout from './components/EditAvatorLayout.vue'
import { useRouter } from 'vue-router'
import EditInfoLayout from './components/EditInfoLayout.vue'
import EditPasswordLayout from './components/EditPasswordLayout.vue'
import CancelUserLayou from './components/CancelUserLayou.vue'
const categories = [
  {
    name: '首页',
    path: '/'
  },
  {
    name: '我的购物车',
    path: '/cart'
  },
  {
    name: '我的订单',
    path: '/order'
  },
  {
    name: '我的主页',
    path: '/profile/:id' 
  },
  {
    name: '我的消息',
    path: '/message'
  },
  {
    name: '我的申请',
    path: '/myapplication'
  },
  {
    name: '个人中心',
    path: '/account'
  }
]
let contentclass = ref('Editinfo')
let is_quit=ref(false)
function chooseInfo() {
  contentclass.value = 'Editinfo'
}
function chooseAvator() {
  contentclass.value = 'EditAvator'
}
function choosePassword() {
  contentclass.value = 'EditPassword'
}
function quit(){
  is_quit.value=true;
}
const confirm_quit=async()=>{
  TokenStore.deletetoken()
  router.push('/')
}
function deny_quit(){
  is_quit.value=false;

}
function cancel(){
  contentclass.value='CancelUser'
}
const router = useRouter()
const TokenStore = useTokenStore()
</script>
<template>
  <div class="container">
    <div class="my-navigator">
      <div class="header-category" v-for="({ name, path }, index) in categories" :key="index">
        <RouterLink :to="path">{{ name }}</RouterLink>
      </div>
    </div>
    <div class="editform">
      <div class="mode">
        <div v-if="contentclass == 'Editinfo'" class="choose">
          <p @click="chooseInfo">基本信息</p>
        </div>
        <div v-else class="not_choose">
          <p @click="chooseInfo">基本信息</p>
        </div>
        <div v-if="contentclass == 'EditAvator'" class="choose">
          <p @click="chooseAvator">头像修改</p>
        </div>
        <div v-else class="not_choose">
          <p @click="chooseAvator">头像修改</p>
        </div>
        <div v-if="contentclass == 'EditPassword'" class="choose">
          <p @click="choosePassword">密码修改</p>
        </div>
        <div v-else class="not_choose">
          <p @click="choosePassword">密码修改</p>
        </div>
        <div v-if="contentclass=='CancelUser'"class="choose">
          <p @click="cancel">注销账户</p>
        </div>
        <div v-else class="not_choose">
          <p @click="cancel">注销账户</p>
        </div>
        <div class="not_choose">
          <p @click="quit">退出登录</p>
        </div>
      </div>
      <div class="content">
        <EditInfoLayout v-if="contentclass == 'Editinfo'" />
        <EditAvatorLayout v-else-if="contentclass == 'EditAvator'" />
        <EditPasswordLayout v-else-if="contentclass == 'EditPassword'" />
        <CancelUserLayou v-else-if="contentclass=='CancelUser'"/>
      </div>
      <transition name="fade">
      <div v-if="is_quit" class="modal-overlay" >
        <div class="modal-content" @click.stop>
          <div calss="remind-info">
            <p>确定要退出登录吗？</p>
            <div class="choices">
              <button @click="confirm_quit">确定</button>
              <button @click="deny_quit">取消</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    </div>
  </div>
</template>

<style>
.container {
  display: flex; /* 使用弹性布局 */
  justify-content: space-between; /* 让子元素在容器内水平分布 */
}
.my-navigator {
  width: 25%;
  height: 400px;
  align-items: center; /* 垂直居中对齐 */
  border: 2px solid #ccc;
  border-radius: 10px; /* 设置所有四个角的圆角半径为 10px */
  padding: 30px;
}
.editform {
  width: 100%;
  background-color: rgb(241, 238, 238);
}
.mode {
  height: 10%;
  margin-top: 10px;
  margin-left: 20px;
  gap: 20px;
  display: flex;
  flex-direction: row;
}
.choose {
  color: red;
  text-decoration: underline;
}
.not_choose {
  color: black;
}
.choose:hover {
  cursor: pointer;
}
.not_choose:hover {
  cursor: pointer;
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
.choices{
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
</style>
