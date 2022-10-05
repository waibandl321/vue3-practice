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
import _ from 'lodash'
import { provide } from '@vue/runtime-core';

export default {
  components: {
    TimngHeader,
    PatternList,
    PatternDetail,
    PatternEdit
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
  }
}
</script>