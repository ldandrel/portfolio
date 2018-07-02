import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Project from '@/components/Project'
import About from '@/components/About'
import VueAnalytics from 'vue-analytics'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/project/:slug',
      name: 'Project',
      component: Project,
      props: true
    }
  ]
})

Vue.use(VueAnalytics, {
  id: 'UA-93913497-1',
  router
})

export default router;
