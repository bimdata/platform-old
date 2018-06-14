<template>
    <div>
        <div><p>{{ $t("message.hello") }}</p></div>
        <button @click="setLang('fr')">fr</button>
        <button @click="setLang('en')">en</button>
        <LoginForm></LoginForm>
        <ul>
            <transition-group name="slide">
                    <li v-for="navItem in loginNavigation" :key="navItem.id">
                        <router-link :to="{name: navItem.name}">{{ navItem.text }}</router-link>
                    </li>
            </transition-group>
        </ul>
    </div>
</template>
<script>
import LoginForm from './LoginForm'
import { mapActions } from 'vuex'

export default {
  name: 'PageLogin',
  data () {
    return {
      loginNavigation: [
        {
          id: 1,
          name: 'forgot-password',
          text: 'Mot de passe oublié'
        },
        {
          id: 2,
          name: 'signup',
          text: 'M\'inscrire'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'setLang'
    ])
  },
  components: {
    LoginForm
  }
}
</script>

<style scoped>

</style>
