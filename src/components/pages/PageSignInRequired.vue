<template>
    <div>
        sign in required
        <button @click="redirectLogin">Redirect</button>
    </div>
</template>
<script>
import { vuexOidcCreateUserManager } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

export default {
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
