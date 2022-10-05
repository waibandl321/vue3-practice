<template>
  <v-card class="manage-footer">
    <v-card-actions class="justify-space-between">
      <div>
        <v-btn
          variant="text"
          @click="changeMode('list')"
        >一覧へ戻る</v-btn>
      </div>
      <div>
        <v-btn
          variant="outlined"
          @click="changeMode('view')"
        >キャンセル</v-btn>
        <v-btn
          color="primary"
          @click="save()"
        >保存</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
  props: {
    save: {
      type: Function
    }
  },
  setup() { 
    const changeMode = inject('change-mode')
  
    return {
      changeMode
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
</style>