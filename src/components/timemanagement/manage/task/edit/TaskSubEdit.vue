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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="100%">
            <v-btn
              color="primary"
              prepend-icon="mdi-plus"
              variant="text"
            >
              追加
            </v-btn>
          </td>
        </tr>
        <tr
          @click="subtaskEdit('hogehoge')"
        >
          <td>サブタスク名</td>
          <td>30分</td>
          <td>
            <v-btn
              icon="mdi-delete"
              color="primary"
              size="small"
              variant="text"
            ></v-btn>
          </td>
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
    const subtaskEdit = (subtask) => {
      params.subtask_editor = _.cloneDeep(subtask)
      subtask_display.value = true
    }

    return {
      active_page,
      menus,
      subtask_display,
      changePage,
      subtaskEdit
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