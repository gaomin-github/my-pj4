export default{
  //存储字体值
  fontSizeNum:0,
  //重置页面默认字体
  fontSizeReset:function(){
    window.addEventListener('DOMContentLoaded',()=>{
      let clientX=document.body.clientWidth
      document.documentElement.style.fontSize=(clientX/320)*12+'px'
      this.fontSizeNum=(clientX/320)*12
    })
    window.addEventListener('resize',()=>{
      let clientX=document.body.clientWidth
      document.documentElement.style.fontSize=(clientX/320)*12+'px'
      this.fontSizeNum=(clientX/320)*12
    })

  },
  //监听页面垂直滚动值
  // scrollY:function(){
  //   window.addEventListener('scroll',()=>{
  //     let scrollTopN=document.documentElement.scrollTop||document.body.scrollTop
  //     return scrollTopN;
  //   })
  // },
  // scrollHeight:function(){
  //   window.addEventListener('scroll',()=>{
  //     let scrollHeight=document.documentElement.scrollHeight||document.body.scrollHeight
  //     return scrollHeight;
  //   })
  // }
}
