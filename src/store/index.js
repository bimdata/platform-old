import Vue from 'vue'
import Vuex from 'vuex'
import AuthenticationModule from './modules/authentication'
import UserModule from './modules/user'
import app from '../main'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    lang: 'fr'
  },
  modules: {
    authentication: AuthenticationModule,
    user: UserModule
  },
  mutations: {
    LOGIN: (state) => {
      state.isAuthenticated = true
    },
    LOGOUT: (state) => {
      state.isAuthenticated = false
    },
    SET_LANG: (state, payload) => {
      app.$i18n.locale = payload
      state.lang = payload
    }
  },
  actions: {
    setLang ({commit}, payload) {
      commit('SET_LANG', payload)
    }
  }
})
