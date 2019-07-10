<template>
  <div class="page-hero" v-if="heroData">
    
    <div class="topbar bg-dark px-5 py-2 d-flex jc-between ai-center text-white">
      <i class="icon icon-logo"></i>
      <div class="logo-text flex-1 pl-3">
        <span class="mr-4">王者荣耀</span>
        <span>攻略站</span>
      </div>
      <router-link tag="div" to="/" class="fs-xl d-flex ai-center">
        <span class="fs-sm mr-3">更多英雄</span> &gt;
      </router-link>
    </div>
    <!-- end of topbar -->
    <div class="banner" :style="{'background-image': `url(${heroData.banner})`}">
      <div class="info text-white px-5 py-3 d-flex flex-column jc-end h-100">
        <div class="title fs-sm">{{ heroData.title }}</div>
        <h2 class="name">{{ heroData.name }}</h2>
        <div class="categories fs-sm mb-2">{{ heroData.categories.map(v => v.name).join('/') }}</div>
        <div class="scores fs-sm d-flex jc-between">
          <div class="scores-left d-flex ai-center">
            <span>难度</span>
            <span class="badge bg-primary-1 fs-xxs">{{ heroData.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-info-1 fs-xxs">{{ heroData.scores.skills }}</span>
            <span>攻击</span>
            <span class="badge bg-danger fs-xxs">{{ heroData.scores.attack }}</span>
            <span>生存</span>
            <span class="badge bg-dark-l fs-xxs">{{ heroData.scores.survive }}</span>
          </div>
          <div class="scores-right">
            <router-link tag="div" to="/" class="text-grey-ll d-flex ai-center">
              <span class="fs-sm mr-2">皮肤：5</span>
              <i class="iconfont icon-you fs-xxs"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- end of banner -->
    <div class="bg-white">
      <!-- nav -->
      <nav class="bg-white px-4">
        <ul class="nav d-flex jc-around ai-center pt-4 pb-2 border-bottom">
          <li class="nav-item active">
            <div class="nav-link fs-md">英雄初始</div>
          </li>
          <li class="nav-item">
            <div class="nav-link fs-md">进阶攻略</div>
          </li>
        </ul>
      </nav>
      <!-- swiper -->
      <swiper>
        <swiper-slide>
          <div class="hero-info-wrapper bg-white">
            <div class="skill-part px-4">
              <div class="link-btn d-flex py-3 bg-white">
                <router-link tag="button" to="/" class="flex-1 btn btn-lg mr-2">
                  <i class="iconfont icon-shipin1"></i>
                  <span>英雄介绍视频</span>
                </router-link>
                <router-link tag="button" to="/" class="flex-1 btn btn-lg">
                  <i class="iconfont icon-tupian-xianxing"></i>
                  <span>一图识英雄</span>
                </router-link>
              </div>
              <div class="skills d-flex jc-around my-5">
                <img 
                  class="skill-icon"
                  :class="{'skill-active':currentSkillIndex === index}"
                  :src="item.icon" 
                  v-for="(item, index) in heroData.skills" 
                  :key="index"
                  @click="currentSkillIndex=index"
                >
              </div>
              <div class="skill-info">
                <div class="d-flex">
                  <h3>{{ currentSkill.name }}</h3>
                  <span class="ml-5 text-dark-ll">(冷却值: {{ currentSkill.delay }} 消耗: {{ currentSkill.expend }})</span>
                </div>
              </div>
              <div class="content-dody text-dark py-4" v-if="currentSkill">
                <p class="description border-bottom pb-3">{{ currentSkill.description }}</p>
                <p class="tip py-5 text-grey-l">小提示：{{ currentSkill.tips}}</p>
              </div>
            </div>
            <split></split>
            <card-base icon="menu" title="出装推荐" class="px-4">
              <template v-slot:body-content>
                <div class="advantages border-bottom">
                  <div class="title fs-lg ">顺风出装</div>
                  <div class="items items1 d-flex jc-between">
                    <div 
                      v-for="(item, index) in heroData.items1" 
                      :key="index" 
                      class="d-flex flex-column jc-center ai-center my-3"
                    >
                      <img :src="item.icon" width="47">
                      <p class="name">{{ item.name }}</p>
                    </div>
                  </div>
                </div>
                <div class="disadvantages mt-3">
                  <div class="title fs-lg ">逆风出装</div>
                  <div class="items items1 d-flex jc-between">
                    <div 
                      v-for="(item, index) in heroData.items2" 
                      :key="index" 
                      class="d-flex flex-column jc-center ai-center my-3"
                    >
                      <img :src="item.icon" width="47">
                      <p class="name">{{ item.name }}</p>
                    </div>
                  </div>
                </div>
              </template>
            </card-base>
            <split></split>
            <card-base icon="menu" title="使用技巧" class="px-4">
              <template v-slot:body-content>
                <p class="my-2  text-grey-l">{{ heroData.usageTips }}</p>
              </template>
            </card-base>
            <split></split>
            <card-base icon="menu" title="对抗技巧" class="px-4">
              <template v-slot:body-content>
                <p class="my-2 text-grey-l">{{ heroData.battleTips }}</p>
              </template>
            </card-base>
            <split></split>
            <card-base icon="menu" title="团战思路" class="px-4">
              <template v-slot:body-content>
                <p class="my-2 text-grey-l">{{ heroData.teamTips }}</p>
              </template>
            </card-base>
            <split></split>
            <card-base icon="menu" title="英雄关系" class="px-4">
              <template v-slot:body-content>
                <div class="fs-lg">最佳搭档</div>
                <div class="partners mt-3 border-bottom">
                  <div 
                    v-for="item in heroData.partners" 
                    :key="item._id"
                    class="d-flex mb-5 "
                  >
                    <img :src="item.hero.avatar" height="50">
                    <p class="flex-1 ml-3">{{ item.description }}</p>
                  </div>
                </div>
              </template>
            </card-base>
          </div>
        </swiper-slide>
        <swiper-slide></swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import CardBase from '../components/common/CardBase'
import Split from '../components/common/Split'
export default {
  name: 'hero',
  props: {
    id: { required: true }
  },
  data() {
    return {
      heroData: null,
      currentSkillIndex: 0
    }
  },
  created() {
    this.fetchHeroData()
  },
  computed: {
    currentSkill() {
      return this.heroData.skills[this.currentSkillIndex]
    }
  },
  methods: {
    async fetchHeroData() {
      const res = await this.$http.get(`/heroes/${this.id}`)
      this.heroData = res.data
      console.log(this.heroData)
    }
  },
  components: {
    CardBase,
    Split
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";

.page-hero {
  .banner {
    height: 14.7rem;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      margin-top: -0.4rem;
      .badge {
        display: inline-block;
        margin: 0.25rem 0.6rem 0;
        width: 1.2rem;
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: center;
        border-radius: 50%;
        transform: scale(0.75);
        transform-origin: 0 0;
        border: 1px solid rgba(255, 255, 255, 0.4);
      }
    }
  }

  .skills {
    img.skill-icon {
      width: 60px;
      height: 60px;
      border: 3px solid map-get($colors, 'white');
      &.skill-active {
        border-color: map-get($colors, 'primary');
        border-radius: 50%;
      }
    }
  }
  .items {
    img {
      width: 3.57rem;
      height: 3.57rem;
      border-radius: 50%;
    }
    .name {
      transform: scale(0.75);
      // transform-origin: 0 0;
    }
  }
}
</style>
