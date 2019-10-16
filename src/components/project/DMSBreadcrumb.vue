<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="breadcrumb">
        <ul>
            <li v-for="(item, index) in currentPath"
                :key="index">
                <template v-if="item.id !== currentFolderId">
                    <a @click.prevent="folderSelected(item.id)">{{ item.name }}</a>
                </template>
                <template v-else>
                    {{ item.name }}
                </template>
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('project', {
      currentFolderId: 'currentFolderId',
      currentPath: 'currentPath'
    })
  },
  methods: {
    folderSelected (id) {
      this.$emit('change-folder', id)
    }
  }
}
</script>
