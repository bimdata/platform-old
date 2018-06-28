<template>
    <header class="header">
        <main-header-logo></main-header-logo>
        <main-header-breadcrumb></main-header-breadcrumb>
        <main-header-user-menu></main-header-user-menu>
    </header>
</template>
<script>
import MainHeaderLogo from '@/components/navigation/MainHeaderLogo'
import MainHeaderBreadcrumb from '@/components/navigation/MainHeaderBreadcrumb'
import MainHeaderUserMenu from '@/components/navigation/MainHeaderUserMenu'

export default {
  components: {
    'main-header-logo': MainHeaderLogo,
    'main-header-breadcrumb': MainHeaderBreadcrumb,
    'main-header-user-menu': MainHeaderUserMenu
  }
}
</script>
<style lang="scss">
    @import '@styles/_bootstrap-variable-override.scss';
    @import '@styles/_mixins.scss';
    .header {
        display: flex;
        height: 50px;
        background-color: white;
        @include bm-box-shadow
    }
</style>
