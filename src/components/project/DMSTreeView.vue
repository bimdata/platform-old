<template>
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
            <dms-tree-view-folder
                v-for="(folder, index) in folders"
                :folder="folder"
                :key="folder.id + '-' + index"
            ></dms-tree-view-folder>
        </ul>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import DMSTreeViewFolder from '@/components/project/DMSTreeViewFolder'

export default {
  components: {
    'dms-tree-view-folder': DMSTreeViewFolder
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  computed: {
    ...mapGetters({
      folders: 'project/folders'
    })
  }
}
</script>
