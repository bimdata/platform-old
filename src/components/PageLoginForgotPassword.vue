<template>
    <div>
        <b-card class="shadow-sm forgot-password">
            <div class="login__head-login text-center">
                <img class="login__logo" src="../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
                <p class="login__baseline">{{ $t("message.login_baseline") }}</p>
            </div>
            <b-form @submit="handleForgotPassword">
                <b-form-group id="forgotpassword-group"
                              label=""
                              label-for="forgotpassword-username"
                              description="">
                    <b-form-input id="forgotpassword-username"
                                  placeholder="Email"
                                  :state="emailState"
                                  type="email"
                                  aria-describedby="input1LiveFeedback"
                                  v-model="form.email">
                    </b-form-input>
                    <b-form-invalid-feedback id="input1LiveFeedback">
                        This is a required field
                    </b-form-invalid-feedback>
                    <template v-if="error">
                        {{ error }}
                    </template>
                </b-form-group>
                <b-button type="submit" class="form__button--large" variant="primary">Submit</b-button>
                <b-dropdown-divider class="form__bottom-divider form__bottom-divider--spaced"></b-dropdown-divider>
                <transition name="slide">
                    <p class="login__account-link ">{{ $t("message.login_already_account") }} <router-link :to="{name: 'login'}">{{ $t("message.login_signin") }}</router-link></p>
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
    handleForgotPassword () {
      this.isSubmittedForm = true
      if (!this.$v.form.$invalid) {
        this.forgotPassword(this.form.email)
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
