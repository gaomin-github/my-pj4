import Vue from 'vue'
import Vuex from 'vuex'
import Storage from '@/config/storage'
Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    ifLogin:false,    //用户是否登录
    userInfo:null,    //登录用户个人信息
    cartInfo:null,    //购物车信息
  },
  // 提交改变
  mutations:{
    // 初始化用户信息
    initUserInfo(state){
      state.userInfo=Storage.getStorage('userInfo')
      if(state.userInfo){
        state.ifLogin=true
      }else{
        state.ifLogin=false
      }
    },
    addUserInfo(state,obj){
      Storage.setStorage('userInfo',obj)
    },
    removeUserInfo(state){
      Storage.removeStorage('userInfo')
      console.log('remove user info')
      console.log(state)
    },
    // 初始化购物车信息
    initCartInfo(state){
      state.cartInfo=Storage.getStorage('cartInfo')
    },
    addCartInfo(state,
                {shop_id,nav_id,food_id,nav_item,food_item}){
      let cartInfo=state.cartInfo||{}
      let shopInfo=cartInfo[shop_id]=cartInfo[shop_id]||{}
      if(shopInfo.order_num){
        shopInfo.order_num++
        shopInfo.order_price=shopInfo.order_price+food_item.price
      }else{
        shopInfo.order_num=1
        shopInfo.order_price=food_item.price
      }
      if(shopInfo[nav_id]){
        shopInfo[nav_id].order_num++
        if(shopInfo[nav_id].food_detail[food_id]){
          shopInfo[nav_id].food_detail[food_id].order_num++
        }else{
          shopInfo[nav_id].food_detail[food_id]=food_item
          shopInfo[nav_id].food_detail[food_id].order_num=1
        }

      }else{
        shopInfo[nav_id]={
          'nav_id':nav_id,
          'order_num':1,
          'food_detail':{}
        }
        shopInfo[nav_id].food_detail[food_id]=food_item
        shopInfo[nav_id].food_detail[food_id].order_num=1
      }
      state.cartInfo={...cartInfo}
      Storage.setStorage('cartInfo',state.cartInfo)
    },
    minusCartInfo(state,
                  {shop_id,nav_id,food_id,nav_item,food_item}){

      let cartInfo=state.cartInfo
      let shopInfo=cartInfo[shop_id]
      shopInfo.order_num--
      shopInfo.order_price=shopInfo.order_price-food_item.price
      if(shopInfo.order_num==0){
        console.log('清空当前购物车')
        shopInfo=null
        cartInfo[shop_id]=null
        Storage.setStorage('cartInfo',state.cartInfo)
        return
      }
      if(shopInfo[nav_id]){
        shopInfo[nav_id].order_num--
        if(shopInfo[nav_id].food_detail[food_id]){
          shopInfo[nav_id].food_detail[food_id].order_num--
        }
      }
      state.cartInfo={...cartInfo}
      Storage.setStorage('cartInfo',state.cartInfo)
    },
    removeCartInfo(state,{shop_id}){
      state.cartInfo[shop_id]=null
      state.cartInfo={...state.cartInfo}
      Storage.setStorage('cartInfo',state.cartInfo)

    },
    clearCartInfo(state){
      Storage.removeStorage('cartInfo')
    }

  }
})
