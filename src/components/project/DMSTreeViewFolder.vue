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
                <svgicon name="folder-outline" height="19" width="19" v-if="isCurrentPath"></svgicon>
                <svgicon name="folder2" v-else></svgicon>
                <span
                  v-if="folder.name && folder.name.length > 10"
                  v-b-tooltip.hover
                  :title="folder.name"
                  class="dms__line-tree-view-content__name"
                >{{ truncate(folder.name, 10) }}</span>
                <span class="dms__line-tree-view-content__name" v-else>
                  {{ folder.name }}
                </span>
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
        return 22
      }
    },
    isCurrentPath () {
      return this.currentPath.some(elt => {
        return (elt.id === this.folder.id)
      })
    },
    isCurrentFolder () {
      return this.folder.id === this.currentElement.id
    },
    truncate () {
      return (title, lenght) =>
        (title.length > lenght)
          ? title.substring(0, lenght) + '...'
          : title
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
