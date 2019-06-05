<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in lists" :key="item.id">
        <img :src="item.image" class="w-100">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination text-right pb-2" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    lists: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          bulletActiveClass: 'my-bullet-active',
        },
        loop: true,
        autoplay: {
          // 触碰后自动切换也不会停止
          disableOnInteraction: false
        },
        a11y: false
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
@import '../../assets/style/_variable.scss';

.swiper-pagination {
  padding-right: 1rem;
}
.swiper-pagination {
  .swiper-pagination-bullet {
    width: 0.6923rem;
    height: 0.6923rem;
    border-radius: 0.1538rem;
    background: map-get($colors, 'white');
    opacity: 1;
    &.my-bullet-active {
      background: map-get($colors, 'info');
    }
  }
}
</style>