<template>
  <section>
    <section class="menu">
      <p>使用vue的transition和js实现动画</p>
      <section class="menu_title" @click="changeCurNav('button')">动画1</section>
      <transition @beforeEnter="beforeBottomEnter" @enter="bottomEnter" @leave="bottomLeave">
        <section class="menu_con" v-if="activeMenu=='button'">
          <p>蓝色按钮</p>
          <p>黄色按钮</p>
          <p>红色按钮</p>
        </section>
      </transition>
      <p>使用vue的transition组件和css max-height结合实现，不能动态设置变化时间；变化时间长时，下拉和收缩效果不同</p>
      <section class="menu_title" @click="changeCurNav('button1')">动画2</section>
      <transition name="top-menu">
        <section class="menu_con" v-if="activeMenu=='button1'">
          <p>蓝色按钮</p>
          <p>黄色按钮</p>
          <p>红色按钮</p>
        </section>
      </transition>
      <p>使用animate+max-height实现动画效果,可以实现出现时下拉，无法实现消失时收缩</p>

      <section class="menu_title" @click="changeCurNav('menu')">
        动画3
        <section v-if="activeMenu=='menu'" class="menu_con menu-right">
          <p>下拉菜单111111111111111111111111111</p>
          <p>绿色菜单</p>
          <p>红色菜单</p>
        </section>
      </section>

    </section>
  </section>
</template>
<script lang="ts">
  import Vue from 'vue';
  export default Vue.extend({
    data:function():{
      activeMenu:string,  //被激活菜单
      activeMenuDire:string   //被激活菜单弹出方向
    }{
      return {
        activeMenu:'',
        activeMenuDire:''
      }
    },
    methods:{
      changeCurNav:function(param:string) {
//            console.log('change current nav：'+param)
        if(param==this.activeMenu){
          this.activeMenu=''
          return
        }
        this.activeMenu=param
      },
//      动画1效果
      beforeBottomEnter:function(el:any){
        el.style.height=0;
        el.style.overflowY='hidden';
        el.style.transition='2s height';
      },
      bottomEnter:function(el:any){
        console.log('el.scrollHeight:'+el.scrollHeight)
        el.style.height=el.scrollHeight+'px'
      },
      bottomLeave:function(el:any){
        el.style.height=0;
      }
    }
  })
</script>
<style scoped lang="scss">
  /*菜单下拉和收回动画*/
  @keyframes hizrontal-mytoggle-active{
    from {
      max-height:0px;
    }
    to {
      max-height:1000px;
    }
  }
  @keyframes hizontal-mytoggle-passive{
    from {
      max-height:1000px;
    }
    to {
      max-height:0px;
    }
  }
  p{
    font-size: 14px;
    line-height: 24px;
  }
  .menu{
    /*border:1px black solid;*/
    width:400px;
    .menu_title{
      display: block;
      width:100px;
      padding:0px 10px;
      position: relative;
      font-size: 14px;
      /*border:1px black solid;*/
      background-color: rgb(120,180,240);
      line-height: 24px;
      margin-bottom:5px;
    }
    .menu_title:hover{
      cursor: pointer;
    }
    .menu_con{
      background-color: rgb(200,200,200);
      overflow-y: hidden;
    }
    /*动画2实现*/
    .top-menu{
      overflow-y: hidden;
    }
    .top-menu-enter,.top-menu-leave-to{
      overflow-y: hidden;
      max-height: 0px;
    }
    .top-menu-enter-active,.top-menu-leave-active{
      transition:max-height 2s;
    }
    .top-menu-leave-active{
      transition:all 2s ease-out;
    }
    .top-menu-enter-to,.top-menu-leave{
      overflow-y: hidden;
      max-height: 1000px;
    }
    /*动画3实现*/
    .menu-right{
      position:absolute;
      left:100%;
      top:0px;
      animation:hizrontal-mytoggle-active 3s;
    }
    .menu-right p{
      white-space: nowrap;
    }
  }

</style>
