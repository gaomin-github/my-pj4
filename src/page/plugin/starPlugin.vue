<template>
  <section class="stars">
    <section class="blank-star">
      <svg v-for="key in 5" :key="key">
        <use xlink:href="#blankstar"/>
      </svg>
    </section>
    <section class="fill-star" :style="{'width':fillStarWidth+'rem'}">
      <svg v-for="key in fillStarNum" :key="key">
        <use xlink:href="#fillstar"/>
      </svg>
    </section>
  </section>
</template>
<script>
  export default{
    props:{
      num:Number
    },
    computed:{
      fillStarWidth(){
        return this.num
      },
      fillStarNum(){
        let isNum=this.num%1==0?0:1
        return (parseInt(this.num)+isNum)
      }
    },

  }
</script>
<style scoped lang="scss">
  .stars{
    position:relative;
  }
.blank-star,.fill-star{
  margin:0;
  padding:0;
  height:1rem;
  svg{
    margin:0;
    padding:0;
    vertical-align: top;
    width:1rem;
    height:1rem;
  }
}
.fill-star{
  position: absolute;
  top:0;
  white-space:nowrap;
  overflow: hidden;
}
</style>
