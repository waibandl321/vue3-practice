import TimngIndex from '@/views/timemanagement/TimngIndex.vue'
import commonRoute from './common'
import manageRoute from './manage'
import myshopRoute from './myshop'
import routineRoute from './routine'

export default [
  {
    path: '/timemanagement',
    name: 'timng-index',
    component: TimngIndex,
    children: [
      ...commonRoute,
      ...manageRoute,
      ...myshopRoute,
      ...routineRoute
    ]
  }
]
