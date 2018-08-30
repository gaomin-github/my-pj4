<template>
  <section>
    <page-top :goBack="true"></page-top>
    <section class="user-container">
      <section class="user-content">

        <h1>用户账户管理界面，待开发</h1>
      </section>
      <section class="exit">
        <button @click="exitUser">
          退出账号
        </button>
      </section>
    </section>
    <!--<page-top :goBack="true" :leftLabel="账户和安全"/>-->
  </section>
</template>
<script>
  import {mapMutations} from 'vuex'
  import pageTop from '@/page/common/header'
  export default {
    name:'userinfo',
    data:function(){
      return{
      }
    },
    components:{
      pageTop
    },

    methods:{
      ...mapMutations(['removeUserInfo']),
      exitUser(){
//        this.$store.c
        this.removeUserInfo()
        this.$router.go(-1)
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/style/common';
.user-container{
  height:100%;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
}
  .user-content{
    flex: 1;
  }
  .exit{
    height:3rem;
    vertical-align: middle;
    button{
      vertical-align: middle;
      width:90%;
      background-color: $blue;
      height:2rem;
      margin-top: .5rem;
      margin-left: 5%;
      border-radius: .5rem;
      color: rgb(255,255,255);
    }
  }
</style>
