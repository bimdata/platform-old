<template>
    <base-button-action icon-name="plus"
                        icon-width="20"
                        icon-height="20"
                        v-on="listeners">
        {{ $t('project.file') }}
    </base-button-action>
</template>
<script>
import BaseButtonAction from '../base-components/BaseButtonAction'

export default {
  components: {BaseButtonAction},
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    }
  }
}
</script>
