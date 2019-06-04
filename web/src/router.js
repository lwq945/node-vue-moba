import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue'
import Home from './views/Home.vue'
import Strategy from './views/Strategy.vue'
import Match from './views/Match.vue'

Vue.use(Router)

export default new Router({
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
    },
  ],
  linkExactActiveClass: 'active'
})
