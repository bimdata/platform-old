<template>
    <div>
        <input type="password" :password="password" @input="$emit('update:password', $event.target.value)"  />
    </div>
</template>
<script>
export default {
  name: 'LoginFormInputPassword',
  data () {
    return {
      password: ''
    }
  }
}
</script>
