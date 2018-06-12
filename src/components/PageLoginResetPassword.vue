<template>
    <div>
        <b-form @submit="handleResetPassword">
            <b-form-group id="resetpassword-group"
                          label=""
                          label-for="resetpassword-username"
                          description="">
                <b-form-input id="resetpassword-password"
                              required
                              placeholder="Password"
                              :class="{'is-invalid': hasError}"
                              v-model="password"
                              type="password">
                </b-form-input>
                <b-form-input id="resetpassword-username"
                              required
                              placeholder="confirmation password"
                              :class="{'is-invalid': hasError}"
                              v-model="passwordConfirmation"
                              type="password">
                </b-form-input>
                <b-button type="submit" variant="primary">Submit</b-button>
                <template v-if="error">
                    {{ error }}
                </template>
            </b-form-group>
        </b-form>
    </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageLoginResetPassword',
  data () {
    return {
      password: '',
      passwordConfirmation: '',
      error: '',
      token: ''
    }
  },
  methods: {
    ...mapActions('authentication', [
      'resetPassword'
    ]),
    handleResetPassword () {
      if (this.password !== this.passwordConfirmation) {
        this.error = 'same passwords needed'
      } else {
        this.resetPassword({reset_token: this.token, new_password: this.password})
      }
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
