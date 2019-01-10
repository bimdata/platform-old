<template>
    <div class="card-container">
        <div class="base-card card-item card-bd">
            <div class="card-bd__header">
                <span class="card-bd__date">{{ cloud.created_at|formatDate }}</span>
            </div>
            <div class="card-bd__body">
                <div class="card-bd__body-container">
                    <div class="card-bd__image">
                        <a href="" @click.prevent="accessCloud">
                            <svgicon name="img-placeholder" height="30" width="30"></svgicon>
                        </a>
                    </div>
                    <div v-on-clickaway="closeUpdate"
                         class="card-bd__title"
                         :class="{'card-bd__title--edit-mode': editMode}">
                        <div v-show="!editMode"
                             @click="switchToEditMode">
                            {{ cloud.name }}
                        </div>
                        <div class="card-bd__text-container" v-show="editMode">
                            <input ref="updateInput"
                                   type="text"
                                   v-model="newName"
                                   @keyup.enter="submitUpdate"
                                   :placeholder="cloud.name"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import _ from 'lodash'
import { mixin as clickaway } from 'vue-clickaway'

export default {
  data () {
    return {
      clicked: false,
      displayMenu: false,
      editMode: false,
      newName: ''
    }
  },
  mixins: [ clickaway ],
  props: {
    cloud: {
      type: Object,
      required: true
    }
  },
  methods: {
    accessCloud () {
      this.$store.commit('SET_CURRENT_CLOUD', this.cloud)
      this.$router.push({name: 'project-list'})
    },
    switchToEditMode () {
      this.editMode = true
      this.$nextTick(function () {
        this.$refs.updateInput.focus()
      })
    },
    remove () {
      this.$store.dispatch('removeProject', this.project).then(() => {
      })
    },
    closeTool () {
      this.displayMenu = false
    },
    closeUpdate () {
      this.editMode = false
    },
    submitUpdate () {
      if (this.newName === '' || this.newName === this.cloud.name) {
        this.newName = ''
        this.editMode = false
      } else {
        this.update(this.newName).then(() => {
          this.newName = ''
          this.editMode = false
        })
      }
    },
    async update (name) {
      let cloud = _.cloneDeep(this.cloud)
      cloud.name = name
      this.$store.dispatch('updateCloud', cloud).then(() => {
        return true
      })
    },
    clickedTool () {
      this.displayMenu = !this.displayMenu
      this.clicked = false
      this.clicked = true
      setTimeout(() => {
        this.clicked = false
      }, 500)
    }
  }
}
</script>
