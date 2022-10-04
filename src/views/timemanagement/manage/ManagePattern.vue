<template>
  <TimngHeader />
  <v-main >
    <PatternList
      v-if="mode === 'list'"
    />
    <PatternDetail
      v-if="mode === 'view'"
    />
    <PatternEdit
      v-if="mode === 'edit'"
    />
  </v-main>
</template>

<script>
  import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import PatternList from '@/components/timemanagement/manage/pattern/PatternList.vue';
import PatternDetail from '@/components/timemanagement/manage/pattern/PatternDetail.vue';
import PatternEdit from '@/components/timemanagement/manage/pattern/PatternEdit.vue';
import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngHeader,
    PatternList,
    PatternDetail,
    PatternEdit
  },
  setup() {
    const mode = ref('list')
    return {
      mode
    }
  },
}
</script>