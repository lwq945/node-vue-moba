<template>
  <div class="main">
    <!-- topbar -->
    <div class="topbar bg-dark px-5 py-2 d-flex jc-between ai-center">
      <i class="icon icon-logo"></i>
      <div class="logo-text flex-1 pl-3">
        <p class="text-white">王者荣耀</p>
        <p class="fs-xxs text-grey-l">团队成就更多</p>
      </div>
      <i class="icon icon-download"></i>
    </div>
    <!-- navbar -->
    <div class="bg-primary py-3">
      <ul class="nav nav-inverse d-flex jc-around ai-center">
        <router-link tag="li" to="/" class="nav-item">
          <div class="nav-link" >首页</div>
        </router-link>
        <router-link tag="li" to="/strategy" class="nav-item">
          <div class="nav-link">攻略中心</div>
        </router-link>
        <router-link tag="li" to="/match" class="nav-item">
          <div class="nav-link">赛事中心</div>
        </router-link>
      </ul>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'primary'
}
</script>

<style lang="scss" scoped>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 9999;
  }
</style>