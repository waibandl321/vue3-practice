<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <PatternInfoEdit
        v-if="active_page === 'pattern'"
      />
      <PatternTemplateEdit
        v-if="active_page === 'template'"
      />
      <PatternShopEdit
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
import TimngManageEditFooter from '../../common/manage/TimngManageEditFooter.vue';

import PatternInfoEdit from './edit/PatternInfoEdit.vue';
import PatternTemplateEdit from './edit/PatternTemplateEdit.vue';
import PatternShopEdit from './edit/PatternShopEdit.vue';

import { ref } from '@vue/reactivity';

export default {
  components: {
    TimngManageDetailLeft,
    TimngManageEditFooter,
    PatternInfoEdit,
    PatternTemplateEdit,
    PatternShopEdit
  },
  setup() {
    const active_page = ref('pattern')
    const menus = [
      { key: 'pattern', name: '業務パターン' },
      { key: 'template', name: 'テンプレート' },
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