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
      <section class="fast_nav">
        <ul>
          <li>小龙虾</li>
          <li>鸭锁骨</li>
          <li>奶茶</li>
          <li>芝士蛋糕</li>
          <li>饮料</li>
          <li>金针菇</li>
        </ul>
      </section>
      <div class="adv-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="/static/imgs/food_adver1.jpg">
          </div>
          <div class="swiper-slide">
            <img src="/static/imgs/food_adver2.jpg">
          </div>
        </div>
        <div class="adv-swiper-pagination swiper-pagination" slot="pagination"></div>
      </div>
      <div v-if="navData" class="nav-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(page,pageIndex) in navData" :key="pageIndex">
            <ul v-if="page.length">
              <li v-for="nav in page" :key="nav.nav_id">
                <img :src="nav.nav_logo"/>
                <span>{{nav.nav_title}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="nav-swiper-pagination"></div>
      </div>
      <section class="recom">
        <h4>推荐商家</h4>
      </section>
      <section class="recom-filter-container">
        <section class="recom-filter" :class="navFixed?'navFixedStyle':''">
          <li :class="{currentNavStyle:currentNavType=='order',filtStyle:filterShow&&currentNavType=='order'}" @click="chooseNav('order')">
            <span>{{orderParam.value}}</span>
            <svg :class="[filterShow&&currentNavType=='order'?'up-arrow':'down-arrow']">
              <use v-if="filterShow&&currentNavType=='order'" xlink:href="#up" ></use>
              <use xlink:href="#down" v-else></use>
            </svg>
          </li>
          <li :class="{currentNavStyle:currentNavType=='distance'}" @click="chooseNav('distance')">
            <span>距离最近</span>
            <span class="nav-btn-icon"></span>
          </li>
          <li :class="{currentNavStyle:currentNavType=='quality'}" @click="chooseNav('quality')">
            <span>品质联盟</span>
            <span class="nav-btn-icon"></span>
          </li>
          <li :class="{currentNavStyle:currentNavType=='filt',filtStyle:filterShow&&currentNavType=='filt'}" @click="chooseNav('filt')">
            <span>筛选</span>
            <svg>
              <use  v-if="filterShow&&currentNavType=='filt'" xlink:href="#filt-active"></use>
              <use xlink:href="#filt" v-else ></use>
            </svg>
          </li>
        </section>
      </section>

      <modal class="modal-container" v-if="filterShow">
        <!--排序过滤面板-->
        <div v-if="filterNav=='order'" class="filter-nav order-filter">
          <li :class="{active:orderParam.key=='com'}" @click="changeOrder({key:'com',value:'综合排序'})">
            <span>综合排序</span>
            <svg v-if="orderParam.key=='com'">
              <use xlink:href="#tick"></use>
            </svg>
          </li>
          <li :class="{active:orderParam.key=='sale'}" @click="changeOrder({key:'sale',value:'销量最高'})">
            <span>销量最高</span>
            <svg v-if="orderParam.key=='sale'">
              <use xlink:href="#tick"></use>
            </svg>
          </li>
          <li :class="{active:orderParam.key=='sendlevel'}" @click="changeOrder({key:'sendlevel',value:'起送最低'})">
            <span>起送价最低</span>
            <svg v-if="orderParam.key=='sendlevel'">
              <use xlink:href="#tick"></use>
            </svg>
          </li>
          <li :class="{active:orderParam.key=='sendtime'}" @click="changeOrder({key:'sendtime',value:'速度最快'})">
            <span>配送速度最快</span>
            <svg v-if="orderParam.key=='sendtime'">
              <use xlink:href="#tick"></use>
            </svg>
          </li>
          <li :class="{active:orderParam.key=='asses'}" @click="changeOrder({key:'asses',value:'评分最高'})">
            <span>评分最高</span>
            <svg v-if="orderParam.key=='asses'">
              <use xlink:href="#tick"></use>
            </svg>
          </li>
        </div>
        <!--筛选过滤面板-->
        <div v-if="filterNav=='filt'" class="filter-nav multi-filter">
          <p>配送方式</p>
          <div class="filt-item">
            <li @click="chooseFilt('fnzs')">
              <svg>
                <use xlink:href="#filt-active"></use>
              </svg>
              <span>蜂鸟专送</span>
            </li>
          </div>
          <p>优惠活动（可以多选）</p>
          <div class="filt-item">
            <li :class="{filtItemActive:filterParam['brand']}" @click="chooseFilt('brand')">
              <i class="multiple-filt">品</i>
              <span>品牌商家</span>
            </li>
            <li :class="{filtItemActive:filterParam['send']}" @click="chooseFilt('send')">
              <i class="multiple-filt">保</i>
              <span>外卖保</span>
            </li>
            <li :class="{filtItemActive:filterParam['time']}" @click="chooseFilt('time')">
              <i class="multiple-filt">准</i>
              <span>准时达</span>
            </li>
            <li :class="{filtItemActive:filterParam['new']}" @click="chooseFilt('new')">
              <i class="multiple-filt">新</i>
              <span>新店</span>
            </li>
            <li :class="{filtItemActive:filterParam['onpay']}" @click="chooseFilt('onpay')">
              <i class="multiple-filt">付</i>
              <span>在线支付</span>
            </li>
            <li :class="{filtItemActive:filterParam['invoice']}" @click="chooseFilt('invoice')">
              <i class="multiple-filt">票</i>
              <span>开发票</span>
            </li>
          </div>
          <p>人均价格带</p>
          <section class="chartContainer">
            <div class="chartBlock" style="width:100%;height:4rem;padding:0;">
            </div>
            <input class="price-range" type="range" min="0" max="200" step="10" v-model="currentPriceNode"/>
          </section>
          <div class="filt-submit">
            <li class="filt-submit-clear" @click="clearFilt">
              <span>清空</span>
            </li>
            <li class="filt-submit-ok" @click="closeModal">
              <span>确定</span>
              <span></span>
            </li>
          </div>
        </div>
      </modal>


      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
      <ul>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
        <li>吃撑</li>
        <li>烧烤</li>
      </ul>
    </div>
  </section>
</template>
<script>
  import header from '@/page/common/header'
  import modal from '@/page/common/modal'
  import remO from '@/config/rem'
  import dataO from '@/config/getApiData'
  import priceNum from '@/assets/jsons/priceNum'
  import '@/assets/swiper.min.css'
  import Swiper from 'swiper'
  import echarts from 'echarts'
  export default{
    data:function(){
      return{
        fixShow:true,   //天气栏是否隐藏
        navData:[],   //导航栏信息
        currentNavType:'filt',   //当前选中的列表导航条目
        navFixed:false,       //列表导航是否fix显示
        filterShow:false,      //过滤面板是否显示
        filterNav:'filt',     //显示哪一个过滤面板
        orderParam:{
          key:'com',
          value:'综合排序'
        },                    //排序面板的排序参数
        filterParam:[],       //筛选面板的筛选参数
        origPriceNum:null,//完整的价格商家数量对应
        currentPriceNode:160,        //默认的价格区间 滑块默认值
        myLineChart:null,     //折线图实例
      }
    },
    components:{
      pageHead:header,
      modal,
    },
    created:function(){
      //处理价格和数量列表
      this.origPriceNum=priceNum.sort((a,b)=>{
        return a.price-b.price
      })
    },
    mounted:async function(){
      let obj=this
//      初始化swiper区域
      obj.initSwiperArea()
//      监听页面大小变化，调整折线图
      window.addEventListener('resize',()=>{
        if(obj.myLineChart) obj.myLineChart.resize()
      })
//      监听页面滚动
      window.addEventListener('scroll',()=>{
        obj.controlScrollHeader()
      }
    )
    },
    updated:function(){
//      初始化折线图
      if(this.filterShow&&this.filterNav=='filt')
      this.initLineChart()
    },
    watch:{
//      观察设置的价格节点变化
      currentPriceNode:function() {
        this.curPriceList
        this.initLineChart()
      },
    },
    computed:{
      //列表分类栏和页面头的距离
      navOffsetTop(){
        return document.getElementsByClassName('recom-filter-container')[0].offsetTop
      },
      //完整的价格数量表
      fullPriceList(){
        return this.origPriceNum.map((item)=>{
          return [item.price,item.num]
        })
      },
      //选中价格区间的价格数量表
      curPriceList:function(){
        let obj=this
        return [...obj.fullPriceList.filter((item)=>{
          return item[0]<=obj.currentPriceNode
        })]
      },
      lineChartOption:function(){
        return {
          tooltip:{},
          grid:{
            show:false,
            left:'10%',
            right:'10%',
            top:'bottom',
            height:'70%',
            width:'80%',
          },
          xAxis:{
            min:0,
            max:200,
            type:'value',
            show:false,
          },
          yAxis:{
            show:false,
          },
          series:[{
            name:'销量',
            type:'line',
            smooth:true,
            data:this.fullPriceList,
            showSymbol:false,
            lineStyle:{
              color:'rgb(180,180,180)',
              opacity:0,
            },
            areaStyle:{
              color:'rgb(180,180,180)'
            },
            smoothMonotone:'x'
          },
            {
              name:'销量2',
              type:'line',
              smooth:true,
              data:this.curPriceList,
              showSymbol:false,
              lineStyle:{
                color:'rgb(23,150,230)',
                opacity:0,
              },
              areaStyle:{
                color:'rgb(23,150,230)'
              },
              smoothMonotone:'x',
              markPoint:{
                symbol:'circle',
                data:[
                  {
                    name:'最大值',
                    value:'￥'+this.currentPriceNode,
                    xAxis:this.currentPriceNode,
                    yAxis:100,
                    label:{
                      show:true,
                      color:'rgb(0,0,0)'
                    },
                    itemStyle:{
                      color:'rgba(255,255,255,0)',
                    }
                  },
                  {
                    name:'最小值',
                    value:'￥'+0,
                    xAxis:0,
                    yAxis:100,
                    label:{
                      show:true,
                      color:'rgb(0,0,0)'
                    },
                    itemStyle:{
                      color:'rgba(255,255,255,0)',
                    }
                  }
                  ]
              }
            }
          ]
        }
      },
//      当前价格对应的数量
      currentNumNode:function(){
        if(this.curPriceList.length) return this.curPriceList[this.curPriceList.length-1][1]
        else return 0
      }
    },
    methods:{
      //控制头部天气栏和列表导航栏是否显示
      controlScrollHeader:function(){
        let scrollY=document.documentElement.scrollTop||document.body.scrollTop
        if(scrollY/remO.fontSizeNum>=4){
          this.fixShow=false
        }else{
          this.fixShow=true
        }
        if(scrollY>=this.navOffsetTop-remO.fontSizeNum*3){
          this.navFixed=true
        }else{
          this.navFixed=false
        }
      },
      //显示搜索面板
      showSearch:function(){
        this.$router.push({path:'search'})
      },
      async getNavData(){
        let navlist=await dataO.indexNav(this)
        let i=0
        while(navlist.length){
          this.navData.push(navlist.slice(0,10))
          navlist.splice(0,10)
        }

      },
      //过滤数据
      chooseNav:function(param){
        //        滚动页面
        let eleTop=document.getElementsByClassName('recom-filter-container')[0].offsetTop
        window.scrollTo(0,eleTop-3*remO.fontSizeNum)
        //        显示过滤面板
        //        参数currentNavType filterShow filterNav
        if(this.currentNavType==param&&(param=='order'||param=='filt')){
          this.filterShow=!this.filterShow
        }else if(param=='order'||param=='filt'){
          this.filterShow=true
          this.currentNavType=param
          this.filterNav=param
        }else{
          this.filterShow=false
          this.currentNavType=param
        }
      },
//      改变排序参数
      changeOrder:function(param){
        this.orderParam=param
        this.filterShow=false
      },
//      改变过滤参数
      chooseFilt:function(param){
        console.log('param:'+param)
        this.filterParam[param]=!this.filterParam[param]
        console.log(this.filterParam[param])
          this.filterParam={...this.filterParam}
      },
      clearFilt:function () {
        this.filterParam=[]
      },
      closeModal:function(){
        this.currentNavType='filt'
        this.filterShow=false
        this.filterNav='filt'
      },
//      初始化滑动区域
      async initSwiperArea(){
        var Swiper1 = new Swiper ('.adv-swiper-container', {
          pagination: {
            el: '.adv-swiper-pagination',
          }
        })
        await this.getNavData()
        var Swiper2 = new Swiper ('.nav-swiper-container', {
          pagination: {
            el: '.nav-swiper-pagination',
          }
        })
      },
      //初始化折线图
      initLineChart(){
        this.myLineChart=echarts.init(document.getElementsByClassName('chartBlock')[0])
        this.myLineChart.setOption(this.lineChartOption)
      },
      changePriceNode:function(){
        console.log('ccccccccc')
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/style/common';
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
  z-index: 1;
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
  /*flex-basis: 100%;*/
  /*height: 200px;*/
  margin-top: 3rem;
  margin-bottom: 3rem;
}
  /*快速导航*/
  .fast_nav{
    background: -webkit-linear-gradient(left,rgba(185,3,185,1), rgba(108,2,106,1));
    ul {
      display: flex;
      justify-content: space-around;
      li{
        color:rgb(255,255,255);
        line-height: 2rem;
      }
    }
  }
  //轮播宣传广告
  .adv-swiper-container{
    position:relative;
    height:7.3rem;
    overflow: hidden;
    .swiper-slide{
      img{
        width:100%;
        height:6.5rem;
      }
    }
    .adv-swiper-pagination{
      height:1rem;
      width:100%;
      bottom:0rem;
    }
  }
  /*轮播导航*/
  .nav-swiper-container{
    overflow: hidden;
    width:100%;
    position:relative;
    margin-top:1rem;
    height:14rem;
    .swiper-slide{
      height:13rem;
      width:100%;
      ul{
        width:100%;
        /*display: flex;*/
        li{
          vertical-align: top;
          width:20%;
          height:6.5rem;
          display: inline-block;
          text-align: center;
          img{
            width:80%;
            height:4rem;
            /*margin-left:10%;*/
            display: inline-block;
          }
          span{
            display: inline-block;
            font-size: .8rem;
          }
        }
      }
    }
    .nav-swiper-pagination{
      width:100%;
      position: absolute;
      text-align: center;
      bottom:0rem;
    }
  }
  /*商家推荐标题*/
  .recom{
    width:100%;
    line-height: 2rem;
    border:1px black solid;
    text-align: center;
  }
/*首页列表过滤*/
.recom-filter-container{
  height:2rem;
  .recom-filter{
    background: rgba(255,255,255,0.5);
    width:100%;
    height:2rem;
    border:1px red solid;
    display: flex;
    justify-content: space-around;
    align-items: center;
    li{
      line-height: 100%;
      svg{
        width:1rem;
        height:1rem;
      }
      .down-arrow{
        transform: rotate(90deg);
      }
      .up-arrow{
        color:$blue;
        transform: rotate(-90deg);
      }
    }
    .currentNavStyle{
      span{
        font-weight: 600;
      }
    }
    .filtStyle{
      span{
        color:$blue;
      }
    }
  }
}

.navFixedStyle{
  position: fixed;
  top:3rem;
}
/*弹出窗底部容器*/
.modal-container{
  top:5rem;
}
.filter-nav{
  width: 100%;
  /*z-index: 2;*/
  border:1px blue solid;
  background: rgb(255,255,255);
  svg{
    width:1rem;
    height:1rem;
  }
}
.order-filter{

  li{
    display: flex;
    width:100%;
    line-height: 3rem;
    background:rgb(255,255,255);
    align-items: center;
    padding:0 1rem;
    span{
      width:100%;
      display: inline-block;
      text-align: left;
      border-bottom:1px rgb(230,230,230) solid;
    }
  }
  .active{
    span{
      color:$blue;
    }
  }
}
  .multi-filter{
    width:100%;
    font-size: 1rem;
    p{
      line-height: 3rem;
      color: rgb(130,130,130);
      text-align: left;

      padding:0 1rem;
    }
    .filt-item {
      padding:0 1rem;
      width:100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li{
        display: inline-block;
        background: $grey;
        line-height: 2.5rem;
        margin-bottom: 5px;
        width:32%;
        text-align:left;
        .multiple-filt{
          display: inline-block;
          line-height: 1rem;
          padding:3px;
          color:rgb(23,150,230);
          border:1px rgb(23,150,230) solid;
          border-radius: 3px;
        }
      }
      .filtItemActive{
        background:rgb(202,202,255);
        span{
          color:$blue;
        }
      }
    }
    .filt-submit{
      width:100%;
      display: flex;
      background:rgb(240,240,240) ;
      li{
        width:50%;
        line-height:3rem;
        text-align: center;
      }
      .filt-submit-clear{
        background: rgb(255,255,255);
      }
      .filt-submit-ok{
        background: rgb(19,213,117);
        span{
          color:rgb(255,255,255);
        }
      }
    }
  }
  .chartContainer{
    width:100%;
    height:5rem;
    position:relative;
    /*滑块样式设定*/
    .price-range{
      width:80%;
      position: absolute;
      top:4rem;
      left:10%;
      /*right:10%;*/
      outline: none; /*去掉点击时出现的外边框*/
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none; /*这三个是去掉那条线原有的默认样式，划重点！！*/
      height: 0.1rem;
      background: rgb(0,128,192);
      /*这三个是设置滑块下面那条线的样式*/
    }
    input[type="range"]::-webkit-slider-thumb {
      /*::-webkit-slider-thumb是代表给滑块的样式进行变更*/
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      /*这三个是去掉滑块原有的默认样式*/
      -webkit-box-shadow: 0 0 2px;
      /*!*设置滑块的阴影*!*!-->*/
      width: 1rem;
      height: 1rem;
      background: url("../../../static/imgs/index_nav1.png");
      background-size: cover;
      border-radius: .5rem;

      /*这几个是设置滑块的样式*/
    }
  }
</style>
