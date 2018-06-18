<template>
    <div>
        <b-form @submit.prevent="checkLoginForm">
            <b-alert variant="danger"
                     :show="globalErrors.length > 0">
                    {{ globalErrors }}
            </b-alert>
            <b-form-group id="username-group"
                          label=""
                          label-for="username-login">
                <b-form-input id="username-login"
                              placeholder="Username"
                              type="text"
                              :state="usernameState"
                              aria-describedby="inputFeedbackUsername"
                              v-model="username.value">
                </b-form-input>
                <b-form-invalid-feedback id="inputFeedbackUsername">
                    {{ username.error }}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="password-group"
                          label=""
                          label-for="password-login"
                          description="">
                <b-form-input id="password-login"
                              placeholder="Password"
                              type="password"
                              :state="passwordState"
                              aria-describedby="inputFeedbackPassword"
                              v-model="password.value">
                </b-form-input>
                <b-form-invalid-feedback id="inputFeedbackPassword">
                    {{ password.error }}
                </b-form-invalid-feedback>
                <transition name="slide">
                    <router-link class="login__forgot-password" :to="{name: 'forgot-password'}">{{ $t("message.login_forgot_password") }}</router-link>
                </transition>
            </b-form-group>
            <b-button class="login__submit form__button--large" type="submit" variant="primary">Submit</b-button>
            <b-dropdown-divider class="form__bottom-divider form__bottom-divider--spaced"></b-dropdown-divider>
        </b-form>
    </div>
</template>
<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      isSubmittedForm: false,
      hasErrors: false,
      globalErrors: '',
      username: {
        value: '',
        error: '',
        validity: null
      },
      password: {
        value: '',
        error: '',
        validity: null
      }
    }
  },
  methods: {
    checkLoginForm () {
      this.isSubmittedForm = true
      if (this.isValidForm) {
        this.$store.dispatch('authentication/login', {username: this.username.value, password: this.password.value}).then(
          response => { },
          reject => {
            this.hasErrors = true
            this.username.error = ''
            this.password.error = ''
            this.username.validty = null
            this.password.validty = null
            this.isSubmittedForm = false
            this.globalErrors = 'bad credentials'
          })
      }
    },
    isValidUsername () {
      let validity = true
      if (this.username.value.length < 1) {
        validity = false
        this.username.error = 'required field'
      }

      this.username.validity = validity
    },
    isValidPassword () {
      let validity = true
      if (this.password.value.length < 1) {
        validity = false
        this.password.error = 'required field'
      }

      this.password.validity = validity
    }
  },
  computed: {
    isValidForm () {
      this.isValidUsername()
      this.isValidPassword()

      return this.username.validity && this.password.validity
    },
    usernameState () {
      if (this.isSubmittedForm) {
        return this.username.validity
      }

      return null
    },
    passwordState () {
      if (this.isSubmittedForm) {
        return this.password.validity
      }

      return null
    }
  }
}
</script>
