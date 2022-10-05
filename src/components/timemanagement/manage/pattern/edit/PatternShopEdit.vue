<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">店舗名</th>
        <th class="text-left">エリア</th>
        <th class="text-left">ブランド</th>
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
        
      >
        <td>テスト店舗003</td>
        <td>東京</td>
        <td>すき家</td>
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