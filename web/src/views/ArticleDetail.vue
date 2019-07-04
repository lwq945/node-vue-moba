<template>
  <div class="articleDetail" v-if="articleData">
    <div class="back-bar d-flex ai-center py-2 px-1 border-bottom">
      <i class="iconfont icon-fanhui text-blue" @click="$router.go(-1)"></i>
      <span class="flex-1 text-blue ml-2">{{ articleData.title }}</span>
      <span class="fs-xxs text-grey">2019-06-22</span>
    </div>
    <div class="content px-5 fs-lg" v-html="articleData.body"></div>
    <div class="footer px-5 fs-mdl mb-5">
      <div class="footer-title mt-2 mb-3 d-flex ai-center">
        <i class="iconfont icon-lianjie mr-2 fs-xl"></i>
        <strong class="text-blue">相关资讯</strong>
      </div>
      <div class="text-dark-l fs-mdl">
        <!-- <p class="mb-2">6月29日全服不停机修复公告</p>
        <p>6月28日全服不停机修复公告</p> -->
        <router-link 
          tag="p" 
          :to="`/articleDetail/${item._id}`"
          v-for="item in articleData.related"
          :key="item._id"
          class="my-2"
        >
          {{ item.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-detail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      articleData: null
    }
  },
  created() {
    this.fetchArticleData()
  },
  methods: {
    async fetchArticleData() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.articleData = res.data
      console.log(this.articleData)
    }
  },
  watch: {
    id() {
       this.fetchArticleData()
    }
  }
}
</script>

<style lang="scss">
@import "../assets/style/_variable.scss";
.articleDetail {
  .content {
    h3 {
      text-align: center;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  }
  .footer {
    border-top: 3px solid $border-color;
  }
}
</style>