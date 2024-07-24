import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref("")
    const logged_in = computed(() => !(token.value === ""))
    const updatetoken=(newtoken:string)=>{
      token.value=newtoken
    }
    const deletetoken=()=>{
      token.value=""
    }
    return { token, logged_in, updatetoken, deletetoken}
  },
  {
    persist: true,
  },
)
