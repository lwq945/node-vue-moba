<template>
  <div class="card-container">
    <div class="card-header py-3">
      <!-- <i class="iconfont" :class="`icon-${icon}`"></i>
      <span class="flex-1 pl-2 fs-lg">{{ title }}</span>
      <i class="iconfont icon-more2 fs-xl text-dark-l"></i>-->
      <div class="card-header-topbar d-flex jc-between ai-center">
        <i class="iconfont" :class="`icon-${icon}`"></i>
        <span class="flex-1 pl-2 fs-lg text-dark">{{ title }}</span>
        <i class="iconfont icon-more2 fs-xl text-dark-l"></i>
      </div>
      <slot name="banner"></slot>
    </div>
    <div class="card-body pb-2">
      <!-- nav bar -->
      <ul class="nav d-flex jc-between ai-center pt-4 pb-3">
        <li
          class="nav-item"
          :class="{active: active === index}"
          v-for="(category, index) in categories"
          :key="index"
          @click="$refs.slide.swiper.slideTo(index)"
        >
          <div class="nav-link fs-md">{{ category.name }}</div>
        </li>
      </ul>
      <!-- slides -->
      <div class="mt-1">
        <swiper
          ref="slide"
          @slide-change="active=$refs.slide.swiper.realIndex"
          :options="swiperOption"
        >
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
      active: 0,
      swiperOption: {
        autoHeight: true
      }
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