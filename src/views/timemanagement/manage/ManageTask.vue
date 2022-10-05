<template>
  <TimngHeader />
  <v-main >
    <TaskList 
      v-if="mode === 'list'"
    />
    <TaskDetail 
      v-if="mode === 'view'"
    />
    <TaskEdit 
      v-if="mode === 'edit'"
    />
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import TaskList from '@/components/timemanagement/manage/task/TaskList.vue';
import TaskDetail from '@/components/timemanagement/manage/task/TaskDetail.vue';
import TaskEdit from '@/components/timemanagement/manage/task/TaskEdit.vue';

import { ref } from '@vue/reactivity';
import _ from 'lodash'
import { provide } from '@vue/runtime-core';

export default {
  components: {
    TimngHeader,
    TaskList,
    TaskDetail,
    TaskEdit
  },
  setup() {
    const mode = ref('list')
    const params = {
      items: [],
      viewer: {},
      editor: {},
      subtask_viewer: {},
      subtask_editor: {}
    }
    const setViewer = (item) => {
      params.viewer = item
      mode.value = 'view'
    }
    const setEditor = (item) => {
      params.viewer = _.cloneDeep(item)
      mode.value = 'edit'
    }
    const changeMode = (_mode) => {
      mode.value = _mode
    }

    provide('change-mode', changeMode)
    provide('set-editor', setEditor)
    provide('set-viewer', setViewer)
    provide('params', params)
    
    return {
      mode,
      params,
      setViewer,
      setEditor,
      changeMode,

    }
  },
}
</script>