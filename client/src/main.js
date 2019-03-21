import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import store from './store/index'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './http'
import * as time from './filter/timeFomatter';

Vue.config.productionTip = false;
Vue.use(ElementUi)
Object.keys(time).forEach(k => Vue.filter(k, time[k]));
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')