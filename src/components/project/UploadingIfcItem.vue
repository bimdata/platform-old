<template>
    <div class="uploading-ifc-item" :class="{fail: state === 'fail', success: state === 'success'}">
      <img
          :src="`/static/img/files-icons/${file.extension}.svg`"
          width="30"
      />
      <div class="content">
        <base-clicked-tool class="cancel-btn" @on-clicked-tool="cancelUpload(file.id)" iconName="close" iconWidth="19" iconHeight="19" :iconColor="state === 'fail' ? '#F40C0C' : '#cecece'"></base-clicked-tool>
        <span>{{ file.name }}</span>
        <div class="informations">
          <span class="size">{{ file.total | getFormattedSize }}</span>
          <span>- </span>
          <span class="label">{{ $t('project.upload_failed') }}</span>
        </div>
        <div class="stats">
          <div class="progress-bar">
            <div class="done" :style="{ width: `${(((uploaded / file.total) / 100) * 10000).toFixed(0)}%` }"></div>
          </div>
          <span>{{ uploaded | getFormattedSize }}  {{ file.total | getFormattedSize }} ({{ (((uploaded / file.total) / 100) * 10000).toFixed(0) }}% {{ $t('project.done') }})</span>
          <span class="speed">{{ speed | getFormattedSize }}/s</span>
        </div>
      </div>
    </div>
</template>
<script>
import BaseClickedTool from '@/components/base-components/BaseClickedTool'

export default {
  components: {
    BaseClickedTool
  },
  props: {
    file: {
      type: Object,
      required: true
    },
    uploaded: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    }
  },
  created () {
    this.speed = 0
  },
  methods: {
    cancelUpload (fileId) {
      this.$emit('on-cancel-upload', fileId)
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
