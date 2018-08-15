<template>
  <section>
    <!--<component :is="currentNav"></component>-->
    <com-shop></com-shop>
    <page-foot></page-foot>
  </section>
</template>
<script>
  import pageFoot from '@/page/common/footer'
  import comShop from '@/page/goods/comShop'
  export default{
    data:function(){
      return{
        currentNav:'comShop'
      }
    },
    components:{
      pageFoot,
      comShop
    },
    methods:{
     test1(){
    console.log('33333333')
  }
    }
  }

</script>
<style scoped>

.home{
  width:100%;
}
</style>
