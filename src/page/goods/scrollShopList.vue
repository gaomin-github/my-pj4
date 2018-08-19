<template>
  <div class="shop-list-container">
    <div>
      <section  v-for="item in sellerList" :key="item.shop_id">
        <router-link :to="{path:'/shopdetail',query:item}" class="shop-list-container-item">
          <img class="shop-logo" :src="item.shop_logo"/>
          <div class="shop-info">
            <div class="shop-info-title">
              <section class="title-left">
                <span>品牌</span>
                <h4>{{item.shop_title}}</h4>
              </section>
              <span style="color:rgb(150,150,150);" v-if="item.isensure">保准票</span>
            </div>
            <div class="shop-info-grade">
              <p class="shop-info-grade-star">
                <span style="display:inline-block;">
                  <staring :num="parseFloat(item.shop_star)"/>
                </span>
                <span style="color:rgb(255,143,3);margin:0px 3px;">{{item.shop_star}}</span>
                <span>月售{{item.shop_order}}单</span>
              </p>
              <p v-if="item.isontime">
                <span class="fnsend">蜂鸟专送</span>
                <span class="ontime">准时达</span>
              </p>
            </div>
            <div class="shop-info-fee">
              <p>￥{{item.shop_sendlevel}}起送/配送费约￥{{item.shop_basicfare}}</p>
              <p>{{item.shop_distance}}公里/<span style="color:rgb(24, 143, 230);">{{item.shop_sendtime}}分钟</span></p>
            </div>
          </div>
        </router-link>
      </section>
    </div>
    <div class="load-more" v-on:click="loadMoreList">
      <p v-if="showLoadingLabel">加载更多</p>
    </div>
    <transition name="load">
      <!--&lt;!&ndash;<loading></loading>&ndash;&gt;-->
      <loading v-if="showLoadingImage"></loading>
    </transition>
    <backing/>
  </div>
</template>
<script>
  import apiData from '@/config/getApiData'
  import loading from '@/page/plugin/loadingPlugin'
  import backing from '@/page/plugin/backTopPlugin'
  import staring from '@/page/plugin/starPlugin'
export default {
  props:{
    pageSize:Number,          //每次加载的商家条数
  },
  data:function(){
    return{
      sellerList:[],            //商家列表
      showLoadingLabel:true,    //显示加载标签
      showLoadingImage:false,    //显示加载动画
      curPage:0,                //当前显示页数
    }
  },
  components:{
    loading,
    backing,
    staring
  },
  mounted:function(){
    let obj=this
    document.addEventListener('scroll',()=>{
      let scrollY=document.documentElement.scrollTop||document.body.scrollTop
      let scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight
      let clientY=document.body.clientHeight;
      if(scrollY+clientY>=scrollHeight){
        setTimeout(()=>{
          obj.loadMoreList()
        },3000)
      }
    })
    this.loadMoreList()
  },
  methods:{
    async loadMoreList(){
      let obj=this
      this.showLoadingLabel=false
      this.showLoadingImage=true
      let newList=await apiData.shopList(obj)
      newList=newList.slice(this.curPage*this.pageSize,(this.curPage+1)*this.pageSize)
//      console.log('newList')
//      console.log(newList)
      this.sellerList=[...this.sellerList,...newList]
      if(newList&&newList.length==this.pageSize){
        this.showLoadingLabel=true
      }
      this.showLoadingImage=false
      this.curPage++
    }
  }
}
</script>
<style scoped lang="scss">
  @import '../../assets/style/common';
  .shop-list-container{
  }
  .shop-list-container-item {
    display: flex;
    width: 100%;
    height: 6rem;
    padding:0.5rem;
    img {
      width: 4.5rem;
      height: 4.5rem;
      margin-right:.5rem;
    }
    .shop-info {
      width: 100%;
      padding-right: 1rem;
    }
  }
  .shop-info-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height:2rem;
    span{
      font-size: .8rem;
    }
    .title-left{
      span {
        display: inline-block;
        line-height: 100%;
        background-color: rgb(255, 217, 49);
        vertical-align: middle;
        padding:.1rem;
      }
      h4{
        font-size: 1rem;
        display: inline-block;
        font-weight: 600;
        vertical-align: middle;
      }
    }
  }
  .shop-info-grade {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 1.8rem;
    font-size: .8rem;
    .shop-info-grade-star {
      display: flex;
      align-items: center;
    }
    .fnsend {
      display: inline-block;
      background-color: rgb(24, 143, 230);
      color: rgb(255, 255, 255);
      font-weight: 500;
      line-height: 1rem;
      padding: .1rem;
    }
    .ontime {
      display: inline-block;
      line-height: 1rem;
      padding: .1rem;
      border: 1px rgb(24, 143, 230) solid;
      color: rgb(24, 143, 230);
    }
  }
  .shop-info-fee {
    display: flex;
    line-height: 1.8rem;
    justify-content: space-between;
    font-size: .8rem;
    p {
      color: rgb(150, 150, 150);
    }
  }
  .load-more {
    width:100%;
    height:2rem;
    text-align: center;
    p {
      line-height:2rem;
    }
  }
</style>
