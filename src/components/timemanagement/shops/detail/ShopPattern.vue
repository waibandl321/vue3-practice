<template>
  <div class="view-body">
    <ShopPatternList
      v-if="mode === 'list'"
      :setPatternViewer="setPatternViewer"
    />
    <ShopPatternDetail
      v-if="mode === 'view'"
      :changePatternMode="changePatternMode"
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
</template>

<script>
import { inject, ref } from '@vue/runtime-core';
import ShopPatternList from './pattern/ShopPatternList.vue';
import ShopPatternDetail from './pattern/ShopPatternDetail.vue';


export default {
  components: {
    ShopPatternList,
    ShopPatternDetail
},
  setup() {
    const params = inject('params')
    const changeMode = inject('change-mode')
    
    const mode = ref('list')

    const setPatternViewer = (item) => {
      params.pattern_viewer = item
      mode.value = 'view'
    }

    const changePatternMode = (_mode) => {
      mode.value = _mode
    }

    return {
      params,
      changeMode,
      mode,
      setPatternViewer,
      changePatternMode
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