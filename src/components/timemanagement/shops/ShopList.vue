<template>
  <div class="list-body">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">店舗名</th>
          <th class="text-left">エリア</th>
          <th class="text-left">ブランド</th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="setViewer('hogehoge')"
        >
          <td>店舗名</td>
          <td>東京</td>
          <td>テストブランド001</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import timngUtils from '@/mixins/api/timemanagement/utils.js'
import { inject } from '@vue/runtime-core'

export default {
  setup() {
    const setViewer = inject('set-viewer')
    const menus = timngUtils.getTimngManageMenu()

    return {
      menus,
      setViewer
    }
  },
}
</script>
<style scoped>
.list-body{
  width: 100%;
  padding: 12px 12px 100px 12px;
}
</style>