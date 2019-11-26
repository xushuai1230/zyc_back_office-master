<template>
  <div class="app-main" id="appMain">

      <keep-alive>
        <!--<transition name="fade">-->
          <router-view class="app-router-view" v-if="$route.meta.keepAlive" /><!-- 这里是会被缓存的视图组件 -->
        <!--</transition>-->
      </keep-alive>
      <!--<transition name="fade">-->
        <router-view class="app-router-view" v-if="!$route.meta.keepAlive" /><!-- 这里是不被缓存的视图组件 -->
      <!--</transition>-->
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {

  }
}
</script>
<style lang="less" scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>
