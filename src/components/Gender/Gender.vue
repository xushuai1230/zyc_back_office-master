<template>
  <div class="Gender">
     <span class="nan" :class="{'active': activeIdx == 0}" @click="toggle(0)">男</span>
     <span class='nv' :class="{'active': activeIdx == 1}" @click="toggle(1)">女</span>
  </div>
</template>
<script>
  export default {
    name: 'FormDialog',
    data() {
      return {
        activeIdx:0
      }
    },
    components: {
    },
    created() {
    },
    methods: {
      toggle(activeIdx) {
        this.activeIdx = activeIdx;
        this.$emit('changSex' ,this.activeIdx)
      }
    },
  }
</script>
<style lang="less" scoped>
  @import "Gender";
</style>
