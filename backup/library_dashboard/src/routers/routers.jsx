import React from 'react'

const Dashboard = React.lazy(() => import('../pages/dashboard/Dashboard'))

const Users = React.lazy(() => import('../pages/user/Users'))
const StatisticUser = React.lazy(() => import('../pages/user/StatisticUser'))

const Books = React.lazy(() => import('../pages/book/Books'))
const AddBook = React.lazy(() => import('../pages/book/AddBook'))
const AddChapter = React.lazy(() => import('../pages/book/AddChapter'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/users/list', name: 'Người dùng', element: Users},
  {path:'/users/statistic', name:'Thống kê người dùng', element: StatisticUser},
  {path:'/books/list', name:'Sách', element: Books},
  {path:'/books/add', name:'Thêm sách', element: AddBook},
  {path:'/books/add-chapter', name:'Thêm chương', element: AddChapter}

]

export default routes
