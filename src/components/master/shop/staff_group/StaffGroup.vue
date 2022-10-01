<template>
  <StaffGroupList
    v-if="mode === 'staff-group-list'"
    :changeMode="changeMode"
    :setGroupViewer="setGroupViewer"
  />
  <StaffGroupDetail
    v-if="mode === 'staff-group-detail'"
    :changeModeStaffGroup="changeModeStaffGroup"
    :groupInfo="group_info"
    :setGroupEditor="setGroupEditor"
  />
  <StaffGroupEdit
    v-if="mode === 'staff-group-edit'" 
    :changeModeStaffGroup="changeModeStaffGroup"
    :groupInfo="group_info"
    :refreshMember="refreshMember"
  />
</template>

<script>
import StaffGroupList from './StaffGroupList.vue';
import StaffGroupDetail from './StaffGroupDetail.vue';
import StaffGroupEdit from './StaffGroupEdit.vue';

import apiFunc from '@/mixins/api/api.js'

import { reactive, ref } from '@vue/reactivity';

export default {
  name: 'staff-group',
  components: { StaffGroupList, StaffGroupDetail, StaffGroupEdit },
  props: {
    changeMode: Function
  },
  setup () {
    // 表示モード切り替え
    const mode = ref('staff-group-list')
    const changeModeStaffGroup = (_mode) => {
      mode.value = _mode
    }
    
    const group_info = reactive({
      company_employees: [],
      viewer: {},
      editor: {},
    })

    async function companyEmployees () {
      group_info.company_employees = await apiFunc.apiGetEmployees()
    }
    companyEmployees()
    
    // 詳細データセット
    const setGroupViewer = (item) => {
      group_info.viewer = item
      mode.value = 'staff-group-detail'
    }
    // 編集データセット
    const setGroupEditor = (item) => {
      group_info.editor = item
      mode.value = 'staff-group-edit'
    }
    // メンバー再読み込み
    const refreshMember = async () => {
      let results = []
      try {
        results = await apiFunc.apiGetStaffGroupStaffs(group_info.editor)
      } catch (error) {
        console.log(error);
      }
      group_info.viewer.members.items = results
      group_info.editor.members.items = results
    }

    return {
      mode,
      group_info,
      changeModeStaffGroup,
      setGroupViewer,
      setGroupEditor,
      refreshMember
    }
  }
}
</script>