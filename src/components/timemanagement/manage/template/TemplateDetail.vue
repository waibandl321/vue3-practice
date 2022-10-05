<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <TemplateInfo
        v-if="active_page === 'template'"
      />
      <TemplateTask
        v-if="active_page === 'task'"
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
import TemplateInfo from './detail/TemplateInfo.vue';
import TemplateTask from './detail/TemplateTask.vue';

import { ref } from '@vue/reactivity';

export default {
  setup() {
    const active_page = ref('template')
    const menus = [
      { key: 'template', name: 'テンプレート' },
      { key: 'task', name: 'タスク' },
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
  components: { TimngManageDetailLeft, TemplateInfo, TemplateTask, TimngManageDetailFooter }
}
</script>
<style scoped>
.view-body {
  width: 100%;
  padding: 12px 12px 100px 12px;
}
</style>