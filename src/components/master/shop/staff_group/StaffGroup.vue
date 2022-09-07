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
    :viewer="viewer_staff_group"
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
    const mode = ref('staff-group-list')
    const viewer_staff_group = ref({})
    const editor_staff_group = ref({})

    const changeModeStaffGroup = (_mode) => {
      mode.value = _mode
    }
    const setViewer = (item) => {
      viewer_staff_group.value = item
    }
    const setEditor = (item) => {
      editor_staff_group.value = item
    }

    return {
      mode,
      viewer_staff_group,
      editor_staff_group,
      changeModeStaffGroup,
      setViewer,
      setEditor
    }
  }
}
</script>