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
      {{ data.item.name | middle-truncate(90) }}
    </template>
    <template slot="author" slot-scope="data" v-if="data.item.author !== undefined">
      {{ data.item.author.firstname + ' ' + data.item.author.lastname }}
    </template>
    <template slot="last_modify" slot-scope="data">
      {{ data.item.last_modify | formatDate }}
    </template>
    <template slot="state" slot-scope="data">
      <svgicon height="22" width="22" v-if="getState(data.item.state) === 'ko'"
                name="close-circle" class="close-circle" color="#F40C0C" id="error-tooltip"></svgicon>
      <b-tooltip target="error-tooltip" :title="$t('project.error_conversion')" />
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
        <base-button-option v-if="isUserRole" @option-toggled="toggleMenuAction">
          <ul>
            <li @click="viewIfc(data.item.actions)">
              <svgicon name="play" width="13" height="13"></svgicon>
              {{ $t('project.view') }}
            </li>
            <li @click="downloadFile(data.item.actions.documentAction)">
              <svgicon name="download" width="13" height="13"></svgicon>
              {{ $t('project.download') }}
            </li>
            <li @click.stop.self="toggleRename(data.item.actions.documentAction)" :class="{'actif': displayRename}">
              <svgicon name="pencil" width="13" height="13"></svgicon>
              {{ $t('project.rename') }}

              <div class="new_folder_box rename" v-if="displayRename">
                <div class="new_folder_box__title">
                  {{ $t('project.rename_file') }}
                </div>
                <div class="base-input-text-material">
                  <input
                      :ref="`rename-${data.item.actions.documentAction.id}`"
                      type="text"
                      :placeholder="$t('project.file_name')"
                      required
                      v-model="renameFolder"
                      @keyup.enter="saveRename(data.item.actions.documentAction)"
                  >
                  <span class="highlight"></span>
                  <span class="bar"></span>
                </div>
                <div class="new_folder_box__button-validation">
                  <span @click="cancelRename">{{ $t('project.cancel') }}</span>
                  <span @click="saveRename(data.item.actions.documentAction)">{{ $t('project.validate') }}</span>
                </div>
              </div>
            </li>
            <li
                @click.stop.self="displayRemoveActions"
                class="base-button-option__menu__remove"
                :class="{'actif': showRemoveActions}"
            >
              <svgicon name="delete" width="13" height="13"></svgicon>
              {{ $t('project.delete') }}
              <transition name="slide-fade">
                <base-valid-delete v-if="showRemoveActions" @on-valid-action="remove(data.item.actions.documentAction)" @on-cancel-action="showRemoveActions = false"></base-valid-delete>
              </transition>
            </li>
          </ul>
        </base-button-option>
      </template>
  </base-table-spaced>
</template>
<script>
import { mapGetters } from 'vuex'
import { hasUserRole } from '@/utils/manageRights'
import BaseTableSpaced from '@/components/base-components/BaseTableSpaced'
import BaseButtonAction from '@/components/base-components/BaseButtonAction'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import _ from 'lodash'

export default {
  data () {
    return {
      renameFolder: '',
      displayRename: false,
      showRemoveActions: false,
      fields: [
        {key: 'name', label: 'Nom', width: '47%'},
        {key: 'author', label: 'Créateur', width: '20%'},
        {key: 'last_modify', label: 'Modifié le', width: '13%'},
        {key: 'state', label: 'Etat', width: '10%'},
        {key: 'actions', label: '', width: '10%'}
      ]
    }
  },
  props: {
    role: {
      type: Number,
      default: null
    }
  },
  components: {
    BaseTableSpaced,
    BaseButtonAction,
    BaseButtonOption,
    BaseValidDelete
  },
  computed: {
    ...mapGetters({
      getProjectById: 'getProjectById'
    }),
    ifcs () {
      let ifcs = []
      for (let ifc of _.sortBy(this.$store.state.project.ifcs, ['updated_at']).reverse()) {
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
              status: ifc.status,
              documentAction: ifc.document
            }
            }
          ]
        )
      }
      return ifcs
    },
    isUserRole () {
      return this.hasUserRole(this.role)
    },
    project () {
      return this.getProjectById(this.$route.params.projectId)
    }
  },
  methods: {
    hasUserRole,
    async remove (documentAction) {
      let type = 'IFC'
      let id = documentAction.id

      await this.$store.dispatch('project/remove', {type, id})

      this.toggleMenuAction(false)
      document.body.click()

      await this.$store.dispatch('project/fetchProjectIfc', this.project)
      await this.$store.dispatch('project/getTree', this.project)
    },
    async saveRename (documentAction) {
      let type = 'IFC'
      let id = documentAction.id
      let name = this.renameFolder

      await this.$store.dispatch('project/updateName', {type, id, name})

      this.toggleMenuAction(false)
      document.body.click()

      await this.$store.dispatch('project/fetchProjectIfc', this.project)
      await this.$store.dispatch('project/getTree', this.project)
    },
    cancelRename () {
      this.displayRename = false
    },
    displayRemoveActions () {
      this.showRemoveActions = !this.showRemoveActions
      this.displayRename = false
    },
    downloadFile (documentAction) {
      window.open(documentAction.file)
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
    },
    toggleMenuAction (isOpened) {
      if (!isOpened) {
        this.showRemoveActions = isOpened
        this.displayRename = isOpened
      }
    },
    toggleRename (documentAction) {
      this.displayRename = !this.displayRename
      this.showRemoveActions = false
      this.renameFolder = documentAction.name
      this.$nextTick(() => {
        this.$refs[`rename-${documentAction.id}`].focus()
        this.$refs[`rename-${documentAction.id}`].setSelectionRange(0, this.renameFolder.length)
      })
    },
    viewIfc (ifcData) {
      this.$router.push({ name: 'viewer', params: ifcData })
    }
  }
}
</script>
