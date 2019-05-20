import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

Vue.use(Router)

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        // { path: '', redirect: '/list' },
        { path: "/categories/create", component: CategoryEdit },
        { path: "/categories/edit/:id", component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList }
      ]
    },
    //create 和 edit 这两个路由指向的组件内容一样，通过是否有传 id 来判断 h1标签的内容（‘新建’ 还是 ‘编辑’）
    // edit 组件通过 props 来解耦组件传参,在组件中要定义props属性 id，然后直接使用这个属性 id，(使用时，就不用写 $route.params.id)
  ]
})
