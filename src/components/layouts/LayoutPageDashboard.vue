<template>
    <div>
        <div class="wrapper">
            <header class="header">
                <div class="logo-container">
                    <img class="logo-container__logo" src="../../assets/images/logo-bimdata-carre.svg" width="40" height="30"/>
                </div>
                <div class="breadcrumb-container">
                    <b-breadcrumb items=""/>
                </div>
                <div class="user-menu">
                    notf
                </div>
            </header>
            <navigation-main></navigation-main>
            <article class="main">
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </article>
        </div>
    </div>
</template>
<script>
import NavigationMain from '@/components/navigation/NavigationMain'

export default {
  components: {
    'navigation-main': NavigationMain
  },
  data () {
    return {
      items: [{
        text: 'Accueil',
        href: '#'
      }]
    }
  }
}
</script>
