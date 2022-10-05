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
          density="compact"
        >
          <v-btn
            icon
            dark
            @click="subtask_display = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>サブタスク名</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              @click="subtask_display = false"
            >
              キャンセル
            </v-btn>
            <v-btn
              color="primary"
              @click="subtask_display = false"
            >
              保存
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <div class="d-flex">
          <TimngManageDetailLeft
            :menus="menus"
            :changePage="changePage"
          />
          <div class="view-body">
            <TaskSubInfoEdit
              v-if="active_page === 'tasksub'"
            />
            <TaskSubFileEdit
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
import _ from 'lodash'
import TaskSubInfoEdit from './subtask/TaskSubInfoEdit.vue';
import TaskSubFileEdit from './subtask/TaskSubFileEdit.vue';


export default {
  components: {
    TimngManageDetailLeft,
    TaskSubInfoEdit,
    TaskSubFileEdit
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
      params.subtask_editor = _.cloneDeep(subtask)
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
}
</style>