<template>
  <div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            サブタスク
          </th>
          <th class="text-left">
            所要時間
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="subtaskView('hogehoge')"
        >
          <td>サブタスク名</td>
          <td>30分</td>
        </tr>
      </tbody>
    </v-table>
    <v-dialog
      v-model="subtask_display"
      fullscreen
    >
      <v-card>
        <v-toolbar
          dark
          density="compact"
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="subtask_display = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>サブタスク名</v-toolbar-title>
        </v-toolbar>
        <div class="d-flex">
          <TimngManageDetailLeft
            :menus="menus"
            :changePage="changePage"
          />
          <div class="view-body">
            <TaskSubInfo
              v-if="active_page === 'tasksub'"
            />
            <TaskSubFile
              v-if="active_page === 'file'"
            />
          </div>
        </div>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';
import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core';
import TaskSubInfo from './subtask/TaskSubInfo.vue';
import TaskSubFile from './subtask/TaskSubFile.vue';

export default {
  components: {
    TimngManageDetailLeft,
    TaskSubInfo,
    TaskSubFile
},
  setup() {
    const params = inject('params')
    const subtask_display = ref(false)
    const active_page = ref('tasksub')
    const menus = [
      { key: 'tasksub', name: 'サブタスク' },
      { key: 'file', name: '添付ファイル' },
    ]
    const changePage = (page) => {
      active_page.value = page
    }
    const subtaskView = (subtask) => {
      params.subtask_viewer = subtask
      subtask_display.value = true
    }

    return {
      active_page,
      menus,
      subtask_display,
      changePage,
      subtaskView
    }
  },
}
</script>

<style scoped>
.view-body {
  width: 100%;
  padding: 12px 12px 100px 12px;
}
.v-toolbar {
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>