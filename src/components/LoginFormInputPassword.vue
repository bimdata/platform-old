<template>
    <div>
        <input type="password" v-model="password" @input="$emit('update:password', $event.target.value)"  />
        <template v-if="getPassword.errors.length > 0">
            <li v-for="error in getPassword.errors" :key="error">{{ error }}</li>
        </template>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', [
      'getPassword'
    ]),
    password: {
      get () {
        return this.$store.getters['authentication/getPassword'].value
      },
      set (value) {
        this.$store.commit('authentication/UPDATE_PASSWORD', value)
      }
    }
  }
}
</script>
