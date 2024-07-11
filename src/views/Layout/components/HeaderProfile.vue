<template>
  <el-card>
    <div class="profile-card">
      <p>鼠标放在用户头像后出现的悬浮窗口</p>
      <!-- 具体布局待定，先放一些必要的内容 -->
      <div>
        <RouterLink to="/login">登录</RouterLink>
      </div>
      <div>
        <RouterLink to="/account">个人中心</RouterLink>
      </div>
      <div>
        <RouterLink to="/favorite">我的收藏</RouterLink>
      </div>
      <div>
        <RouterLink to="/order">我的订单</RouterLink>
      </div>
      <div>
        <RouterLink to="/message">我的消息</RouterLink>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
.profile-card {
  width: 10rem;
}
</style>
