<template>
  <Header />
  <v-main>
    <AreaList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <AreaDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <AreaEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import AreaList from '@/components/master/area/AreaList.vue'
import AreaDetail from '@/components/master/area/AreaDetail.vue'
import AreaEdit from '@/components/master/area/AreaEdit.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'master-brand',
  components: {
    Header,
    AreaList,
    AreaDetail,
    AreaEdit
  },
  setup () {
    const mode = ref('list')
    const params = ref({
      viewer: {},
      editor: {},
      is_new: false
    })
    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.value.is_new = true
      }
      mode.value = _mode
    }
    return {
      mode,
      params,
      changeMode
    }
  },
}
</script>