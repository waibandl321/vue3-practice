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
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import CompanyList from '@/components/master/company/CompanyList.vue'
import CompanyDetail from '@/components/master/company/CompanyDetail.vue'
import CompanyEdit from '@/components/master/company/CompanyEdit.vue'

import companyApiFunc from '@/mixins/api/master/company.js'
import { reactive, ref } from '@vue/reactivity'

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
      editor: {}
    })

    const initList = async () => {
      try {
        params.items = await companyApiFunc.apiGetCompany()
      } catch (error) {
        params.items = []
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
      params.editor = item
      mode.value = 'edit'
    }
    return {
      mode,
      params,
      changeMode,
      setViewer,
      setEditor,
      initList
    }
  },
}
</script>
