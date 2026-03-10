import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Theory from '../views/Theory.vue'
import Practice from '../views/Practice.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/theory/:subject/:lessonIndex?',
    name: 'Theory',
    component: Theory,
    props: true
  },
  {
    path: '/quiz/:subject/:lessonIndex',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue'),
    props: true
  },
  {
    path: '/practice/:subject',
    name: 'Practice',
    component: Practice,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
