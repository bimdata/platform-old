<template>
    <div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '@/router'
import request from 'axios'

export default {
  name: 'OidcCallback',
  methods: {
    ...mapActions([
      'oidcSignInCallback'
    ]),
    getCode () {
      let searchParams = new URLSearchParams(window.location.hash)
      return searchParams.get('code')
    },
    async sendCodeToBackPlatform (payload) {
      request.defaults.baseURL = process.env.BD_PLATFORM_BACK_BASE_URL
      request.defaults.headers.post['Content-Type'] = 'application/json'

      try {
        const response = await request.post('back_callback/', payload)
        return response
      } catch (err) {
        console.log('error: ' + err)
      }
    }
  },
  mounted () {
    this.oidcSignInCallback()
      .then((redirectPath) => {
        sessionStorage.setItem('hasEverConnected', true)
        let nonce = sessionStorage.getItem('last_nonce')
        let payload = {
          code: this.getCode(),
          nonce: nonce
        }

        this.sendCodeToBackPlatform(payload).then(() => {
          setTimeout(() => {
            router.push(redirectPath)
          }, 2000)
        })
      })
      .catch((err) => {
        console.log(err)
        router.push('/oidc-callback-error') // Handle errors any way you want
      })
  }
}
</script>
