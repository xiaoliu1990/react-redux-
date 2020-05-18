import AsyncComponent from 'components/AsyncComponent';
export default [
  { 
    path: '/',
    exact: true,
    meta: {
      title: '首页'
    },
    component: AsyncComponent(() => import('./index'))
  },
  {
    path: '/form',
    meta: {
      title: '体征数据'
    },
    component: AsyncComponent(() => import('./from'))
  },
]