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

export default {
  components: {
  TimngHeader,
  TaskList,
  TaskDetail,
  TaskEdit
},
setup() {
  const mode = ref('list')
  return {
    mode
  }
},
}
</script>