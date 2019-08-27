<template>
  <div class="dms">
    <dms-breadcrumb @change-folder="changeFolder"></dms-breadcrumb>
      <div class="dms-container">
        <div class="dms__toolbox-selected" v-show="displaySelectedToolbox">
          <div class="toolbox-selected__content">
            <div class="dms__delete-button" @click="deleteElements">
              <svgicon name="delete" width="22" height="22"></svgicon>
              {{ $t('project.delete') }}
            </div>
            <div class="dms__move-button">
              <span class="container-button-move-top" @click="displayMoveTo">
                  <svgicon name="move" width="22" height="22"></svgicon>
                  {{ $t('project.move_to') }}
              </span>
              <base-tree-select
                v-if="displayTreeSelect"
                v-on-clickaway="closeMoveTo"
                @close="closeMoveTo"
                @chooseItem="moveItems"
                :tree="folderTree"
                :selected="selected"
                :initial-parent-node="getCurrentFolderId"
              ></base-tree-select>
            </div>
            <div class="dms__selected-display" @click="deselectAll">
              {{ $t('project.unselect_all') }} <span class="item-counter">{{ nbSelectedItems }}</span>
            </div>
          </div>
        </div>
        <div class="dms__toolbox noselect" v-show="!displaySelectedToolbox">
          <base-button-tool iconName="tree"
                            :class="{'is-active': isVisibleTreeView}"
                            @click="displayTreeView"
                            :tooltipLabel="isVisibleTreeView ? $t('project.close_tree_view') : $t('project.open_tree_view')"
          >
          </base-button-tool>
          <dms-upload-document v-if="isUserRole" class="base-button-tool__container"></dms-upload-document>
          <base-button-tool v-if="isUserRole" iconName="add-folder" @click="toggleAddFolderMenu" :tooltipLabel="$t('project.new_folder')">
            <div class="new_folder_box" v-show="addFolderMenu">
              <div class="new_folder_box__title">
                  {{ $t('project.create_folder') }}
              </div>
              <div class="base-input-text-material">
                <input
                  ref="createFolderInput"
                  @keyup.enter="saveFolder"
                  v-model="newFolderName"
                  :placeholder="$t('project.folder_name')"
                  type="text"
                  required
                >
                <span class="highlight"></span>
                <span class="bar"></span>
              </div>
                <div class="new_folder_box__button-validation">
                  <span @click="toggleAddFolderMenu">{{ $t('project.cancel') }}</span>
                  <span @click="saveFolder">{{ $t('project.validate') }}</span>
                </div>
            </div>
            <div class="new_folder_box__overlay" v-show="addFolderMenu" @click="toggleAddFolderMenu"></div>
          </base-button-tool>
          <span class="dms__search">
            <img src="../../assets/images/icons/search.svg" />
            <b-form-input v-model="filter" placeholder="Type to search" />
          </span>
        </div>
        <div class="dms__content" ref="filesContent" :class="{'shrinked': isVisibleTreeView}">
          <div ref="treeView" class="dms__tree-view">
              <dms-tree-view @close="closeTreeView"></dms-tree-view>
          </div>
            <div ref="listFiles" class="dms__list-files">
              <b-table
                  :items="filteredList"
                  :filter="filter"
                  class="bd-table"
                  :fields="fields"
              >
                <template slot="HEAD_selected" slot-scope="data" v-if="isUserRole">
                  <label
                      for="select-all"
                        @click="selectAllItems"
                        class="base-checkbox"
                  >
                    <input
                        v-model="selectAll"
                        id="select-all"
                        type="checkbox"
                    >
                    <span></span>
                  </label>
                </template>
                <template slot="HEAD_name" slot-scope="data">
                  {{ $t('project.name') }}
                </template>
                <template slot="HEAD_type" slot-scope="data">
                  {{ $t('project.type') }}
                </template>
                <template slot="HEAD_creator" slot-scope="data">
                  <list-choice
                      @selected-list-choice="setCreatorsList"
                      :label="$t('project.creator')"
                      :list="listCreatorUniq"
                      :nameInput="data.label"
                  ></list-choice>
                </template>
                <template slot="HEAD_date" slot-scope="data">
                  {{ $t('project.updated_at') }}
                </template>
                <template slot="HEAD_size" slot-scope="data">
                  {{ $t('project.size') }}
                </template>
                <template slot="selected" slot-scope="data" v-if="isUserRole">
                  <label
                    :for="'checkbox-'+ data.item.id"
                    class="base-checkbox"
                  >
                    <input
                      type="checkbox"
                      :id="'checkbox-'+ data.item.id"
                      :value="{type: data.item.idPrefix, id: data.item.id}"
                      v-model="selected"
                    >
                    <span></span>
                  </label>
                </template>
                <template slot="name" slot-scope="data">
                  <span @click="clickedFile({type: data.item.type, id: data.item.id})">
                    <template v-if="data.item.icon !== 'folder.svg'">
                      <img
                          :src="'/static/img/files-icons/' + data.item.icon"
                          width="20"
                      />
                      {{ data.item.name }}
                    </template>
                    <template v-else>
                      <span class="table-name__name">
                        <svgicon name="folder" width="20" height="26"></svgicon>
                        {{ data.item.name }}
                      </span>
                    </template>
                  </span>
                </template>
                <template slot="creator" slot-scope="data">
                  {{ data.value }}
                </template>
                <template slot="date" slot-scope="data">
                  {{ data.item.date|formatDate }}
                </template>
                <template slot="size" slot-scope="data">
                  <template v-if="data.item.size > 0">
                    {{ data.item.size|getFormattedSize }}
                  </template>
                </template>
                <template slot="action" slot-scope="documentAction">
                  <base-button-option @option-toggled="toggleMenuAction" v-if="isUserRole">
                    <ul>
                      <li @click="viewIfc(documentAction.item.ifcId)" v-if="documentAction.item.ifcId">
                        <svgicon name="play" width="13" height="13"></svgicon>
                        {{ $t('project.view') }}
                      </li>
                      <li @click="downloadFile(documentAction)" v-if="documentAction.item.type != 'Folder'">
                        <svgicon name="download" width="13" height="13"></svgicon>
                          {{ $t('project.download') }}
                      </li>
                      <li @click.stop.self="toggleRename(documentAction)" :class="{'actif': displayRename}">
                        <svgicon name="pencil" width="13" height="13"></svgicon>
                          {{ $t('project.rename') }}

                        <div class="new_folder_box rename" v-if="displayRename">
                          <div class="new_folder_box__title">
                            {{ $t((documentAction.item.idPrefix === 'folder') ? 'project.rename_folder' : 'project.rename_file') }}
                          </div>
                          <div class="base-input-text-material">
                            <input
                                :ref="`rename-${documentAction.item.id}`"
                                type="text"
                                :placeholder="$t('project.folder_name')"
                                required
                                v-model="renameFolder"
                                @keyup.enter="saveRename(documentAction)"
                            >
                            <span class="highlight"></span>
                            <span class="bar"></span>
                          </div>
                          <div class="new_folder_box__button-validation">
                            <span @click="cancelRename">{{ $t('project.cancel') }}</span>
                            <span @click="saveRename(documentAction)">{{ $t('project.validate') }}</span>
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
                          <base-valid-delete v-if="showRemoveActions" @on-valid-action="remove(documentAction)" @on-cancel-action="showRemoveActions = false"></base-valid-delete>
                        </transition>
                      </li>
                    </ul>
                  </base-button-option>
                </template>
              </b-table>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import DMSBreadcrumb from '@/components/project/DMSBreadcrumb'
import DMSTreeView from '@/components/project/DMSTreeView'
import BaseButtonTool from '@/components/base-components/BaseButtonTool'
import BaseTreeSelect from '@/components/base-components/BaseTreeSelect'
import BaseInputCheckbox from '@/components/base-components/BaseInputCheckbox'
import DMSUploadDocument from '@/components/project/DMSUploadDocument'
import BaseValidDelete from '@/components/base-components/BaseValidDelete'
import ListChoice from '@/components/project/ListChoice'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import { mixin as clickaway } from 'vue-clickaway'
import { hasUserRole } from '@/utils/manageRights'
import { checkIfFileIconExist } from '@/utils/fileIcons.js'
import _ from 'lodash'
import { mapState } from 'vuex'

export default {
  mixins: [ clickaway ],
  components: {
    'dms-breadcrumb': DMSBreadcrumb,
    'dms-tree-view': DMSTreeView,
    BaseButtonTool,
    BaseTreeSelect,
    BaseInputCheckbox,
    BaseButtonOption,
    ListChoice,
    BaseValidDelete,
    'dms-upload-document': DMSUploadDocument
  },
  data () {
    return {
      displayTreeSelect: false,
      isVisibleTreeView: true,
      selectAll: false,
      filter: null,
      selected: [],
      showRemoveActions: false,
      valueCreatorEvent: '',
      displayRename: false,
      renameFolder: '',
      fields: [
        {
          key: 'selected',
          label: '',
          class: 'table-selected'
        },
        {
          key: 'name',
          label: 'Name',
          class: 'table-name',
          sortable: true
        },
        {
          key: 'type',
          label: 'Type',
          class: 'table-type',
          sortable: true
        },
        {
          key: 'creator',
          label: 'Creator',
          formatter: 'formatCreatorCell',
          class: 'table-creator'
        },
        {
          key: 'date',
          label: 'Date',
          class: 'table-date',
          sortable: true
        },
        {
          key: 'size',
          label: 'Size',
          class: 'table-size',
          sortable: true
        },
        {
          key: 'action',
          label: '',
          class: 'table-action'
        }
      ],
      currentFolderItems: [],
      filesTree: [],
      listViewOriginalWidth: null,
      addFolderMenu: false,
      newFolderName: ''
    }
  },
  props: {
    role: {
      type: Number,
      default: null
    }
  },
  methods: {
    hasUserRole,
    async changeFolder (id) {
      this.$store.dispatch('project/changeFolder', id).then(() => {
        this.$store.dispatch('project/getPath').then((result) => {
        })
      })
    },
    async deleteElements () {
      await this.$store.dispatch('project/deleteDMSElements', this.selected)
      this.deselectAll()
    },
    async remove (documentAction) {
      let type = documentAction.item.type
      let id = documentAction.item.id

      await this.$store.dispatch('project/remove', {type, id})
      await this.$store.dispatch('project/fetchProjectIfc', this.project)

      this.toggleMenuAction(false)
      document.body.click()
    },
    async saveFolder () {
      if (this.newFolderName !== '') {
        await this.$store.dispatch('project/createFolder', this.newFolderName)
        this.addFolderMenu = false
      }
    },
    cancelRename () {
      this.displayRename = false
    },
    clickedFile ({type, id}) {
      if (type === 'Folder') {
        this.changeFolder(id)
      }
    },
    closeMoveTo () {
      this.displayTreeSelect = false
    },
    closeTreeView () {
      this.isVisibleTreeView = false
      this.$refs.listFiles.style.width = '100%'
    },
    deselectAll () {
      this.selectAll = false
      this.selected = []
    },
    displayMoveTo () {
      this.displayTreeSelect = !this.displayTreeSelect
    },
    displayRemoveActions () {
      this.showRemoveActions = !this.showRemoveActions
      this.displayRename = false
    },
    displayTreeView () {
      if (!this.isVisibleTreeView) {
        this.isVisibleTreeView = true
        this.listViewOriginalWidth = this.$refs.listFiles.clientWidth
        this.$refs.listFiles.style.width = this.listViewOriginalWidth
      } else {
        this.closeTreeView()
      }
    },
    downloadFile (documentAction) {
      window.open(documentAction.item.file)
    },
    formatCreatorCell (creator) {
      if (creator) {
        if (creator.firstname != null && creator.lastname != null) {
          return creator.firstname + ' ' + creator.lastname[0]
        } else {
          return ''
        }
      }
    },
    getCurrentChildren (tree) {
      for (let file of tree) {
        if (file.id === this.$store.state.project.currentFolderId) {
          return file.children
        } else {
          if (file.children !== undefined && file.children.length > 0) {
            return this.getCurrentChildren(file.children)
          }
        }
      }
    },
    moveItems (idNewParentFolder) {
      this.$store.dispatch('project/moveItemsDMS', {idNewParentFolder, items: this.selected}).then(() => {
        this.closeMoveTo()
        this.selectAll = false
        this.selected = []
      })
    },
    saveRename (documentAction) {
      let type = documentAction.item.type
      let id = documentAction.item.id
      let name = this.renameFolder
      this.$store.dispatch('project/updateName', {type, id, name})

      this.toggleMenuAction(false)
      document.body.click()
    },
    selectAllItems () {
      this.selectAll = !this.selectAll
      this.selected = []
      if (this.selectAll) {
        for (let item of this.currentItems) {
          this.selected.push({type: item.idPrefix, id: item.id})
        }
      }
    },
    setCreatorsList (value) {
      this.valueCreatorEvent = value
    },
    toggleAddFolderMenu () {
      this.addFolderMenu = !this.addFolderMenu
      this.$nextTick(() => {
        this.$refs.createFolderInput.focus()
      })
      this.newFolderName = ''
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
      this.renameFolder = documentAction.item.name
      this.isIfc = documentAction.item.ifcId
      this.$nextTick(() => {
        this.$refs[`rename-${documentAction.item.id}`].focus()
        this.$refs[`rename-${documentAction.item.id}`].setSelectionRange(0, this.renameFolder.length)
      })
    },
    type (fileName) {
      if (fileName === undefined || fileName === null) {
        return 'Folder'
      }

      let ext = fileName ? fileName.split('.').pop() : ''

      return ext.toUpperCase()
    },
    viewIfc (ifcId) {
      let params = {
        cloudId: this.$store.state.project.selectedCloud.id,
        projectId: this.$store.state.project.selectedProject.id,
        ifcId
      }
      this.$router.push({ name: 'viewer', params: params })
    }
  },
  computed: {
    ...mapState('project', {
      currentElement: 'currentElement',
      project: 'selectedProject'
    }),
    currentItems () {
      return this.currentElement.children.map(
        item => {
          const result = this.selected.some((element) => {
            let type = (this.type(item.file_name) === 'Folder') ? 'folder' : 'file'
            return element.id === item.id && element.type === type
          })

          return {
            id: item.id,
            name: item.name,
            date: item.created_at,
            type: this.type(item.file_name),
            ifcId: item.ifc_id,
            idPrefix: (this.type(item.file_name) === 'Folder') ? 'folder' : 'file',
            icon: (item.file_name !== undefined) ? checkIfFileIconExist(this.type(item.file_name).toLowerCase()) ? `${this.type(item.file_name).toLowerCase()}.svg` : 'unknown.svg' : 'folder.svg',
            creator: item.created_by,
            size: item.size,
            file: item.file,
            _rowVariant: result ? 'selected-row' : ''
          }
        }
      )
    },
    displaySelectedToolbox () {
      return this.selected.length > 0
    },
    filteredList () {
      let elements = this.currentItems.map(t => t)
      if (this.valueCreatorEvent.length > 0) {
        elements = _.filter(elements, element => {
          if (!element.creator) {
            return this.valueCreatorEvent.includes(0)
          } else {
            return this.valueCreatorEvent.includes(element.creator.id)
          }
        })
      }
      return elements
    },
    folderTree () {
      let resultTree = []
      resultTree.push(this.$store.state.project.tree)
      return resultTree
    },
    getCurrentFolderId () {
      return this.$store.state.project.currentFolderId
    },
    isUserRole () {
      return this.hasUserRole(this.role)
    },
    listCreatorUniq () {
      let hasEmptyCreator = this.currentItems.some(item => !item.creator)
      let uniqueCreators = this.currentItems
        .filter(item => item.creator)
        .map(item => item.creator)
        .reduce((acc, creator) => {
          if (!acc.some(uniqueCreator => uniqueCreator.id === creator.id)) {
            acc.push(creator)
          }
          return acc
        }, [])
        .map(item => {
          let name = ''
          if (item.firstname != null && item.lastname != null) {
            name = item.firstname + ' ' + item.lastname[0]
          }
          return {
            text: name,
            value: item.id,
            disabled: false
          }
        })

      if (hasEmptyCreator) {
        uniqueCreators.push(
          {
            text: this.$t('dms.no_creator'),
            value: 0,
            disabled: false
          }
        )
      }
      return uniqueCreators
    },
    project () {
      return this.getProjectById(this.$route.params.projectId)
    },
    nbSelectedItems () {
      return this.selected.length
    }
  },
  async created () {
    await this.$store.dispatch('project/getPath')
  }
}
</script>
