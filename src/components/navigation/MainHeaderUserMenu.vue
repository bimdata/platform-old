<template>
    <div class="user-menu">
        <span class="user-menu__pic">{{ picName }}</span>
        <b-dropdown
          :text="`${getCurrentUserFirstname} ${getCurrentUserLastname}`"
          size="lg"
          id="user-menu__ddown"
          class="user-menu__ddown"
          right
        >
            <div class="user-menu__u-info">
                <span class="user-menu__pic user-menu__pic--big">{{ picName }}</span>
                <div class="user-menu__u-info--details">
                    <p class="user-menu__u-fullname">{{ `${getCurrentUserFirstname} ${getCurrentUserLastname}` }}</p>
                    <p class="user-menu__u-email">{{ getCurrentUserEmail }}</p>
                    <base-button-action size="small">
                      {{ $t('dashboard.profile_btn')  }}
                    </base-button-action>
                </div>
            </div>
            <b-dropdown-divider></b-dropdown-divider>
            <div class="logout-item" @click="logout">
                {{ $t('dashboard.logout') }}
            </div>
        </b-dropdown>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

import BaseButtonAction from '@/components/base-components/BaseButtonAction'

export default {
  components: { BaseButtonAction },
  methods: {
    ...mapActions([
      'fetchUserData'
    ]
    ),
    ...mapActions('authentication', [
      'logoutUser'
    ]),
    logout () {
      this.logoutUser().then(resolve => {
        this.$router.push({name: 'login'})
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
  },
  created () {
    this.fetchUserData()
  }
}
</script>
