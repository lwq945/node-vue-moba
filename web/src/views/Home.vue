<template>
  <div class="home">
    <!-- home swiper -->
    <div class="home-swiper mb-3">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item in slides" :key="item.id">
          <img :src="item.image" class="w-100">
        </swiper-slide>
        <div class="swiper-pagination text-right pb-2" slot="pagination"></div>
      </swiper>
    </div>
    <!-- nav-icons -->
    <div class="nav-icons bg-white">
      <ul class="d-flex flex-wrap text-center pt-5 text-black fs-sm">
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
      <m-card icon="menu" title="新闻资讯" :categories="newsData">
        <!-- 直接拿到 slot 绑定的 prop => category -->
        <template #newslists="{category}">
          <div
            class="slide-item d-flex jc-between ai-center mb-4"
            v-for="(item,index) in category.newsList"
            :key="index"
          >
            <span class="text-hightlight fs-mdl">[{{ item.categoryName }}]</span>
            <span class="mx-2">|</span>
            <span class="text-ellipsis flex-1 mr-4 fs-mdl text-black">{{ item.title }}</span>
            <span class="text-grey-l fs-sm">{{ item.createdAt | dateFormat }}</span>
          </div>
        </template>
      </m-card>
    </div>

    <!-- card heroes -->
    <div class="heroes bg-white my-4 px-5">
      <m-card icon="toukui" title="英雄列表" :categories="heroesData">
        <!-- 直接拿到 slot 绑定的 prop => category -->
        <template #newslists="{category}">
          <div class="siled-item-wrapper d-flex flex-wrap">
            <div class="slide-item p-2" v-for="(item,index) in category.heroList" :key="index">
              <img :src="item.avatar" class="w-100">
              <p class="fs-sm">{{ item.name }}</p>
            </div>
          </div>
        </template>
      </m-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/common/Card'
import dayjs from 'dayjs'
export default {
  name: 'home',
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
      },
      slides: [
        { id: 1, image: '//ossweb-img.qq.com/upload/adw/image/20190604/a81465de0bce25f22add0f4d700ec04f.jpeg' },
        { id: 2, image: '//ossweb-img.qq.com/upload/adw/image/20190602/86520e487b848db8d6a442f6aeecaca0.jpeg' },
        { id: 3, image: '//ossweb-img.qq.com/upload/adw/image/20190603/6d9c0b3189ab5e32636037f1a26d1c61.jpeg' }
      ],
      newsData: [],
      heroesData: []
    }
  },
  created() {
    this.fetchNewsData()
    this.fetchHeroesData()
  },
  methods: {
    async fetchNewsData() {
      const res = await this.$http.get('news/list')
      this.newsData = res.data
    },
    async fetchHeroesData() {
      const res = await this.$http.get('heroes/list')
      this.heroesData = res.data
    }

  },
  filters: {
    dateFormat(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  components: {
    'm-card': Card
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";
// swiper style
.swiper-pagination {
  padding-right: 1rem;
}
.swiper-pagination {
  .swiper-pagination-bullet {
    width: 0.6538rem;
    height: 0.6538rem;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    opacity: 1;
    &.my-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
// nav-icons style
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
// news card style
.news {
  border-bottom: 1px solid $border-color;
}

// heroes card style
.heroes {
  .siled-item-wrapper {
    margin: 0 -0.44rem;
    .slide-item {
      width: 20%;
      text-align: center;
    }
  }
}
</style>