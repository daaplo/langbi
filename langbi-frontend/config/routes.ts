export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/Login'},
      {name: '注册', path: '/user/register', component: './User/Register'}
    ],
  },
   {path: '/', redirect: 'add_chart'},
  {path: '/add_chart', name: '分析数据图表(同步)', icon: 'ProfileTwoTone', component: './AddChart'},
  {path: '/add_chart_async', name: '分析数据图表(异步)', icon: 'ProfileTwoTone', component: './AddChartAsync'},
  {path: '/my_chart', name: '我的数据图表', icon: 'AppstoreTwoTone', component: './MyChart'},
  { path: '/viewChartData/:id', icon: 'checkCircle', component: './ViewChartData', name: '查看图表', hideInMenu: true,  },
  { path: '/person/user_info', name: '个人信息',icon: 'SmileTwoTone', component: './User/UserInfo/' },

  {
    path: '/admin',
    name: '管理页面',
    icon: 'ContactsTwoTone',
    access: 'canAdmin',
    routes: [
      {path: '/admin', redirect: '/admin/sub-page'},
      {path: '/admin/user-manage', name: '用户管理',icon: 'HomeFilled', component: './Admin/UserManage'},
      { path: '/admin/adduser', name: '添加用户', icon: 'SmileTwoTone',component: './Admin/AddUser' },
      { path: '/admin/chart_manage', name: '图表管理',icon: 'FundFilled', component: './Admin/ChartManage' },
    ],
  },
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
