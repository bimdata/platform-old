<template>
  <div>
    <base-choice-list
      :options="projects"
      icon="project"
      :value="selectedProject"
      @input="choseProject"
    ></base-choice-list>
  </div>
</template>
<script>
import BaseChoiceList from '@/components/base-components/BaseChoiceList'
import {mapState} from 'vuex'

export default {
  components: {
    BaseChoiceList
  },
  computed: {
    ...mapState({
      selectedCloud: state => state.project.selectedCloud
    }),
    projects () {
      let projectResult = []
      let projects = this.selectedCloud ? this.selectedCloud.projects : []
      for (let {id, name} of projects) {
        projectResult.push({value: id, text: name})
      }

      if (projectResult.length === 0) {
        projectResult.push({value: null, text: 'Aucun project disponible'})
      }
      return projectResult
    },
    selectedProject () {
      let selected
      let projects = this.selectedCloud ? this.selectedCloud.projects : []
      let project = this.$store.state.project.selectedProject
      for (let {id, name} of projects) {
        if (project.id === id) {
          selected = {value: id, text: name}
        }
      }

      if (selected === undefined) {
        return {value: null, text: 'Choisir un project'}
      }

      return selected
    }
  },
  methods: {
    choseProject ({value: projectId}) {
      const {id: cloudId} = this.$store.state.clouds
        .find(
          cloud => cloud.projects
            .find(project => parseInt(project.id) === parseInt(projectId))
        )

      this.$router.push({name: 'project', params: {cloudId, projectId}})
    }
  }
}
</script>
