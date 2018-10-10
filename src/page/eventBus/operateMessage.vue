<template>
  <section class="wp-container">
    <button @click="updateMg">确定</button>
    <input class="msg" type="text" v-model="newMessage"/>
  </section>
</template>
<script>
  import {eventBus} from '@/page/eventBus/eventBus'
  export default{
    data:function(){
      return {
        newMessage:'',
      }
    },
    methods:{
      updateMg(){
        console.log('this.newMessage：'+this.newMessage)
        eventBus.$emit('update-msg',this.newMessage)
//        this.$router.push({path:'displaymessage'})
      }
    }
  }
</script>
<style lang="scss" scoped>
  .msg{
    border:1px black solid;
  }
</style>
