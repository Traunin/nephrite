import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import TimetableView from '@/views/TimetableView.vue'
import DocumentsView from '@/views/DocumentsView.vue'
import ClassesView from '@/views/ClassesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'timetable',
    component: TimetableView,
  },

  {
    path: '/classes',
    name: 'classes',
    component: DocumentsView,
  },

  {
    path: '/documents',
    name: 'documents',
    component: ClassesView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
