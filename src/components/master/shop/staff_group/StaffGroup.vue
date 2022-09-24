<template>
  <StaffGroupList
    v-if="mode === 'staff-group-list'"
    :changeMode="changeMode"
    :params="params"
    :changeModeStaffGroup="changeModeStaffGroup"
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
    :editor="editor_staff_group"
  />
</template>

<script>
import StaffGroupList from './StaffGroupList.vue';
import StaffGroupDetail from './StaffGroupDetail.vue';
import StaffGroupEdit from './StaffGroupEdit.vue';
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
    }
    // 編集データセット
    const editor_staff_group = ref({})
    const setEditor = (item) => {
      editor_staff_group.value = item
    }

    return {
      mode,
      staff_group_viewer,
      editor_staff_group,
      changeModeStaffGroup,
      setViewer,
      setEditor
    }
  }
}
</script>