<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
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
        return this.$store.state.project ? this.$store.state.project.selectedProject.name : this.$t('header.back_to_project')
      }

      return null
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
          textLabel: this.$t('header.clouds_projects'),
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
