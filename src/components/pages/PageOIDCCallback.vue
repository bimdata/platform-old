<template>
    <div>
      <div class="loader loader-redirect" v-show="displayLoader">
        <img
          class="logo-container__logo"
          src="../../assets/images/logo-page-loader.svg"
          width="150"
          height="200"
        />
      </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'

export default {
  name: 'OidcCallback',
  data () {
    return {
      displayLoader: true
    }
  },
  methods: {
    ...mapActions([
      'oidcSignInCallback'
    ]),
    async sendCodeToBackPlatform () {
      return fetch(process.env.BD_PLATFORM_BACK_BASE_URL + '/create_or_update_user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.oidcAccessToken
        }
      })
    }
  },
  computed: {
    ...mapGetters(['oidcAccessToken'])
  },
  async mounted () {
    try {
      const redirectPath = await this.oidcSignInCallback()
      await this.sendCodeToBackPlatform()
      router.push(redirectPath)
    } catch (err) {
      console.error(err)
      router.push('/oidc-callback-error') // Handle errors any way you want
    }
  }
}
</script>
