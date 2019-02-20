<template>
    <div class="navigation">
        <navigation-link
          v-for="(item, index) in items"
          :key="index"
          :text="item.textLabel"
          :routeName="item.routeName"
          :displayLink="item.displayLink"
        ></navigation-link>
    </div>
</template>
<script>
import NavigationLink from '@/components/navigation/NavigationLink'

export default {
  components: {
    NavigationLink
  },
  computed: {
    getNamePage () {
      return this.$route.name
    },
    getProjectName () {
      if (this.getNamePage === 'viewer') {
        const project = this.$store.getters.getProjectById(this.$route.params.projectId)
        this.$store.commit('project/SET_PROJECT', project)
      }
      return this.$store.state.project ? this.$store.state.project.selectedProject.name : 'Back to project'
    },
    items () {
      return [
        {
          routeName: 'home',
          textLabel: 'Cloud',
          displayLink: true
        },
        {
          routeName: 'project-list',
          textLabel: 'Project\'s clouds',
          displayLink: this.getNamePage === 'project'
        },
        {
          routeName: 'project',
          textLabel: this.getProjectName,
          displayLink: this.getNamePage === 'viewer'
        }
      ]
    }
  }
}
</script>
