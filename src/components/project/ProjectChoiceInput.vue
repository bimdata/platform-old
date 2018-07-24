<template>
    <div>
        <base-choice-list :options="options"
                          :value="selected"
                          v-model="selected">
        </base-choice-list>
    </div>
</template>
<script>
import BaseChoiceList from '@/components/base-components/BaseChoiceList'

export default {
  data () {
    return {
      selected: { value: 'CN', text: 'CHINA' },
      options: [
        { value: 'AU', text: 'Australia' },
        { value: 'CA', text: 'Canada' },
        { value: 'CN', text: 'China' },
        { value: 'DE', text: 'Germany' },
        { value: 'JP', text: 'Japan' },
        { value: 'MX', text: 'Mexico' },
        { value: 'CH', text: 'Switzerland' },
        { value: 'US', text: 'United States' }
      ]
    }
  },
  components: {
    BaseChoiceList
  }
}
</script>
