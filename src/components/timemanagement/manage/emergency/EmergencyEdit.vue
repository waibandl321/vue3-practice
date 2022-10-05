<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <EmergencyInfoEdit
        v-if="active_page === 'emergency'"
      />
      <EmergencyFileEdit
        v-if="active_page === 'file'"
      />
      <EmergencyApplyEdit
        v-if="active_page === 'shop'"
      />
      <TimngManageEditFooter
        :save="save"
      />
    </div>
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';
import TimngManageEditFooter from '@/components/timemanagement/common/manage/TimngManageEditFooter.vue';

import { ref } from '@vue/reactivity';
import EmergencyInfoEdit from './edit/EmergencyInfoEdit.vue';
import EmergencyFileEdit from './edit/EmergencyFileEdit.vue';
import EmergencyApplyEdit from './edit/EmergencyApplyEdit.vue';


export default {
  components: {
    TimngManageDetailLeft,
    TimngManageEditFooter,
    EmergencyInfoEdit,
    EmergencyFileEdit,
    EmergencyApplyEdit
},
  setup() {
    const active_page = ref('emergency')
    const menus = [
      { key: 'emergency', name: '臨時タスク' },
      { key: 'file', name: '添付ファイル' },
      { key: 'shop', name: '適用店舗' },
    ]
    const changePage = (page) => {
      active_page.value = page
    }
    const save = () => {
      alert('保存処理')
    }

    return {
      active_page,
      menus,
      changePage,
      save
    }
  },
}
</script>
<style scoped>
.view-body {
  width: 100%;
}
</style>