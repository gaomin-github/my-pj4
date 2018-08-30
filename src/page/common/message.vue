<template>
  <section class="modal-container">
    <section class="content">
      <p>登录异常，请核对后重新提交</p>
    </section>
    <button @click="$emit('hideModal')">确定</button>
  </section>
</template>
<script>
  export default {

  }
</script>
<style lang="scss" scoped>
  @import "../../assets/style/common";
  .modal-container{
    position: fixed;
    top:50%;
    left:50%;
    height:10rem;
    width:80%;
    border-radius: .8rem;
    text-align: center;
    transform:translate(-50%,-50%);
    z-index: 100;
    background: rgba(255,255,255,1);
    /*border:1px red solid;*/
    display: flex;
    flex-direction: column;
    .content{
      flex:1;
      color:red;
      line-height: 100%;
      vertical-align: bottom;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p{

      text-align: center;
    }
    button{
      /*display: inline-block;*/
      height:2.5rem;
      width:100%;
      background: $blue;
      outline:none;
      border:none;
      border-bottom-left-radius: .8rem;
      border-bottom-right-radius: .8rem;
      color:rgb(255,255,255);
      /*/border:1px black solid;*/
    }
  }
</style>
