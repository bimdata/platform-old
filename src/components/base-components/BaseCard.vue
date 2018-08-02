<template>
    <div class="base-card" :style="style">
        <div class="base-card__header">
            <div class="base-card__title-container">
                <slot name="header-title">Titre par défaut</slot>
            </div>
            <template v-if="fullscreenAvailable">
                <div class="base-card__expand base-card__expand--reduced"
                     v-if="!expanded"
                     @click="expand">
                    <svgicon name="expand"
                             color="#2F374A"
                             width="20">
                    </svgicon>
                </div>
                <div class="base-card__expand base-card__expand--expanded"
                     v-if="expanded"
                     @click="reduce">
                    <svgicon name="reduce"
                             color="#2F374A"
                             width="20">
                    </svgicon>
                </div>
            </template>
        </div>
        <div class="base-card__content">
            <slot name="content">Content par défaut</slot>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      expanded: false,
      style: {},
      styleExpanded: {
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '100'
      }
    }
  },
  props: {
    fullscreenAvailable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    expand () {
      this.expanded = true
      this.style = { ...this.style, ...this.styleExpanded }
    },
    reduce () {
      this.expanded = false
      this.style = {}
    }
  }
}
</script>
