<template>
    <li :class="{
            'is-current-path': isCurrentPath,
            'is-current-folder': isCurrentFolder
        }">
        <div @click="changeFolder(folder.id)"
             class="dms__line-tree-view"
             :style="{'padding-left': paddingLine + 'px'}"
        >
            <span class="dms__line-tree-view-content">
                <svgicon name="folder2"></svgicon>
                {{ folder.name }}
            </span>
        </div>
        <ul>
            <dms-tree-view-folder v-if="folder.children && folder.file_name === undefined"
                                  v-show="isCurrentPath || isCurrentFolder"
                                  v-for="(folder, index) in folder.children"
                                  :folder="folder"
                                  :depth="depth + 1"
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
        return 20
      }
    },
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
