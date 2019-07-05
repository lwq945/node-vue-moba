<template>
  <div class="hero" v-if="heroData">
    <!-- topbar -->
    <div class="topbar bg-dark px-5 py-2 d-flex jc-between ai-center text-white">
      <i class="icon icon-logo"></i>
      <div class="logo-text flex-1 pl-3">
        <span class="mr-4">王者荣耀</span>
        <span>攻略站</span>
      </div>
      <router-link tag="div" to="/" class="fs-xl d-flex ai-center"><span class="fs-sm mr-3">更多英雄</span> &gt;</router-link>
    </div>
    <div class="banner">{{ heroData.name}}</div>
  </div>
</template>

<script>
export default {
  name: 'hero',
  props: {
    id: {required: true}
  },
  data() {
    return {
      heroData: null
    }
  },
  created() {
    this.fetchHeroData()
  },
  methods: {
    async fetchHeroData() {
      const res = await this.$http.get(`/heroes/${this.id}`)
      this.heroData = res.data
    }
  },
}
</script>