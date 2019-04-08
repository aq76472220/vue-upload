import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/components/HelloWorld'
import vuex from '@/pages/components/vuex'
import vuex2 from '@/pages/components/vuex2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: vuex
    },
    {
      path: '/vuex2',
      name: 'vuex2',
      component: vuex2
    }
  ]
})
