<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="components__divider"></div>
                <h1>All components</h1>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Base Choices list</h3>
                <base-choice-list :options="baseChoiceList.options" @selected-option="test" :value="baseChoiceList.selected" v-model="baseChoiceList.selected"></base-choice-list>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Cards components</h3>
                <base-card></base-card>
            </div>
            <div class="col-12">
                <div class="components__divider"></div>
                <h3>Base action's button</h3>
                <h5>With icon</h5>
                <base-button-action icon-name="cloud">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Without icon</h5>
                <base-button-action>Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Small with icon</h5>
                <base-button-action size="small" icon-name="cloud">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Small without icon</h5>
                <base-button-action size="small">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Small with right icon</h5>
                <base-button-action size="small" icon-position="right" icon-name="chevron-right">Visionner</base-button-action>
                <div class="components__divider"></div>
                <h5>Full with button with icon</h5>
                <base-button-action size="fullwidth" icon-name="home">Ecrire une note</base-button-action>
            </div>
        </div>
    </div>
</template>
<script>
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseCard from '@/components/base-components/BaseCard'

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
      },
      baseTableSpaced: {}
    }
  },
  components: {
    BaseChoiceList,
    BaseButtonAction,
    BaseCard
  },
  methods: {
    test () {
      console.log(this.baseChoiceList.selected)
    }
  }
}
</script>
