<template>
  <section class="foot_container">
    <ul>
      <li>外卖</li>
      <li>发现</li>
      <li>订单</li>
      <li>我的</li>
    </ul>
  </section>
</template>
<script>
  export default{

  }
</script>
<style lang="scss" scoped>
  .foot_container{
    height:3rem;
    width:100%;
    position: fixed;
    bottom:0px;
    background-color: rgb(223,234,215);
    ul{
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
  span,p,i{
    color:rgb(50,50,50);
  }
</style>
