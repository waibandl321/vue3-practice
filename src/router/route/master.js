import MasterCompany from '@/views/master/MasterCompany.vue'
import MasterBrand from '@/views/master/MasterBrand.vue'
import MasterArea from '@/views/master/MasterArea.vue'
import MasterPosition from '@/views/master/MasterPosition.vue'
import MasterShop from '@/views/master/MasterShop.vue'
import MasterRole from '@/views/master/MasterRole.vue'
import MasterEmployee from '@/views/master/MasterEmployee.vue'
import MasterFacility from '@/views/master/MasterFacility.vue'

export default [
  {
    path: '/master/company',
    name: 'master-company',
    component: MasterCompany,
    meta: { title: '企業' }
  },
  {
    path: '/master/brand',
    name: 'master-brand',
    component: MasterBrand,
    meta: { title: 'ブランド' }
  },
  {
    path: '/master/area',
    name: 'master-area',
    component: MasterArea,
    meta: { title: 'エリア' }
  },
  {
    path: '/master/position',
    name: 'master-position',
    component: MasterPosition,
    meta: { title: 'ポジション' }
  },
  {
    path: '/master/shop',
    name: 'master-shop',
    component: MasterShop,
    meta: { title: '店舗' }
  },
  {
    path: '/master/employee',
    name: 'master-employee',
    component: MasterEmployee,
    meta: { title: '従業員' }
  },
  {
    path: '/master/role',
    name: 'master-role',
    component: MasterRole,
    meta: { title: 'ロール' }
  },
  {
    path: '/master/facility',
    name: 'master-facility',
    component: MasterFacility,
    meta: { title: '店舗設備' }
  }
]
