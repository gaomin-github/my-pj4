<template>
  <transition name="load">
    <section class="load-container">
      <section class="img-contaienr" :style="{backgroundPositionY:(-(positionY*3)+'rem')}">
      </section>
    </section>
  </transition>
</template>
<script>
  export default{
    data:function(){
      return {
        positionY:0,
        intervalId:''
      }
    },
    mounted:function(){
      let obj=this
      this.intervalId=setInterval(()=>{
        obj.positionY++
      },1000)
    },
    beforeDestroy:function(){
      clearInterval(this.intervalId)
    }
  }
</script>
<style scoped lang="scss">
  @keyframes loadact{
    0%{
      transform:translateY(0%);
    }
    50%{
      transform:translateY(-3rem);
    }
    100%{
      transform:translateY(0%);
    }
  }
  .load-container{
    position:fixed;
    z-index: 2;
    top:50%;
    width:100%;
    text-align: center;
    .img-contaienr{
      animation:loadact 1s infinite;
      display: inline-block;
      width:3rem;
      height:3rem;
      background-image: url("/static/imgs/icon_loading.png");
      background-size:3rem auto;
    }
  }

  .load-enter,.load-leave-to{
    opacity:0;
  }
  .load-enter-active,.load-leave-active{
    transition:all .3s ease;
  }
</style>
