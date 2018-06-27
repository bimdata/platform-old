<template>
    <div>
        <b-card class="shadow-sm login">
            <login-pages-logo></login-pages-logo>
            <LoginForm></LoginForm>
            <transition name="slide">
                <p class="login__account-link ">{{ $t("login.dont_have_account") }} <router-link :to="{name: 'signup'}">{{ $t("login.free_signup") }}</router-link></p>
            </transition>
        </b-card>
    </div>
</template>
<script>
import LoginForm from '@/components/authentication/LoginForm'
import { mapActions } from 'vuex'
import LoginPagesLogo from '@/components/authentication/LoginPagesLogo'

export default {
  name: 'PageLogin',
  methods: {
    ...mapActions([
      'setLang'
    ])
  },
  components: {
    LoginForm,
    LoginPagesLogo
  }
}
</script>

<style scoped>

</style>
