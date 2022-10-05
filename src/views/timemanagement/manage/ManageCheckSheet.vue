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
import _ from 'lodash'
import { provide } from '@vue/runtime-core';

export default {
  components: {
    TimngHeader,
    CheckSheetList,
    CheckSheetDetail,
    CheckSheetEdit
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