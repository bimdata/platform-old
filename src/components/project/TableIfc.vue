<template>
    <base-table-spaced :values="ifcs"
                       :fields="fields">
        <template slot="HEAD_name" slot-scope="data">
            {{ $t('project.name') }}
        </template>
        <template slot="HEAD_author" slot-scope="data">
            {{ $t('project.creator') }}
        </template>
        <template slot="HEAD_last_modify" slot-scope="data">
            {{ $t('project.updated_at') }}
        </template>
        <template slot="HEAD_state" slot-scope="data">
            {{ $t('project.state') }}
        </template>
        <template slot="name" slot-scope="data">
            {{ data.item.name | middle-truncate(32) }}
        </template>
        <template slot="author" slot-scope="data" v-if="data.item.author !== undefined">
            {{ data.item.author.firstname + ' ' + data.item.author.lastname }}
        </template>
        <template slot="last_modify" slot-scope="data">
            {{ data.item.last_modify | formatDate }}
        </template>
        <template slot="state" slot-scope="data">
            <svgicon height="22" width="22" v-if="getState(data.item.state) === 'ko'"
                     name="close-circle" color="#C11E07"></svgicon>
            <svgicon height="22" width="22" v-if="getState(data.item.state) === 'ok'"
                     name="check-circle" color="#219434"></svgicon>
            <template v-if="getState(data.item.state) === 'loading'">
                <div class="loader-blobs">
                  <div class="blob-center"></div>
                  <div class="blob"></div>
                  <div class="blob"></div>
                  <div class="blob"></div>
                  <div class="blob"></div>
                  <div class="blob"></div>
                  <div class="blob"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                      <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                        <feBlend in="SourceGraphic" in2="goo" />
                      </filter>
                    </defs>
                  </svg>
                </div>
            </template>
        </template>
        <template slot="actions" slot-scope="data">
            <base-button-action v-if="data.item.actions.status === 'C'" size="small" @click="viewIfc(data.item.actions)" icon-position="right" icon-name="play">{{ $t('project.view') }}</base-button-action>
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
        {key: 'name', label: 'Nom', width: '37%'},
        {key: 'author', label: 'Créateur', width: '20%'},
        {key: 'last_modify', label: 'Modifié le', width: '13%'},
        {key: 'state', label: 'Etat', width: '10%'},
        {key: 'actions', label: '', width: '20%'}
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
      // Only check if there if one customized viewer.
      // If there is more than 1, only the first will be used.
      // TODO: menu to select the viewer to launch
      let customViewers = this.$store.state.project.selectedCloud.features.filter(f => f.viewer_url)
      if (customViewers.length > 0) {
        ifcData.customUrl = customViewers[0].viewer_url
      }
      this.$router.push({ name: 'viewer', params: ifcData })
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
