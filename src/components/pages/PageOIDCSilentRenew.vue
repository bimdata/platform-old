<template>
  <div></div>
</template>
<script>
import { vuexOidcProcessSilentSignInCallback } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'

export default {
  mounted () {
    vuexOidcProcessSilentSignInCallback(oidcSettings)
  }
}
</script>
