<script lang="ts" setup>
import { ref } from 'vue';

let sellerinformation=ref({
  picture:'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
  name:'名字',
  credibility:100,
  salesnum:0,
})
</script>

<template>
  <div class="container">
        <div class="left">
            <img :src="sellerinformation.picture" alt="Image">
            <div>
                <p id="name">{{ sellerinformation.name }}</p>
                <p id="credibility">信誉度：{{ sellerinformation.credibility }}</p>
                <p id="salesnum">售卖次数：{{ sellerinformation.salesnum }}</p>
            </div>
        </div>
        <div class="right">
            <div>
              <RouterLink to="/chat">联系卖家</RouterLink>
            </div>
            <div>
              <RouterLink to="/complaintsubmission">投诉卖家</RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
  width: 80%;
  height: 200px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  display: flex;
  align-items: center;
}
.left img {
  margin-right: 25px;
  height: 175px;
  width: 175px;
}
#name {
  font-size: 50px;
  font-weight: bold;
  margin-left: 20px;
}
#credibility {
  font-size: 30px;
  font-weight: bold;
  margin-left: 20px;
}
#salesnum {
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  color:gray;
}
.right {
  position: relative;
}
.right div {
  display: inline;
  margin-right: 20px;
  bottom: 0;
  right: 0;
}
</style>