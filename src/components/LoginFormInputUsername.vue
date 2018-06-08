<template>
    <div>
        <input type="text" v-model="username" @input="$emit('update:username', $event.target.value)" />
        <template v-if="getUsername.errors.length > 0">
            <li v-for="error in getUsername.errors" :key="error">{{ error }}</li>
        </template>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  name: 'LoginFormInputUsername',
  computed: {
    ...mapGetters('authentication', [
      'getUsername'
    ]),
    username: {
      get () {
        return this.$store.getters['authentication/getUsername'].value
      },
      set (value) {
        this.$store.commit('authentication/UPDATE_USERNAME', value)
      }
    }
  }
}
</script>
