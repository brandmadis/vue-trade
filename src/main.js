import Vue from 'vue'
import VueLogger from 'vuejs-logger';
import VeeValidate from 'vee-validate';
import './plugins/vuetify'

import {
  store
} from './_store';
import {
  router
} from './_helpers';
import App from './App.vue'


// import router from './router'
// import store from './store'

import Axios from 'axios'

Vue.use(VeeValidate);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

const options = {
  logLevel: 'debug',
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false
}

Vue.use(VueLogger, options)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')