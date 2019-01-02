<template>
  <section>
    <section ref="lazy_container" class="lazy_container">
      <section class="lazy_item" v-for="item in listData">
        <img class="logo_block" :src="item.src?item.src:'/static/imgs/default.jpg'" :dataSrc="item.dataSrc"/>
        <section class="lazy_item_content">
          <h5>{{item.id}}</h5>
          <span>{{item.title}}</span>
        </section>
      </section>
    </section>
    <section class="preload_container">

    </section>
  </section>

</template>
<script lang="ts">
import Vue from 'vue';
import listData from '@/page/2018-12/data/lazyLoadDemo.js'
  export default Vue.extend({
    data:function():{
      listData:any[]
    }{
      return{
        listData:[]
      }
    },
    created:function(){
      this.listData=listData
    },
    mounted:function(){
      this.loadTrueImg()
      let lazyCon:any=this.$refs.lazy_container
      lazyCon.addEventListener('scroll',this.loadTrueImg)
    },
    methods:{
      loadTrueImg(){
        let lazy_items:any=document.getElementsByClassName('lazy_item')
        let lazy_items_length=lazy_items.length
        while(lazy_items_length--){
//          console.log(lazy_items_length+'，'+lazy_items[lazy_items_length].getBoundingClientRect().top)
          if(lazy_items[lazy_items_length].getBoundingClientRect().top<=screen.height){
            this.listData[lazy_items_length].src=this.listData[lazy_items_length].dataSrc
          }
        }
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
