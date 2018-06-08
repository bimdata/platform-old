<template>
    <div>
        <form>
            <div v-if="hasErrors && globalErrors.length > 0">
                <li v-for="error in globalErrors" :key="error">{{ error }}</li>
            </div>
            <LoginFormInputUsername></LoginFormInputUsername>
            <LoginFormInputPassword></LoginFormInputPassword>
            <LoginFormInputLoginButton @login="checkLoginForm"></LoginFormInputLoginButton>
        </form>
    </div>
</template>
<script>
import LoginFormInputUsername from './LoginFormInputUsername'
import LoginFormInputPassword from './LoginFormInputPassword'
import LoginFormInputLoginButton from './LoginFormInputLoginButton'

export default {
  name: 'LoginForm',
  components: {
    LoginFormInputUsername,
    LoginFormInputPassword,
    LoginFormInputLoginButton
  },
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
    globalErrors () {
      return this.$store.getters['authentication/globalErrors']
    },
    hasErrors () {
      return this.$store.getters['authentication/hasErrors']
    },
    isValidForm () {
      this.$store.commit('authentication/RESET_ERRORS')
      this.isValidUsername()
      this.isValidPassword()
      return !this.$store.getters['authentication/getHasErrors']
    }
  }
}
</script>
