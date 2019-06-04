<template>
  <div class="wrapper">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item in lists" :key="item.id">
        <img :src="item.image" class="w-100">
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
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
.swiper-pagination {
  text-align: right;
  padding-right: 0.7rem;
}
.swiper-pagination {
  .swiper-pagination-bullet {
    display: inline-block;
    width: 0.6923rem;
    height: 0.6923rem;
    border-radius: 2px;
    background: #fff;
    opacity: 1;
    margin-right: 0.7rem;
    transition: all 0.05s ease-in;
  }
}
.swiper-pagination {
  .my-bullet-active {
    background: #4b67af;
  }
}
</style>