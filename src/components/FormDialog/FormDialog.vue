<template>
  <div class="formDialog">
        <el-dialog
          :title="title"
          :visible.sync="visible"
          @close="closeFn"
          :modal="modal"
          :show-close="showClose"
          :close-on-click-modal ="close"
          >
            <div class="main">
              <slot name="contnet"></slot>
            </div>
            <slot name="footer"></slot>
        </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'FormDialog',
    data() {
      return {
        close:false
      }
    },
    components: {
    },
    props: {
      title: String,
      visible: Boolean,
      modal: Boolean,
      showClose: Boolean,
    },
    created() {
    },
    methods: {
      closeFn() {
        this.$emit('close', this.visible);
      }
    },
  }
</script>
<style lang="less" scoped>
  @import "FormDialog";
</style>
