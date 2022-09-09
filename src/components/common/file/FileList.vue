<template>
  <div class="pa-6">
    <!-- パンくず -->
    <div class="d-flex align-center">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            append-icon="mdi-chevron-down"
          >
            全てのファイル
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            link
            @click="changeMode('trash')"
          >
            ゴミ箱を表示
          </v-list-item>
        </v-list>
      </v-menu>
      <v-breadcrumbs
        :items="breadcrumbs"
        link
      >
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <!-- リスト -->
    <div class="text-right">
      <v-btn
        color="error"
        variant="text"
        append-icon="mdi-delete"
      >削除</v-btn>
    </div>
    <v-table
      fixed-header
      height="300px"
    >
      <thead>
        <tr>
          <th class="short-td">
            <v-checkbox
              hide-details="auto"
            ></v-checkbox>
          </th>
          <th class="text-left">ファイル・フォルダ名</th>
          <th class="text-left">更新者</th>
          <th class="text-left">更新日</th>
          <th class="text-left">サイズ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="short-td">
            <v-checkbox
              hide-details="auto"
            ></v-checkbox>
          </td>
          <td>hogehoge.jpg</td>
          <td>開発 太郎</td>
          <td>2022/09/10</td>
          <td>125KB</td>
          <td class="short-td">
            <div class="drop-menu">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="text"
                    v-bind="props"
                    icon="mdi-dots-vertical"
                    size="small"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    density="compact"
                    link
                  >
                    ダウンロード
                  </v-list-item>
                  <v-list-item
                    density="compact"
                    link
                  >
                    削除
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
export default {
  name: 'file-list',
  props: {
    changeMode: Function
  },
  setup () {
    const breadcrumbs = [
      {
        title: 'Dashboard',
        disabled: false,
      },
      {
        title: 'Link 1',
        disabled: false,
      },
      {
        title: 'Link 2',
        disabled: true,
      },
    ]
    return {
      breadcrumbs
    }
  }
}
</script>