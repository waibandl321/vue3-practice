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
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
              icon="mdi-dots-horizontal"
            ></v-btn>
          </template>
          <v-list>
            <v-list-item
              link
              density="compact"
              @click="deleteItem"
            >
              <v-list-item-title>削除</v-list-item-title>
            </v-list-item>
            <v-list-item
              link
              density="compact"
              @click="copy"
            >
              <v-list-item-title>コピーして新規作成</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn
          color="primary"
          @click="clickEdit()"
        >修正</v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
import { inject } from '@vue/runtime-core'
export default {
  props: {
    deleteItem: {
      type: Function
    },
    copy: {
      type: Function
    },
  },
  setup() {
    const toEdit = inject('set-editor')
    const changeMode = inject('change-mode')
  
    const clickEdit = () => {
      toEdit('hogehoge')
    }
    return {
      clickEdit,
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