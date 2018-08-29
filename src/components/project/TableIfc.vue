<template>
    <base-table-spaced :values="ifcs"
                       :fields="fields">
        <template slot="name" slot-scope="data">
            {{ data.item.name| truncate(18) }}
        </template>
        <template slot="author" slot-scope="data" v-if="data.item.author !== undefined">
            {{ data.item.author.firstname + ' ' + data.item.author.lastname }}
        </template>
        <template slot="last_modify" slot-scope="data">
            {{ data.item.last_modify|formatDate }}
        </template>
        <template slot="state" slot-scope="data">
            <svgicon height="22" width="22" v-if="getState(data.item.state) === 'ko'"
                     name="close-circle" color="#C11E07"></svgicon>
            <svgicon height="22" width="22" v-if="getState(data.item.state) === 'ok'"
                     name="check-circle" color="#219434"></svgicon>
            <template v-if="getState(data.item.state) === 'loading'">
                loading
            </template>
        </template>
        <template slot="actions" slot-scope="data">
            <base-button-action v-if="data.item.actions.status === 'C'" size="small" @click="viewIfc(data.item.actions)" icon-position="right" icon-name="play">Visionner</base-button-action>
        </template>
    </base-table-spaced>
</template>
<script>
import BaseTableSpaced from '@/components/base-components/BaseTableSpaced'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
export default {
  data () {
    return {
      fields: [
        {key: 'name', label: 'Nom'},
        {key: 'type', label: 'Type'},
        {key: 'author', label: 'Créateur'},
        {key: 'last_modify', label: 'Modifié le'},
        {key: 'state', label: 'Etat'},
        {key: 'actions', label: ''}
      ]
    }
  },
  components: {
    BaseTableSpaced,
    BaseButtonAction
  },
  computed: {
    ifcs () {
      let ifcs = []
      for (let ifc of this.$store.getters['project/getSortedIfc']) {
        ifcs.push(
          [
            { name: ifc.name },
            { type: 'IFC' },
            { author: ifc.creator },
            { last_modify: ifc.updated_at },
            { state: ifc.status },
            { actions: {
              cloudId: this.$store.state.project.selectedCloud.id,
              projectId: this.$store.state.project.selectedProject.id,
              ifcId: ifc.id,
              status: ifc.status
            }
            }
          ]
        )
      }

      return ifcs
    }
  },
  methods: {
    viewIfc (ifcData) {
      this.$router.push({name: 'viewer', params: ifcData})
    },
    getState (state) {
      switch (state) {
        case 'C':
          return 'ok'
        case 'D':
        case 'E':
          return 'ko'
        default:
          return 'loading'
      }
    }
  },
  created () {
  }
}
</script>
