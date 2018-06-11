import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationModule from './modules/authentication'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false
  },
  modules: {
    authentication: AuthenticationModule
  },
  mutations: {
    LOGIN: (state) => {
      state.isAuthenticated = true
    },
    LOGOUT: (state) => {
      state.isAuthenticated = false
    }
  }
})
