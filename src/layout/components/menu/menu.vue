<template>
  <div class="menu">

  </div>
</template>
<script>

  export default {
    props: {
      isCollapse: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentRouter: {},
        openeds: ["0", "1"],
        activeMenu: ""
      };
    },
    created() {
      let vm = this;
    },
    computed: {},
    methods: {},
    watch: {}
  };
</script>
<style lang="less">
  @import 'menu.less';
</style>
