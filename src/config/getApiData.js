export default{
  indexNav:async function(obj){
    // console.log('get indexnav list')
    let res=await obj.$http.post('http://localhost:9000/nav',{},{emulateJSON:true})
    return res.body
  },
  shopList:async function(obj){
    // console.log('get indexnav list')
    let res=await obj.$http.post('http://localhost:9000/shoplist',{},{emulateJSON:true})
    return res.body
  },
  login:async function(obj,data){
    let res=await obj.$http.post('http://localhost:9000/login',data,{emulateJSON:true})
    console.log(res.body)
    return res.body
  }
}
