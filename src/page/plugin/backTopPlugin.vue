<template>
<section v-if="showBackTop" class="back-top">
  <svg>
    <use xlink:href="#back-top"></use>
  </svg>
</section>
</template>
<script>
  export default {
    data:function(){
      return{
        showBackTop:false,
      }
    },
    mounted:function(){
      document.addEventListener('scroll',()=>{
        let scrollY=document.documentElement.scrollTop||document.body.scrollTop
        let clientY=document.body.clientHeight;
//        console.log('scrollY:'+scrollY)
//        console.log('clientY:'+clientY)
        if(scrollY>clientY){
          this.showBackTop=true
        }else{
          this.showBackTop=false
        }
      })
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/style/common';
  .back-top{
    position:fixed;
    right:.5rem;
    bottom:4rem;
    z-index:2;
    width:2rem;
    height:2rem;
    svg{
      width:90%;
      height:90%;
      transform:rotate(90deg);
    }
    border-radius:1rem;
    background: $blue;
  }
</style>
