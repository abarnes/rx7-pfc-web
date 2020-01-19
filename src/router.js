import Vue from 'vue'
import Router from 'vue-router'
import RemoteLogPage from './views/RemoteLogPage.vue'
import CsvLogPage from './views/CsvLogPage.vue'
import LivePage from './views/LivePage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'csvLogPage',
      component: CsvLogPage
    },
    {
      path: '/drive-log',
      name: 'RemoteLogPage',
      component: RemoteLogPage
    },
    {
      path: '/live',
      name: 'livePage',
      component: LivePage
    }
  ]
})
