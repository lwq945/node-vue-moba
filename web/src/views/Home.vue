<template>
  <div class="home">
    <home-swiper :lists="slides"></home-swiper>
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
        {id: 1, image: '//ossweb-img.qq.com/upload/adw/image/20190604/a81465de0bce25f22add0f4d700ec04f.jpeg'},
        {id: 2, image: '//ossweb-img.qq.com/upload/adw/image/20190602/86520e487b848db8d6a442f6aeecaca0.jpeg'},
        {id: 3, image: '//ossweb-img.qq.com/upload/adw/image/20190603/6d9c0b3189ab5e32636037f1a26d1c61.jpeg'}
      ]
    }
  },
  components: {
    HomeSwiper
  }
}
</script>

