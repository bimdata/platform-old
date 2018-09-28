<template>
    <div class="dms__tree-view">
        <div class="dms__tree-view-content">
            <div class="dms__tree-view-header">
                <div @click="close">
                    <svgicon name="close"
                             height="20"
                             width="20">
                    </svgicon>
                </div>
            </div>
            <ul class="dms__tree-folder-list">
                <dms-tree-view-folder v-for="(folder, index) in treeViewFolder"
                                      :folder="folder"
                                      :key="folder.id + '-' + index">
                </dms-tree-view-folder>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import DMSTreeViewFolder from '@/components/project/DMSTreeViewFolder'

export default {
  name: 'dms-tree-view',
  components: {
    'dms-tree-view-folder': DMSTreeViewFolder
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  computed: {
    ...mapState('project', {
      tree: state => state.tree
    }),
    treeViewFolder () {
      let result = []
      result.push(this.tree)

      return result
    }
  }
}
</script>
