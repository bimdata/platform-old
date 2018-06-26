<template>
    <div>
        <b-card class="shadow-sm forgot-password">
            <div class="login__head-login text-center">
                <img class="login__logo" src="../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
                <p class="login__baseline">{{ $t("login.baseline") }}</p>
            </div>
            <p>{{ $t('login.reset_password_text_info') }}</p>
            <b-alert id="error-message-reset-password"
                     variant="danger"
                     :show="hasServerError || hasInvalidResetToken">
                <span id="error-server" v-show="hasServerError">{{ $t('form.server_error') }}</span>
                <span id="error-invalid-token" v-show="hasInvalidResetToken">{{ $t('login.invalid_reset_token') }}</span>
            </b-alert>
            <b-alert id="success-message-reset-password"
                     variant="success"
                     :show="isSuccessfull">
                {{ $t('login.reset_password_success') }}
            </b-alert>
            <b-form @submit.prevent="handleResetPassword">
                <div id="error">
                <template v-if="error">
                    {{ error }}
                </template>
                </div>
                <b-form-group id="resetpassword-group"
                              label=""
                              label-for="resetpassword-password"
                              description="">
                    <b-form-input id="resetpassword-password"
                                  :placeholder="$t('login.password')"
                                  :state="getState('password')"
                                  v-model="form.password"
                                  type="password">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputPasswordFeedback">
                        {{ $t('form.required_field') }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="resetpassword-group"
                              label=""
                              label-for="resetpassword-password-confirmation"
                              description="">
                    <b-form-input id="resetpassword-password-confirmation"
                                  :placeholder="$t('login.password_confirmation')"
                                  :state="getState('passwordConfirmation')"
                                  v-model="form.passwordConfirmation"
                                  type="password">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputPasswordConfirmationFeedback">
                        {{ $t('form.same_password_needed') }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-button type="submit" class="form__button--large" variant="primary">{{ $t('form.submit') }}</b-button>
            </b-form>
        </b-card>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'PageLoginResetPassword',
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      password: {
        required
      },
      passwordConfirmation: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  data () {
    return {
      isSubmittedForm: false,
      hasServerError: false,
      hasInvalidResetToken: false,
      isSuccessfull: false,
      form: {
        password: '',
        passwordConfirmation: ''
      },
      error: '',
      token: ''
    }
  },
  methods: {
    ...mapActions('authentication', [
      'resetPassword'
    ]),
    async handleResetPassword () {
      this.isSubmittedForm = true
      if (!this.$v.form.$invalid) {
        try {
          const response = await this.resetPassword({reset_token: this.token, new_password: this.form.password})
          console.log(response)
          this.isSuccessfull = true
        } catch (e) {
          this.isSubmittedForm = false
          switch (e.message) {
            case 'invalid_reset_token':
              this.hasInvalidResetToken = true
              break

            case 'server_error':
              this.hasServerError = true
              break
          }
        }
      }
    },
    getState (fieldName) {
      if (this.isSubmittedForm) {
        if (fieldName === 'password') {
          if (this.$v.form.passwordConfirmation.$invalid) {
            return null
          }

          return !this.$v.form[fieldName].$invalid
        } else if (fieldName === 'passwordConfirmation') {
          if (this.$v.form.password.$invalid && !this.$v.form.passwordConfirmation.$invalid) {
            return null
          } else {
            return !this.$v.form.passwordConfirmation.$invalid
          }
        }
      }

      return null
    }
  },
  computed: {
    hasError () {
      return !!this.error.length
    }
  },
  created () {
    this.token = this.$router.currentRoute.query.reset_token
  }
}
</script>

<style scoped>

</style>
