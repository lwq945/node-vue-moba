<template>
  <div class="home">
    <home-swiper :lists="slides"></home-swiper>
    <div class="nav-icons mt-3 bg-white">
      <ul class="d-flex flex-wrap  text-center pt-4 text-black">
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
      <div class="collapse py-2 text-center bg-grey-hl text-dark-l">
        <i class="icon icon-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HomeSwiper from '../components/common/Swiper'
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
    HomeSwiper
  }
}
</script>

<style lang="scss">
@import '../assets/style/_variable.scss';
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
  
</style>
