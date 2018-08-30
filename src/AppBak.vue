<template>
<section class="appbak">
<svg-icon></svg-icon>
    <!--<router-view class="app_content" v-if="!$route.meta.keepAlive">-->
  <!--<router-view class="app_content"></router-view>-->
    <!--</router-view>-->
  <keep-alive>
    <router-view class="app_content" v-if="$route.meta.keepAlive==true"></router-view>
  </keep-alive>
  <router-view class="app_content" v-if="!$route.meta.keepAlive"></router-view>
</section>
</template>
<script>
  import svgIcon from './page/common/svg'
export default{
  components:{
    svgIcon
  }
}
</script>
<style>

  html,body,h1,h2,h3,h4,h5,h6,p,span,section,figure,div,ul,li,ol,input,img,form,secion,svg,sub,sup,button,input{
    margin:0px;
    padding:0px;
    box-sizing: border-box;
    color:rgb(0,0,0);
  }

  html,body,section,div{

  }
  ul,li{
    list-style: none;
  }
  input,button{
    outline:none;
    border:none;
  }
  svg{
    display: inline-block;
  }
  a,p,span{
    text-decoration: none;
  }
  section{
    display: block;
  }
  .app_content,.appbak{
    width:100%;
    height:100%;
  }
</style>
