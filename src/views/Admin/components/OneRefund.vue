<!-- 退款 -->
<script lang="ts" setup>
    import type { refundinformation } from './RefundSection.vue';
    import axios from 'axios';

    const props=defineProps({
    onerefundinformation:{
        type:Object as () => refundinformation,
        default:null,
    },
    num:{
        type:Number,
        default:0,
    }
    })

    const refund_id=props.onerefundinformation.refund_id;

    const emit = defineEmits(['delete'])
    const deleteconfirm = () => {
        emit('delete', props.num);
    }

    const auditrefund = async (isagree:boolean)=>{
    try{
      const response = await axios.post('/api/refund/audit', {refund_id:refund_id,is_agreed:isagree})
      if(response.status === 200){
        deleteconfirm();
      }
    } catch (error) {
      console.log(error)
    }
  }

</script>

<template>
    <div calss="main">
        <div class="introduce">
            退款编号：{{ onerefundinformation.refund_id }}
        </div>
        <div class="introduce">
            商家：{{ onerefundinformation.seller_name }}
        </div>
        <div class="introduce">
            商家ID：{{ onerefundinformation.seller_id }}
        </div>
        <div class="introduce">
            退款人：{{ onerefundinformation.buyer_name }}
        </div>
        <div class="introduce">
            退款人ID：{{ onerefundinformation.buyer_id }}
        </div>
        <div class="introduce">
            商品名：{{ onerefundinformation.commodity }}
        </div>
        <div class="introduce">
            退款原因：{{ onerefundinformation.reason }}
        </div>
        <div class="introduce">
            申请时间：{{ onerefundinformation.time }}
        </div>
        <div @click="auditrefund(true)" class="button">
            同意退款
        </div>
        <div @click="auditrefund(false)" class="button">
            拒绝退款
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
    border: 2px solid black;
    background-color: rgb(220, 253, 253);
    transition: transform 0.3s ease;
    text-align: center;  
    margin-top: 1.5%;
    margin-left: 5%;
    display: inline-block;
    border-radius: 5px;
  }

  .button:hover{
    transform: scale(1.1);
  }
</style>