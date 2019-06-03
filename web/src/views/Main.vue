<template>
  <div class="main">
    <div class="topbar bg-dark px-5 py-2 d-flex jc-between ai-center">
      <img src="../assets/images/logo.png" height="30">
      <div class="logo-text flex-1 pl-3">
        <p class="text-base">王者荣耀</p>
        <p class="fs-xxs text-grey-l">团队成就更多</p>
      </div>
      <button class="btn bg-primary">立即下载</button>
    </div>

    <div class="bg-primary py-3">
      <div class="nav d-flex jc-around ai-center text-base">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/strategy">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/match">赛事中心</router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>