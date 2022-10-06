<template>
  <div class="d-flex">
    <TimngManageDetailLeft
      :menus="menus"
      :changePage="changePage"
    />
    <div class="view-body">
      <ShopInfo
        v-if="active_page === 'shop'"
      />
      <ShopPattern
        v-if="active_page === 'pattern'"
      />
      <ShopCheckSheet
        v-if="active_page === 'checksheet'"
      />
      <v-card class="manage-footer">
        <v-card-actions class="justify-space-between">
          <div>
            <v-btn
              variant="text"
              @click="changeMode('list')"
            >店舗一覧へ戻る</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import TimngManageDetailLeft from '@/components/timemanagement/common/manage/TimngManageDetailLeft.vue';
import { ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
import ShopInfo from './detail/ShopInfo.vue';
import ShopPattern from './detail/ShopPattern.vue';
import ShopCheckSheet from './detail/ShopCheckSheet.vue';

export default {
  components: {
    TimngManageDetailLeft,
    ShopInfo,
    ShopPattern,
    ShopCheckSheet
  },
  setup() {
    const changeMode = inject('change-mode')
    const active_page = ref('shop')
    const menus = [
      { key: 'shop', name: '基本情報' },
      { key: 'pattern', name: '店舗業務パターン' },
      { key: 'checksheet', name: 'チェックシート' },
    ]
    const changePage = (page) => {
      active_page.value = page
    }
    const deleteItem = () => {
      alert('削除処理')
    }

    return {
      changeMode,
      active_page,
      menus,
      changePage,
      deleteItem
    }
  },
}
</script>
<style scoped>
.manage-footer {
  background-color: #f8f5f5;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 240px;
}
.view-body {
  width: 100%;
  padding: 12px 12px 100px 12px;
}
</style>