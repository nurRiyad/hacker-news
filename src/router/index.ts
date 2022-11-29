import { createRouter, createWebHistory } from 'vue-router'
import TopPage from '../views/TopPage.vue'
import NewPage from '@/views/NewPage.vue'
import ShowPage from '@/views/ShowPage.vue'
import AskPage from '@/views/AskPage.vue'
import JobsPage from '@/views/JobsPage.vue'
import BestPage from '@/views/BestPage.vue'
import UserPage from '@/views/UserPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'topNews',
      component: TopPage,
    },
    {
      path: '/new',
      name: 'newPage',
      component: NewPage,
    },
    {
      path: '/best',
      name: 'bestPage',
      component: BestPage,
    },
    {
      path: '/show',
      name: 'showPage',
      component: ShowPage,
    },
    {
      path: '/ask',
      name: 'askPage',
      component: AskPage,
    },
    {
      path: '/jobs',
      name: 'jobsPage',
      component: JobsPage,
    },
    {
      path: '/user/:userid',
      name: 'userPage',
      component: UserPage,
    },
  ],
})

export default router
