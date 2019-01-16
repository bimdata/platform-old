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
                    <base-button-action size="small">
                      {{ $t('dashboard.profile_btn')  }}
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
import { mapActions, mapGetters } from 'vuex'

import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseDropdown from '@/components/base-components/BaseDropdown'

export default {
  components: {
    BaseButtonAction,
    BaseDropdown
  },
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
