import TodayTask from '@/views/timemanagement/routine/RoutineTodayTask.vue'
import DailyReport from '@/views/timemanagement/routine/RoutineDailyReport.vue'
import RoutineCheckSheet from '@/views/timemanagement/routine/RoutineCheckSheet.vue'


export default [
  {
    path: 'routine/todaytask',
    name: 'routine-todaytask',
    component: TodayTask,
    meta: { title: 'ルーチン 本日のタスク' }
  },
  {
    path: 'routine/reports',
    name: 'routine-reports',
    component: DailyReport,
    meta: { title: '日報・引き継ぎ' }
  },
  {
    path: 'routine/checksheet',
    name: 'routine-checksheet',
    component: RoutineCheckSheet,
    meta: { title: 'ルーチン チェックシート' }
  },
]