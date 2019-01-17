<template>
    <div class="list-choice">
        <a href="" @click.prevent="displayList = !displayList" class="list-choice__link">{{ label }}</a>

        <transition name="fade">
          <div class="list-choice__filter" v-if="displayList">
              <b-form-checkbox-group :options="list" name="statusFilter" v-model="selected" class="list-choice__group" @click.native.stop>
              </b-form-checkbox-group>
          </div>
        </transition>
    </div>
</template>
<script>
export default {
  data () {
    return {
      displayList: false,
      selected: []
    }
  },
  props: {
    label: {
      required: true,
      type: String
    },
    list: {
      required: true,
      type: Array
    },
    nameInput: {
      required: true,
      type: String
    }
  },
  watch: {
    selected (newVal, oldVal) {
      this.$emit('selected-list-choice', newVal)
    }
  }
}
</script>
