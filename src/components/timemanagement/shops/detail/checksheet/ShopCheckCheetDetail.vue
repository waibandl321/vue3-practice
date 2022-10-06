<template>
  <div class="my-4">
    <v-btn 
      @click="changeCheckSheetMode('list')"
      prepend-icon="mdi-chevron-left"
    >チェックシート一覧に戻る</v-btn>
  </div>
  <div class="font-weight-bold">衛生管理チェック</div>
  <div class="my-2">
    <Datepicker
      v-model="target_date"
      locale="ja"
      autoApply
      clearable
      :enableTimePicker="false"
      placeholder="適用日"
      style="width: 200px;"
    />
  </div>
  <div class="my-2">
    <v-table 
      fixed-header
      class="table-border"
    >
      <thead>
        <tr>
          <th>従業員</th>
          <th>マニュアル通りの帽子のかぶり方、耳以外のピアスはないか</th>
          <th>ネイル、装飾品、爪の長さは適正か</th>
          <th>名札の着用</th>
          <th>規定の制服の着衣が出来ているか</th>
          <th>携帯の所持、ポケットから見える財布が無いか</th>
          <th>下痢・発熱等はないか</th>
          <th>手にケガ・火傷が無いか</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>大西 純平</td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
          <td class="text-center">
            <v-icon color="primary">mdi-check</v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { ref } from '@vue/reactivity';

export default {
  props: {
    changeCheckSheetMode: {
      type: Function
    }
  },
  components: {
    Datepicker
  },
  setup() {
    const target_date = ref()
    return {
      target_date
    }
  },
}
</script>
<style scoped>
.v-table {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.v-table > .v-table__wrapper > table {
  border-collapse: collapse;
}
table tr {
  border-top: 1px solid #ddd;
}
table th,
table td {
  border-left: 1px solid #ddd;
}
</style>