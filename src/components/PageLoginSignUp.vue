<template>
    <div>
        <b-card class="shadow-sm signup">
            <div class="login__head-login text-center">
                <img class="login__logo" src="../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
            </div>
            <b-form @submit="handleSignUp">
                <b-form-group id="signup-group-username"
                              label=""
                              label-for="signup-username"
                              description="">
                    <b-form-input id="signup-username"
                                  required
                                  placeholder="Email"
                                  type="email"
                                  v-model="email.value">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="signup-group-password"
                              label=""
                              label-for="signup-password"
                              description="">
                    <b-form-input id="signup-password"
                                  required
                                  placeholder="Password"
                                  type="password"
                                  v-model="password.value">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="signup-group-password-confirmation"
                              label=""
                              label-for="signup-password-confirmation"
                              description="">
                    <b-form-input id="signup-password-confirmation"
                                  required
                                  placeholder="Password confirmation"
                                  type="password"
                                  :class="{'is-invalid': hasErrorField('password')}"
                                  v-model="passwordConfirmation.value">
                    </b-form-input>
                </b-form-group>
                <template v-if="hasErrorField('password')">{{ password.error }}</template>
                <b-form-group id="signup-group-firstname"
                              label=""
                              label-for="signup-firstname"
                              description="">
                    <b-form-input id="signup-firstname"
                                  required
                                  placeholder="firstname"
                                  type="text"
                                  v-model="firstname.value">
                    </b-form-input>
                </b-form-group>
                <b-form-group id="signup-group-lastname"
                              label=""
                              label-for="signup-lastname"
                              description="">
                    <b-form-input id="signup-lastname"
                                  required
                                  placeholder="lastname"
                                  type="text"
                                  v-model="lastname.value">
                    </b-form-input>
                </b-form-group>
                <b-button type="submit" class="form__button--large" variant="primary">{{ $t('message.login_register') }}</b-button>
                <b-dropdown-divider class="form__bottom-divider form__bottom-divider--spaced"></b-dropdown-divider>
                <transition name="slide">
                    <p class="login__account-link ">{{ $t("message.login_already_account") }} <router-link :to="{name: 'login'}">{{ $t("message.login_signin") }}</router-link></p>
                </transition>
            </b-form>
        </b-card>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageLoginSignUp',
  data () {
    return {
      errors: [],
      email: {
        value: '',
        error: '',
        validity: null
      },
      password: {
        value: '',
        error: '',
        validity: null
      },
      passwordConfirmation: {
        value: '',
        error: '',
        validity: null
      },
      firstname: {
        value: '',
        error: '',
        validity: null
      },
      lastname: {
        value: '',
        error: '',
        validity: null
      }
    }
  },
  methods: {
    ...mapActions('authentication', [
      'signUp'
    ]),
    handleSignUp () {
      if (this.isValidForm()) {
        this.signUp({
          email: this.email.value,
          firstname: this.firstname.value,
          lastname: this.lastname.value,
          password: this.password.value
        })
      }
    },
    isValidForm () {
      if (this.password.value.length > 0 && this.passwordConfirmation.value.length > 0 && this.password.value !== this.passwordConfirmation.value) {
        this.password.error = 'not the same password'
        this.password.validity = false
      }

      return !this.hasErrorsForm
    },
    hasErrorField (field) {
      return this[field].error.validity
    }
  },
  computed: {
    hasErrorsForm () {
      const fields = ['email', 'password', 'passwordConfirmation', 'firstname', 'lastname']
      fields.forEach((field) => {
        if (this.hasErrorField(field)) {
          return true
        }
      })

      return false
    }
  }
}
</script>

<style scoped>

</style>
