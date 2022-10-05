<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <CheckSheetInfo
        v-if="active_page === 'checksheet'"
      />
      <CheckSheetBrand
        v-if="active_page === 'brand'"
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
import CheckSheetInfo from './detail/CheckSheetInfo.vue';
import CheckSheetBrand from './detail/CheckSheetBrand.vue';

import { ref } from '@vue/reactivity';


export default {
  components: {
    TimngManageDetailLeft,
    TimngManageDetailFooter,
    CheckSheetInfo,
    CheckSheetBrand
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