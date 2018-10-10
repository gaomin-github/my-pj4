<template>
  <!--js原生实现-->
  <section>
    <h1>垂直瀑布流</h1>
    <button @click="getImgs">获取图片</button>
    <!--<button @click="getMinColumn">获取高度</button>-->
    <div id="waterfall">
      <div v-for="i in columnNum" class="columnitem" :key="i">
        <!--<h1>{{i}}</h1>-->
        <div class="pic" v-for="item in imgSource[i-1]">
          <!--{{item.img_src}}-->
          <img :src="item.img_src"/>
        </div>
      </div>
    </div>
  </section>

</template>
<script>
import getApiData from '@/config/getApiData'
export default {
  data:function(){
    return{
      columnNum:4,
      imgSource:[],   //图片数据源
    }
  },
  mounted:async function(){
    this.getImgs()
  },
  updated:function(){
//    console.log('============updated===========')
  },
  methods:{
    getImgs:async function(){
      //获取图片数据
      let dataSource=await getApiData.columnFall(this)
      dataSource=dataSource.list
      //每一列的宽度
      let curWidth=document.body.clientWidth*0.2
      for(let key in dataSource){
        let item=dataSource[key]
        let str=item.img_src.toString().match(/([0-9]+x[0-9]+)$/g)
        let itemWidth=str.toString().slice(0,str.toString().indexOf('x'))
        let itemHeight=str.toString().slice(str.toString().indexOf('x')+1)
        let curIndex=key%this.columnNum
//        图片等宽缩放后的高度
        let curHeight=curWidth/itemWidth*itemHeight
        if(this.imgSource[curIndex]){
//          获取高度值最低的一列,新图片添加到最低的数组列
          let index=this.getMinHeight()
          this.imgSource[index].push(dataSource[key])
          this.imgSource[index].height=this.imgSource[index].height+curHeight
        }else{
          this.imgSource.push([dataSource[key]])
          this.imgSource[curIndex].height=curHeight
        }
      }
    },

    getMinHeight:function(){
      let index=0
      for(let key in this.imgSource){
        if(this.imgSource[key].height-this.imgSource[index].height<0) index=key
      }
      return index
    }
  }
}
</script>
<style scoped lang="scss">
#waterfall{
  border:1px black solid;
}
img{
  width:100%;
  /*height:100px;*/
  display: block;
  margin:.2rem 0;

}
.columnitem{
  width:20%;
  float: left;
  margin:0 2%;
}
</style>
