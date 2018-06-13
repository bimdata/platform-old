<template>
    <div>
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
            <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>
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
        error: ''
      },
      password: {
        value: '',
        error: ''
      },
      passwordConfirmation: {
        value: '',
        error: ''
      },
      firstname: {
        value: '',
        error: ''
      },
      lastname: {
        value: '',
        error: ''
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
      if (this.password.value !== this.passwordConfirmation.value) {
        this.password.error = 'not the same password'
      }

      return !this.hasErrorsForm
    },
    hasErrorField (field) {
      return !!this[field].error.length
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
