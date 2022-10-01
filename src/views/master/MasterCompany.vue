<template>
  <Header />
  <v-main>
    <CompanyList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :setViewer="setViewer"
      :initList="initList"
      :params="params"
    />
    <CompanyDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :setEditor="setEditor"
      :params="params"
    />
    <CompanyEdit
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
import CompanyList from '@/components/master/company/CompanyList.vue'
import CompanyDetail from '@/components/master/company/CompanyDetail.vue'
import CompanyEdit from '@/components/master/company/CompanyEdit.vue'

import apiFunc from '@/mixins/api/api.js'

import { reactive, ref } from '@vue/reactivity'
import _ from 'lodash'

export default {
  name: 'master-company',
  components: {
    Header,
    CompanyList,
    CompanyDetail,
    CompanyEdit
  },
  setup () {
    const mode = ref('list')
    const params = reactive({
      items: [],
      viewer: {},
      editor: {},

      success: "",
      error: "",
    })

    const initList = async () => {
      try {
        params.items = await apiFunc.apiGetCompanies()
      } catch (error) {
        params.items = []
        params.error = '読み込みに失敗しました'
        console.error(error);
      }
    }
    initList()

    const changeMode = (_mode) => {
      mode.value = _mode
    }
    const setViewer = (item) => {
      params.viewer = item
    }
    const setEditor = (item) => {
      params.editor = _.cloneDeep(item)
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
