<template>
  <Header />
  <v-main>
    <PositionList
      v-if="mode === 'list'"
      :setViewer="setViewer"
      :setEditor="setEditor"
      :initList="initList"
      :params="params"
    />
    <PositionDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :setEditor="setEditor"
      :params="params"
    />
    <PositionEdit
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
import PositionList from '@/components/master/position/PositionList.vue'
import PositionDetail from '@/components/master/position/PositionDetail.vue'
import PositionEdit from '@/components/master/position/PositionEdit.vue'

import apiFunc from '@/mixins/api/api.js'

import { reactive, ref } from '@vue/reactivity'
import _ from 'lodash'

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
    const params = reactive({
      items: [],
      viewer: {},
      editor: {},
      is_new: false,

      loading: false,
      success: "",
      error: "",
    })
    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.is_new = true
      }
      params.is_new = false
      mode.value = _mode
    }
    const initList = async () => {
      params.loading = true
      try {
        params.items = await apiFunc.apiGetPositions()
      } catch (error) {
        params.items = []
        params.error = '読み込みに失敗しました'
        console.error(error);
      }
      params.loading = false
    }
    initList()

    const setViewer = (item) => {
      params.viewer = item
      mode.value = 'view'
    }

    const setEditor = (item, is_new = false) => {
      if(is_new) {
        params.is_new = true
        params.editor = {
          position_cd: "",
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