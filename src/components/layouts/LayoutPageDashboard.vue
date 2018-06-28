<template>
    <div>
        <div class="wrapper">
            <main-header></main-header>
            <main-navigation></main-navigation>
            <article class="main">
                <transition name="slide-fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </article>
        </div>
    </div>
</template>
<script>
import MainNavigation from '@/components/navigation/MainNavigation'
import MainHeader from '@/components/navigation/MainHeader'

export default {
  components: {
    'main-navigation': MainNavigation,
    'main-header': MainHeader
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
