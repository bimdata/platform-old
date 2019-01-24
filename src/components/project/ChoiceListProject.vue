<template>
    <div>
        <base-choice-list :options="projects"
                          icon="projet"
                          :value="selectedProject"
                          @input="choseProject">
        </base-choice-list>
    </div>
</template>
<script>
import BaseChoiceList from '@/components/base-components/BaseChoiceList'

export default {
  components: {
    BaseChoiceList
  },
  computed: {
    projects () {
      let projectResult = []
      let projects = this.getProjectsByCloud()
      for (let {id, name} of projects) {
        projectResult.push({value: id, text: name})
      }

      if (projectResult.length === 0) {
        projectResult.push({value: null, text: 'Aucun projet disponible'})
      }
      return projectResult
    },
    selectedProject () {
      let selected
      let projects = this.getProjectsByCloud()
      let project = this.$store.state.project.selectedProject
      for (let {id, name} of projects) {
        if (project.id === id) {
          selected = {value: id, text: name}
        }
      }

      if (selected === undefined) {
        return {value: null, text: 'Choisir un projet'}
      }

      return selected
    }
  },
  methods: {
    getProjectsByCloud () {
      let currentCloud = this.$store.state.currentCloud
      let cloud = this.$store.getters.getCloudById(currentCloud.id)
      return cloud.projects
    },
    choseProject ({value}) {
      this.$router.push({name: 'project', params: {id: value}})
      // let project = this.$store.getters.getProjectById(value)
      // this.$emit('selected-project-loading')
      // this.$store.dispatch('project/fetchProjectIfc', project).then(() => {
      //   this.$emit('selected-project-loaded')
      // })
    }
  }
}
</script>
