<template>
  <Header />
  <v-main>
    <EmployeeList
      v-if="mode === 'list'"
      :setViewer="setViewer"
      :setEditor="setEditor"
      :params="params"
    />
    <EmployeeDetail
      v-if="mode === 'view'"
      :setEditor="setEditor"
      :changeMode="changeMode"
      :params="params"
    />
    <EmployeeEdit
      v-if="mode === 'edit'"
      :changeMode="changeMode"
      :initData="initData"
      :messageSet="messageSet"
      :params="params"
    />
    <EmployeeNew
      v-if="mode === 'new'"
      :changeMode="changeMode"
      :messageSet="messageSet"
      :params="params"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/AppHeader.vue'
import EmployeeList from '@/components/master/employee/EmployeeList.vue'
import EmployeeDetail from '@/components/master/employee/EmployeeDetail.vue'
import EmployeeEdit from '@/components/master/employee/EmployeeEdit.vue'
import EmployeeNew from '@/components/master/employee/EmployeeNew.vue'

import apiFunc from '@/mixins/api/api.js'

import _ from 'lodash'
import { reactive, ref } from '@vue/reactivity'

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
    const params = reactive({
      items: [],
      viewer: {},
      editor: {},

      shops: [],
      roles: [],

      loading: false,
      success: "",
      error: "",

      is_new: false
    })
    const initData = async () => {
      params.loading = true
      try {
        params.items = await apiFunc.apiGetEmployees()
        params.loading = false
        params.shops = await apiFunc.apiGetShops()
        params.roles = apiFunc.getSystemRoles()
      } catch (error) {
        params.error = "読み込みに失敗しました。"
        console.error(error);
        params.loading = false
      }
    }
    initData()

    const setViewer = (item) => {
      params.success = ""
      params.error = ""
      params.viewer = item
      mode.value = 'view'
    }
    const setEditor = (is_new = false) => {
      params.success = ""
      params.error = ""
      if(is_new) {
        params.is_new = true
        params.editor = _.cloneDeep({
          employee_number: "",
          last_name: "",
          first_name: "",
          last_name_kana: "",
          first_name_kana: "",
          gender: null,
          permanent: 0,
          official_position: ""
        })
        mode.value = 'new'
      } else {
        params.is_new = false
        params.editor = _.cloneDeep(params.viewer)
        mode.value = 'edit'
      }
    }

    const changeMode = (_mode) => {
      mode.value = _mode
    }

    const messageSet = (message, type) => {
      params[type] = message
    }

    return {
      mode,
      params,
      changeMode,
      initData,
      setViewer,
      setEditor,
      messageSet
    }
  },
}
</script>
