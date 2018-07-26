<template>
    <div class="table-spaced">
        <div class="table-spaced__head">
            <div v-for="(field, index) in fields"
                 :key="index"
                 class="table-spaced__items table-spaced__items--header">
                {{ field.label }}
            </div>
        </div>
        <div class="table-spaced__body">
            <div v-for="(row, indexRow) in values"
                 :key="indexRow"
                 class="table-spaced__body-row">
                <div v-for="(item, indexItem) in row"
                     :key="indexItem"
                     class="table-spaced__items table-spaced__items--body">
                    <template v-if="typeof item === 'object'">
                    <slot :name="fields[indexItem].key"
                          :item="item">
                        default object slot
                    </slot>
                    </template>
                    <template v-else>
                        {{ item }}
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true
    },
    values: Array
  }
}
</script>
