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
]