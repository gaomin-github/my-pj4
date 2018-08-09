<template>
  <section class="comshop">
    <div class="title">
      <section class="locate">
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#locate"></use>
        </svg>
        <span>北京市海淀区四季青镇佟家坟15号院3门</span>
        <!--镇佟家坟15号院3门-->
        <section class="locate-icon">
          <i></i>
        </section>
      </section>
      <section class="weather">
        <i>27<sup>&deg;</sup><sub>阴</sub></i>
        <svg>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#weather"></use>
        </svg>
      </section>
    </div>

    <page-head :fixShow="fixShow">
      <div class="search" slot="search" @click="showSearch">
        <svg class="search_icon">
          <use xlink:href="#search"></use>
        </svg>
        <p class="search_label">永和大王 满63减4</p>
      </div>
    </page-head>
    <div class="container" @touchmove="controlScrollHeader" >
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
      <h1>1</h1>
    </div>
  </section>
</template>
<script>
  import header from '@/page/common/header'
  import remO from '@/config/rem'
  export default{
    data:function(){
      return{
        leftFun:111,
        rightFun:222,
        middleLabel:333,
        fixShow:true,   //天气栏是否隐藏
      }
    },
    components:{
      pageHead:header
    },
    mounted:function(){
      let obj=this
      //监听页面滚动
      window.addEventListener('scroll',()=>{obj.controlScrollHeader()}
      )
    },
    methods:{
      //控制头部天气栏是否显示
      controlScrollHeader:function(){
//        console.log('111111111111111111111111')
        let scrollY=document.documentElement.scrollTop||document.body.scrollTop

        if(scrollY/remO.fontSizeNum>=3){
          this.fixShow=false
        }else{
          this.fixShow=true
        }
      },
      //显示搜索面板
      showSearch:function(){
        this.$router.push({path:'search'})
      }
    }
  }
</script>
<style lang="scss" scoped>
svg{
  width:1.5rem;
  height:1.5rem;
}
.comshop{
  display:flex;
  flex-direction: column;
  width:100%;
}
/*首页天气和地点部分*/
.title{
  position: relative;
  width:100%;
  height:4rem;
  left:0;
  top:0;
  z-index: 999;
  background: -webkit-linear-gradient(left,rgba(185,3,185,1), rgba(108,2,106,1));
  display:flex;
  flex-direction: row;
  align-items: center;
  padding:0px 10px;
}
.locate{
  position:relative;
  display:flex;
  flex-direction: row;
  align-items: center;
  flex-basis:100%;
  justify-content: flex-start;
  flex:1;
  span{
    font-size: 1.2rem;
    width:100%;
    overflow-y: hidden;
    height:1.5rem;
    line-height: 1.5rem;
    color:rgb(255,255,255);
    padding-right:.6rem;
  }
  .locate-icon{
    position: absolute;
    width:3rem;
    height:1.2rem;
    right:0;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    background:  -webkit-linear-gradient(left,rgba(125,2,125,0), rgba(125,2,125,1));
    align-items: center;
    i{
      width:0;
      height:0;
      display: inline-block;
      border-top:.5rem rgb(255,255,255) solid;
      border-left:.3rem rgb(255,255,255) solid;
      border-right:.3rem rgb(255,255,255) solid;
      border-left-color:transparent;
      border-right-color:transparent;
      border-bottom-color:transparent;
    }
  }
}
.weather{
  width:8rem;
  display:flex;
  justify-content: flex-end;
  svg{
    padding-left: 0px;
    margin-left:0px;
    width:3rem;
  }
  sub,sup,i{
    color:rgb(255,255,255);
  }
}
.search{
  width:100%;
  background: rgb(255,255,255);
  height:2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  p,svg{
    color:rgb(150,150,150);
  }
  svg{
    stroke:rgb(150,150,150);
    width:1.5rem;
    height:1.5rem;
  }
}
.container{
  width:100%;
  height:100%;
  border:3px red solid;
  /*flex-basis: 100%;*/
  /*height: 200px;*/
  padding-top: 3rem;
  padding-bottom: 4rem;
}
</style>
