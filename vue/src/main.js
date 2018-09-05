import BootstrapVue from 'bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '../store/index'
import axios from 'axios'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost:5000';

Vue.use(BootstrapVue);
Vue.component('icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
