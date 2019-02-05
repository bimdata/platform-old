<template>
    <div>
      <div class="signin-required__card base-card" v-show="!displayLoader">
        <div class="signin-required__card__body">
          <img class="signin-required__card__logo" src="../../assets/images/logo-rectangle.svg" />
          <p class="signin-required__card__text">Better data for better projects !</p>
          <button @click="redirectLogin" class="btn btn-primary signin-required__card__btn">Login</button>
        </div>
      </div>
      <div class="loader loader-redirect" v-show="displayLoader">
        <img
          class="logo-container__logo"
          src="../../assets/images/logo-page-loader.svg"
          width="150"
          height="200"
        />
      </div>
    </div>
</template>
<script>
import { vuexOidcCreateUserManager } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

export default {
  data () {
    return {
      displayLoader: false
    }
  },
  methods: {
    getCurrentState () {
      let listOfStates = []
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        if (/^oidc\.[a-f0-9]{32}$/.test(localStorage.key(i))) {
          listOfStates.push(JSON.parse(localStorage.getItem(localStorage.key(i))))
        }
      }

      const currentState = listOfStates.reduce(function (oldValue, newValue) {
        let greaterValue = (oldValue.created > newValue.created) ? oldValue : newValue
        return greaterValue
      })

      return currentState
    },
    redirectLogin () {
      this.displayLoader = true
      const oidcUserManager = vuexOidcCreateUserManager(oidcSettings)
      oidcUserManager.signinRedirect().then(() => {
        let state = this.getCurrentState()
        sessionStorage.setItem('last_nonce', state.nonce)
      }).catch(function (err) {
        this.$store.commit('setOidcError', err)
        console.log(err)
      })
    }
  },
  mounted () {
    if (this.$route.query.redirect === 'auto') {
      this.redirectLogin()
    }
  }
}
</script>
