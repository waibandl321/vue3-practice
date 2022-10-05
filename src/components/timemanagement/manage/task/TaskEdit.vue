<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <TaskInfoEdit
        v-if="active_page === 'task'"
      />
      <TaskSubEdit
        v-if="active_page === 'tasksub'"
      />
      <TaskFileEdit
        v-if="active_page === 'file'"
      />
      <TimngManageEditFooter
        :save="save"
      />
    </div>
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';
import TimngManageEditFooter from '../../common/manage/TimngManageEditFooter.vue';

import { ref } from '@vue/reactivity';
import TaskInfoEdit from './edit/TaskInfoEdit.vue';
import TaskSubEdit from './edit/TaskSubEdit.vue';
import TaskFileEdit from './edit/TaskFileEdit.vue';

export default {
  components: {
    TimngManageDetailLeft,
    TimngManageEditFooter,
    TaskInfoEdit,
    TaskSubEdit,
    TaskFileEdit
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
    const save = () => {
      alert('保存処理')
    }

    return {
      active_page,
      menus,
      changePage,
      save
    }
  },
}
</script>
<style scoped>
.view-body {
  width: 100%;
}
</style>