<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <TaskInfo
        v-if="active_page === 'task'"
      />
      <TaskSub
        v-if="active_page === 'tasksub'"
      />
      <TaskFile
        v-if="active_page === 'file'"
      />
      <TimngManageDetailFooter
        :copy="copy"
        :deleteItem="deleteItem"
      />
    </div>
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';
import TimngManageDetailFooter from '@/components/timemanagement/common/manage/TimngManageDetailFooter.vue';

import { ref } from '@vue/reactivity';
import TaskInfo from './detail/TaskInfo.vue';
import TaskSub from './detail/TaskSub.vue';
import TaskFile from './detail/TaskFile.vue';

export default {
  components: {
    TimngManageDetailLeft,
    TimngManageDetailFooter,
    TaskInfo,
    TaskSub,
    TaskFile
  },
  setup() {
    const active_page = ref('task')
    const menus = [
      { key: 'task', name: 'タスク' },
      { key: 'tasksub', name: 'サブタスク' },
      { key: 'file', name: '添付ファイル' },
    ]
    const changePage = (page) => {
      active_page.value = page
    }
    const copy = () => {
      alert('コピー処理')
    }
    const deleteItem = () => {
      alert('削除処理')
    }

    return {
      active_page,
      menus,
      changePage,
      copy,
      deleteItem
    }
  },
}
</script>
<style scoped>
.view-body {
  width: 100%;
  padding: 12px 12px 100px 12px;
}
</style>