<template>
  <Header />
  <v-main>
    <AreaList
      v-if="mode === 'list'"
      :setViewer="setViewer"
      :setEditor="setEditor"
      :params="params"
    />
    <AreaDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :setEditor="setEditor"
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
import { reactive, ref } from '@vue/reactivity'

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
    const params = reactive({
      viewer: {},
      editor: {},
      is_new: false
    })
    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.is_new = true
      }
      mode.value = _mode
    }
    const setViewer = (item) => {
      params.viewer = item
      mode.value = 'view'
    }
    const setEditor = (item, is_new = false) => {
      if(is_new) {
        params.is_new = true
        params.editor = {
          area_cd: "",
          area_name: "",
          company_cd: "",
          status: 0,
          delete: 0
        }
      } else {
        params.editor = item
      }
      mode.value = 'edit'
    }
    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor
    }
  },
}
</script>