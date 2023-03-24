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
    path: '/departments',
    name: 'departments',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Departments.vue')
  },
  {
    path: '/employee',
    name: 'employee',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Employee.vue')
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
