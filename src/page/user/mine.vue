<template>
  <section>
    <page-top :goBack="true"></page-top>
    <section class="user-info" @click="nextPage">
      <section class="user-logo">
        <svg>
          <use xlink:href="#user"></use>
        </svg>
      </section>
      <section class="user-title" v-if="!this.$store.state.ifLogin">
        <h4>立即登录</h4>
        <p>登陆后可以获得更多特权</p>
      </section>
      <section class="user-title" v-else>
        <h4>{{this.$store.state.userInfo.userId}}</h4>
        <p>{{this.$store.state.userInfo.userName}}</p>
      </section>
      <section class="user-login">
        <svg>
          <use xlink:href="#back"></use>
        </svg>
      </section>
    </section>
  </section>
</template>
<script>
  import {mapState,mapMutations} from 'vuex'
  import pageTop from '@/page/common/header'
  export default {
    name:'mine',
    data:function(){
      return{
      }
    },
    created:function(){
      console.log('if login:'+this.$store.state.userInfo)
    },
    mounted:function(){
      console.log('mounted===========')
      this.initUserInfo()
    },
    activated:function(){
      this.initUserInfo()
      console.log('activated')
      console.log(this.$store.state.userInfo)
      console.log(this.$store.state.ifLogin)
    },
    components:{
      pageTop
    },

    methods:{
      ...mapMutations(['initUserInfo']),
      nextPage(){
        if(this.$store.state.ifLogin){
          console.log('11111')
          this.$router.push({path:'/user'})
        }else{
          console.log('222222')
          this.$router.push({path:'/login'})
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/style/common';
.user-info{
  height:10rem;
  padding-top: 3rem;
  border: 1px black solid;
  display: flex;
  align-items: center;
  background: $blue;
  flex-shrink: 0;
  .user-logo{
    width:5rem;
    height:5rem;
    text-align: center;
    border: 1px rgb(255,255,255) solid;
    border-radius: 2.5rem;
    margin-left: 1rem;
    margin-right: 1rem;
    background: rgb(255,255,255);
    svg{
      width:3rem;
      height:3rem;
      margin-top: 1rem;
      vertical-align: middle;
    }
  }
  .user-title{
    flex: 1;
    h4{
      font-size: 1.2rem;
      line-height: 2rem;
      color:rgb(255,255,255);
    }
    p{
      font-size: .8rem;
      line-height: 1.5rem;
      color:rgb(255,255,255);
    }
  }
  .user-login{
    width:3rem;
    svg{
      height:1.5rem;
      width:1.5rem;
      transform:rotate(180deg);
    }
  }
}
</style>
