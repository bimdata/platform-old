<template>
    <div class="dms">
        <div class="dms_title">Project's documents</div>
        <dms-breadcrumb @change-folder="changeFolder">
        </dms-breadcrumb>
        <div class="dms__toolbox">
            <base-button-tool iconName="tree"
                              :class="{'is-active': isVisibleTreeView}"
                              @click="displayTreeView">
            </base-button-tool>
            <base-button-tool iconName="add-folder"></base-button-tool>
            <span class="dms__search">
                <img src="../../assets/images/icons/search.svg" />
                <b-form-input v-model="filter" placeholder="Type to Search" />
            </span>
        </div>
        <div class="dms__content" :class="{'shrinked': isVisibleTreeView}">
            <dms-tree-view @close="isVisibleTreeView = false"></dms-tree-view>
            <b-table :items="currentItems"
                     :filter="filter"
                     class="bd-table"
                     :fields="fields">
                <template slot="HEAD_selected" slot-scope="data">
                    <input type="checkbox" v-model="selectAll" @click="selectAllItems">
                </template>
                <template slot="selected" slot-scope="data">
                    <input type="checkbox" :value="{type: data.item.idPrefix, id: data.item.id}" v-model="selected">
                </template>
                <template slot="name" slot-scope="data">
                    <span @click="clickedFile({type: data.item.type, id: data.item.id})">
                        <img width="20"
                             :src="'/static/img/files-icons/' + data.item.icon" />
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
            </b-table>
        </div>
    </div>
</template>
<script>
import DMSBreadcrumb from '@/components/project/DMSBreadcrumb'
import DMSTreeView from '@/components/project/DMSTreeView'
import BaseButtonTool from '@/components/base-components/BaseButtonTool'

export default {
  components: {
    'dms-breadcrumb': DMSBreadcrumb,
    'dms-tree-view': DMSTreeView,
    BaseButtonTool
  },
  data () {
    return {
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
        }
      ],
      currentFolderItems: [],
      filesTree: []
    }
  },
  methods: {
    displayTreeView () {
      this.isVisibleTreeView = true
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
    currentItems () {
      let currentItems = []
      let currentChildren = this.$store.getters['project/getCurrentChildren']
      for (let item of currentChildren) {
        currentItems.push({
          id: item.id,
          name: item.name,
          date: item.created_at,
          type: this.type(item.file_name),
          idPrefix: (this.type(item.file_name) === 'Folder') ? 'folder' : 'file',
          icon: (item.file_name !== undefined) ? this.type(item.file_name).toLowerCase() + '.svg' : 'folder2.svg',
          creator: item.created_by,
          size: item.size
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
