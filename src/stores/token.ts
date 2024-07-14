import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref("")
    const updatetoken=(newtoken:string)=>{
      token.value=newtoken
    }
    const deletetoken=()=>{
      token.value=""
    }
    return { token ,updatetoken, deletetoken}
  },
  {
    persist: true,
  },
)