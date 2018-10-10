<template>
  <section class="display-msg">
    <button @click="updateMessage">修改信息</button>
    <h1>{{message}}</h1>
  </section>
</template>
<script>
  import {eventBus} from '@/page/eventBus/eventBus.js'
  export default{
    data:function(){
      return {
        message:'999'
      }
    },
    created:function(){

    },
    mounted:function(){
      console.log('this.message1:'+this.message)
      eventBus.$on('update-msg',(newMessage)=>{
        console.log('newMessage:'+newMessage)
        this.message=newMessage
        console.log('this.message2:'+this.message)
      })
    },
    methods:{
      updateMessage(){
//        this.$router.push('operatemessage')
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
