<!-- 退款 -->
<script lang="ts" setup>
    import type { refundinformation } from './RefundSection.vue';

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

    const emit = defineEmits(['delete'])
    const deleteconfirm = () => {
        emit('delete', props.num);
    }

    function refundjudge(isagree:boolean){
        deleteconfirm();
    }

</script>

<template>
    <div calss="main">
        <div class="introduce">
            商家：{{ onerefundinformation.seller }}
        </div>
        <div class="introduce">
            买家：{{ onerefundinformation.buyer }}
        </div>
        <div class="introduce">
            商品名：{{ onerefundinformation.commodity }}
        </div>
        <div class="introduce">
            申请时间：{{ onerefundinformation.time }}
        </div>
        <div @click="refundjudge(true)" class="button">
            同意退款
        </div>
        <div @click="refundjudge(false)" class="button">
            拒绝退款
        </div>
    </div>
</template>

<style scoped>
 .main{
    height: 250px; 
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