<template>
    <transition name="slide-fade">
      <div class="delete__actions" v-if="showRemoveActions">
        <span class="check" @click="validAction">
          <svgicon name="check" height="15" width="18"></svgicon>
        </span>
        <span class="check-cross" @click="showRemoveActions = false">
          <svgicon name="close" height="13" width="13"></svgicon>
        </span>
      </div>
    </transition>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    showRemoveActions: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    validAction () {
      this.$emit('on-valid-action', this.showRemoveActions)
    }
  }
}
</script>
