<template>
    <div>
        <b-form @submit="handleForgotPassword">
            <b-form-group id="forgotpassword-group"
                          label=""
                          label-for="forgotpassword-username"
                          description="">
                <b-form-input id="forgotpassword-username"
                              required
                              placeholder="Email"
                              type="email"
                              v-model="email">
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
  name: 'PageLoginForgotPassword',
  data () {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    ...mapActions('authentication', [
      'forgotPassword'
    ]),
    handleForgotPassword () {
      this.forgotPassword(this.email)
    }
  }
}
</script>

<style scoped>

</style>
