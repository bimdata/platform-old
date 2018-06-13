<template>
    <div>
        <div>page login</div>
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
  components: {
    LoginForm
  }
}
</script>

<style scoped>

</style>
