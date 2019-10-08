<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div>
        <base-choice-list :options="options"
                          icon="cloud"
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
      selected: {},
      options: []
    }
  },
  components: {
    BaseChoiceList
  },
  watch: {
    selected ({ value }) {
      let cloud = this.$store.getters.getCloudById(value)
      this.$store.commit('project/SET_CLOUD', cloud)
    }
  },
  created () {
    let clouds = this.$store.getters['getCloudsDetails']
    let currentCloud = this.$store.getters['getCurrentCloud']
    for (let {id, name} of clouds) {
      let listItem = {value: id, text: name}

      if (id === currentCloud.id) {
        this.selected = listItem
      }

      this.options.push(listItem)
    }
  }
}
</script>
