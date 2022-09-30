<template>
  <Header />
  <v-main>
    <AreaList
      v-if="mode === 'list'"
      :setViewer="setViewer"
      :setEditor="setEditor"
      :initList="initList"
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
      :initList="initList"
      :messageSet="messageSet"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
import AreaList from '@/components/master/area/AreaList.vue'
import AreaDetail from '@/components/master/area/AreaDetail.vue'
import AreaEdit from '@/components/master/area/AreaEdit.vue'

import areaApiFunc from '@/mixins/api/master/area.js'
import { reactive, ref } from '@vue/reactivity'
import _ from 'lodash'

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
      items: [],
      viewer: {},
      editor: {},
      is_new: false,

      loading: false,
      success: "",
      error: "",
    })
    const initList = async () => {
      params.loading = true
      try {
        params.items = await areaApiFunc.apiGetArea()
      } catch (error) {
        params.items = []
        params.error = '読み込みに失敗しました'
        console.error(error);
      }
      params.loading = false
    }
    initList()

    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.is_new = true
      }
      params.is_new = false
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
        params.editor = _.cloneDeep(item)
      }
      mode.value = 'edit'
    }

    const messageSet = (message, type) => {
      params[type] = message
    }

    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor,
      initList,
      messageSet
    }
  },
}
</script>