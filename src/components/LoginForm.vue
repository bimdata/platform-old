<template>
    <div>
        <b-form @submit.prevent="checkLoginForm">
            <b-alert variant="danger"
                     :show="badCredentials">
                    {{ $t('message.login_bad_credentials') }}
            </b-alert>
            <b-form-group id="username-group"
                          label=""
                          label-for="username-login">
                <b-form-input id="username-login"
                              placeholder="Username"
                              type="text"
                              :state="getState('username')"
                              aria-describedby="inputFeedbackUsername"
                              v-model="form.username">
                </b-form-input>
                <b-form-invalid-feedback id="inputFeedbackUsername">
                    {{ $t('message.form_required_field') }}
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group id="password-group"
                          label=""
                          label-for="password-login"
                          description="">
                <b-form-input id="password-login"
                              placeholder="Password"
                              type="password"
                              :state="getState('password')"
                              aria-describedby="inputFeedbackPassword"
                              v-model="form.password">
                </b-form-input>
                <b-form-invalid-feedback id="inputFeedbackPassword">
                    {{ $t('message.form_required_field') }}
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
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  data () {
    return {
      isSubmittedForm: false,
      badCredentials: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    checkLoginForm () {
      this.isSubmittedForm = true
      if (!this.$v.form.$invalid) {
        this.$store.dispatch('authentication/login', {username: this.form.username, password: this.form.password}).then(
          response => { },
          reject => {
            this.isSubmittedForm = false
            this.badCredentials = true
          })
      }
    },
    getState (fieldName) {
      if (this.isSubmittedForm) {
        return !this.$v.form[fieldName].$invalid
      }

      return null
    }
  },
  computed: {
  }
}
</script>
