<template>
  <section>
    <keep-alive>
      <component v-bind:is="currentNav"></component>
    </keep-alive>
    <!--<com-shop></com-shop>-->
    <page-foot v-on:changeNav="changeNav"></page-foot>
    {{test}}
  </section>
</template>
<script>
  import pageFoot from '@/page/common/footer'
  import comshop from '@/page/goods/comShop'
  import search from '@/page/common/search'
  import mine from '@/page/user/mine'
//  import comShop from '@/page/goods/comShop'
  export default{
    data:function(){
      return{
        currentNav:'comshop'
      }
    },
    components:{
      pageFoot,
      comshop,
      search,
      mine
    },
    created:function(){
//      console.log('created===========')
//      console.log('home meta:'+this.$route.meta.keepAlive)
    },
    activated:function(){
//      console.log('activated===========')
    },
    deactivated:function(){
//      console.log('deactivated===========')
    },
    mounted:function(){
//      console.log('mounted===========')
//      console.log('route param:'+this.$route.params.currentNav)
//      if(this.$route.params.currentNav){
//        this.currentNav=this.$route.currentNav
//      }
    },
    computed:{
      test:function(){
//        console.log('computed===========')
      }
    },
    methods:{
      changeNav(param){
        this.currentNav=param
      }
    }
  }

</script>
<style scoped>

</style>
