<template>
  <StaffGroupList
    v-if="mode === 'staff-group-list'"
    :changeMode="changeMode"
    :params="params"
    :setViewer="setViewer"
  />
  <StaffGroupDetail
    v-if="mode === 'staff-group-detail'"
    :changeModeStaffGroup="changeModeStaffGroup"
    :params="params"
    :viewer="staff_group_viewer"
    :setEditor="setEditor"
  />
  <StaffGroupEdit
    v-if="mode === 'staff-group-edit'" 
    :changeModeStaffGroup="changeModeStaffGroup"
    :params="params"
    :editor="staff_group_editor"
    :refreshMember="refreshMember"
  />
</template>

<script>
import StaffGroupList from './StaffGroupList.vue';
import StaffGroupDetail from './StaffGroupDetail.vue';
import StaffGroupEdit from './StaffGroupEdit.vue';

import shopApiFunc from '@/mixins/api/master/shop.js'
import { ref } from '@vue/reactivity';

export default {
  name: 'staff-group',
  components: { StaffGroupList, StaffGroupDetail, StaffGroupEdit },
  props: {
    params: Object,
    changeMode: Function
  },
  setup () {
    // 表示モード切り替え
    const mode = ref('staff-group-list')
    const changeModeStaffGroup = (_mode) => {
      mode.value = _mode
    }
    // 詳細データセット
    const staff_group_viewer = ref({})
    const setViewer = (item) => {
      staff_group_viewer.value = item
      mode.value = 'staff-group-detail'
    }
    // 編集データセット
    const staff_group_editor = ref({})
    const setEditor = (item) => {
      staff_group_editor.value = item
      mode.value = 'staff-group-edit'
    }
    // メンバー再読み込み
    const refreshMember = async () => {
      let results = []
      try {
        results = await shopApiFunc.apiGetStaffGroupStaff(staff_group_editor.value)
      } catch (error) {
        console.log(error);
      }
      staff_group_viewer.value.members.items = results
      staff_group_editor.value.members.items = results
    }

    return {
      mode,
      staff_group_viewer,
      staff_group_editor,
      changeModeStaffGroup,
      setViewer,
      setEditor,
      refreshMember
    }
  }
}
</script>