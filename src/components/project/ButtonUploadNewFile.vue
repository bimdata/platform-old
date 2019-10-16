<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <base-button-action icon-name="add"
                        icon-width="20"
                        icon-height="20"
                        icon-color="fff"
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
