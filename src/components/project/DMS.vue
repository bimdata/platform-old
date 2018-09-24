<template>
    <div>
        <dms-breadcrumb @change-folder="changeFolder">
        </dms-breadcrumb>
        <b-table :items="currentItems"
                 class="bd-table"
                 :fields="fields">
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
</template>
<script>
import DMSBreadcrumb from '@/components/project/DMSBreadcrumb'

export default {
  components: {
    'dms-breadcrumb': DMSBreadcrumb
  },
  data () {
    return {
      fields: [
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
          console.log(result)
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
          icon: (item.file_name !== undefined) ? this.type(item.file_name).toLowerCase() + '.svg' : 'folder.svg',
          creator: item.created_by,
          size: item.size
        })
      }

      return currentItems
    }
  },
  created () {
    this.$store.dispatch('project/getPath').then((result) => {
      console.log(result)
    })
  }
}
</script>
