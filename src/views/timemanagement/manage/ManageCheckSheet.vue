<template>
  <TimngHeader />
  <v-main >
    <CheckSheetList
      v-if="mode === 'list'"
    />
    <CheckSheetDetail
      v-if="mode === 'view'"
    />
    <CheckSheetEdit
      v-if="mode === 'edit'"
    />
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import CheckSheetList from '@/components/timemanagement/manage/checksheet/CheckSheetList.vue';
import CheckSheetDetail from '@/components/timemanagement/manage/checksheet/CheckSheetDetail.vue';
import CheckSheetEdit from '@/components/timemanagement/manage/checksheet/CheckSheetEdit.vue';
import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngHeader,
    CheckSheetList,
    CheckSheetDetail,
    CheckSheetEdit
  },
  setup() {
    const mode = ref('list')
    return {
      mode
    }
  },
}
</script>