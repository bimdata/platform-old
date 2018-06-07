<template>
    <div>
        <input type="text" :username="username" @input="$emit('update:username', $event.target.value)" />
    </div>
</template>
<script>
export default {
  name: 'LoginFormInputUsername',
  props: {
    username: String
  }
}
</script>
