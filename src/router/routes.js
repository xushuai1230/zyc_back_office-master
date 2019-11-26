import Layout from '@/layout/Layout.vue'

const routers = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/index',
    children: [
      {
        path: '/index',
        name: 'index',
        meta: {
          title: '人员管理'
          // 添加该字段, 表示登录后才可以访问
          // requireAuth: true
          // 添加该字段, 表示该组件会被缓存
          //   keepAlive: true,
        },
        component: () => import('@/pages/index/index.vue'),
        hidden: true
      },
      {
        path: '/unAuditList',
        name: 'unAuditList',
        meta: {
          title: '待审核列表'
          // 添加该字段, 表示登录后才可以访问
          // requireAuth: true
          // 添加该字段, 表示该组件会被缓存
          //   keepAlive: true,
        },
        component: () => import('@/pages/unAuditList/unAuditList.vue'),
        hidden: true
      },
      {
        path: '/AuditList',
        name: 'AuditList',
        meta: {
          title: '已审核列表'
          // 添加该字段, 表示登录后才可以访问
          // requireAuth: true
          // 添加该字段, 表示该组件会被缓存
          //   keepAlive: true,
        },
        component: () => import('@/pages/AuditList/AuditList.vue'),
        hidden: true
      },
      {
        path: '/unAuditDetail',
        name: 'unAuditDetail',
        meta: {
          title: '待审核列表'
          // 添加该字段, 表示登录后才可以访问
          // requireAuth: true
          // 添加该字段, 表示该组件会被缓存
          //   keepAlive: true,
        },
        component: () => import('@/pages/unAuditDetail/unAuditDetail.vue'),
        hidden: true
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/login.vue'),
    hidden: true
  }
];
export default routers;
