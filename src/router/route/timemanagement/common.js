
import TimngHome from '@/views/timemanagement/home/TimngHome.vue'
import TimngDashboard from '@/views/timemanagement/dashboard/TimngDashboard.vue'
import TimngShops from '@/views/timemanagement/shops/TimngShops.vue'

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
  {
    path: 'shops',
    name: 'timng-shops',
    component: TimngShops,
    meta: { title: '店舗一覧' }
  },
]