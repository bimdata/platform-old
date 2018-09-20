<template>
    <div>
        <ul>
            <li v-for="(item, index) in listItem"
                :key="index">
                <template v-if="item.id != currentFolderId">
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
export default {
  data () {
    return {
      listItem: []
    }
  },
  props: {
    currentFolderId: Number
  },
  methods: {
    folderSelected (id) {
      this.$emit('change-folder', id)
    },
    getElement (tree) {
      for (let file of tree) {
        if (file.id === this.currentFolderId) {
          return file
        } else {
          if (file.children !== undefined && file.children.length > 0) {
            return this.getElement(file.children)
          }
        }
      }
    },
    getParent (file) {
      this.listItem.push(file)
      if (file.parent_id !== null) {
        let parentFile = this.getElement(file.parent_id)
        return this.getParent(parentFile)
      }
    },
    setListItem () {
      let tree = []
      tree.push(this.$store.state.project.tree)
      let elt = this.getElement(tree)
      this.getParent(elt)
    }
  },
  computed: {
    getPath () {
      return 'test'
    }
  },
  watch: {
    currentFolderId: {
      handler: function (value, oldValue) {
      }
    }
  },
  created () {
    let tree = []
    tree.push(this.$store.state.project.tree)
    let elt = this.getElement(tree)
    this.getParent(elt)
  }
}
</script>
