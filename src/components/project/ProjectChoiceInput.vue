<template>
    <base-select-input class="project-select" :options="options" :value="selected" v-model="selected">
        <svgicon name="cloud"></svgicon>
    </base-select-input>
</template>
<script>
import BaseSelectInput from '@/components/base-components/BaseSelectInput'

export default {
  data () {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select a project' },
        { value: 'a', text: 'This is First option' }
      ]
    }
  },
  components: {
    BaseSelectInput
  }
}
</script>
