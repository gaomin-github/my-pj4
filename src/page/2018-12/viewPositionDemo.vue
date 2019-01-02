<template>

  <section class="scroll_container" ref="scroll_container">
    <section id="fixed_block">
      <section v-if="showSlideControll" class="scroll_block">
        <h4>滑动offfset控制</h4>
      </section>
      <section v-if="showAntiShake1" class="scroll_block">
        <h4>offset+防抖控制（自定义）</h4>
      </section>
      <section v-if="showAntiShake2" class="scroll_block">
        <h4>offset+防抖控制（通用）</h4>
      </section>
      <section v-if="showInterObserver" class="scroll_block">
        <h4>原生控制</h4>
      </section>
    </section>
    <h1>监听元素在位置</h1>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <section class="scroll_block" ref="slide_control">
      <h4>滑动offfset控制</h4>
    </section>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <section class="scroll_block" ref="anti_shake1">
      <h4>offset+防抖控制（自定义）</h4>
    </section>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <section class="scroll_block" ref="anti_shake2">
      <h4>offset+防抖控制（通用）</h4>
    </section>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <section class="scroll_block" ref="inter_observer">
      <h4>原生控制</h4>
    </section>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
    <p>滚动文本</p>
  </section>
</template>
<script lang="ts">
  import Vue from 'vue'
  let io:any
  export default Vue.extend({
    data:function():{
      showSlideControll:boolean,
      showAntiShake1:boolean,
      showAntiShake2:boolean,
      showInterObserver:boolean
    }{
      return{
        showSlideControll:false,
        showAntiShake1:false,
        showAntiShake2:false,
        showInterObserver:false
      }
    },
    mounted:function(){
//      初始化滚动配置
      this.initScrollControll()
      io=new IntersectionObserver(this.interObserver,{})
    },
    methods:{
      initScrollControll(){
        let con:any=this.$refs.scroll_container
        let obj=this
        con.addEventListener('scroll',(()=>{
          let antiShakeHandler1=obj.antiShake1(obj)
          let antiShakeHandler2=obj.antiShake2(obj)
          return ()=>{
            let conScrollTop=con.scrollTop
            antiShakeHandler1(conScrollTop)
            antiShakeHandler2(conScrollTop)
            obj.slideHandler(obj,conScrollTop)
            io.observe(this.$refs.inter_observer)
          }
        })())
      },
//      简单滑动处理
      slideHandler(obj:any,scrollTop:number){
        let curEle:any=this.$refs.slide_control
        let curEleOffTop=curEle.offsetTop
        if(scrollTop>=curEleOffTop){
          obj.showSlideControll=true
        }else{
          obj.showSlideControll=false
        }
      },
//      简单滑动处理+防抖
      antiShake1(obj:any){
        let touchTime=new Date().getTime()
        return function(scrollTop:number){
          setTimeout(()=>{
            let curTime=new Date().getTime()
            if(curTime-touchTime<300) return
            touchTime=curTime
            let curEle:any=obj.$refs.anti_shake1
            if(scrollTop>=curEle.offsetTop){
              obj.showAntiShake1=true
            }else{
              obj.showAntiShake1=false
            }
          },300)
        }
      },
      antiShake2(obj:any){
        let timer:any
        return (scrollTop:number)=>{
          clearTimeout(timer)
          timer=setTimeout(()=>{
            let curEle:any=obj.$refs.anti_shake2
            if(scrollTop>=curEle.offsetTop){
              obj.showAntiShake2=true
            }else{
              obj.showAntiShake2=false
            }
          },1000)
        }
      },
//      原生方法处理
      interObserver(entries:any){
        let curEle:any=this.$refs.inter_observer
//        entries[0].intersectionRatio:元素和浏览器窗口边界的距离绝对值，元素在窗口显示时值为0
//        curEle.getBoundingClientRect：元素底边到浏览器窗口上边窗距离
        if(entries[0].intersectionRatio<=0&&curEle.getBoundingClientRect().bottom<=0){
          this.showInterObserver=true
        }else{
          this.showInterObserver=false
        }
      }
    }
  })
</script>
<style scoped lang="scss">
  #fixed_block{
    position: fixed;
    top:0px;
    left: 0px;
    display: block;
    width:100%;
  }
.scroll_container{
  border:.1rem black solid;
  overflow-y:scroll;
}
  p{
  display: block;
  line-height: 4rem;
  margin-left: 10px;
  font-size: 1.2rem;
}
h1{
  text-align: center;
}
.scroll_block{
  background-color: #2aabd2;
  h4{
    line-height: 2.4rem;
  }

}
</style>
