<template>
  <section class="index-container">
    <h4>ajax测试</h4>
    <button @click="ajaxHandler">ajax同源测试</button>
    <button @click="crossAjaxHandler">ajax跨域测试</button>
    <button @click="jsonPAjaxHandler">jsonp跨域测试</button>
    <section ref="jsBlock"></section>
    <h4>form data测试</h4>
    <form id="myForm1" enctype="multipart/form-data">
      <input type="text" placeholder="用户名" name="username"/>
      <input type="text" placeholder="密码" name="pwd"/>
      <button class="subBtn" onclick="return false" @click="submitForm">提交</button>
    </form>
    <h4>正则测试</h4>
    <section class="reg-content">
      <input type="text" name="regMessage" v-model="regMessage"/>
      <button onclick="return false;" @click="checkReg">提交</button>
    </section>
  </section>
</template>
<script>
export default {
  data:function(){
    return{
      regMessage:''
    }
  },
  created:function(){

  },
  methods:{
    //同源数据请求。json文件放在satic目录下
    ajaxHandler(){
      let xhr=new XMLHttpRequest()
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          if(xhr.status>=200&&xhr.status<300||xhr.status==304){
            console.log('ajax请求成功')
//            console.log('status:'+xhr.status)
            console.log(xhr.responseText)
          }else{
            console.log('ajax请求失败')
          }
        }
      }
      xhr.open("get","/static/priceNum.json")
      xhr.send(null)
    },
//    跨域数据请求 cors IE需要设置Origin，和其它浏览器操作不同
    crossAjaxHandler(){
      let xhr=new XMLHttpRequest()
      xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
          if(xhr.status>=200&&xhr.status<300||xhr.status==304){
            console.log('跨域请求成功')
            console.log(xhr.responseText)
          }else{
            console.log('跨域请求失败')
          }
        }
      }
      xhr.open('get','http://localhost:9000/test')
      xhr.send(null)
    },
//    跨域数据请求 jsonp，需要服务端配合
    jsonPAjaxHandler(){
      window['print1']=(res)=>{
        console.log(res)
      }
      let scriptEle=document.createElement('script')
      scriptEle.src="http://localhost:9000/test?callback=print1"
      let hEle=document.createElement('h1')
      hEle.appendChild(document.createTextNode('ABCDEFG'))
      this.$refs['jsBlock'].appendChild(hEle)
      this.$refs['jsBlock'].appendChild(scriptEle)
    },
    submitForm(){
      let forms=new FormData(document.getElementById('myForm1'))
      console.log('forms')
      console.log(forms)
    },
//    正则测试
    checkReg(){
      console.log('regMessage:'+this.regMessage)
//     1. 监测是否符合邮箱格式
        let message=this.regMessage
//        let emailPattern=/^(\w)+@(\w)+(\.com)$/i
//        if(emailPattern.test(message)){
//          console.log('邮箱验证合格')
//        }else{
//          console.log('邮箱验证非法')
//        }
////     2. 监测是否符合手机格式
//        let telPattern=/^1[3,5,7,8][0-9]{9}$/i
//        if(telPattern.test(message)){
//          console.log('手机号验证合格')
//        }else{
//          console.log('手机号验证非法')
//        }
//      3.监测是否包含中文
//        let chinesePattern=/^[\u4e00-\u9fa5]+$/i
//        if(chinesePattern.test(message)){
//          console.log('输入为汉字')
//        }else{
//          console.log('输入非汉字')
//        }
//      4.请写个正则表达式匹配所有二级域名是9game.cn和其目录下的网址，比如：http://abc.9game.cn/sname/view/
//        let urlPattern=/^(http\:\/\/)(\w)+(\.9game.cn\/)(\w\/)*$/i
//        let urlPattern=/^(http:\/\/)(\w)+(\.9game.cn\/)((\w)+(\/)?)*$/i
//        if(urlPattern.test(message)){
//          console.log('是合法域名')
//        }else{
//          console.log('非法域名')
//        }
//      5.从字符串中挑选数字
//      从2017-05-15T09:10:23 Europe/Paris中提取出结果["2017","05","15","09","10","23"]
//      let message1='2017-05-15T09:10:23 Europe/Paris'
//      message1=message61.toLowerCase()
//      console.log('message1:'+message1)
//      let chooseStr=/[0-9]+/g
//      console.log('匹配结果:'+message1.match(chooseStr))
//      6.从url中提取参数
//      http://localhost:8084/indexAjax?username=gm_2016&pwd=22
      let message2='http://localhost:8084/indexAjax?username=gm_2016&pwd=22&time=&age=22'
      let urlPattern4=/\w+(?==)/g
//      提取参数名
      let nameArr=message2.match(urlPattern4)
      let paramObj={}
      nameArr.forEach((o)=>{
        let paramPattern=new RegExp(o+'=([^&]*)','g')
//        console.log('匹配参数：'+o+'，匹配结果：'+message2.match(paramPattern))
        paramObj[o]=message2.match(paramPattern)[0].substr(o.length+1)
      })
      console.log(paramObj)

//      let urlPattern1=/(?=\?|&|=).+/g
////      结果：?username=gm_2016&pwd=22&age=22
//      let urlPattern2=/(?=&)/g
//      let urlPattern3=/(?==).+/g
////      结果：=gm_2016&pwd=22&age=22
//      let urlPattern5=/\w+(?!(\w|\/\/|:|\/|\?))/g
////      结果：username,gm_2016,pwd,22,time,age,22
//      let urlPattern6=/pwd=([^&]*)/g
//      console.log('匹配结果6：'+message2.match(urlPattern6))
//      console.log('匹配结果5：'+message2.match(urlPattern5))
    }
  }
}
</script>
<style scoped lang="scss">
.index-container{
  margin:1em;
}
button{
  background: rgb(85,155,255);
  color:rgb(255,255,255);
  width:100px;
  line-height:2em;
}
input[type='text']{
  width:200px;
  line-height: 2em;
  border: 1px rgb(85,155,255) solid;
  margin:.5em;
}
</style>
