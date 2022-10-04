import TimngIndex from '@/views/timemanagement/TimngIndex.vue'
import homeRoute from './home'
import manageRoute from './manage'
import myshopRoute from './myshop'
import routineRoute from './routine'

export default [
  {
    path: '/timemanagement',
    name: 'timng-index',
    component: TimngIndex,
    children: [
      ...homeRoute,
      ...manageRoute,
      ...myshopRoute,
      ...routineRoute
    ]
  }
]
