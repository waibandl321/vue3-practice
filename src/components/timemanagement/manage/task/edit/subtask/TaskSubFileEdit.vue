<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          ファイル名
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td colspan="100%">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                v-bind="props"
                prepend-icon="mdi-plus"
                variant="text"
              >
                追加
              </v-btn>
            </template>
            <v-list>
              <v-list-item link>ファイル管理から選択</v-list-item>
              <v-list-item link>お使いのコンピューターから選択</v-list-item>
            </v-list>
          </v-menu>
        </td>
      </tr>
      <tr
        
      >
        <td>no-image.png</td>
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