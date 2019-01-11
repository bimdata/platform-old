<template>
    <div>
        <base-choice-list :options="projects"
                          icon="cloud"
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
      let projects = this.getProjectByCloud()
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
      let projects = this.getProjectByCloud()
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
    getProjectByCloud () {
      let projects = this.$store.state.projects
      let selectedCloud = this.$store.state.project.selectedCloud
      return projects.filter(project => {
        return selectedCloud.id === project.cloud.id
      })
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
