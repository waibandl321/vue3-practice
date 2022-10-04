import ManageTask from '@/views/timemanagement/manage/ManageTask.vue'
import ManageTemplate from '@/views/timemanagement/manage/ManageTemplate.vue'
import ManagePattern from '@/views/timemanagement/manage/ManagePattern.vue'
import ManageCheckSheet from '@/views/timemanagement/manage/ManageCheckSheet.vue'
import ManageEmergency from '@/views/timemanagement/manage/ManageEmergency.vue'

export default [
  {
    path: 'manage/task',
    name: 'manage-task',
    component: ManageTask,
    meta: { title: '業務管理 タスク' }
  },
  {
    path: 'manage/template',
    name: 'manage-template',
    component: ManageTemplate,
    meta: { title: '業務管理 テンプレート' }
  },
  {
    path: 'manage/pattern',
    name: 'manage-pattern',
    component: ManagePattern,
    meta: { title: '業務管理 業務パターン' }
  },
  {
    path: 'manage/checksheet',
    name: 'manage-checksheet',
    component: ManageCheckSheet,
    meta: { title: '業務管理 チェックシート' }
  },
  {
    path: 'manage/emergency',
    name: 'manage-emergency',
    component: ManageEmergency,
    meta: { title: '業務管理 臨時タスク' }
  },
]