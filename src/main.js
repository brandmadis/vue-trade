import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueLogger from 'vuejs-logger'

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
  render: h => h(App),
}).$mount('#app')
