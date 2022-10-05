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
import _ from 'lodash'
import { provide } from '@vue/runtime-core';

export default {
  components: {
    TimngHeader,
    EmergencyList,
    EmergencyDetail,
    EmergencyEdit
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