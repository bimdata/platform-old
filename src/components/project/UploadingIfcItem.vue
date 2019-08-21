<template>
    <div class="uploading-ifc-item">
      <img
          :src="`/static/img/files-icons/${file.extension}.svg`"
          width="30"
      />
      <div class="content">
        <span>{{ file.name }}</span>
        <span class="cancel-btn" @click="cancelUpload(file.id)">cancel_button</span>
        <div id="progress-bar">
          <div class="done" :style="{ width: `${(((uploaded / file.total) / 100) * 10000).toFixed(0)}%` }"></div>
        </div>
        <span>{{ uploaded | getFormattedSize }}  {{ file.total | getFormattedSize }} ({{ (((uploaded / file.total) / 100) * 10000).toFixed(0) }}% done)</span>
        <span class="speed">{{ speed | getFormattedSize }}/s</span>
      </div>
    </div>
</template>
<script>
// import { mapState } from 'vuex'

export default {
  components: {
  },
  props: {
    file: {
      type: Object,
      required: true
    },
    uploaded: {
      type: Number,
      required: true
    }
  },
  computed: {
    // ...mapState('project', {
    //   project: 'selectedProject'
    // })
  },
  created () {
    this.speed = 0
  },
  methods: {
    cancelUpload (fileId) {
      this.$emit('on-cancel-upload', fileId)
    },
    onUploadComplete (result) {
      // this.$store.dispatch('project/fetchProjectIfc', this.project)
      // this.$store.dispatch('project/getTree', this.project)
      // this.$emit('upload-complete', result)
    }
  },
  watch: {
    uploaded: {
      handler: function (val, oldVal) {
        this.speed = val - oldVal
      },
      deep: true
    }
  }
}
</script>
