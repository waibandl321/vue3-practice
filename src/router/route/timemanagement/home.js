
import TimngHome from '@/views/timemanagement/home/TimngHome.vue'
import TimngDashboard from '@/views/timemanagement/dashboard/TimngDashboard.vue'

export default [
  {
    path: '',
    name: 'timng-home',
    component: TimngHome,
    meta: { title: 'タイムマネジメント' }
  },
  {
    path: 'dashboard',
    name: 'timng-dashboard',
    component: TimngDashboard,
    meta: { title: 'ダッシュボード' }
  },
]