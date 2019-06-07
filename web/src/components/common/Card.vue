<template>
  <div class="card-container">
    <div class="card-header d-flex jc-between ai-center py-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <span class="flex-1 pl-2 fs-lg">{{ title }}</span>
      <i class="iconfont icon-more2 fs-xl text-dark-l"></i>
    </div>
    <div class="card-body pb-2">
      <ul class="nav d-flex jc-between ai-center pt-4 pb-3">
        <li
          class="nav-item"
          :class="{active: active === index}"
          v-for="(category, index) in categories"
          :key="index"
          @click="active=index"
        >
          <div class="nav-link fs-md">{{ category.name }}</div>
        </li>
      </ul>
      <div class="mt-1">
        <swiper>
          <swiper-slide v-for="(category,index) in categories" :key="index">
            <!-- 将 categories 的每一项作为 插槽的prop传入，在父组件就可以直接拿到 category -->
            <slot name="newslists" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <slot name="card-footer"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data() {
    return {
      active: 0
    }
  },
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/_variable.scss";
.card-container {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>
