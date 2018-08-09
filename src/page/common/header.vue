<template>
  <section class="head-container" :class="fixShow?'absoluteStyle':'fixedStyle'">
    <!--显示返回箭头-->
    <section class="head-back" v-if="goBack" @click="$router.go(-1)">
      <svg>
        <use xlink:href="#back"></use>
      </svg>
    </section>
    <!--显示关闭按钮-->
    <section class="head-close" v-if="close">
      <svg>
        <use xlink:href="#close"></use>
      </svg>
    </section>
    <!--显示搜索框-->
    <section class="head-search" v-if="doSearch">
      <input type="text" name="searchKey" v-model="searchKey"/>
      <button>搜索</button>
    </section>
    <!--显示左标签-->
    <section class="head-left-label" v-if="leftLabel">
      <span>{{leftLabel}}</span>
    </section>
    <!--显示通知和设置信息-->
    <section class="head-message" v-if="showSetting">
      <span>123456</span>
    </section>
    <!--显示登录信息-->
    <section class="head-login" v-if="showLogin">
      <span>123456</span>
      <button @click="toLogin">密码登录</button>
    </section>
    <slot name="search"></slot>
    <slot name="leftFun"></slot>
    <slot name="rightFun"></slot>
      <!--<svg v-else-if="leftFun=='back'">-->
      <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>-->
      <!--</svg>-->

      <!--<section v-else-if="leftFun=='close'">-->
      <!--<span>111</span>-->
      <!--<svg>-->
      <!--<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use>-->
      <!--</svg>-->
      <!--</section>-->
  </section>

</template>
<script>
  export default{
    data:function(){
      return {
        searchKey:'',
      }
    },
    props:{
      type:String,  //header类别 search,label,fun
      fixShow:Boolean,  //是否fix显示,
      goBack:Boolean,   //是否显示返回
      doSearch:Boolean,   //是否显示查询框
      leftLabel:String,     //左标签内容
      showSetting:Boolean,    //是否显示右侧个人消息通知
      showLogin:Boolean,      //是否显示右侧登录信息
      close:Boolean,        //是否显示关闭按钮
    },
    methods:{
      toLogin:function(){
        this.$router.push({path:'login'})
      }
    }
  }
</script>
<style lang="scss" scoped>
  button{
    height:1.5rem;
    background: none;
    color:rgb(255,255,255);
    padding-left:5px;
  }
  p,span,i,button{
    font-size: 1.2rem;
    color:rgb(255,255,255);
  }
.head-container{
  width:100%;
  height:3rem;
  left:0;
  top:0;
  z-index: 999;
  background-color: rgb(85,155,225);
  display:flex;
  flex-direction: row;
  align-items: center;
  padding:0px 10px;
}
.absoluteStyle{
  position: absolute;
  top:4rem;
}
.fixedStyle{
  position:fixed;
  top:0;
}

.head-back,.head-close{
  position:relative;
  width:2rem;
  height:2rem;
  svg{
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    width:1.5rem;
    height:1.5rem;
  }
}
//搜索框样式
.head-search{
  flex-basis:100%;
  display: flex;
  button{
    width:3rem;
  }
  input[type='text']{
    width:100%;
  }
}
  /*登录部分样式*/
  .head-login{
    padding-left: 1rem;
    flex:1;
    display: flex;
    justify-content: space-between;
  }
</style>
