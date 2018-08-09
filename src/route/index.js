import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import home from '@/page/home'
import search from '@/page/common/search'
import login from '@/page/user/login'
export default new VueRouter({
  mode:'history',
  routes:[{
    path:'/',
    redirect:'/home',
  },{
    path:'/home',
    component:home,
  },{
    path:'/search',
    component:search,
  },{
    path:'/login',
    component:login
  }]
})
