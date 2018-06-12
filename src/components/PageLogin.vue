<template>
    <div>
        <div>page login</div>
        <LoginForm></LoginForm>
        <transition name="slide">
            <router-link :to="{name: 'forgot-password'}">Mot de passe oublié</router-link>
        </transition>
    </div>
</template>
<script>
import LoginForm from './LoginForm'

export default {
  name: 'PageLogin',
  components: {
    LoginForm
  }
}
</script>

<style scoped>

</style>
