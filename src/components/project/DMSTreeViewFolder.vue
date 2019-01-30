<template>
    <li
        :class="{
            'is-current-path': isCurrentPath,
            'is-current-folder': isCurrentFolder
        }"
    >
        <div
            @click="changeFolder(folder.id)"
            class="dms__line-tree-view"
            :style="{'padding-left': paddingLine + 'px'}"
        >
            <span class="dms__line-tree-view-content">
                <span @click.stop="toggleFolderOpened(folder.id)" class="folder-carret"></span>
                <svgicon name="folder-outline" height="19" width="19" v-if="isCurrentPath"></svgicon>
                <svgicon name="folder2" v-else></svgicon>
                <span class="dms__line-tree-view-content__name">{{ folder.name }}</span>
            </span>
        </div>
        <ul>
            <dms-tree-view-folder
                v-for="(folder, index) in folder.children"
                v-if="folder.children && folder.file_name === undefined"
                v-show="isCurrentPath || isCurrentFolder"
                :folder="folder"
                :depth="depth + 1"
                :key="folder.id + '-' + index"
            ></dms-tree-view-folder>
        </ul>
    </li>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'dms-tree-view-folder',
  props: {
    depth: {
      default: 1
    },
    folder: null
  },
  computed: {
    ...mapState('project', {
      currentElement: state => state.currentElement,
      currentPath: state => state.currentPath
    }),
    paddingLine () {
      if (this.depth !== 1) {
        return 15 * this.depth
      } else {
        return 22
      }
    },
    isCurrentPath () {
      return this.currentPath.some(elt => {
        return elt && (elt.id === this.folder.id)
      })
    },
    isCurrentFolder () {
      return this.folder.id === this.currentElement.id
    }
  },
  methods: {
    ...mapActions({
      toggleFolderOpened: 'project/toggleFolderOpened'
    }),
    async changeFolder (id) {
      this.$store.dispatch('project/changeFolder', id).then(() => {
        this.$store.dispatch('project/getPath').then((result) => {
        })
      })
    },
    async getPath (folderId) {
      await this.$store.dispatch('project/getPath', folderId)
    }
  }
}
</script>
