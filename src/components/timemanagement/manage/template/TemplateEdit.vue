<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <TemplateInfoEdit
        v-if="active_page === 'template'"
      />
      <TemplateTaskEdit
        v-if="active_page === 'task'"
      />
      <TimngManageEditFooter
        :save="save"
      />
    </div>
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';


import { ref } from '@vue/reactivity';
import TemplateInfoEdit from './edit/TemplateInfoEdit.vue';
import TemplateTaskEdit from './edit/TemplateTaskEdit.vue';
import TimngManageEditFooter from '../../common/manage/TimngManageEditFooter.vue';

export default {
  components: {
    TimngManageDetailLeft,
    TemplateInfoEdit,
    TemplateTaskEdit,
    TimngManageEditFooter
},
  setup() {
    const active_page = ref('template')
    const menus = [
      { key: 'template', name: 'テンプレート' },
      { key: 'task', name: 'タスク' },
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