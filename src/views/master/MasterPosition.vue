<template>
  <Header />
  <v-main>
    <PositionList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <PositionDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <PositionEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import PositionList from '@/components/master/position/PositionList.vue'
import PositionDetail from '@/components/master/position/PositionDetail.vue'
import PositionEdit from '@/components/master/position/PositionEdit.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'master-position',
  components: {
    Header,
    PositionList,
    PositionDetail,
    PositionEdit
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