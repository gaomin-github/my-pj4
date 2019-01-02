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
import indexAjaxAndReg from '@/page/ajax/indexAjaxAndReg'
import freReqExp from '@/page/ajax/freReqExp'
import columnFall from '@/page/fallLayout/columnFall'
import rowFall from '@/page/fallLayout/rowFall'
// 首页/登录
import rzzcLogin from '@/page/rzzc/login'
import rzzcIndex from '@/page/rzzc/index'
import rzzcWelcome from '@/page/rzzc/welcome'
import addUser from '@/page/rzzc/users/addUser'
import router_2018 from '@/page/2018-12/router.js'
import router_hardRember from '@/page/hardRember/router.js'
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
    component:indexAjaxAndReg
  },
  // async process
  {
    path:'/frereqexp',
    component:freReqExp
  },

  // 瀑布流布局
  {
    path:'/columnfall',
    component:columnFall
  },
  {
    path:'/rowfall',
    component:rowFall
  },
  // 注册网站
  {
    path:'/rzzc',
    component:rzzcIndex,
    children:[
      {
        path:'/',
        redirect:'login'
      },
      {
        path: 'login',
        component: resolve => require(['@/page/rzzc/login'], resolve)
      },
      {
        path:'welcome',
        component: resolve => require(['@/page/rzzc/welcome'], resolve)
      },
      {
        path:'useradmin',
        component: resolve => require(['@/page/rzzc/users/userAdmin'], resolve)
      },
      {
        path:'adduser',
        component: resolve => require(['@/page/rzzc/users/addUser'], resolve)
      },
      {
        path:'moduser',
        component: resolve => require(['@/page/rzzc/users/modUser'], resolve)
      },
      {
        path:'deluser',
        component: resolve => require(['@/page/rzzc/users/delUser'], resolve)
      }
    ]
  },
    ...router_2018,
    ...router_hardRember
  ]
})

