import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import home from '@/page/home'

export default new VueRouter({
  mode:'history',
  routes:[{
    path:'/',
    redirect:'/home',
  },{
    path:'/home',
    component:home,
  }]
})
