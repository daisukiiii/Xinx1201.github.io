import Layout from '@/Layout'
import env from '@/utils/env.js'

export default {
  path: '/',
  component: Layout,
  redirect: env.isLocal ? 'Practice' : 'Fame',
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
      path: '/Forecast',
      name: 'Forecast',
      component: () => import('@/views/Forecast'),
      meta: {
        title: '刷马预测'
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
      path: '/CashOut',
      name: 'CashOut',
      component: () => import('@/views/CashOut'),
      meta: {
        title: '提现'
      }
    },
    {
      path: '/ValuablesStatistical',
      name: 'ValuablesStatistical',
      component: () => import('@/views/ValuablesStatistical'),
      meta: {
        title: '掉落统计'
      }
    },
    {
      path: '/Practice',
      name: 'Practice',
      component: () => import('@/views/Practice'),
      meta: {
        title: '练习'
      }
    },
  ],
}
