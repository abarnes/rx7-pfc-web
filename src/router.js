import Vue from 'vue'
import Router from 'vue-router'
import DrivePage from './views/DrivePage.vue'
import LivePage from './views/LivePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'drivePage',
      component: DrivePage
    },
    {
      path: '/live',
      name: 'livePage',
      component: LivePage
    }
  ]
})
