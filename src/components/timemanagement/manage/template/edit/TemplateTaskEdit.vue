<template>
  <v-table>
    <thead>
      <tr>
        <th></th>
        <th class="text-left">実施時間</th>
        <th class="text-left">タスク名</th>
        <th class="text-left">区分</th>
        <th class="text-left">所要時間</th>
        <th class="text-left">ポジション</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="100%">
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            variant="text"
          >
            追加
          </v-btn>
        </td>
      </tr>
      <tr
        @click="setViewer('hogehoge')"
      >
        <td>
          <v-btn
            icon="mdi-menu"
            class="drag-btn"
            size="small"
            variant="text"
          ></v-btn>
        </td>
        <td>
          <v-btn
            class="drag-btn"
            variant="text"
            color="primary"
          >営業開始時間 直後</v-btn>
        </td>
        <td>テストタスク</td>
        <td>チェック</td>
        <td>20分</td>
        <td>ホール</td>
        <td class="text-right">
          <v-btn
            icon="mdi-delete"
            color="primary"
            size="small"
            variant="text"
          ></v-btn>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>