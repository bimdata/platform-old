<template>
    <div>
        <b-card class="shadow-sm forgot-password">
            <div class="login__head-login text-center">
                <img class="login__logo" src="../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
                <p class="login__baseline">{{ $t("login.baseline") }}</p>
            </div>
            <p>{{ $t('login.forgot_password_text_info') }}</p>
            <b-alert id="error-message-forgot-password"
                     variant="danger"
                     :show="hasServerError">
                <span id="error-server" v-show="hasServerError">{{ $t('form.server_error') }}</span>
            </b-alert>
            <b-alert id="success-message-forgot-password"
                     variant="success"
                     :show="isSuccessfull">
                {{ $t('login.ask_reset_password_success') }}
            </b-alert>
            <b-form @submit.prevent="handleForgotPassword">
                <b-form-group id="forgotpassword-group"
                              label=""
                              label-for="forgotpassword-username"
                              description="">
                    <b-form-input id="forgotpassword-username"
                                  :placeholder="$t('login.email')"
                                  :state="emailState"
                                  type="email"
                                  aria-describedby="input1LiveFeedback"
                                  v-model="form.email">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputUsernameFeedback">
                        This is a required field
                    </b-form-invalid-feedback>
                    <template v-if="error">
                        {{ error }}
                    </template>
                </b-form-group>
                <b-button type="submit" class="form__button--large" variant="primary">{{ $t('form.submit') }}</b-button>
                <b-dropdown-divider class="form__bottom-divider form__bottom-divider--spaced"></b-dropdown-divider>
                <transition name="slide">
                    <p class="login__account-link ">{{ $t("login.already_account") }} <router-link :to="{name: 'login'}">{{ $t("login.signin") }}</router-link></p>
                </transition>
            </b-form>
        </b-card>
    </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  name: 'PageLoginForgotPassword',
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      email: {
        required
      }
    }
  },
  data () {
    return {
      isSubmittedForm: false,
      hasServerError: false,
      isSuccessfull: false,
      form: {
        email: ''
      },
      error: ''
    }
  },
  methods: {
    ...mapActions('authentication', [
      'forgotPassword'
    ]),
    async handleForgotPassword () {
      this.isSubmittedForm = true
      if (!this.$v.form.$invalid) {
        try {
          await this.forgotPassword(this.form.email)
          this.isSuccessfull = true
        } catch (e) {
          this.hasServerError = true
          this.isSubmittedForm = false
        }
      }
    }
  },
  computed: {
    emailState () {
      if (this.isSubmittedForm) {
        return !this.$v.form.email.$invalid
      }

      return null
    }
  }
}
</script>

<style scoped>

</style>
