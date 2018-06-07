<template>
    <div>
        <input type="button" value="Me connecter" @click="$emit('login')"  />
    </div>
</template>
<script>
export default {
  name: 'LoginFormInputLoginButton'
}
</script>
