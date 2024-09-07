<script setup lang="ts">
// 页面头部导航栏，包含用户头像、购物车、商品发布
// 如果需要商品分类可以再往上加
import HeaderProfile from './HeaderProfile.vue'
import { computed, ref, watch, onMounted } from 'vue'
import { getImageUrl } from '@/utils/utils'
import { useTokenStore } from '@/stores/token'
import { getUserInfo } from '@/apis/user'
import { getSpecialProductID } from '@/apis/home'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { getSpecialStoreID } from '@/apis/home'

// 追踪登录状态
const logged_in = computed(() => useTokenStore().logged_in)

const user_avatar = ref('')

const input = ref('')

const selectMethod = ref([])

const judge = ref(0)

const router = useRouter()

const selectOptions = [
  {
    value: 'categoryProduct',
    label: '商品'
  },
  {
    value: 'categoryStore',
    label: '店铺'
  }
]

const props = {
  expandTrigger: 'hover' as const
}

// 用于加载用户头像的函数
const load_avatar = async () => {
  if (logged_in.value) {
    const info = await getUserInfo()
    user_avatar.value = getImageUrl(info.avatar)
  } else {
    user_avatar.value = ''
  }
}

// 登录状态变化时加载用户头像
watch(logged_in, () => {
  load_avatar()
})

// 组件挂载时加载用户头像
onMounted(() => {
  load_avatar()
})

const searchProducts = async () => {
  console.log(input.value)
  if (judge.value === 0) {
    await getSpecialProductID(input.value)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          // router.push(`homeSearch`)
          router.push({
            path: 'homeSearch',
            query: {
              myArray: response.data // 传递数组，长度可以是任意的
            }
          })
        } else if (response.status === 400) {
          ElMessage({
            type: 'warning',
            message: `无法获取用户信息状态码：${response.status}`
          })
        }
      })
      .catch((error) => {
        ElMessage({
          type: 'warning',
          message: `无法找到该商品，请重新输入`
        })
      })
  } else {
    await getSpecialStoreID(input.value)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          // router.push(`homeSearch`)
          router.push({
            path: 'homeSearchStore',
            query: {
              myArray: response.data // 传递数组，长度可以是任意的
            }
          })
        } else if (response.status === 400) {
          ElMessage({
            type: 'warning',
            message: `无法获取用户信息状态码：${response.status}`
          })
        }
      })
      .catch((error) => {
        ElMessage({
          type: 'warning',
          message: `无法找到该店铺，请重新输入`
        })
      })
  }
}

const selectChange = (value: any[]) => {
  if (value[0] === 'categoryProduct') {
    judge.value = 0
    console.log('商品')
  } else if (value[0] === 'categoryStore') {
    judge.value = 1
    console.log('店铺')
  }
}
</script>

<template>
  <div class="top-nav">
    <el-space class="container" spacer="|">
      <RouterLink class="logo" to="/">
        <img alt="Vue logo" class="logo" :src="getImageUrl('logo.png')" width="100" height="70" />
      </RouterLink>
      <el-cascader
        v-model="selectMethod"
        :options="selectOptions"
        :props="props"
        @change="selectChange"
        class="select-sort"
        style="width: 72px"
      />
      <div class="input-box">
        <el-input v-model="input" placeholder="搜索商品..." class="search-input"></el-input>
        <el-button type="primary" @click="searchProducts" class="search-button">搜索</el-button>
      </div>
    </el-space>
    <el-space class="container" v-if="logged_in" spacer="|">
      <div class="user-cart">
        <RouterLink to="/cart">购物车</RouterLink>
      </div>
      <div class="user-shelf">
        <RouterLink to="/onsale">我的发布</RouterLink>
      </div>
      <div class="header-avatar">
        <!-- TODO: 为此处路由的 URL 添加 id -->
        <RouterLink to="/profile/idtest">
          <!-- TODO: 用户头像示例，之后图片的 src 用服务器的图片对应的 URL 进行替换 -->
          <el-avatar :size="40" :src="user_avatar"></el-avatar>
        </RouterLink>
        <div class="header-profile">
          <HeaderProfile />
        </div>
      </div>
    </el-space>
    <el-space class="container" v-else spacer="|">
      <div class="login">
        <RouterLink to="/login">登录</RouterLink>
      </div>
      <div class="enroll">
        <RouterLink to="/login">注册</RouterLink>
      </div>
    </el-space>
  </div>
</template>

<style scoped>
.top-nav {
  width: 100%;
  height: 78px;
  display: flex;
  justify-content: space-between;
}

.container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0.3rem;

  .input-box {
    display: flex;
  }
}

.container div {
  padding: 1rem;
}

.header-profile {
  display: none;
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 200;
}

.header-avatar:hover .header-profile {
  transition: all 0.3s linear;
  display: flex;
}

.search-button{
  margin-top: 17px;
}

.search-input{
  margin-left: 1px;
}
</style>
