export default{
  indexNav:async function(obj){
    // console.log('get indexnav list')
    let res=await obj.$http.post('http://localhost:9000/nav',{},{emulateJSON:true})
    return res.body
  }
}
