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
    component: () => import('../views/Organisation/SelectOrganisation.vue')
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
    path: '/commissions',
    name: 'commissions',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Commissions/Commissions.vue')
  },

  {
    path: '/commission/:commission_uid',
    name: 'commission',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Commissions/Commission.vue')
  },


  {
    path: '/responsibilities/',
    name: 'responsibilities',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Responsibilities/Responsibilities.vue')
  },

  {
    path: '/responsible/:responsible_type',
    name: 'responsible',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Responsibilities/Responsible.vue')
  },

  {
    path: '/rooms',
    name: 'rooms',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Organisation/Rooms.vue')
  },


  {
    path: '/kii_objects',
    name: 'kii_objects',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/KII/KiiObjects.vue')

  },

  {
    path: '/kii_object/:uid',
    name: 'kii_object',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/KII/KiiObjectForm.vue')
  },

  {
    path: '/kii_process/:uid',
    name: 'kii_process',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/KII/KiiProcessForm.vue')
  },

  {
    path: '/documents',
    name: 'documents',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Documents/Documets.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
