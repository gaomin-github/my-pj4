//LocalStorage管理
export default {
  // storage 对应的key
  // userInfo      用户账户信息
  // cartInfo      购物车信息
  setStorage:function(key,o){
    if(window.localStorage.getItem(key)){
      window.localStorage.removeItem(key)
    }
    window.localStorage.setItem(key,JSON.stringify(o))
  },
  getStorage:function(key){
    //key
    // =searchhistory   地点查找历史搜索数据
    // =shopCart  用户购物车信息
    //=loginStatus  用户是否登录
    //  =userInfo   //登录用户信息
    let results=window.localStorage.getItem(key)
    if(results){
      return JSON.parse(results)
    }else{
      return null
    }

  },
  updateStorage:function (key,o) {
    let storage=this.getStorage(key)
    if(storage==null) {
      storage=[]
    }
    if(storage.some(function(a){
        return a.title==o.title
      })) return
    let item={"id":o.id,"title":o.title,"address":o.address,"time":new Date()}
    storage.push(item)
    window.localStorage.removeItem(key)
    window.localStorage.setItem(key,JSON.stringify(storage))
  },
  removeStorage:function(key){
    window.localStorage.removeItem(key)
  },
  clearStorage:function(){

  }

}
