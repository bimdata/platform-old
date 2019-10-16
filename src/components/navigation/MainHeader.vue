<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <header class="header">
      <div class="header__container container-fluid">
        <main-header-logo></main-header-logo>
        <main-header-navigation></main-header-navigation>
        <main-header-user-menu></main-header-user-menu>
      </div>
    </header>
</template>
<script>
import MainHeaderLogo from '@/components/navigation/MainHeaderLogo'
import MainHeaderNavigation from '@/components/navigation/MainHeaderNavigation'
import MainHeaderUserMenu from '@/components/navigation/MainHeaderUserMenu'

export default {
  components: {
    MainHeaderLogo,
    MainHeaderNavigation,
    MainHeaderUserMenu
  }
}
</script>
