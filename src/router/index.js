import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  {
    path: '/',
    name: 'login',
    meta: {layout: 'empty', auth: true},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/select_organisation',
    name: 'select_organisation',
    meta: {layout: 'empty', auth: true},
    component: () => import('../views/SelectOrganisation.vue')
  },
  {
    path: '/organisation/',
    name: 'organisation',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Organisation.vue')
  },
  {
    path: '/posts/',
    name: 'posts',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Posts.vue')
  },
  {
    path: '/departments',
    name: 'departments',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Departments.vue')
  },
  {
    path: '/employees',
    name: 'employees',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Employees.vue')
  },
  {
    path: '/commissions/:uid',
    name: 'commissions',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Commission.vue')
  },
  {
    path: '/responsibilities/:uid',
    name: 'responsibilities',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Responsible.vue')
  },
  {
    path: '/rooms',
    name: 'rooms',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Rooms.vue')
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
