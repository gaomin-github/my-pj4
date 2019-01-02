<template>
  <section class="darg_container">
    <p>请在手机模式下打开，pc端不支持</p>
      <section class="good_container" draggable="true">
        <li v-for="(item,key) in goodList" :key="key" class="good_item" draggable="true" @touchstart="touchStartHandler" @touchmove="touchMoveHandler" @touchend="touchEndHandler($event,key)">
          <img :src="item.dataSrc"/>
          <section class="item_content">
            <p>{{item.id}}</p>
            <p>{{item.title}}</p>
            <p>{{key}}</p>
          </section>
        </li>
      </section>
      <section class="cart_container">
        <ul class="cart_list" v-if="cartList!==null&&cartList.length>0">
          <li class="cart_list_item" v-for="item in cartList" >
            <section v-if="item!==undefined">
              <span>{{item.id}}</span>
              <span>{{item.title}}</span>
              <span>{{item.num}}</span>
            </section>
          </li>
        </ul>
        <section class="cart_title">购物车</section>
      </section>
  </section>
</template>
<script lang="ts">
  import preLoadDemo from '@/page/2018-12/data/preLoadDemo.js'
  import Vue from 'vue'
  export default Vue.extend({
    data:function():{
      goodList:object[],
      cartList:any[]
    }{
      return{
        goodList:[],
        cartList:[]
      }
    },
    mounted:function(){
      this.goodList=preLoadDemo
    },
    methods:{
      touchStartHandler(e:any){
        let container:any=document.getElementsByClassName('darg_container')[0]
        let curEle:any=e.target
        let curEleCopy=curEle.cloneNode(true)
        curEleCopy.className+=' dragable'
        curEleCopy.style.top=curEle.offsetTop+'px'
        container.appendChild(curEleCopy)
      },
      touchMoveHandler(e:any){
        let pageY:number=e.touches[0].pageY
        let curEle:any=document.getElementsByClassName('dragable')[0]
        curEle.style.top=pageY+'px'
      },
      touchEndHandler(event:any,key:number){
        let endPoint:any=event.changedTouches[0]
        let cart:any=document.getElementsByClassName('cart_container')[0]
        if(endPoint.pageY>=cart.offsetTop){
////          添加到目标块中
          console.log('添加新元素')
//
          if(this.cartList==null||this.cartList[key]==null||this.cartList[key]==undefined||this.cartList[key].length<=0){
            this.cartList[key]=this.goodList[key]
            this.cartList[key].num=1
          }else{
            this.cartList[key].num=this.cartList[key].num+1
          }
          this.cartList=[...this.cartList]

//          console.log(this.cartList)
        }
        let container:any=document.getElementsByClassName('darg_container')[0]
        let curEle:any=document.getElementsByClassName('dragable')[0]
        container.removeChild(curEle)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .dragable{
    position: fixed;
    z-index: 999;
    display: block;
    width: 100%;
    background-color: rgb(255,255,255);
    opacity: 0.5;
  }
  .good_item{
    display: flex;
    margin-bottom: 10px;
    border-bottom:1px rgb(180,180,180) solid;
    img{
      width:50px;
      height:50px;
    }
    .item_content{
      margin-left: 20px;
    }
  }
.good_container{
  border:1px black solid;
}
.cart_container{
  border:1px red solid;
  width:100%;
  position: fixed;
  bottom: 0px;
  .cart_title{
    line-height: 30px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
  .cart_list{
    max-height: 100px;
    overflow-y: scroll;
    li{
      line-height: 30px;
    }
  }

}
</style>
