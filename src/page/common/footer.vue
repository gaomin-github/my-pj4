<template>
  <section class="foot_container">
    <ul>
      <li @click="$emit('changeNav','comshop')">外卖</li>
      <li @click="$emit('changeNav','search')">发现</li>
      <li>订单</li>
      <li @click="$emit('changeNav','mine')">我的</li>
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
      li{
        color:rgb(80,80,80);
        line-height: 3rem;
        font-weight: 600;
      }
    }
  }
  span,p,i{
    color:rgb(50,50,50);
  }
</style>
