// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import * as svgicon from 'vue-svgicon'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import { i18n } from './setup/i18n-setup'
import store from './store'
// import darkMode from '../node_modules/@bimdata/utils/dist/js/main.js'
import { VueSelect } from 'vue-select'
import '@/utils/filters'
import VueDarkMode from 'vuedarkmode'

Vue.use(VueDarkMode)

Vue.component('v-select', VueSelect)

Vue.use(svgicon, {
  tagName: 'svgicon'
})

Vue.use(BootstrapVue)
Vue.config.productionTip = false

/* eslint-disable no-new */
const AppRoot = new Vue({
  el: '#app',
  i18n,
  router,
  store,
  // darkMode,
  strict: true,
  components: { App },
  template: '<App/>'
})

window.appRoot = App

export default AppRoot
