<template>
    <header class="header">
      <div class="header__container container-fluid">
        <main-header-logo></main-header-logo>
        <main-dark-mode></main-dark-mode>
        <main-header-navigation></main-header-navigation>
        <main-header-user-menu></main-header-user-menu>
      </div>
    </header>
</template>
<script>
import MainHeaderLogo from '@/components/navigation/MainHeaderLogo'
import MainDarkMode from '@/components/navigation/MainDarkMode'
import MainHeaderNavigation from '@/components/navigation/MainHeaderNavigation'
import MainHeaderUserMenu from '@/components/navigation/MainHeaderUserMenu'

export default {
  components: {
    MainHeaderLogo,
    MainDarkMode,
    MainHeaderNavigation,
    MainHeaderUserMenu
  }
}
</script>
