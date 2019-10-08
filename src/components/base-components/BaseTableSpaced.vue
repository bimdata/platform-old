<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <div class="table-spaced">
        <div class="table-spaced__head">
          <div class="table-spaced__row">
            <div v-for="(field, index) in fields"
                 :key="index"
                 :class="'table-spaced__items--header--' + fields[index].key"
                 class="table-spaced__items table-spaced__items--header"
                 :style="'width:' + fields[index].width + '; min-width:' + fields[index].width">
                <slot :name="'HEAD_' + field.key">
                    {{ field.label }}
                </slot>
            </div>
          </div>
        </div>
        <div class="table-spaced__body">
            <div v-for="(row, indexRow) in values"
                 :key="indexRow"
                 class="table-spaced__row">
                <div v-for="(item, indexItem) in row"
                     :key="indexItem"
                     :class="'table-spaced__items--body--' + fields[indexItem].key"
                     class="table-spaced__items table-spaced__items--body"
                     :style="'width:' + fields[indexItem].width + '; min-width:' + fields[indexItem].width">
                    <template v-if="typeof item === 'object'">
                    <slot :name="fields[indexItem].key"
                          :item="item">
                        <template v-if="typeof item[fields[indexItem].key] === 'string' || typeof item[fields[indexItem].key] === 'integer'">
                            {{ item[fields[indexItem].key] }}
                        </template>
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
    values: {
      type: Array,
      default: () => []
    }
  }
}
</script>
