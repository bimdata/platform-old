<template>
    <div>
        <b-form @submit="checkLoginForm">
            <div v-if="getHasErrors && getGlobalErrors.length > 0">
                <li v-for="error in getGlobalErrors" :key="error">{{ error }}</li>
            </div>
            <b-form-group id="username-group"
                          label=""
                          label-for="username-login">
                <b-form-input id="username-login"
                              required
                              placeholder="Username"
                              type="text"
                              v-model="username">
                </b-form-input>
                <template v-if="getUsername.errors.length > 0">
                    <li v-for="error in getUsername.errors" :key="error">{{ error }}</li>
                </template>
            </b-form-group>
            <b-form-group id="password-group"
                          label=""
                          label-for="password-login"
                          description="">
                <b-form-input id="password-login"
                              required
                              placeholder="Password"
                              type="password"
                              v-model="password">
                </b-form-input>
                <template v-if="getPassword.errors.length > 0">
                    <li v-for="error in getPassword.errors" :key="error">{{ error }}</li>
                </template>
                <transition name="slide">
                    <router-link class="login__forgot-password" :to="{name: 'forgot-password'}">{{ $t("message.login_forgot_password") }}</router-link>
                </transition>
            </b-form-group>
            <b-button class="login__submit" type="submit" variant="primary">Submit</b-button>
            <b-dropdown-divider></b-dropdown-divider>
        </b-form>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LoginForm',
  methods: {
    checkLoginForm () {
      let validity = this.isValidForm
      if (validity) {
        this.$store.dispatch('authentication/login').then(
          response => {
          },
          reject => {
            this.$store.commit('authentication/ADD_ERROR_GLOBAL', 'Bad credentials')
          })
      }
    },
    isValidUsername () {
      var validity = true
      if (this.$store.getters['authentication/getUsername'].value.length < 1) {
        validity = false
        this.$store.dispatch('authentication/addError', {field: 'username', message: 'Required field'})
      }

      return validity
    },
    isValidPassword () {
      var validity = true
      if (this.$store.getters['authentication/getPassword'].value.length < 1) {
        validity = false
        this.$store.dispatch('authentication/addError', {field: 'password', message: 'Required field'})
      }

      return validity
    }
  },
  computed: {
    ...mapGetters('authentication', [
      'getUsername',
      'getPassword',
      'getGlobalErrors',
      'getHasErrors'
    ]),
    username: {
      get () {
        return this.getUsername.value
      },
      set (value) {
        this.$store.commit('authentication/UPDATE_USERNAME', value)
      }
    },
    password: {
      get () {
        return this.getPassword.value
      },
      set (value) {
        this.$store.commit('authentication/UPDATE_PASSWORD', value)
      }
    },
    isValidForm () {
      this.$store.commit('authentication/RESET_ERRORS')
      this.isValidUsername()
      this.isValidPassword()
      return !this.getHasErrors
    }
  }
}
</script>
