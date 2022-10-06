<template>
  <div class="view-body">
    <ShopCheckCheetList
      v-if="mode === 'list'"
      :setCheckSheetViewer="setCheckSheetViewer"
    />
    <ShopCheckCheetDetail
      v-if="mode === 'view'"
      :changeCheckSheetMode="changeCheckSheetMode"
    />
    <v-card class="manage-footer">
      <v-card-actions class="justify-space-between">
        <div>
          <v-btn
            variant="text"
            @click="changeMode('list')"
          >チェックシート一覧へ戻る</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { inject, ref } from '@vue/runtime-core';
import ShopCheckCheetList from './checksheet/ShopCheckCheetList.vue';
import ShopCheckCheetDetail from './checksheet/ShopCheckCheetDetail.vue';

export default {
  components: {
    ShopCheckCheetList,
    ShopCheckCheetDetail
  },
  setup() {
    const params = inject('params')
    const changeMode = inject('change-mode')
    
    const mode = ref('list')

    const setCheckSheetViewer = (item) => {
      params.checksheet_viewer = item
      mode.value = 'view'
    }

    const changeCheckSheetMode = (_mode) => {
      mode.value = _mode
    }

    return {
      params,
      changeMode,
      mode,
      setCheckSheetViewer,
      changeCheckSheetMode
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