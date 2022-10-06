<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">チェックシート名</th>
        <th class="text-left">区切り</th>
        <th class="text-left">作成</th>
      </tr>
    </thead>
    <tbody>
      <tr
        @click="setCheckSheetViewer('hogehoge')"
      >
        <td>衛生管理チェック</td>
        <td>1日</td>
        <td>本部</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    setCheckSheetViewer: {
      type: Function
    }
  },
  setup() {
    
  },
}
</script>