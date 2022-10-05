<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <PatternInfo
        v-if="active_page === 'pattern'"
      />
      <PatternTemplate
        v-if="active_page === 'template'"
      />
      <PatternShop
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


import { ref } from '@vue/reactivity';
import PatternInfo from './detail/PatternInfo.vue';
import PatternTemplate from './detail/PatternTemplate.vue';
import PatternShop from './detail/PatternShop.vue';

export default {
  components: {
    TimngManageDetailLeft,
    TimngManageDetailFooter,
    PatternInfo,
    PatternTemplate,
    PatternShop
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
  padding: 12px 12px 100px 12px;
  width: 100%;
}
</style>