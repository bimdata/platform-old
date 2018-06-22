<template>
    <div>
        <b-card class="shadow-sm signup">
            <div class="login__head-login text-center">
                <img class="login__logo" src="../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
                <p class="login__baseline">{{ $t("login.baseline") }}</p>
            </div>
            <b-form @submit.prevent="handleSignUp">
                <b-form-group id="signup-group-username"
                              label=""
                              label-for="signup-username"
                              description="">
                    <b-form-input id="signup-username"
                                  :placeholder="$t('login.email')"
                                  type="email"
                                  :state="getState('email')"
                                  v-model="form.email">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputUsernameLoginFeedback">
                        {{ $t('form.required_field') }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="signup-group-password"
                              label=""
                              label-for="signup-password"
                              description="">
                    <b-form-input id="signup-password"
                                  :placeholder="$t('login.password')"
                                  type="password"
                                  :state="getState('password')"
                                  v-model="form.password">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputPasswordLoginFeedback">
                        {{ $t('form.required_field') }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="signup-group-password-confirmation"
                              label=""
                              label-for="signup-password-confirmation"
                              description="">
                    <b-form-input id="signup-password-confirmation"
                                  :placeholder="$t('login.password_confirmation')"
                                  type="password"
                                  :state="getState('passwordConfirmation')"
                                  v-model="form.passwordConfirmation">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputPasswordConfirmationLoginFeedback">
                        <template v-if="!$v.form.passwordConfirmation.sameAs">{{ $t('form.same_password_needed') }}</template>
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="signup-group-firstname"
                              label=""
                              label-for="signup-firstname"
                              description="">
                    <b-form-input id="signup-firstname"
                                  :placeholder="$t('login.firstname')"
                                  type="text"
                                  :state="getState('firstname')"
                                  v-model="form.firstname">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputFirstnameLoginFeedback">
                        {{ $t('form.required_field') }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group id="signup-group-lastname"
                              label=""
                              label-for="signup-lastname"
                              description="">
                    <b-form-input id="signup-lastname"
                                  :placeholder="$t('login.lastname')"
                                  type="text"
                                  :state="getState('lastname')"
                                  v-model="form.lastname">
                    </b-form-input>
                    <b-form-invalid-feedback id="inputLastnameLoginFeedback">
                        {{ $t('form.required_field') }}
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-button type="submit" class="form__button--large" variant="primary">{{ $t('login.register') }}</b-button>
                <b-dropdown-divider class="form__bottom-divider form__bottom-divider--spaced"></b-dropdown-divider>
                <transition name="slide">
                    <p class="login__account-link ">{{ $t("login.already_account") }} <router-link :to="{name: 'login'}">{{ $t("login.signin") }}</router-link></p>
                </transition>
            </b-form>
        </b-card>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'PageLoginSignUp',
  mixins: [
    validationMixin
  ],
  data () {
    return {
      isSubmittedForm: false,
      form: {
        email: '',
        password: '',
        passwordConfirmation: '',
        firstname: '',
        lastname: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required
      },
      passwordConfirmation: {
        sameAsPassword: sameAs('password')
      },
      firstname: {
        required
      },
      lastname: {
        required
      }
    }
  },
  methods: {
    ...mapActions('authentication', [
      'signUp'
    ]),
    handleSignUp () {
      this.isSubmittedForm = true
      if (!this.$v.form.$invalid) {
        this.signUp({
          email: this.form.email,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          password: this.form.password
        })
      }
    },
    getState (fieldName) {
      if (this.isSubmittedForm) {
        if (fieldName !== 'passwordConfirmation') {
          return !this.$v.form[fieldName].$invalid
        } else {
          if (this.$v.form.password.$invalid && !this.$v.form.passwordConfirmation.$invalid) {
            return null
          } else {
            return !this.$v.form.passwordConfirmation.$invalid
          }
        }
      }

      return null
    }
  }
}
</script>

<style scoped>

</style>
