<template>
    <div class="dms">
        <div class="dms_title">{{ $t('project.project_document') }}</div>
        <dms-upload-document></dms-upload-document>
        <dms-breadcrumb @change-folder="changeFolder">
        </dms-breadcrumb>
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
                                      @close="closeMoveTo"
                                      @chooseItem="moveItems"
                                      :tree="folderTree"
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
            <base-button-tool iconName="add-folder" @click="displayAddFolder">
                <div class="new_folder_box" v-show="addFolder">
                    <div class="new_folder_box__title">
                        {{ $t('project.create_folder') }}
                    </div>
                    <div class="base-input-text-material">
                        <input type="text" :placeholder="$t('project.folder_name')" required v-model="newFolderName">
                        <span class="highlight"></span>
                        <span class="bar"></span>
                    </div>
                    <div class="new_folder_box__button-validation">
                        <span @click="closeAddFolder">{{ $t('project.cancel') }}</span>
                        <span @click="saveFolder">{{ $t('project.validate') }}</span>
                    </div>
                </div>
            </base-button-tool>
            <span class="dms__search">
                <img src="../../assets/images/icons/search.svg" />
                <b-form-input v-model="filter" :placeholder="$t(project.type_to_search)" />
            </span>
        </div>
        <div class="dms__content" ref="filesContent" :class="{'shrinked': isVisibleTreeView}">
            <div ref="treeView" class="dms__tree-view">
                <dms-tree-view @close="closeTreeView"></dms-tree-view>
            </div>
            <div ref="listFiles" class="dms__list-files">
                <b-table :items="currentItems"
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
                    {{ $t('project.creator') }}
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
                        {{ data.item.creator.firstname }} {{ data.item.creator.lastname }}
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
                <template slot="action" slot-scope="action">
                    <base-button-option>
                        <ul>
                            <li>{{ $t('project.download') }}</li>
                        </ul>
                    </base-button-option>
                </template>
            </b-table>
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
import BaseButtonOption from '@/components/base-components/BaseButtonOption'

export default {
  components: {
    'dms-breadcrumb': DMSBreadcrumb,
    'dms-tree-view': DMSTreeView,
    BaseButtonTool,
    BaseTreeSelect,
    BaseInputCheckbox,
    BaseButtonOption,
    'dms-upload-document': DMSUploadDocument
  },
  data () {
    return {
      displayTreeSelect: false,
      isVisibleTreeView: false,
      selectAll: false,
      filter: null,
      selected: [],
      fields: [
        {
          key: 'selected',
          label: ''
        },
        {
          key: 'name',
          label: 'Name'
        },
        {
          key: 'type',
          label: 'Type'
        },
        {
          key: 'creator',
          label: 'Creator'
        },
        {
          key: 'date',
          label: 'Date'
        },
        {
          key: 'size',
          label: 'Size'
        },
        {
          key: 'action',
          label: ''
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
    displayMoveTo () {
      this.displayTreeSelect = true
    },
    closeMoveTo () {
      this.displayTreeSelect = false
    },
    closeAddFolder () {
      this.addFolder = false
      this.newFolderName = ''
    },
    async saveFolder () {
      if (this.newFolderName !== '') {
        await this.$store.dispatch('project/createFolder', this.newFolderName)
        this.closeAddFolder()
      }
    },
    displayAddFolder () {
      this.addFolder = true
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
        this.$refs.listFiles.style.width = this.listViewOriginalWidth - 272 + 'px'
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
    }
  },
  computed: {
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
      let currentChildren = this.$store.getters['project/getCurrentChildren']
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
          _rowVariant: result ? 'selected-row' : ''
        })
      }

      return currentItems
    }
  },
  created () {
    this.$store.dispatch('project/getPath').then((result) => {
    })
  }
}
</script>
