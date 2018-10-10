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
import wpChoose from '@/page/wp/wpChoose'
import displayMessage from '@/page/eventBus/displayMessage'
import operateMessage from '@/page/eventBus/operateMessage'
import morefun from '@/page/morefun/index'
import indexAjax from '@/page/ajax/indexAjax'
import columnFall from '@/page/fallLayout/columnFall'
import rowFall from '@/page/fallLayout/rowFall'
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
    name:'home',
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
  },{
    path:'search',
    component:search
  },
  // 物品选择
  {
    path:'/wpchoose',
    component:wpChoose
  },
  // event bus
  {
    path:'/displaymessage',
    component:displayMessage
  },{
    path:'/operatemessage',
    component:operateMessage
  },
  // ajax jsonp
  {
    path:'/indexajax',
    component:indexAjax
  },
  // 瀑布流布局
  {
    path:'/columnfall',
    component:columnFall
  },
  {
    path:'/rowfall',
    component:rowFall
  }
  ]
})
