<template>
    <div>
        <div class="wrapper">
            <header class="header">
                <div class="logo-container">
                    <img class="logo-container__logo" src="../assets/images/logo-bimdata-carre.svg" width="40" height="30"/>
                </div>
                <div class="breadcrumb-container">
                    <b-breadcrumb :items="items"/>
                </div>
                <div class="user-menu">
                    notf
                </div>
            </header>
            <aside class="aside nav-menu">Aside 1</aside>
            <article class="main">
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </article>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      items: [{
        text: 'Admin',
        href: '#'
      }, {
        text: 'Manage',
        href: '#'
      }, {
        text: 'Library',
        active: true
      }]
    }
  }
}
</script>
