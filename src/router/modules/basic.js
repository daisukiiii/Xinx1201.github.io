import Layout from '@/Layout'

export default {
  path: '/',
  component: Layout,
  redirect: 'Fame',
  children: [
    {
      path: '/Fame',
      name: 'Fame',
      component: () => import('@/views/Fame'),
      meta: {
        title: '楚天社'
      }
    },
    {
      path: '/Time',
      name: 'Time',
      component: () => import('@/views/Time'),
      meta: {
        title: '刷马时间'
      }
    },
    {
      path: '/UID',
      name: 'UID',
      component: () => import('@/views/UID'),
      meta: {
        title: 'UID对应表'
      }
    },
    {
      path: '/adventure',
      name: 'Adventure',
      component: () => import('@/views/Adventure'),
      meta: {
        title: '奇遇'
      }
    },
    {
      path: '/todoList',
      name: 'TodoList',
      component: () => import('@/views/TodoList'),
      meta: {
        title: '待办清单'
      }
    },
    {
      path: '/Websocket',
      name: 'Websocket',
      component: () => import('@/views/Websocket'),
      meta: {
        title: 'Websocket'
      }
    },
    {
      path: '/ComponentsSkills',
      name: 'ComponentsSkills',
      component: () => import('@/views/ComponentsSkills'),
      meta: {
        title: 'ElementUI组件相关'
      }
    },
  ],
}
