<template>
  <v-card theme="dark" color="#222" width="100" variant="flat" height="100%" rounded="0">
    <v-list-item 
      class="text-center mt-2"
      link
      @click="checksheet_list_display = !checksheet_list_display"
    >
      <v-icon>mdi-playlist-check</v-icon>
      <v-list-item-subtitle>
        チェック<br>
        シート
      </v-list-item-subtitle>
    </v-list-item>
    <v-list-item 
      class="text-center mt-2"
      link
      to="reports"
    >
      <v-icon>mdi-playlist-check</v-icon>
      <v-list-item-subtitle>
        日報<br>
        引き継ぎ
      </v-list-item-subtitle>
    </v-list-item>
  </v-card>
  <!-- チェックシート一覧 -->
  <v-card
    v-if="checksheet_list_display"
    class="checksheet-list"
  >
    <v-list>
      <v-list-item
        link
        to="checkcheet"
      >衛生管理</v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
  setup() {
    const checksheet_list_display = ref(false)
    return {
      checksheet_list_display
    }
  },
}
</script>

<style scoped>
.checksheet-list {
  position: fixed;
  left: 100px;
  top: 40px;
  width: 240px;
  z-index: 2;
  bottom: 0;
}
</style>