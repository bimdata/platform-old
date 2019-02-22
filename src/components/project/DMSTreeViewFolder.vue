<template>
    <li
        :class="{
            'is-current-path': isCurrentPath,
            'is-current-folder': isCurrentFolder,
            'is-folder-opened': isFolderOpened(folder.id)
        }"
    >
        <div
            @click="toggleFolderOpened(folder.id)"
            class="dms__line-tree-view"
            :style="{'padding-left': paddingLine + 'px'}"
        >
            <span class="dms__line-tree-view-content">
                <span class="folder-carret"></span>
                <svgicon name="folder-outline" height="19" width="19" v-if="isCurrentPath"></svgicon>
                <svgicon name="folder2" height="19" width="19" v-else></svgicon>
                <span
                  @click.stop="changeFolder(folder.id)"
                  v-if="folder.name && folder.name.length > 10"
                  v-b-tooltip.hover
                  :title="folder.name"
                  class="dms__line-tree-view-content__name"
                >
                    {{ folder.name | middle-truncate(10) }}
                </span>
                <span @click.stop="changeFolder(folder.id)" class="dms__line-tree-view-content__name" v-else>
                  {{ folder.name }}
                </span>
            </span>
        </div>
        <ul
          v-for="(children, index) in folder.children"
          :key="children.id + '-' + index"
          class="collapse-tree"
          v-show="isFolderOpened(folder.id)"
        >
            <dms-tree-view-folder
              :folder="children"
              :depth="depth + 1"
            ></dms-tree-view-folder>
        </ul>
    </li>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'DmsTreeViewFolder',
  props: {
    depth: {
      type: Number,
      default: 1
    },
    folder: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapState('project', {
      currentElement: state => state.currentElement,
      currentPath: state => state.currentPath,
      openedFolderIds: state => state.openedFolderIds
    }),
    isFolderOpened () {
      return folderId => this.openedFolderIds
        .includes(folderId)
    },
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
