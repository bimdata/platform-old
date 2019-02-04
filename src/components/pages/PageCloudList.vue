<template>
    <div class="page-clouds">
      <div class="toolbar-page row">
        <div class="card-container">
          <div class="choice-list top-toolbar__choice-list-items top-toolbar__choice-list-items--cloud">
            <div class="choice-list__field-selected">
              <span class="choice-list__field-selected__icon">
                <svgicon class="icon" name="cloud" width="20" height="15"></svgicon>
              </span>
              <span class="choice-list__field-selected__text-selected">
                {{ $t('cloud_list.clouds_list') }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <transition-group name="project-item"
                        tag="div"
                        class="project_list row">
          <card-cloud-list v-for="cloud in clouds"
                            :key="cloud.id"
                            :cloud="cloud">
          </card-cloud-list>
      </transition-group>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import CardCloudList from '@/components/cloud-list/CardCloudList'

export default {
  components: {
    CardCloudList
  },
  computed: {
    ...mapState({
      clouds: state => state.clouds
    })
  }
}
</script>
