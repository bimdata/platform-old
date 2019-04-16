<template>
  <div v-on-clickaway="away" class="choice-list noselect" @keyup="onKeyUp">
    <div class="choice-list__field-selected"
         v-bind="$attrs"
         @click="toggleListOptions"
         @="listeners">
      <span class="choice-list__field-selected__icon">
        <slot>
          <svgicon class="icon" :name="icon" width="20" height="15"></svgicon>
        </slot>
      </span>
      <span class="choice-list__field-selected__text-selected">
        {{ currentChoice.text|truncate(22) }}
      </span>
      <span class="choice-list__field-selected__display-icon">
        <svgicon class="icon" name="chevron-right" width="20" :class="{'svg-right': displayListOptions}"></svgicon>
      </span>
    </div>
      <ul class="choice-list__list-options" v-show="displayListOptions">
        <li class="choice-list__search-item">
          <b-form-input ref="searchInput"
                        class="choice-list__search-input"
                        type="text"
                        v-model="searchRequest">
          </b-form-input>
        </li>
        <transition-group name="list-complete"
                          class="items-container"
                          @:before-enter="beforeEnter"
                          @:enter="enter"
                          @:leave="leave"
                          tag="div"
        >
          <li v-for="(option, index) in optionsFiltered"
              :key="`option-${index}`"
              :data-index="index"
              @click="choice(option)"
              v-html="option.text"
              :class="{active: option.value === selected.value}"></li>
        </transition-group>
      </ul>
  </div>
</template>
<script>
import { mixin as clickaway } from 'vue-clickaway'
import _ from 'lodash'
import Velocity from 'velocity-animate'

export default {
  inheritAttrs: false,
  mixins: [ clickaway ],
  data () {
    return {
      searchRequest: '',
      displayListOptions: false,
      selected: null,
      currentChoice: null,
      filteredList: [],
      hasClickedForSearch: false,
      selectedIndex: 0
    }
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          text: '',
          value: null
        }
      }
    },
    options: {
      type: Array,
      required: true,
      default: () => []
    },
    icon: {
      type: String,
      required: false,
      default: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function (newValue) {
        // this.selected = this.optionsFiteredRaw[0]
        this.currentChoice = newValue
      }
    },
    optionsFiteredRaw: function (value) {
      this.setSelected(value[0])
    }
  },
  created: function () {
    this.setSelected(this.optionsFiteredRaw[0])
  },
  computed: {
    listeners () {
      return {
        ...this.$listeners
      }
    },
    optionsFiltered () {
      let items = []
      this.options.forEach((option) => {
        let item = {value: option.value, text: option.text}
        let wordsSearch = _.words(this.searchRequest)
        let search = new RegExp(wordsSearch.join('|'), 'gmi')

        if (item.text.match(search)) {
          item.text = item.text.replace(
            search,
            match => '<span class="highlight-option">' + match + '</span>'
          )
          items.push(item)
        }
      })
      return items
    },
    optionsFiteredRaw () {
      let items = []
      this.options.forEach((option) => {
        let item = {value: option.value, text: option.text}
        let wordsSearch = _.words(this.searchRequest)
        let search = new RegExp(wordsSearch.join('|'), 'gmi')

        if (item.text.match(search)) {
          items.push(item)
        }
      })

      return items
    }
  },
  methods: {
    away () {
      this.displayListOptions = false
    },
    setSelected (value) {
      this.selected = value
    },
    choice (option) {
      this.selected = this.options.find(originalOptions => originalOptions.value === option.value)
      this.$emit('input', this.selected)
      this.displayListOptions = false
    },
    toggleListOptions () {
      this.displayListOptions = !this.displayListOptions
      if (this.displayListOptions) {
        this.$nextTick(() => this.$refs.searchInput.focus())
      }
    },
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      let delay = 3
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1 },
          { complete: done }
        )
      }, delay)
    },
    leave: function (el, done) {
      let delay = 3
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0 },
          { complete: done }
        )
      }, delay)
    },
    onKeyUp (event) {
      if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
        if (event.code === 'ArrowUp') {
          this.selectedIndex = (this.selectedIndex > 0) ? this.selectedIndex - 1 : 0
        }

        if (event.code === 'ArrowDown') {
          this.selectedIndex = (this.selectedIndex < this.optionsFiteredRaw.length) ? this.selectedIndex + 1 : this.optionsFiteredRaw.length - 1
        }

        for (const [index, item] of this.optionsFiteredRaw.entries()) {
          if (index === this.selectedIndex) {
            this.selected = {
              value: item.value,
              text: item.text
            }
          }
        }
      }

      if (event.code === 'Enter') {
        this.choice(this.selected)
      }
    }
  }
}
</script>
