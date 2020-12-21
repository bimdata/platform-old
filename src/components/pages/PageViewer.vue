<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="h-100">
        <iframe :src="viewerUrl" width="100%" height="100%" class="no-borders" v-if="iframeViewer === true"></iframe>
        <div
          :id="viewerId"
          v-else
        />
    </div>
</template>
<script>
import { set, merge } from 'lodash'

import { mapGetters, mapMutations } from 'vuex'
import makeBIMDataViewer from '@bimdata/viewer'
import bimObjectPlugin from '@bimdata/bimobject-viewer-plugin'
import iotPlugin from '@bimdata/iot-viewer-plugin'
import gltfExtractorPlugin from '@bimdata/gltf-extractor-viewer-plugin'
import svgExtractorPlugin from '@bimdata/svg-extractor-viewer-plugin'
import realiz3DPlugin from '@bimdata/realiz3d-viewer-plugin'
import backgroundColorPlugin from '@bimdata/background-color-viewer-plugin'
import idexPlugin from '@bimdata/idex-viewer-plugin'
import ChristmasSleighPlugin from '@bimdata/christmas-sleigh-viewer-plugin'

const availablePlugins = {
  bimobject: bimObjectPlugin,
  iot: iotPlugin,
  gltfExtractor: gltfExtractorPlugin,
  svgExtractor: svgExtractorPlugin,
  realiz3D: realiz3DPlugin,
  backgroundColor: backgroundColorPlugin,
  idex: idexPlugin
}

export default {
  data () {
    return {
      viewerId: 'bimdataViewerId',
      viewerUrl: null,
      iframeViewer: null,
      cfg: null
    }
  },
  computed: {
    ...mapGetters(['oidcAccessToken', 'getCloudById', 'getCustomUrl'])
  },
  methods: {
    ...mapMutations({
      mutateCurrentCloud: 'SET_CURRENT_CLOUD'
    }),
    setCurrentCloud () {
      const cloud = this.getCloudById(this.$route.params.cloudId)
      this.mutateCurrentCloud(cloud)
    },
    createViewer (params, callback) {
      if (this.getCustomUrl === 'old_viewer') {
        this.iframeViewer = true
        this.viewerUrl = `${process.env.BD_VIEWER_BASE_URL}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else if (this.getCustomUrl) {
        this.iframeViewer = true
        this.viewerUrl = `${this.getCustomUrl}/?cloudId=${params.cloudId}&projectId=${params.projectId}&ifcId=${params.ifcId}&accessToken=${this.oidcAccessToken}`
      } else {
        fetch(
          `${process.env.BD_API_BASE_URL}/cloud/${params.cloudId}/project/${params.projectId}/ifc/${params.ifcId}`,
          {
            headers: {'Authorization': `Bearer ${this.oidcAccessToken}`}
          }
        ).then(res => {
          return res.json()
        }).then(ifcData => {
          this.iframeViewer = false

          const plugins = {
            header: {
              warnings: false
            },
            split: true,
            'structure-properties': {
              merge: true,
              export: true,
              editProperties: true
            }
          }
          merge(plugins, this.getBimdataPluginConfig())

          const bimdataViewer = makeBIMDataViewer({
            locale: this.$i18n.locale,
            api: {
              cloudId: params.cloudId,
              projectId: params.projectId,
              ifcIds: [params.ifcId],
              apiUrl: process.env.BD_API_BASE_URL,
              accessToken: this.oidcAccessToken
            },
            plugins
          })

          bimdataViewer.registerWindow({
            name: '2d',
            label: this.$t('viewer.2d_window'), // This is computed at viewer start and won't be updated later
            plugins: ['viewer2d', 'fullscreen'],
            flyingHeader: true
          })

          bimdataViewer.registerWindow({
            name: 'Structure',
            plugins: ['structure']
          })

          const pluginsToEnable = this.getPluginList()
          pluginsToEnable.forEach(bimdataViewer.registerPlugin)
          if (ifcData.world_position) {
            bimdataViewer.registerPlugin(ChristmasSleighPlugin)
          }
          const viewerVm = bimdataViewer.mount(`#${this.viewerId}`)
          this.$watch(() => this.$i18n.locale, locale => { viewerVm.$i18n.locale = locale })
          this.$watch(() => this.oidcAccessToken, token => bimdataViewer.setAccessToken(token))
        })
      }
      callback()
    },
    getPluginList () {
      return this.$store.state.currentCloud.features
        .filter(feature => feature.name.startsWith('viewer-plugin-'))
        .map(feature => feature.name.split('viewer-plugin-')[1])
        .map(pluginName => availablePlugins[pluginName])
        .filter(pluginName => !!pluginName) // remove non existing plugins
    },
    getBimdataPluginConfig () {
      return this.$store.state.currentCloud.features
        .filter(feature => feature.name.startsWith('viewer-bimdata-plugin-'))
        .map(feature => feature.name.split('viewer-bimdata-plugin-')[1])
        .map(name => name.split(':'))
        .reduce((acc, [featurePath, state]) => {
          const path = featurePath.split('.')
          set(acc, path, (state === 'true'))
          return acc
        }, {})
    }
  },
  mounted () {
    this.setCurrentCloud()
    const params = this.$route.params
    this.$store.commit('SET_LOADER_PAGE', true)
    let vm = this
    this.createViewer(params, function () {
      vm.$store.commit('SET_LOADER_PAGE', false)
    })
  }
}
</script>
