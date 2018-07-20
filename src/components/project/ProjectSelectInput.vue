<template>
    <base-select-input class="project-select" @change="test" :options="[{text: 'test', value: null}, 'un', 'deux']">
        <svgicon name="home"></svgicon>
    </base-select-input>
</template>
<script>
import BaseSelectInput from '@/components/base-components/BaseSelectInput'
export default {
  components: {
    BaseSelectInput
  },
  methods: {
    test () {
      console.log('teeest')
    }
  }
}
</script>
