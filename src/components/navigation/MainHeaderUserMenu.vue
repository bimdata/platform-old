<template>
  <div class="user-menu col-2">
    <span class="user-menu__pic">{{ picName }}</span>
    <div class="user-menu__action" @click="toggleMenuOptions" v-on-clickaway="away">
      <div class="user-menu__u">
        <p class="user-menu__u-fullname">{{ `${getCurrentUserFirstname} ${getCurrentUserLastname}` }}</p>
        <p class="user-menu__u-email">{{ getCurrentUserEmail }}</p>
      </div>
      <span class="user-menu__u-picto">
        <svgicon name="chevron-right" width="20" :class="{'svg-right': displayMenuOptions}"></svgicon>
      </span>
    </div>
    <div class="user-menu__d" slot="base-dropdown-menu" v-show="displayMenuOptions">
      <div class="user-menu__d-content">
        <div @click="openProfile" size="small" iconName="" class="profile-item">
          <span><svgicon name="account" width="16"></svgicon></span>
          {{ $t('dashboard.profile_btn') }}
        </div>
        <div class="logout-item" @click="logout">
          <span><svgicon name="bimdata_power-settings"></svgicon></span>
          {{ $t('dashboard.logout') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { vuexOidcCreateUserManager } from 'vuex-oidc'
import { oidcSettings } from '@/config/OIDCSettings'
import { mapGetters } from 'vuex'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseDropdown from '@/components/base-components/BaseDropdown'

export default {
  components: {
    BaseButtonAction,
    BaseDropdown
  },
  mixins: [ clickaway ],
  data () {
    return {
      displayMenuOptions: false
    }
  },
  methods: {
    away () {
      this.displayMenuOptions = false
    },
    openProfile () {
      window.open(`${process.env.BD_OIDC_IP}/profile`)
    },
    toggleMenuOptions () {
      this.displayMenuOptions = !this.displayMenuOptions
    },
    logout () {
      const oidcUserManager = vuexOidcCreateUserManager(oidcSettings)
      oidcUserManager.signoutRedirect().catch(function (err) {
        this.$store.commit('setOidcError', err)
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters([
      'getCurrentUserFirstname',
      'getCurrentUserLastname',
      'getCurrentUserEmail',
      'getCurrentUserId'
    ]),
    picName () {
      return this.getCurrentUserFirstname
        ? (
          (this.getCurrentUserFirstname[0] + this.getCurrentUserLastname[0])
            .toUpperCase()
        ) : 'NN'
    }
  }
}
</script>
