<template>
    <div class="user-menu">
        <span class="user-menu__pic">{{ picName }}</span>
        <b-dropdown id="user-menu__ddown" size="lg" :text="userMenuName" class="user-menu__ddown m-2">
            <b-dropdown-item-button @click="logout">{{ $t('dashboard.logout') }}</b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
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
      'getCurrentUserId'
    ]),
    userMenuName () {
      return this.getCurrentUserFirstname
    },
    picName () {
      if (this.getCurrentUserFirstname !== undefined) {
        return this.getCurrentUserFirstname[0] + this.getCurrentUserLastname[0]
      } else {
        return ''
      }
    }
  },
  created () {
    this.fetchUserData()
  }
}
</script>
