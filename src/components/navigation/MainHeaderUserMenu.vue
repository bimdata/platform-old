<template>
    <div class="user-menu">
        <span class="user-menu__pic">{{ picName }}</span>
        <base-dropdown :title="`${getCurrentUserFirstname} ${getCurrentUserLastname}`">
          <div slot="base-dropdown-menu">
            <div class="user-menu__u-info">
                <span class="user-menu__pic user-menu__pic--big">{{ picName }}</span>
                <div class="user-menu__u-info--details">
                    <p class="user-menu__u-fullname">{{ `${getCurrentUserFirstname} ${getCurrentUserLastname}` }}</p>
                    <p class="user-menu__u-email">{{ getCurrentUserEmail }}</p>
                    <base-button-action @click="openProfile" size="small">
                      {{ $t('dashboard.profile_btn') }}
                    </base-button-action>
                </div>
            </div>
            <b-dropdown-divider></b-dropdown-divider>
            <div class="logout-item" @click="logout">
                {{ $t('dashboard.logout') }}
            </div>
          </div>
        </base-dropdown>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseDropdown from '@/components/base-components/BaseDropdown'

export default {
  components: {
    BaseButtonAction,
    BaseDropdown
  },
  methods: {
    ...mapActions({
      signout: 'signout'
    }),
    openProfile () {
      window.open(`${process.env.BD_OIDC_IP}/profile`)
    },
    logout () {
      this.signout()
        .then(() => {
          this.$router.push({ name: 'signin-required' })
          window.location.reload()
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
