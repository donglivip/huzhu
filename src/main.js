import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './vuex/rem'
import Vuex from 'vuex'
import store from './vuex/store'
import 'swiper/dist/css/swiper.css'
import FastClick from 'fastclick'
import axios from 'axios'
import dateTime from 'vue-date-time-m'

Vue.component('data-time', dateTime)
FastClick.attach(document.body)
Vue.config.productionTip = false
Vue.use(VueAwesomeSwiper)
Vue.prototype.$ajax = axios


Vue.filter('myimg',function(value){
	return 'https://www.wuyouhuzhu.com'+value
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
