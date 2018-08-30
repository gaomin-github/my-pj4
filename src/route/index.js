import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import AppBak from '@/AppBak'
import home from '@/page/home'
import search from '@/page/common/search'
import login from '@/page/user/login'
import shop from '@/page/goods/shopDetail'
import mine from '@/page/user/mine'
import user from '@/page/user/userInfo'
export default new VueRouter({
  mode:'history',
  routes:[{
    path:'/',
    redirect:'/home',
    meta:{
      title:'首页',
      keepAlive:true
    }
  },{
    path:'/home',
    component:home,
    meta:{
      title:'首页',
      keepAlive:true
    }
  },{
    path:'/shop',
    component:shop
  },{
    path:'/login',
    component:login,
  },
    {
    path:'/user',
    component:user,
  },
    {
      path:'search',
      component:search
    }
  ]
})
