import { computed, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

export const useCountDown = () => {
  // 1. 响应式的数据
  let timer: any = null;
  const time = ref(0); // 剩余时间（秒）
  const router = useRouter(); // 获取 Vue Router 实例
  
  // 格式化时间为 xx分xx秒
  const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'));
  
  // 2. 开启倒计时的函数
  const start = (currentTime: number) => {
    // 初始化时间
    time.value = currentTime;
    
    // 如果有正在运行的定时器，先清除
    if (timer) clearInterval(timer);
    
    // 开始新的倒计时
    timer = setInterval(() => {
      if (time.value > 0) {
        time.value--;
      } else {
        // 倒计时结束，清除定时器并跳转到首页
        clearInterval(timer);
        timer = null;
        router.push('/'); // 跳转到首页
      }
    }, 1000);
  };
  
  // 组件销毁时清除定时器
  onUnmounted(() => {
    if (timer) {
      clearInterval(timer);
    }
  });
  
  return {
    formatTime,
    start
  };
};
