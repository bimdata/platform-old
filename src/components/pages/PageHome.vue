<template>
    <span>
        <input type="button" @click="logout" value="logout"/>
    </span>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  name: 'PageHome',
  methods: {
    ...mapActions('authentication', [
      'logoutUser'
    ]),
    logout () {
      this.logoutUser()
    }
  }
}
</script>
