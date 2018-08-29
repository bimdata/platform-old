// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as svgicon from 'vue-svgicon'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { i18n } from './setup/i18n-setup'
import store from './store'
import { VueSelect } from 'vue-select'
import moment from 'moment'

Vue.component('v-select', VueSelect)

Vue.use(svgicon, {
  tagName: 'svgicon'
})

Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY hh:mm')
  }
})

/* eslint-disable no-new */
const AppRoot = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  strict: true,
  components: { App },
  template: '<App/>',
  created () {
    // Init config
    this.$store.dispatch('init')
  }
})

window.appRoot = App

export default AppRoot
