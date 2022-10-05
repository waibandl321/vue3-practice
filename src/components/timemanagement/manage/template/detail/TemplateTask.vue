<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          実施時間
        </th>
        <th class="text-left">
          タスク名
        </th>
        <th class="text-left">
          区分
        </th>
        <th class="text-left">
          所要時間
        </th>
        <th class="text-left">
          ポジション
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        @click="setViewer('hogehoge')"
      >
        <td>営業開始時間 直後</td>
        <td>テストタスク</td>
        <td>チェック</td>
        <td>20分</td>
        <td>ホール</td>
      </tr>
    </tbody>
  </v-table>
</template>