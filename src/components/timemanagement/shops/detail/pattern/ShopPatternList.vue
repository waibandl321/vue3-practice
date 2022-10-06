<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">業務パターン</th>
        <th class="text-left">適用期間</th>
        <th class="text-left">繰り返し</th>
        <th class="text-left">作成</th>
      </tr>
    </thead>
    <tbody>
      <tr
        @click="setPatternViewer('hogehoge')"
      >
        <td>テストパターン001</td>
        <td>2022-05-10 - 2022-07-31</td>
        <td>毎日</td>
        <td>本部</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    setPatternViewer: {
      type: Function
    }
  },
  setup() {
    
  },
}
</script>