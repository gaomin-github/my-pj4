// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './AppBak'
import route from './route'
import remO from '@/config/rem'
Vue.config.productionTip = false
remO.fontSizeReset()


Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router:route
})
