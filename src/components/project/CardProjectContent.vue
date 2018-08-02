<template>
    <base-card :fullscreen-available="false">
        <template slot="header-title">
            {{ projectName }}
        </template>
    </base-card>
</template>
<script>
import BaseCard from '@/components/base-components/BaseCard'

export default {
  components: {
    BaseCard
  },
  computed: {
    projectName () {
      return this.$store.state.project.selectedProject.name
    }
  }
}
</script>
