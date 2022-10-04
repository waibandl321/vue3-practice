import MyShopHome from '@/views/timemanagement/myshop/MyShopHome.vue'
import MyShopTask from '@/views/timemanagement/myshop/manage/MyShopTask.vue'
import MyShopTemplate from '@/views/timemanagement/myshop/manage/MyShopTemplate.vue'
import MyShopPattern from '@/views/timemanagement/myshop/manage/MyShopPattern.vue'
import MyShopChecksheet from '@/views/timemanagement/myshop/manage/MyShopChecksheet.vue'
import MyShopTaskEmergency from '@/views/timemanagement/myshop/manage/MyShopTaskEmergency.vue'
import MyShopCalendar from '@/views/timemanagement/myshop/calendar/MyShopCalendar.vue'

export default [
  {
    path: 'myshop',
    name: 'myshop-home',
    component: MyShopHome,
    meta: { title: 'My店舗' }
  },
  {
    path: 'myshop/manage/task',
    name: 'myshop-task',
    component: MyShopTask,
    meta: { title: 'My店舗 タスク' }
  },
  {
    path: 'myshop/manage/template',
    name: 'myshop-template',
    component: MyShopTemplate,
    meta: { title: 'My店舗 テンプレート' }
  },
  {
    path: 'myshop/manage/pattern',
    name: 'myshop-pattern',
    component: MyShopPattern,
    meta: { title: 'My店舗 業務パターン' }
  },
  {
    path: 'myshop/manage/checksheet',
    name: 'myshop-checksheet',
    component: MyShopChecksheet,
    meta: { title: 'My店舗 チェックシート' }
  },
  {
    path: 'myshop/manage/emergency',
    name: 'myshop-emergency',
    component: MyShopTaskEmergency,
    meta: { title: 'My店舗 臨時タスク' }
  },
  {
    path: 'myshop/calendar/:id',
    name: 'myshop-calendar',
    component: MyShopCalendar,
    meta: { title: 'My店舗 カレンダー' }
  },
]