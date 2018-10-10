<template>
  <section>
    <!--水平瀑布流在评价罗列中常用，使用inline-block可以实现-->
    <h1>水平瀑布布局</h1>
    <section id="waterfall">
      <span v-for="item in assets">{{item}}</span>
    </section>
  </section>
</template>
<script>
  export default({
    data:function(){
      return{
        assets:[]
      }
    },
    mounted:function(){
      this.assets=['全部(41245)','最新','有图(2534)','视频(45)','追加334)','蛮划算(1523)','味道不错(1183)','质量非常好(981)','速度很快(890)','朋友说不错(34)','味道一般(2256)']
    }
  })
</script>
<style lang="scss" scoped>
#waterfall{
  border:1px black solid;
  height:300px;
  span{
    display: inline-block;
    font-size: .8rem;
    margin:.5rem;
    background: rgb(240,210,200);
    padding:.3rem;
    border-radius: 1rem;
  }
}
</style>
