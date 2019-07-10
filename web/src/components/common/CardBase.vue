<template>
  <div class="card-container">
    <div class="card-header py-3">
      <div class="card-header-topbar d-flex jc-between ai-center">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <h3 class="flex-1 pl-2 fs-lg text-dark">{{ title }}</h3>
      </div>
      <slot name="banner"></slot>
    </div>
    <div class="card-body pb-2">
      <slot name="body-content"></slot>
    </div>
    <slot name="card-footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  },
  data() {
    return {
    }
  },
}
</script>

<style lang="scss" scoped>
// @import "../../assets/style/_variable.scss";
// .card-container {
//   .card-header {
//     border-bottom: 1px solid $border-color;
//   }
// }
</style>