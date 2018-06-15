<template>
    <div>
        <b-card class="shadow-sm login">
            <div class="login__head-login text-center">
                <img class="login__logo" src="../assets/images/logo-bimdata-carre.svg" width="100" height="100"/>
                <p class="login__baseline">{{ $t("message.login_baseline") }}</p>
            </div>
            <LoginForm></LoginForm>
            <ul>
                <transition name="slide">
                    <p>{{ $t("message.login_dont_have_account") }}<router-link :to="{name: 'signup'}">{{ $t("message.login_free_signup") }}</router-link></p>
                </transition>
            </ul>
        </b-card>
    </div>
</template>
<script>
import LoginForm from './LoginForm'
import { mapActions } from 'vuex'

export default {
  name: 'PageLogin',
  methods: {
    ...mapActions([
      'setLang'
    ])
  },
  components: {
    LoginForm
  }
}
</script>

<style scoped>

</style>
