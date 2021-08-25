export default [
  {
    path: '/todo',
    component: './Todo',
  },
  {
    path: '/todo',
    name: 'todo',
    icon: 'smile',
    component: './Todo',
  },
  {
    path: '/',
    redirect: '/todo',
  },
  {
    component: './404',
  },
];
