import TodayTask from '@/views/timemanagement/routine/TodayTask.vue'
import DailyReport from '@/views/timemanagement/routine/DailyReport.vue'


export default [
  {
    path: 'todaytask',
    name: 'routine-todaytask',
    component: TodayTask,
    meta: { title: '本日のタスク' }
  },
  {
    path: 'reports',
    name: 'routine-reports',
    component: DailyReport,
    meta: { title: '日報・引き継ぎ' }
  },
]