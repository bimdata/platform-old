<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="user-menu">
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
        <div @click="openBimdataConnect" size="small" iconName="" class="connect-item">
          <span><svgicon name="picto-bimdataconnect" width="16"></svgicon></span>
          {{ $t('dashboard.connect_auth') }}
        </div>
        <div size="small" iconName="" class="switch-item">
          <span><svgicon name="switch-lang" width="16"></svgicon></span>
          <span v-for="locale in $i18n.availableLocales" :key="locale">
            <div class="base-input-radio">
              <input type="radio" :id="`MainHeaderUserMenu-${locale}`" name="MainHeaderUserMenuLocale" :value="locale" v-model="$i18n.locale">
              <label :for="`MainHeaderUserMenu-${locale}`">
                {{ locale }}
              </label>
            </div>
          </span>
        </div>
        <div class="logout-item" @click="signOutOidc">
          <span><svgicon name="bimdata_power-settings"></svgicon></span>
          {{ $t('dashboard.logout') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import { mapGetters, mapActions } from 'vuex'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseDropdown from '@/components/base-components/BaseDropdown'
import BaseInputRadio from '@/components/base-components/BaseInputRadio'

export default {
  components: {
    BaseButtonAction,
    BaseDropdown,
    BaseInputRadio
  },
  mixins: [ clickaway ],
  data () {
    return {
      displayMenuOptions: false
    }
  },
  methods: {
    ...mapActions([
      'signOutOidc'
    ]),
    away () {
      this.displayMenuOptions = false
    },
    openProfile () {
      const config = 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=650,height=700'
      const embed = window.open(`${process.env.BD_CONNECT_URL}/embed_profile`, 'targetWindow', config)
      var timer = setInterval(() => {
        if (embed.closed) {
          clearInterval(timer)
          document.location.reload()
        }
      }, 100)
    },
    openBimdataConnect () {
      window.open(process.env.BD_CONNECT_URL)
    },
    toggleMenuOptions () {
      this.displayMenuOptions = !this.displayMenuOptions
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
