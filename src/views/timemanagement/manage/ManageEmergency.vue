<template>
  <TimngHeader />
  <v-main >
    <EmergencyList
      v-if="mode === 'list'"
    />
    <EmergencyDetail
      v-if="mode === 'view'"
    />
    <EmergencyEdit
      v-if="mode === 'edit'"
    />
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import EmergencyList from '@/components/timemanagement/manage/emergency/EmergencyList.vue';
import EmergencyDetail from '@/components/timemanagement/manage/emergency/EmergencyDetail.vue';
import EmergencyEdit from '@/components/timemanagement/manage/emergency/EmergencyEdit.vue';
import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngHeader,
    EmergencyList,
    EmergencyDetail,
    EmergencyEdit
  },
  setup() {
    const mode = ref('list')
    return {
      mode
    }
  },
}
</script>