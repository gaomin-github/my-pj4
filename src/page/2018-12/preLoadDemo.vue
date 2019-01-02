<template>
  <section>
    <section ref="lazy_container" class="lazy_container">
      <section class="lazy_item">
        <img class="logo_block" :src="listData[currentIndex].src?listData[currentIndex].src:'/static/imgs/default.jpg'" :dataSrc="listData[currentIndex].dataSrc"/>
        <section class="lazy_item_content">
          <h5>{{listData[currentIndex].id}}</h5>
          <span>{{listData[currentIndex].title}}</span>
        </section>
      </section>
    </section>
    <section class="operate_container">
      <button @click="loadNewItem(currentIndex--)">上一张</button>
      <button @click="loadNewItem(currentIndex++)">下一张</button>
    </section>
  </section>

</template>
<script lang="ts">
  import Vue from 'vue';
  import listData from '@/page/2018-12/data/preLoadDemo.js'
  export default Vue.extend({
    data:function():{
      listData:any[],
      currentIndex:number
    }{
      return{
        listData:[],
        currentIndex:0
      }
    },
    created:function(){
      this.listData=listData
    },
    mounted:function(){
      this.loadNewItem()       //加载第一张图片
      this.preLoadImgs()    //预加载所有图片
    },
    methods:{
      preLoadImgs(){
        this.listData.forEach((o:any)=>{
          let img=new Image()
          img.src=o.dataSrc
        })
      },
      loadNewItem(){
        this.currentIndex=this.currentIndex%this.listData.length
        this.listData[this.currentIndex].src=this.listData[this.currentIndex].dataSrc
        this.listData=[...this.listData]
      }
    }

  })
</script>
<style scoped lang="scss">
  .lazy_container{
    overflow-y: scroll;
  }
  .lazy_item{
    border:1px black solid;
    display: flex;
    margin-bottom: 20px;
    .logo_block{
      width:100px;
      height:100px;
    }
    .lazy_item_content{

    }
  }
</style>
