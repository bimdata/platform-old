<template>
    <span>
        <input type="button" @click="test" value="TEST"/> <p>test ok</p>
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
    test () {
      debugger
    },
    logout () {
      this.logoutUser()
    }
  }
}
</script>
