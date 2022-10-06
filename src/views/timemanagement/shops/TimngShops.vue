<template>
  <TimngHeader />
  <v-main >
    <ShopList 
      v-if="mode === 'list'"
    />
    <ShopDetail 
      v-if="mode === 'view'"
    />
  </v-main>
</template>

<script>
import TimngHeader from '@/components/timemanagement/common/TimngHeader.vue'


import { ref } from '@vue/reactivity';
import { provide } from '@vue/runtime-core';
import ShopList from '@/components/timemanagement/shops/ShopList.vue';
import ShopDetail from '@/components/timemanagement/shops/ShopDetail.vue';

export default {
  components: {
    TimngHeader,
    ShopList,
    ShopDetail
},
  setup() {
    const mode = ref('list')
    const params = {
      items: [],
      viewer: {},
      pattern_viewer: {},
      checksheet_viewer: {},
    }
    const setViewer = (item) => {
      params.viewer = item
      mode.value = 'view'
    }
    const changeMode = (_mode) => {
      mode.value = _mode
    }

    provide('change-mode', changeMode)
    provide('set-viewer', setViewer)
    provide('params', params)
    
    return {
      mode,
      params,
      setViewer,
      changeMode,

    }
  },
}
</script>