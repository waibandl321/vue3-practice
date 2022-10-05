<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <CheckSheetInfoEdit
        v-if="active_page === 'checksheet'"
      />
      <CheckSheetBrandEdit
        v-if="active_page === 'brand'"
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
import CheckSheetInfoEdit from './edit/CheckSheetInfoEdit.vue';
import CheckSheetBrandEdit from './edit/CheckSheetBrandEdit.vue';

import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngManageDetailLeft,
    TimngManageEditFooter,
    CheckSheetInfoEdit,
    CheckSheetBrandEdit
},
  setup() {
    const active_page = ref('checksheet')
    const menus = [
      { key: 'checksheet', name: 'チェックシート' },
      { key: 'brand', name: '適用ブランド' },
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
  padding: 12px 12px 100px 12px;
}
</style>