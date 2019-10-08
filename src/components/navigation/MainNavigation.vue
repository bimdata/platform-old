<!-- This file is part of the BIMData Platform package.
(c) BIMData support@bimdata.io
For the full copyright and license information, please view the LICENSE
file that was distributed with this source code. -->
<template>
    <aside class="aside nav-menu">
        <main-navigation-item name="home"></main-navigation-item>
        <main-navigation-item name="model"></main-navigation-item>
        <main-navigation-item name="users"></main-navigation-item>
        <main-navigation-item name="cloud"></main-navigation-item>
    </aside>
</template>
<script>
import MainNavigationItem from '@/components/navigation/MainNavigationItem'
import '@/icons/home'
import '@/icons/model'
import '@/icons/users'
import '@/icons/cloud'

export default {
  name: 'NavigationMain',
  components: {
    MainNavigationItem
  }
}
</script>
<style lang="scss">
    @import '@styles/_bootstrap-variable-override.scss';
    @import '@styles/_mixins.scss';
    .nav-menu {
        min-height: 100vh;
        flex-basis: 50px;
        background-color: white;
        @include bm-box-shadow()
    }
</style>
