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
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import EmployeeList from '@/components/master/employee/EmployeeList.vue'
import EmployeeDetail from '@/components/master/employee/EmployeeDetail.vue'
import EmployeeEdit from '@/components/master/employee/EmployeeEdit.vue'
export default {
  name: 'master-area',
  components: {
    Header,
    EmployeeList,
    EmployeeDetail,
    EmployeeEdit
  },
  data () {
    return {
      mode: 'list',
      params: {
        viewer: {},
        editor: {}
      }
    }
  },
  methods: {
    changeMode (_mode) {
      this.mode = _mode
    }
  }
}
</script>
