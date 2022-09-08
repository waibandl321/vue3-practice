<template>
  <Header />
  <v-main>
    <CompanyList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <CompanyDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <CompanyEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import CompanyList from '@/components/master/company/CompanyList.vue'
import CompanyDetail from '@/components/master/company/CompanyDetail.vue'
import CompanyEdit from '@/components/master/company/CompanyEdit.vue'
import { ref } from '@vue/reactivity'

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
    const params = ref({
      viewer: {},
      editor: {}
    })
    const changeMode = (_mode) => {
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
