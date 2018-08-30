<template>
    <div>
        <div class="wrapper">
            <main-header></main-header>
            <article class="main">
                <transition name="slide-fade" mode="out-in">
                    <router-view :key="$route.fullPath"></router-view>
                </transition>
            </article>
        </div>
    </div>
</template>
<script>
import MainHeader from '@/components/navigation/MainHeader'

export default {
  components: {
    'main-header': MainHeader
  }
}
</script>
