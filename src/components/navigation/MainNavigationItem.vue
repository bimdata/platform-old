<template>
    <div class="menu-navigation__item" @mouseover="hovered = true" @mouseleave="hovered = false">
        <div class="item__icon-container" :class="{'hovered': hovered}">
            <svgicon :name="name" width="20" height="20"></svgicon>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      hovered: false
    }
  },
  props: {
    name: String
  }
}
</script>
<style lang="scss">
    @import '@styles/_bootstrap-variable-override.scss';

    .menu-navigation__item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        &:hover {
            cursor: pointer;
        }

        &::after {
            align-self: flex-end;
            width: 100%;
            content: '';
            display: block;
            background-color: $body-color;
            opacity: 0.08;
            height: 1px;
        }
    }

    .item__icon-container {
        padding-top: 15px;
        padding-bottom: 15px;
        transition: .15s ease-in-out all;
        color: $body-color;

        &.hovered {
            color: $primary;
        }
    }
</style>
