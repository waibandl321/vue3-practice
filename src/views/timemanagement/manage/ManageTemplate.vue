<template>
  <TimngHeader />
  <v-main >
    <TemplateList 
      v-if="mode === 'list'"
    />
    <TemplateDetail 
      v-if="mode === 'view'"
    />
    <TemplateEdit 
      v-if="mode === 'edit'"
    />
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'
import TemplateList from '@/components/timemanagement/manage/template/TemplateList.vue';
import TemplateDetail from '@/components/timemanagement/manage/template/TemplateDetail.vue';
import TemplateEdit from '@/components/timemanagement/manage/template/TemplateEdit.vue';
import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngHeader,
    TemplateList,
    TemplateDetail,
    TemplateEdit
  },
  setup() {
    const mode = ref('list')
    return {
      mode
    }
  },
}
</script>