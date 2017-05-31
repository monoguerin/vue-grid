// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueObserveVisibility from 'vue-observe-visibility/dist/vue-observe-visibility'
import App from './App'
import { store } from './store'

Vue.use(Vuex)
Vue.use(VueObserveVisibility)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store
})
