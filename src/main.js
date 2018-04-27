// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import store from './store';
import { pad } from '@/services/utils';
import VueAnalytics from 'vue-analytics'

Vue.use(Vuex);
Vue.config.productionTip = false;

Vue.filter('pad', value => {
  return pad(value, 2);
});

Vue.use(VueAnalytics, {
  id: 'UA-93913497-1'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

console.log('Coded with love by 👨🏻‍💻 Luc Dandrel and design by 👩🏻‍🎨 Evie Bauland')
