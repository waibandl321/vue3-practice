<template>
  <TimngHeader />
  <v-main>
    <div class="d-flex height-fill">
      <TodayTaskLeft />
      <div class="view-body">
        <TodayTaskList />
      </div>
    </div>
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import TodayTaskLeft from '@/components/timemanagement/routine/todaytask/TodayTaskLeft.vue';
import TodayTaskList from '@/components/timemanagement/routine/todaytask/TodayTaskList.vue';
export default {
  components: {
    TimngHeader,
    TodayTaskLeft,
    TodayTaskList
},
  setup() {
    
  },
}
</script>

<style scoped>
.view-body {
  width: 100%;
  padding: 0 12px;
}
.height-fill {
  height: calc(100vh - 48px);
}
</style>