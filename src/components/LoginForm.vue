<template>
    <div>
        <form>
            <LoginFormInputUsername :username.sync="username"></LoginFormInputUsername>
            <LoginFormInputPassword :password.sync="password"></LoginFormInputPassword>
            <LoginFormInputLoginButton @login="checkLoginForm"></LoginFormInputLoginButton>
        </form>
    </div>
</template>
<script>
import LoginFormInputUsername from './LoginFormInputUsername'
import LoginFormInputPassword from './LoginFormInputPassword'
import LoginFormInputLoginButton from './LoginFormInputLoginButton'

export default {
  name: 'LoginForm',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  components: {
    LoginFormInputUsername,
    LoginFormInputPassword,
    LoginFormInputLoginButton
  },
  methods: {
    checkLoginForm () {
      this.$store.dispatch('authentication/login', {username: this.username, password: this.password}).then(
        response => {
          debugger
        },
        reject => {
          debugger
        })
    }
  }
}
</script>
