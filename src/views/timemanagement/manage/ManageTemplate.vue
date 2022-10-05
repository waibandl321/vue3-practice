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
import _ from 'lodash'
import { provide } from '@vue/runtime-core';

export default {
  components: {
    TimngHeader,
    TemplateList,
    TemplateDetail,
    TemplateEdit
  },
  setup() {
    const mode = ref('list')
    const params = {
      items: [],
      viewer: {},
      editor: {}
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