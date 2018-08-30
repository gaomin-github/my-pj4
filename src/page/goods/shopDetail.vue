<template>
  <section class="shop-container">
    <section class="top-container">
      <page-top class="page-top" :goBack="true">
        <section  v-if="!ifShowLogo" class="search-container" slot="search" @click="searchInShop">
            <svg><use xlink:href="#search"/> </svg>
            <span>想吃什么搜一搜</span>
        </section>
        <section class="right-fun" slot="rightFun">

          <svg v-if="ifShowLogo">
            <use xlink:href="#search"/>
          </svg>
          <span v-if="ifShowLogo">拼</span>
          <section class="more" @click="showMoreFun">
            <i/><i/><i/>
            <span  v-if="ifShowMoreFun">123</span>
          </section>
        </section>
      </page-top>
      <section class="more-fun" v-if="ifShowMoreFun">
        <p @click="controlMoreFun('cart')">
          <svg>
            <use xlink:href="#cart"/>
          </svg>
          <span>购物车</span>
        </p>
        <p @click="controlMoreFun('pin')">
          <span class="icon">拼</span>
          <span>拼单</span>
        </p>
      </section>
      <transition name="logo">
        <section v-if="ifShowLogo" class="shop-logo">
          <img src="../../../static/imgs/index_nav1.png"/>
        </section>
      </transition>
    </section>
    <span class="shop-store">
      <svg><use xlink:href="#store"/> </svg>
    </span>
    <h4 class="shop-title">{{this.$route.query.shop_title}}</h4>
    <section class="shop-descript">
      <span>评价4.5</span>
      <span>月售200</span>
      <span>蜂鸟专送约29分钟</span>
    </section>
    <transition name="shop-brief">
      <section v-if="!showShopDetail" class="shop-detail-brief">
        <li>
          <span>首单</span>
          <p>新用户下单立减17元（不与其它活动共享）</p>
          <i @click="displayShopDetail">
            5个优惠
            <svg>
              <use xlink:href="#back"/>
            </svg>
          </i>
        </li>
        <li>
          公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福
        </li>
      </section>
    </transition>
    <transition name="shop-details">
      <section v-if="showShopDetail" class="shop-detail">
        <section class="shop-detail-shrink" @click="hideShopDetail">
          <svg>
            <use xlink:href="#back"/>
          </svg>
        </section>
        <section class="shop-detail-item shop-detail-yh">
          <h4>优惠</h4>
          <ul>
            <li>
              <span>首单</span>新用户下单立减17元（不与其他活动共享）
            </li>
            <li>
              <span>满减</span>满40减16，满60减24
            </li>
            <li>
              <span>折扣</span>折扣商品5折起
            </li>
            <li><span>新客</span>本店新用户立减3元</li>
            <li><span>特价</span>特价商品19.9元起</li>
          </ul>
        </section>
        <section class="shop-detail-item shop-detail-fw">
          <h4>服务</h4>
          <ul>
            <li>
              <span>拒单赔</span>商家原因导致订单取消，赔付定金券
            </li>
            <li>
              <span>开发票</span>该商家支持开发票，请在下单时填写好发票抬头
            </li>
            <li>
              <span>准时达</span>超时10分钟立享赔付
            </li>
          </ul>
        </section>
        <section class="shop-detail-item shop-detail-gg">
          <h4>公告</h4>
          <p>
            公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。公告：温馨提示：1.炎炎夏日，嘉和一品带您体验一碗粥的幸福。</p>
        </section>
      </section>
    </transition>
    <section v-if="showShopDetail" class="shop-detail-back" @click="hideShopDetail">
      <svg>
        <use xlink:href="#back"/>
      </svg>
    </section>
    <section class="shop-content"  v-else ref="foodNav">
      <div class="shop-top-nav" :class="scrollActive?'shop-top-nav-active':''">
        <div class="shop-top-nav-content" :class="scrollActive?'shop-top-nav-content-active':''">
          <li @click="changeShopServiceType('food')">
            商品
            <span :class="shopServiceType=='food'?'activeSpan':''"></span>
          </li>
          <li @click="changeShopServiceType('assess')">
            评价
            <span :class="shopServiceType=='assess'?'activeSpan':''"></span>
          </li>
          <li @click="changeShopServiceType('seller')">
            商家
            <span :class="shopServiceType=='seller'?'activeSpan':''"></span>
          </li>
        </div>

      </div>
      <div v-if="shopServiceType=='food'" class="food-content">
        <div class="food-menu">
          <div class="food-left-menu">
            <div class="food-left-menu-content" :class="scrollActive?'food-left-menu-content-active':''">
              <section v-for="navitem in food_info" :key="navitem.nav_id" @click="changeFoodNav(navitem.nav_id,navitem)"
                       class="food-left-menu-item" :class="{'food-left-menu-item-active':currentNav==navitem.nav_id}">
                <span class="line"></span>
                <svg v-if="navitem.nav_type=='hot'" style="background: red;"><use xlink:href="#store"/> </svg>
                <svg v-else-if="navitem.nav_type=='shortcut'" style="background:rgb(56,150,230);"><use xlink:href="#sale"/> </svg>
                <span class="label">{{navitem.nav_title}}</span>
                <span class="num" v-if="navitem.order_num>0">{{navitem.order_num}}</span>
              </section>
              <button style="height:3rem;" @click="clearCart">清空购物车</button>
            </div>
          </div>
          <div class="food-right-menu">
              <section v-for="navitem in food_info" :key="navitem.nav_id" :ref="'nav_'+navitem.nav_id">
                <h5 style="text-align: left">{{navitem.nav_title}}</h5>
                <li v-for="item in navitem.food_detail" class="food-content-item" :key="item.food_id">
                  <img :src="item.food_logo">
                  <div class="food-content-item-right">
                    <section class="title">
                      <h4>{{item.food_title}}</h4>
                      <span>招牌</span>
                    </section>
                    <p>食品详情</p>
                    <p>月售{{item.month_seller}}份 好评率{{item.plause_rate}}%</p>
                    <span class="food-active">食品活动</span>
                    <div class="price-num">
                      <span class="price">￥{{item.price}}</span>
                      <section class="num">

                        <svg @click="minusFood(navitem,item,navitem.nav_id,item.food_id)" v-if="item.order_num"><use xlink:href="#shrink"/> </svg>
                        <span v-if="item.order_num">{{item.order_num}}</span>
                        <svg @click="plusFood(navitem,item,navitem.nav_id,item.food_id)"><use xlink:href="#add"/> </svg>
                      </section>
                    </div>
                  </div>
                </li>
              </section>

          </div>
        </div>
        <div class="shop-cart-menu">
          <section class="shop-cart-detail" @click="showCartInfo" :class="(cartInfo&&cartInfo[shop_id])?'shop-cart-detail-active':''">
            <section class="shop-cart-icon">
              <svg><use xlink:href="#cart"/> </svg>
              <span v-if="foodNum>0">{{(cartInfo&&cartInfo[shop_id])?cartInfo[shop_id].order_num:''}}</span>
            </section>
            <div class="shop-cart-price">
              <span class="total-price-active" v-if="cartInfo&&cartInfo[shop_id]">
                ￥{{(cartInfo&&cartInfo[shop_id])?cartInfo[shop_id].order_price:0}}
              </span>
              <span class="total-price" v-else>未选购商品</span>
              <span class="send-fare">另需配送费1￥{{$route.query.shop_basicfare}}</span>
            </div>
          </section>
          <span v-if="cartInfo&&cartInfo[shop_id]" class="shop-cart-submit">去结算</span>
          <span class="shop-cart-submit-empty" v-else>
            还差￥{{$route.query.shop_basicfare}}起送
          </span>
        </div>
      </div>
      <div v-if="shopServiceType=='assess'" class="assess-contaienr">
        <section class="assess-head">
          <div class="left">
            <h3>4.7</h3>
            <p>综合评价</p>
            <span>高于周边商家20%</span>
          </div>
          <div class="right">

          </div>
        </section>
        <section class="assess-com">

        </section>
        <section class="assess-list">

        </section>
      </div>

    </section>
    <modal class="shop-cart-container" v-if="ifShowCartInfo">
      <div class="shop-cart-content" v-if="ifShowCartInfo">
        <div class="shop-cart-content-head">
          <p>购物车</p>
          <p class="clear" @click="removeCart">清空</p>
        </div>
        <ul v-if="cartInfo[shop_id]" class="shop-cart-content-list">
          <section v-for="navitem in cartInfo[shop_id]" :key="navitem.nav_id">
            <section v-if="navitem.food_detail">
              <section v-for="fooditem in navitem.food_detail" :key="fooditem.food_id">
                <li v-if="fooditem.order_num>0">
                  <p class="title">{{fooditem.food_title}}</p>
                  <p class="price">￥{{fooditem.price}}</p>
                  <p class="number">
                    <svg @click="minusFood(navitem,fooditem,navitem.nav_id,fooditem.food_id)" v-if="fooditem.order_num"><use xlink:href="#shrink"/> </svg>
                    <span v-if="fooditem.order_num">{{fooditem.order_num}}</span>
                    <svg @click="plusFood(navitem,fooditem,navitem.nav_id,fooditem.food_id)"><use xlink:href="#add"/> </svg>
                  </p>
                </li>
              </section>
            </section>
          </section>
        </ul>
      </div>
    </modal>
  </section>
</template>
<script>
  import {mapState, mapMutations} from 'vuex'
  import pageTop from '@/page/common/header'
  import modal from '@/page/common/modal'
  import foodList from '@/assets/jsons/foodList'
  import remO from '@/config/rem'
  export default {
    data: function () {
      return {
        showShopDetail: false,       //显示店铺详细信息
        shopServiceType: 'food',
        foodNum: 0,    //购物车中食物数量
        foodPrice: 0,    //购物车中食物总价
        currentNav: null,      //当前食物分类
        scrollActive:false,     //服务分类滚动条固定
        ifShowCartInfo:false,   //是否显示购物车信息
        ifShowMoreFun:false,    //是否显示更多功能列表
        shop_id:'',       //店铺id
        ifShowLogo:true,    //是否显示店铺logo
      }
    },
    components: {
      pageTop,
      modal
    },
    created: function () {
      this.shop_id=this.$route.query.shop_id
      console.log('shopDetail created============')
//      console.log(foodList)
//      初始化购物车信息
      this.initCartInfo()
      console.log('shopdetail:'+this.$route.meta.keepAlive)
    },
    mounted: function () {
      console.log('shopDetail mounted============')
      let obj = this
      obj.currentNav = obj.food_info[0].nav_id
      document.addEventListener('scroll',this.controlScrollActive)
    },
    watch:{
//      控制购物车信息是否显示
      foodNum:function(){
        if(this.foodNum==0) this.ifShowCartInfo=false
      }
    },
//    销毁滚动事件监听
    beforeDestroy:function(){
      document.removeEventListener('scroll',this.controlScrollActive)
    },
    computed: {
      ...mapState(['cartInfo']),
//      食物列表信息
      food_info: function () {
        console.log('this.cartInfo')
//        console.log(this.cartInfo)
        var o = this
        let shop_id=o.shop_id
        let food_info_init=JSON.parse(JSON.stringify(foodList))
        if(!o.cartInfo||!o.cartInfo[shop_id]){
          return food_info_init
        }
        let orderNum=0,orderPrice=0
        food_info_init.map(o1=>{
          if(o.cartInfo[shop_id]&&o.cartInfo[this.shop_id][o1.nav_id]){
            o1.order_num=o.cartInfo[this.shop_id][o1.nav_id].order_num
            orderNum=orderNum+o1.order_num
            o1.food_detail.map(o2=>{
              Object.assign(o2,o.cartInfo[shop_id][o1.nav_id].food_detail[o2.food_id])
              orderPrice=orderPrice+(o2.order_num*o2.price)
            })
          }
        })
        this.foodNum=orderNum
        this.foodPrice=orderPrice
        return food_info_init
      }
    },
    methods: {
      ...mapMutations(['initCartInfo','addCartInfo','minusCartInfo','removeCartInfo','clearCartInfo']),
//      展示店铺详细介绍
      displayShopDetail() {
        this.showShopDetail = true
      },
      hideShopDetail() {
        this.showShopDetail = false
      },
//      改变当前店铺服务分类信息 商品 评价 商家
      changeShopServiceType: function (param) {
        this.shopServiceType = param
      },
//      购物车中添加食物
      plusFood(nav_item,food_item,nav_id,food_id){
        let shop_id=this.shop_id
        this.addCartInfo({shop_id,nav_id,food_id,nav_item,food_item})
      },
      minusFood(nav_item,food_item,nav_id,food_id){
        console.log('minus food')
        let shop_id=this.shop_id
        this.minusCartInfo({shop_id,nav_id,food_id,nav_item,food_item})
        if(!this.cartInfo[shop_id]) this.ifShowCartInfo=false
//        console.log(this.cartInfo[shop_id])
      },
//      改变食物分类
      changeFoodNav:function(key,o){
        //切换食物分类
        var obj=this
        this.currentNav=o.nav_id
//        console.log('nav_id:'+o.nav_id)

//        console.log('offsetTop:')
        let offsetTop=this.$refs['nav_'+o.nav_id][0].offsetTop
//        console.log(offsetTop)
        window.scroll(0,offsetTop-6*remO.fontSizeNum)
        //获取当前元素定位
      },
//      清空当前店铺购物车
      removeCart(){
        let shop_id=this.shop_id
        this.removeCartInfo({shop_id})
        this.ifShowCartInfo=false
      },
      clearCart(){
        this.clearCartInfo()
      },
//      控制服务分类固定或滚动信息
      controlScrollActive(param){

        let scrollTop=document.documentElement.scrollTop||document.body.scrollTop
        if(scrollTop>.5*remO.fontSizeNum){
          this.ifShowLogo=false
        }else{
          this.ifShowLogo=true
        }
        let NavOffsetTop=parseInt(this.$refs['foodNav'].offsetTop)
        if(scrollTop>NavOffsetTop-parseInt(remO.fontSizeNum*3)){
          this.scrollActive=true
        }else{
          this.scrollActive=false
        }
//        console.log('scrollActive:'+this.scrollActive)
      },
//      展示购物车详情
      showCartInfo(){
        if(this.cartInfo[this.shop_id]){
          console.log('1111111')
          this.ifShowCartInfo=!this.ifShowCartInfo
        }else{
          console.log('22222222')
          this.ifShowCartInfo=false
        }
      },
      showMoreFun:function(){
        this.ifShowMoreFun=true
      },
      controlMoreFun(){
        this.ifShowMoreFun=false
      },
      searchInShop(){
        this.$router.push({path:'/search'})
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../assets/style/common';
  .shop-container {
    display: flex;
    flex-direction: column;
  }
  .top-container {
    position:relative;
    flex-shrink: 0;
    height: 6rem;
    background-image: url('../../../static/imgs/food_adver1.jpg');
  }
  .page-top {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    background: rgba(0, 0, 0, 0.5);
    .search-container{
      flex-basis: 100%;
      height:2rem;
      display: flex;
      border-radius: 1rem;
      background: rgb(255,255,255);
      justify-content: center;
      align-items: center;
      svg{
        width:1.5rem;
        height:1.5rem;
      }
      span{
        color:rgb(150,150,150);
        font-size: .8rem;
      }
    }
    .right-fun {
      display: flex;
      align-items: center;
      display: flex;
      flex-direction: row;
      svg {
        /*border:1px white solid;*/
        width: 1.5rem;
        height: 1.5rem;
      }
      span {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 1rem;
        text-align: center;
        border: 1px white solid;
        border-radius: .75rem;
      }

      .more {
        display: flex;
        flex-direction: column;
        width: 1.5rem;
        height: 1.5rem;
        /*border:1px black solid;*/
        align-items: center;
        i {
          width: 0px;
          height: 0px;
          border: .15rem white solid;
          margin: .1rem;
        }
      }
    }
  }
  .more-fun {
    width:8rem;
    padding:.5rem;
    background: rgb(100, 90, 110);
    position: fixed;
    right: .5rem;
    top: .5rem;
    z-index: 5;
    p {
      height: 1.5rem;
      margin:.5rem;
    }
    span {
      color: rgb(255, 255, 255);
      line-height: 1.2rem;
      vertical-align: middle;
    }
    svg {
      width: 1.2rem;
      height: 1.2rem;
      line-height: 1.2rem;
      vertical-align: middle;
    }
    .icon {
      display: inline-block;
      width:1.4rem;
      line-height: 1.2rem;
      height: 1.4rem;
      border: .15rem white solid;
      border-radius: .7rem;
      text-align: center;
      font-size: .8rem;
      vertical-align: middle;
    }
  }
  .shop-logo {
    position: absolute;
    bottom: -.5rem;
    width: 100%;
    height: 3rem;
    text-align: center;
    img {
      width: 4rem;
      height: 4rem;
      position: relative;
      bottom: -.5rem;
    }
  }

  .shop-store {
    display: inline-block;
    text-align: right;
    position: relative;
    /*border: 1px black solid;*/
    width: 100%;
    top: -1rem;
    right: 1rem;
    svg {
      display: inline-block;
      background: rgb(255, 255, 255);
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
    }
  }

  .shop-title {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 2rem;
    height: 2rem;
    text-align: center;
    /*border:1px black solid;*/
  }

  .shop-descript {
    height: 1.5rem;
    text-align: center;
    font-size: .8rem;
    line-height: 1.5rem;
    /*border: 1px black solid;*/
  }

  /*店铺优惠信息*/
  .shop-detail {
    flex: 1;
    /*border:1px blue solid;*/
    overflow-y: scroll;
    margin-bottom: -1rem;
    position: relative;
    /*设置滚动条样式*/
    &::-webkit-scrollbar {
      background-color: transparent;
      width: .3rem;
    }
  }
  .shop-detail-brief {
    width: 86%;
    margin: 0 auto;
    /*border:1px black solid;*/
    li {
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
    }
    span, p, li, i {
      display: inline-block;
      font-size: .8rem;
      line-height: 1rem;
      color: rgb(100, 100, 100);
    }
    span {
      background: rgb(30, 200, 0);
      paddign: .1rem;
    }
    svg {
      width: .8rem;
      height: .8rem;
      border: 1px black solid;
      background: rgb(150, 150, 150);
      transform: rotate(-90deg);
    }
  }
  .shop-detail-shrink {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px blue solid;
    top: .1rem;
    right: .1rem;
    background: rgb(200, 200, 200);
    svg {
      transform: rotate(90deg);
      width: 1rem;
      height: 1rem;
    }
  }

  .shop-detail-item {
    padding: .5rem;
    h4 {
      line-height: 2rem;
    }
    p, li, span {
      font-size: .8rem;
    }
    li {
      line-height: 1rem;
      margin: .25rem 0;
      span {
        margin-right: 1rem;
      }
    }
  }

  .shop-detail-yh {
    span {
      display: inline-block;
      border: 1px black solid;
      line-height: 1rem;
      background: rgb(100, 200, 100);
      padding: .1rem;
    }
  }

  .shop-detail-fw {
    li {
      margin: .5rem 0;
    }
    span {
      display: inline-block;
      border: 1px black solid;
      line-height: 1rem;
      padding: .1rem;
    }
  }

  .shop-detail-back {
    height: 5rem;
    background: -webkit-linear-gradient(top, rgba(150, 150, 150, 0.3), rgba(150, 150, 150, 1));;
    text-align: center;
    vertical-align: bottom;
    border: 1px black solid;
    svg {
      position: absolute;
      bottom: 0;
      width: 2rem;
      height: 3.5rem;
      transform: rotate(90deg);
      border: 1px black solid;
    }
  }
  /*new*/
  .shop-content{
    flex:1;
    display: flex;
    flex-direction: column;
  }
  .shop-top-nav{
    height: 3rem;
  }
  .shop-top-nav-content {
    height: 3rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    border-bottom: 1px rgb(230, 230, 230) solid;
    li {
      margin-bottom: 5px;
      span {
        display: block;
        width: 100%;
        height: .2rem;
        margin-top: .1rem;
      }
    }
    .activeSpan {
      background-color: rgb(24, 143, 230);
    }
  }

  .shop-top-nav-content-active{
    position:fixed;
    width:100%;
    top:3rem;
    background:rgba(255,255,255,0.8);
    z-index: 3;
  }
  .shop-brief-enter, shop-brief-leave-to {
    opacity: 0;
  }

  .shop-brief-enter-active, .shop-brief-leave-active {
    transition: all .3s;
  }

  .food-content {
    flex:1;
    display: flex;
    flex-direction: column;
  }
  .food-menu {
    flex: 1;
    padding-bottom: 4rem;
    display: flex;
  }
  .food-left-menu{
    width: 5.5rem;
  }
  .food-left-menu-content {
    width: 5.5rem;
    background: rgb(230, 230, 230);
    //隐藏滚动条，背景设为透明，或宽度为0
    /*&::-webkit-scrollbar {*/
      /*background-color: transparent;*/
      /*width: .3rem;*/
    /*}*/
  }
  .food-left-menu-content-active{
    position: fixed;
    top:6rem;
    bottom:3rem;
    overflow: scroll;
    &::-webkit-scrollbar {
    background-color: transparent;
    width: .3rem;
  }
  }
  .food-left-menu-item {
    display: block;
    width: 100%;
    height: 4rem;
    text-align: left;
    position: relative;
    display: flex;
    align-items: center;
    .label{
      margin-left: .1rem;
      display: inline-block;
      height:4rem;
      line-height: 4rem;
    }
    .line{
      vertical-align: middle;
        display: block;
        height:100%;
        background: rgba(0,0,0,0);
        width:.3rem;
    }
    .num{
      display: inline-block;
      position: absolute;
      width:1.2rem;
      height:1.2rem;
      line-height: 1.2rem;
      font-size: .8rem;
      right:0rem;
      top:.1rem;
      border-radius: .6rem;
      color: rgb(255, 255, 255);
      background: rgb(255,0,0);
      text-align: center;
    }
    svg{
      width:1rem;
      height:1rem;
      margin-left: .1rem;
    }
  }
  .food-left-menu-item-active{
    background: rgb(255,255,255);
    color:rgb(255,0,0);
    .line{
      background-color: $blue;
    }
  }
  /*.food-right-menu-active{*/
    /*position: fixed;*/
    /*left:5.5rem;*/
    /*top:6rem;*/
    /*right: 0;*/
    /*bottom:4rem;*/
    /*overflow-y: scroll;*/
    /*z-index: 4;*/
    /*background: rgb(255,255,255);*/
  /*}*/
  .food-right-menu{
    flex:1;
    padding:0px 5px;
    h5{
      font-size: 1.2rem;
    }
    //隐藏滚动条，背景设为透明，或宽度为0
    &::-webkit-scrollbar{
      background-color:transparent;
      width: .3rem;
    }
    /*&::-webkit-scrollbar-track{*/
    /*background-color: transparent; //一种偏橘的红色（如果是口红色号的话应该适合白皮）*/
    /*height:5rem;  //加了也没用*/
    /*}*/
    /*&::-webkit-scrollbar-track-piece{*/
    /*!*background-color: red; //一种灰色*!*/
    /*height: 2rem;*/
    /*}*/
    .food-content-item{
      display: flex;
      margin:.5rem 0;
      img{
        width: 5rem;
        height: 5rem;
      }
      .food-content-item-right{
        flex:1;
        padding-left: 5px;
        .title{
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 2rem;
          h4{
            font-weight: 600;
          }
          span{
            display: inline-block;
            height:1.2rem;
            line-height:1.2rem;
            border:1px red solid;
            border-radius: .2rem;
            color:red;
          }
        }
        p{
          font-size: .8rem;
          line-height: 1.5rem;
        }
        .food-active{
          display: inline-block;
          height: 1.2rem;
          line-height: 1.2rem;
          font-size: 0.8rem;
          color:rgb(255,144,84);
          border:1px rgb(255,48,4) solid;
          border-radius: 5px;
          padding:0 .1rem;
        }
        .price-num{
          /*border:1px black solid;*/
          height:2rem;
          line-height:2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 2rem;
          .price{
            color:red;
          }
          .num{
            height:100%;
            span{
              vertical-align: middle;
              display: inline-block;
              width:2rem;
              height:1.2rem;
              line-height: 1.2rem;
              text-align: center;
            }
            svg{
              width:1.2rem;
              height:1.2rem;
              display: inline-block;
              border-radius: .6rem;
              background: $blue;
              vertical-align: middle;
            }
          }

        }
      }
    }
  }

  .shop-cart-menu{
    box-sizing: border-box;
    width:100%;
    position: fixed;
    height: 3rem;
    bottom:0;
    left:0;
    display: flex;
    z-index: 4;
    align-items: center;
  }
  .shop-cart-submit{
    flex:1;
    text-align: center;
    font-size: 1.2rem;
    line-height: 3rem;
    font-weight: 600;
    background-color: rgb(0,222,102);
    color:rgb(255,255,255);
  }
  .shop-cart-submit-empty{
    flex:1;
    text-align: center;
    font-size: 1.2rem;
    line-height: 3rem;
    font-weight: 600;
    background-color: rgba(60,60,60,0.5);
    color:rgb(255,255,255);
  }
  .shop-cart-detail{
    width:16rem;
    background-color: rgb(60,60,60);
    height:100%;
    display: flex;
    .shop-cart-icon{
      position: relative;
      padding-left: 1rem;
      width:4.5rem;
      svg{
        position: relative;
        width:2.5rem;
        height:2.5rem;
        top:-1rem;
        background-color: rgb(60,60,60);
      }
      span{
        position: absolute;
        width:1.2rem;
        line-height:1.2rem;
        text-align: center;
        font-size: .8rem;
        display: inline-block;
        color:rgb(255,255,255);
        top:-.5rem;
        right:.5rem;
        background-color: red;
        border-radius: .6rem;
      }
    }
    .shop-cart-price{
      flex:1;
      .total-price{
        font-size: 1.2rem;
        color:rgb(180,180,180);
      }
      .total-price-active{
        font-size: 1.2rem;
        font-weight: 600;
      }
      .send-fare{
        font-size: .8rem;
        color:rgb(180,180,180);
      }
    }
    .shop-cart-menu-empty{
      background-color: rgb(60,60,60);
    }
    .shop-cart-price{
      display: flex;
      flex-direction: column;
      font-size: 2rem;
      color:rgb(255,255,255);
      span{
        font-size: 1rem;
        color:rgb(255,255,255);
      }
    }
  }
  .shop-cart-detail-active{
    background-color: $blue;
    .shop-cart-icon{
      svg{
        background-color: $blue;
      }
    }
  }
  .shop-cart-container{
    bottom:3rem;
  }
  .shop-cart-content{
    position: absolute;
    padding-bottom: .5rem;
    left:0px;
    bottom:0;
    width:100%;
    /*height:100px;*/
    background: rgb(255,255,255);
    z-index:1;
  }
  .shop-cart-content-head{
    display: flex;
    justify-content: space-between;
    background-color: rgb(237,239,239);
    padding:0px 10px;
    p{
      height:3rem;
      line-height:3rem;
      color:rgb(50,50,50);
    }
    .clear{
      color:rgb(50,50,50);
    }
  }
  .shop-cart-content-list{
    padding:0 1rem;
    li{
      display: flex;
      justify-content:space-between;
      height: 2.5rem;
      line-height: 2.5rem;
      p{
        color:rgb(55,55,55);
      }
      .title{
        flex:1;
        font-weight: 600;
        text-align: left;
      }
      .price{
        width:5rem;
        color:rgb(200,80,60);
        font-weight: 600;
        text-align: left;
      }
      .number{
        width:7rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          vertical-align: middle;
          display: inline-block;
          width:2rem;
          height:1.2rem;
          line-height: 1.2rem;
          text-align: center;
        }
        svg{
          width:1.2rem;
          height:1.2rem;
          display: inline-block;
          border-radius: .6rem;
          background: $blue;
          vertical-align: middle;
        }
      }
    }
  }
  .assess-contaienr{
    border:1px black solid;
    flex:1;
  }
  .logo-leave{
    opacity:1;
  }
  .logo-leave-to{
    transform:scale(0);
  }
  .logo-leave-active{
    transition: all 3s ease;
  }
</style>
