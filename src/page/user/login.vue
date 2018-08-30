<template>
  <section class="login-container">
      <page-top :goBack="true" :showLogin="true">
        <section slot="rightFun" class="right-fun" v-if="loginWay=='loginByPhone'">
          <span>登录</span>
          <button @click="changeLogin">密码登录</button>
        </section>
        <section slot="rightFun" class="right-fun" v-else>
          <span>登录</span>
          <button @click="changeLogin">手机登录</button>
        </section>
      </page-top>
    <form id="login">
      <section v-show="loginWay=='loginByPwd'" class="loginByPwd">
        <section class="username">
          <input type="text" name="username" id="username" v-model="username" placeholder="账号" autocomplete="off"/>
        </section>
        <section class="password">
          <input type="password" name="pwd" id="pwd" v-model="pwd" placeholder="密码" autocomplete="off"/>
          <div class="pwd-toggle" :class="showPwd?'toggle-show-on':'toggle-show-off'" @click="changeToggle">
            <span class="pwd-toggle-label">abc...</span>
            <transition name="on">
              <span :class="showPwd?'toggle-show-btn':null" class="pwd-toggle-off"></span>
            </transition>
            <transition name="off">
              <span :class="showPwd?null:'toggle-show-btn'" class="pwd-toggle-on"></span>
            </transition>
          </div>
        </section>
        <section class="vercode">
          <input type="text" name="vercode" id="vercode" :model="vercode" placeholder="验证码" autocomplete="off"/>
          <img src="../../../static/imgs/vercode.png"/>
          <div class="vercode-change">
            <p>看不清换一张</p>
          </div>
        </section>
        <p class="login-tips">温馨提示：未注册过的账号，登录时将自动注册</p>
        <p class="login-tips">注册过的用户可凭账号密码登录</p>
      </section>
      <section v-show="loginWay=='loginByPhone'" class="loginByPhone">
        <section class="phonenum">
          <input type="text" name="phonenum" id="phonenum"   @input="phoneInput($event)" @keydown="phoneDown($event)" v-model="phonenum" placeholder="手机号" maxlength="13" autocomplete="off"/>
          <i class="glyphicon glyphicon"></i>
          <input v-if="ifRightPhone" type="button" class="phone-num-btn phone-num-btn-active"  @click="getPhoneCode" value="获取验证码"/>
          <input v-else type="button" class="phone-num-btn" disabled value="获取验证码"/>
        </section>
        <input class="phonecode" type="text" name="phonecode" v-model="phonecode" placeholder="验证码" maxlength="6" autocomplete="off"/>
      </section>
      <input type="button" class="login-submit" value="登录" @click="userLogin"/>
    </form>
    <section class="load-container" v-if="ifModal">
      <modal>
        <message v-on:hideModal="hideModal">
          <h4>登录异常</h4>
        </message>
      </modal>
    </section>
  </section>
</template>
<script>
  import apiData from '@/config/getApiData'
  import pageTop from '@/page/common/header'
  import modal from '@/page/common/modal'
  import message from '@/page/common/message'
  export default {
    data:function(){
      return{
        username:null,
        pwd:null,
        vercode:null,   //图片验证码
        phonenum:'',  //手机号码
        phonenumold:'',
        phonecode:'',   //手机验证码
        phonecodeold:'',
        showPwd:false,
        loginWay:'loginByPwd',
        ifRightPhone:false,   //手机号码是否输入正确
        ifModal:false,        //是否显示提示信息
      }
    },
    components:{
      pageTop,
      modal,
      message
    },
    methods:{
      changeLogin:function(){
        this.loginWay=this.loginWay=='loginByPhone'?'loginByPwd':'loginByPhone'
      },
      changeToggle:function(){
        this.showPwd=!this.showPwd
      },
      phoneInput:function($event){
//        console.log('phonenumold2:'+this.phonenumold)
        if($event.inputType=='insertCompositionText'||$event.inputType==null){
          //中文输入时
          this.phonenum=this.phonenumold
        }else if($event.inputType=='deleteContentBackward'){
          //删除时
          if(this.phonenum.length==3||this.phonenum.length==8){
            this.phonenum=this.phonenum.substring(0,this.phonenum.length-1)
          }
        }else if($event.data.search(/[0-9]/)<0){
          //输入非数字试
          this.phonenum=this.phonenumold
        }
        if(this.phonenum.length==3||this.phonenum.length==8){
          this.phonenum=this.phonenum+' '
        }
        if(this.phonenum.length==13){
          let o=this.phonenum.replace(/\s/g,'')
          if(o.match(/^[1][3,4,5,7,8][0-9]{9}$/)){
            this.ifRightPhone=true
          }
        }else{
          this.ifRightPhone=false
        }
//        console.log('phonenum:'+this.phonenum)
      },
      phoneDown:function($event){
        this.phonenumold=this.phonenum
//        console.log($event.key)
//        console.log('phonenumold1:'+this.phonenumold)
      },
      userLogin:async function(){
        let userInfo=new Object()
        if(this.loginWay=="loginByPwd"){
          userInfo={
            userName:this.username,
            pwd:this.pwd,
            vercode:this.vercode
          }
        }else if(this.loginWay=="loginByPhone"){
          userInfo={
            phonenum:this.phonenum,
            phonecode:this.phonecode,
          }
        }
        let loginResult=await apiData.login(this,userInfo)
        if(!loginResult.ifLogin){
          this.displayModal()
          return
        }
        userInfo=Object.assign(userInfo,loginResult)
        this.$store.commit('addUserInfo',userInfo)
        this.$router.go(-1)
      },

      getPhoneCode:function(){
        console.log('00000000')
      },
      displayModal:function(){
        this.ifModal=true
      },
      hideModal:function(){
        this.ifModal=false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .right-fun{
    width:100%;
    margin-left:1rem;
    display: flex;
    justify-content:space-between;
  }
  #login{
    background-color: rgb(246,245,244);
    text-align: left;
    padding-top:4.5rem;
  }
  .username,.password,.vercode,.phonenum,.phonecode{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding-right: 1.5rem;
    margin-top:.1rem;
    background-color: rgb(255,255,255);
    border-top:.1rem rgb(230,230,230) solid;
  }
  #username,#pwd,#vercode{
    margin-left: 1rem;
    width:12rem;
    height:3rem;
    border:none;
  }
  .pwd-toggle{
    height:1rem;
    width:3.5rem;
    border-radius:1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 0;
  }
  .pwd-toggle-label{
    position: absolute;
    z-index: 1;
    color:rgb(255,255,255);
    line-height: 1rem;
    margin-left: .5rem;
  }
  .pwd-toggle-off,.pwd-toggle-on{
    display:inline-block;
    width:2rem;
    height:2rem;
    border-radius: 1rem;
    background-color: rgb(242,241,239);
    z-index: 2;
  }
  .toggle-show-on{
    background-color:rgb(24,143,230);
  }
  .toggle-show-off{
    background-color: rgb(208,205,199);
  }
  .toggle-show-btn{
    opacity:0;
  }
  .off-enter,.on-enter{
    opacity:0;
  }
  .off-leave,.on-leave{
    opacity:1;
  }
  .off-leave-active,.on-leave-active{
    transition:all .3s ease;
  }
  .off-enter-active,.on-enter-active{
    transition:all .3s ease;
  }
  .vercode img{
    width:6rem;
    height:2rem;
  }
  .vercode-change{
    width:3.5rem;
  }
  .vercode-change p{
    line-height:2rem;
  }
  .loginByPhone{
    margin-bottom:.5rem;
    .phonenum,.phonecode{
      height:3rem;
      align-items: stretch;
      padding:.1rem;
    }
    #phonenum{
      border:none;
    }
    .phonecode{
      border:.1rem rgb(230,230,230) solid;
    }
    #phonenum,.phonecode{
      width:100%;
      outline:none;
      padding-left:1rem;
    }
    .phone-num-btn{
      width:8rem;
      border:none;
    }
    .phone-num-btn-active{
      background:rgb(55,85,185);
      color:rgb(255,255,255);
    }
  }

  .login-submit{
    width:90%;
    margin:0px 5%;
    background-color:rgb(0,222,102);
    color:rgb(255,255,255);
    height:3rem;
    border:none;
    border-radius: .3rem;
    font-size: 1.2rem;
  }
  .login-tips{
    color:red;
    line-height: 2rem;
    margin-left:1rem;
  }
  .load-container{
    position: absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    border:1px black solid;
  }
</style>
