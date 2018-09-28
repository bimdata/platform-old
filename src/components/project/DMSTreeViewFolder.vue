<template>
    <li :class="{
            'is-current-path': isCurrentPath,
            'is-current-folder': isCurrentFolder
        }">
        <span @click="changeFolder(folder.id)">
        <img width="20" src="/static/img/files-icons/folder2.svg" />
        {{ folder.name }}
        </span>
        <ul>
            <dms-tree-view-folder v-if="folder.children && folder.file_name === undefined"
                                  v-show="isCurrentPath || isCurrentFolder"
                                  v-for="(folder, index) in folder.children"
                                  :folder="folder"
                                  :key="folder.id + '-' + index">
            </dms-tree-view-folder>
        </ul>
    </li>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'dms-tree-view-folder',
  props: {
    folder: null
  },
  computed: {
    ...mapState('project', {
      currentElement: state => state.currentElement,
      currentPath: state => state.currentPath
    }),
    isCurrentPath () {
      return this.currentPath.some(elt => {
        return (elt.id === this.folder.id)
      })
    },
    isCurrentFolder () {
      return this.folder.id === this.currentElement.id
    }
  },
  methods: {
    async changeFolder (id) {
      this.$store.dispatch('project/changeFolder', id).then(() => {
        this.$store.dispatch('project/getPath').then((result) => {
        })
      })
    }
  }
}
</script>
