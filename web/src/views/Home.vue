<template>
  <div class="home">
    <!-- home swiper -->
    <home-swiper :lists="slides"></home-swiper>
    <!-- nav-icons -->
    <div class="nav-icons mt-3 bg-white">
      <ul class="d-flex flex-wrap text-center pt-4 text-black fs-sm">
        <li class="nav-item mb-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-broke mb-1"></i>
          <div>爆料站</div>
        </li>
        <li class="nav-item mb-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-story mb-1"></i>
          <div>故事站</div>
        </li>
        <li class="nav-item mb-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-mall mb-1"></i>
          <div>周边商城</div>
        </li>
        <li class="nav-item mb-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-experience mb-1"></i>
          <div>体验服</div>
        </li>
        <li class="nav-item my-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-newcomer mb-1"></i>
          <div>新人专区</div>
        </li>
        <li class="nav-item my-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-honor mb-1"></i>
          <div>荣耀传承</div>
        </li>
        <li class="nav-item my-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-colleague mb-1"></i>
          <div>同人社区</div>
        </li>
        <li class="nav-item my-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-kingcamp mb-1"></i>
          <div>王者营地</div>
        </li>
        <li class="nav-item my-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-public mb-1"></i>
          <div>公众号</div>
        </li>
        <li class="nav-item my-4 d-flex ai-center jc-between flex-column">
          <i class="icon icon-version mb-1"></i>
          <div>版本介绍</div>
        </li>
      </ul>
      <div class="collapse py-2 text-center bg-grey-hl text-dark-l fs-sm">
        <i class="icon icon-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- card news -->
    <div class="news bg-white my-4 px-5">
      <m-card icon="menu" title="新闻资讯">
        <ul class="nav d-flex jc-between ai-center pt-4 pb-3">
          <li class="nav-item active">
            <div class="nav-link fs-md">热门</div>
          </li>
          <li class="nav-item">
            <div class="nav-link fs-md">新闻</div>
          </li>
          <li class="nav-item">
            <div class="nav-link fs-md">公告</div>
          </li>
          <li class="nav-item">
            <div class="nav-link fs-md">活动</div>
          </li>
          <li class="nav-item">
            <div class="nav-link fs-md">赛事</div>
          </li>
        </ul>
        <div class="mt-1">
          <swiper>
            <swiper-slide v-for="n in 5" :key="n">
              <div class="slide-item d-flex jc-between ai-center mb-4" v-for="m in 5" :key="m">
                <span class="text-hightlight fs-mdl">[公告]</span>
                <span class="mx-2">|</span>
                <span class="text-ellipsis flex-1 mr-4 fs-mdl text-dark-l">2019KPL春季赛总决赛：退票及异地用户现场观赛补贴公告</span>
                <span class="text-grey-l fs-sm">06/04</span>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </m-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeSwiper from '../components/common/Swiper'
import Card from '../components/common/Card'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'home',
  data() {
    return {
      slides: [
        { id: 1, image: '//ossweb-img.qq.com/upload/adw/image/20190604/a81465de0bce25f22add0f4d700ec04f.jpeg' },
        { id: 2, image: '//ossweb-img.qq.com/upload/adw/image/20190602/86520e487b848db8d6a442f6aeecaca0.jpeg' },
        { id: 3, image: '//ossweb-img.qq.com/upload/adw/image/20190603/6d9c0b3189ab5e32636037f1a26d1c61.jpeg' }
      ]
    }
  },
  components: {
    swiper,
    swiperSlide,
    HomeSwiper,
    'm-card': Card
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    flex-wrap: wrap;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.news {
  border-bottom: 1px solid $border-color;
}
</style>
