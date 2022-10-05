<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <EmergencyInfo
        v-if="active_page === 'emergency'"
      />
      <EmergencyFile
        v-if="active_page === 'file'"
      />
      <EmergencyApply
      v-if="active_page === 'shop'"
      />
      <TimngManageDetailFooter
        :copy="copy"
        :deleteItem="deleteItem"
      />
    </div>
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';
import TimngManageDetailFooter from '@/components/timemanagement/common/manage/TimngManageDetailFooter.vue';
import EmergencyInfo from './detail/EmergencyInfo.vue';
import EmergencyFile from './detail/EmergencyFile.vue';
import EmergencyApply from './detail/EmergencyApply.vue';

import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngManageDetailLeft,
    TimngManageDetailFooter,
    EmergencyInfo,
    EmergencyFile,
    EmergencyApply
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
    const copy = () => {
      alert('コピー処理')
    }
    const deleteItem = () => {
      alert('削除処理')
    }

    return {
      active_page,
      menus,
      changePage,
      copy,
      deleteItem
    }
  },
}
</script>
<style scoped>
.view-body {
  width: 100%;
  padding: 12px 12px 100px 12px;
}
</style>