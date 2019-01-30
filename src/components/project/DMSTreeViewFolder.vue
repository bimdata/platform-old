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
                <svgicon name="folder2" v-else></svgicon>
                <span @click.stop="changeFolder(folder.id)" class="dms__line-tree-view-content__name">{{ folder.name }}</span>
            </span>
        </div>
        <transition
          name="accordion"
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:before-leave="beforeLeave"
          v-on:leave="leave"
        >
          <ul class="collapse-tree" v-show="isFolderOpened(folder.id)">
            <dms-tree-view-folder
              v-for="(folder, index) in folder.children"
              :folder="folder"
              :depth="depth + 1"
              :key="folder.id + '-' + index"
            ></dms-tree-view-folder>
          </ul>
        </transition>
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
    },
    beforeEnter (el) {
      el.style.height = '0'
    },
    enter (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    beforeLeave (el) {
      el.style.height = el.scrollHeight + 'px'
    },
    leave (el) {
      el.style.height = '0'
    }
  }
}
</script>
