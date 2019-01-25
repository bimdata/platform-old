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
                      <base-tree-select v-if="displayTreeSelect"
                                        v-on-clickaway="closeMoveTo"
                                        @close="closeMoveTo"
                                        @chooseItem="moveItems"
                                        :tree="folderTree"
                                        :selected="selected"
                                        :initial-parent-node="getCurrentFolderId">
                      </base-tree-select>
                  </div>
                  <div class="dms__selected-display" @click="deselectAll">
                      {{ $t('project.unselect_all') }} <span class="item-counter">{{ nbSelectedItems }}</span>
                  </div>
              </div>
            </div>
            <div class="dms__toolbox" v-show="!displaySelectedToolbox">
                <base-button-tool iconName="tree"
                                  :class="{'is-active': isVisibleTreeView}"
                                  @click="displayTreeView">
                </base-button-tool>
                <dms-upload-document class="base-button-tool__container"></dms-upload-document>
                <base-button-tool iconName="add-folder" @click="toggleAddFolderMenu">
                    <div class="new_folder_box" v-if="addFolder">
                        <div class="new_folder_box__title">
                            {{ $t('project.create_folder') }}
                        </div>
                        <div class="base-input-text-material">
                            <input type="text" autofocus :placeholder="$t('project.folder_name')" required v-model="newFolderName" v-on:keyup.enter="saveFolder">
                            <span class="highlight"></span>
                            <span class="bar"></span>
                        </div>
                        <div class="new_folder_box__button-validation">
                            <span @click="toggleAddFolderMenu">{{ $t('project.cancel') }}</span>
                            <span @click="saveFolder">{{ $t('project.validate') }}</span>
                        </div>
                    </div>
                    <div class="new_folder_box__overlay" v-if="addFolder" @click="toggleAddFolderMenu"></div>
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
                    <b-table :items="filteredList"
                        :filter="filter"
                        class="bd-table"
                        :fields="fields">
                        <template slot="HEAD_selected" slot-scope="data">
                            <label for="select-all"
                                  @click="selectAllItems"
                                  class="base-checkbox">
                                <input id="select-all"
                                      type="checkbox" v-model="selectAll">
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
                            <list-choice :label="$t('project.creator')" :list="listCreatorUniq" :nameInput="data.label" @selected-list-choice="setCreatorsList"></list-choice>
                        </template>
                        <template slot="HEAD_date" slot-scope="data">
                            {{ $t('project.updated_at') }}
                        </template>
                        <template slot="HEAD_size" slot-scope="data">
                            {{ $t('project.size') }}
                        </template>
                        <template slot="selected" slot-scope="data">
                                <label :for="'checkbox-'+ data.item.id"
                                      class="base-checkbox">
                                    <input type="checkbox"
                                          :id="'checkbox-'+ data.item.id"
                                          :value="{type: data.item.idPrefix, id: data.item.id}"
                                          v-model="selected">
                                    <span></span>
                                </label>
                        </template>
                        <template slot="name" slot-scope="data">
                            <span @click="clickedFile({type: data.item.type, id: data.item.id})">
                                <template v-if="data.item.icon !== 'folder2.svg'">
                                <img width="20"
                                    :src="'/static/img/files-icons/' + data.item.icon" />
                                </template>
                                <template v-else>
                                    <svgicon name="folder2" width="20" height="26"></svgicon>
                                </template>
                                {{ data.item.name }}
                            </span>
                        </template>
                        <template slot="creator" slot-scope="data">
                            <template v-if="data.item.creator !== null">
                                {{ data.item.creator.firstname }} {{ data.item.creator.lastname[0] }}
                            </template>
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
                            <base-button-option @option-toggled="toggleMenuAction">
                                <ul>
                                    <li @click="downloadFile(documentAction)">
                                      <svgicon name="download" width="13" height="13"></svgicon>
                                      {{ $t('project.download') }}
                                      </li>
                                    <li @click.stop.self="toggleRename(documentAction)" :class="{'actif': displayRename}">
                                      <svgicon name="pencil" width="13" height="13"></svgicon>
                                      {{ $t('project.rename') }}

                                      <div class="new_folder_box rename" v-if="displayRename">
                                        <div class="new_folder_box__title">
                                            {{ $t('project.rename_folder') }}
                                        </div>
                                        <div class="base-input-text-material">
                                            <input type="text" autofocus :placeholder="$t('project.folder_name')" required v-model="renameFolder" v-on:keyup.enter="saveRename(documentAction)">
                                            <span class="highlight"></span>
                                            <span class="bar"></span>
                                        </div>
                                        <div class="new_folder_box__button-validation">
                                            <span @click="displayRename = false">{{ $t('project.cancel') }}</span>
                                            <span @click="saveRename(documentAction)">{{ $t('project.validate') }}</span>
                                        </div>
                                    </div>
                                    </li>
                                    <li @click.stop.self="displayRemoveActions" class="base-button-option__menu__remove" :class="{'actif': showRemoveActions}">
                                      <svgicon name="delete" width="13" height="13"></svgicon>
                                      {{ $t('project.delete') }}
                                      <transition name="slide-fade">
                                        <div class="delete__actions" v-if="showRemoveActions">
                                          <span class="check" @click="remove(documentAction)">
                                            <svgicon name="check" height="15" width="18"></svgicon>
                                          </span>
                                          <span class="check-cross" @click="showRemoveActions = false">
                                            <svgicon name="close"  height="13" width="13"></svgicon>
                                          </span>
                                        </div>
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
import ListChoice from '@/components/project/ListChoice'
import BaseButtonOption from '@/components/base-components/BaseButtonOption'
import { mixin as clickaway } from 'vue-clickaway'
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
    'dms-upload-document': DMSUploadDocument
  },
  data () {
    return {
      displayTreeSelect: false,
      isVisibleTreeView: false,
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
      addFolder: false,
      newFolderName: ''
    }
  },
  methods: {
    moveItems (idNewParentFolder) {
      this.$store.dispatch('project/moveItemsDMS', {idNewParentFolder, items: this.selected}).then(() => {
        this.closeMoveTo()
        this.selectAll = false
        this.selected = []
      })
    },
    toggleRename (documentAction) {
      this.displayRename = !this.displayRename
      this.showRemoveActions = false
      this.renameFolder = documentAction.item.name
    },
    saveRename (documentAction) {
      let type = documentAction.item.type
      let id = documentAction.item.id
      let name = this.renameFolder

      if (type === 'Folder') {
        this.$store.dispatch('project/updateNameFolder', {id, name})
      } else {
        this.$store.dispatch('project/updateNameDocument', {id, name})
      }

      this.toggleMenuAction(false)
    },
    remove (documentAction) {
      let type = documentAction.item.type
      let id = documentAction.item.id

      if (type === 'Folder') {
        this.$store.dispatch('project/removeFolder', id)
      } else {
        this.$store.dispatch('project/removeDocument', id)
      }

      this.toggleMenuAction(false)
    },
    toggleMenuAction (isOpened) {
      this.showRemoveActions = isOpened
      this.displayRename = isOpened
    },
    displayMoveTo () {
      this.displayTreeSelect = !this.displayTreeSelect
    },
    displayRemoveActions () {
      this.showRemoveActions = !this.showRemoveActions
      this.displayRename = false
    },
    closeMoveTo () {
      this.displayTreeSelect = false
    },
    async saveFolder () {
      if (this.newFolderName !== '') {
        await this.$store.dispatch('project/createFolder', this.newFolderName)
        this.addFolder = false
      }
    },
    toggleAddFolderMenu () {
      this.addFolder = !this.addFolder
      this.newFolderName = ''
    },
    async deleteElements () {
      await this.$store.dispatch('project/deleteDMSElements', this.selected)
      this.deselectAll()
    },
    deselectAll () {
      this.selectAll = false
      this.selected = []
    },
    closeTreeView () {
      this.isVisibleTreeView = false
      this.$refs.listFiles.style.width = '100%'
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
    selectAllItems () {
      this.selectAll = !this.selectAll
      this.selected = []
      if (this.selectAll) {
        for (let item of this.currentItems) {
          this.selected.push({type: item.idPrefix, id: item.id})
        }
      }
    },
    type (fileName) {
      if (fileName === undefined) {
        return 'Folder'
      }

      let ext = fileName.split('.').pop()

      return ext.toUpperCase()
    },
    clickedFile ({type, id}) {
      if (type === 'Folder') {
        this.changeFolder(id)
      }
    },
    async changeFolder (id) {
      this.$store.dispatch('project/changeFolder', id).then(() => {
        this.$store.dispatch('project/getPath').then((result) => {
        })
      })
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
    downloadFile (documentAction) {
      window.open(documentAction.item.file)
    },
    setCreatorsList (value) {
      this.valueCreatorEvent = value
    }
  },
  computed: {
    ...mapState('project', {
      currentElement: 'currentElement'
    }),
    getCurrentFolderId () {
      return this.$store.state.project.currentFolderId
    },
    folderTree () {
      let resultTree = []
      resultTree.push(this.$store.state.project.tree)
      return resultTree
    },
    displaySelectedToolbox () {
      return this.selected.length > 0
    },
    nbSelectedItems () {
      return this.selected.length
    },
    currentItems () {
      let currentItems = []
      let currentChildren = this.currentElement.children
      for (let item of currentChildren) {
        let result = this.selected.some((element) => {
          let type = (this.type(item.file_name) === 'Folder') ? 'folder' : 'file'
          return element.id === item.id && element.type === type
        })

        currentItems.push({
          id: item.id,
          name: item.name,
          date: item.created_at,
          type: this.type(item.file_name),
          idPrefix: (this.type(item.file_name) === 'Folder') ? 'folder' : 'file',
          icon: (item.file_name !== undefined) ? this.type(item.file_name).toLowerCase() + '.svg' : 'folder2.svg',
          creator: item.created_by,
          size: item.size,
          file: item.file,
          _rowVariant: result ? 'selected-row' : ''
        })
      }

      return currentItems
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
          return {
            text: item.firstname + ' ' + item.lastname[0],
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
    }
  },
  created () {
    this.$store.dispatch('project/getPath').then((result) => {
    })
  }
}
</script>
