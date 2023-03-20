import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/timetabling/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TablingPage.vue') },
      { path: 'test/', component: () => import('pages/TestPage.vue') },
      { path: 'tabling/', component: () => import('pages/TimetablingPage.vue')},
    ],
  },
  {
    path: '/mylayout/',
    component: () => import('layouts/MyLayout.vue'),
    children: [{ path: '', component: () => import('pages/TimetablingPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;