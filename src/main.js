import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

import router from './router'
import store from './store'

axios.defaults.baseURL = 'https://xddd-eac7a.firebaseio.com';

axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(res => {
  return res
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
