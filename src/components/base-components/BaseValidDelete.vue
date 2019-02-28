<template>
    <transition name="slide-fade">
      <div class="delete__actions" v-if="test">
        <span class="check" @click="validAction">
          <svgicon name="check" height="15" width="18"></svgicon>
        </span>
        <span class="check-cross" @click="test = false">
          <svgicon name="close" height="13" width="13"></svgicon>
        </span>
      </div>
    </transition>
</template>
<script>
export default {
  data () {
    return {
      test: this.showRemoveActions
    }
  },
  props: {
    showRemoveActions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  methods: {
    undisplayComponent () {
      this.test = false
    },
    validAction () {
      this.$emit('on-valid-action', this.showRemoveActions)
    }
  }
}
</script>
