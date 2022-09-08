<template>
  <Header />
  <v-main>
    <EmployeeList
      v-if="mode === 'list'"
      :changeMode="changeMode"
      :params="params"
    />
    <EmployeeDetail
      v-if="mode === 'view'"
      :changeMode="changeMode"
      :params="params"
    />
    <EmployeeEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :params="params"
    />
    <EmployeeNew
      v-if="mode === 'new'"
      :changeMode="changeMode"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import EmployeeList from '@/components/master/employee/EmployeeList.vue'
import EmployeeDetail from '@/components/master/employee/EmployeeDetail.vue'
import EmployeeEdit from '@/components/master/employee/EmployeeEdit.vue'
import EmployeeNew from '@/components/master/employee/EmployeeNew.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'master-employee',
  components: {
    Header,
    EmployeeList,
    EmployeeDetail,
    EmployeeEdit,
    EmployeeNew
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
