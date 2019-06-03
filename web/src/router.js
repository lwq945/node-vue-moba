import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue'
import Home from './components/main/Home.vue'
import Strategy from './components/main/Strategy.vue'
import Match from './components/main/Match.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/', name: 'home', component: Home },
        { path: '/strategy', name: 'strategy', component: Strategy },
        { path: '/match', name: 'match', component: Match },
      ]
    }
  ]
})
