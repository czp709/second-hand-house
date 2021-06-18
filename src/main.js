import Vue from 'vue'
import App from './App.vue'
import ElementUI from  'element-ui';
import router from './config/router.js'
import 'element-ui/lib/theme-chalk/index.css';
import '../public/css/main.css'
import echarts from 'echarts'
import axios from 'axios';
import qs from 'qs';
Vue.prototype.$qs = qs
// axios.defaults.headers['Context-Type'] = 'application/json'
Vue.prototype.axios = axios
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
