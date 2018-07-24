<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <!--<base-custom-select :options="baseCustomSelect.options" :searchable="false" label="countryName"></base-custom-select>-->
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <base-choice-list :options="baseChoiceList.options" @selected-option="test" :value="baseChoiceList.selected" v-model="baseChoiceList.selected"></base-choice-list>
            </div>
        </div>
    </div>
</template>
<script>
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
export default {
  data () {
    return {
      baseChoiceList: {
        selected: { value: 'AU', text: 'Australia' },
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
    }
  },
  components: {
    BaseChoiceList
  },
  methods: {
    test () {
      console.log(this.baseChoiceList.selected)
    }
  }
}
</script>
