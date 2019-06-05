<template>
  <div class="card-container">
    <div class="card-header d-flex jc-between ai-center py-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <span class="flex-1 pl-2 fs-lg">{{ title }}</span>
      <i class="iconfont icon-more2 fs-xl text-dark-l"></i>
    </div>
    <div class="card-body pb-2">
      <slot></slot>
    </div>
    <slot name="card-footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/style/_variable.scss';
  .card-container {
    .card-header {
      border-bottom: 1px solid $border-color;
    }
  }
</style>
