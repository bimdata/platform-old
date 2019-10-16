<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
  <div class="base-dropdown">
    <b-dropdown
        :text="title"
        size="lg"
        id="user-menu__ddown"
        class="user-menu__ddown"
        right
      >
      <slot name="base-dropdown-menu"></slot>
    </b-dropdown>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
