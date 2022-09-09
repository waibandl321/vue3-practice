<template>
  <v-container>
    <v-card-item>
      <div class="font-weight-bold">アイキャッチ画像</div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >
            画像を選択
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            ファイルを選択
          </v-list-item>
          <v-list-item link>
            ファイル管理から選択
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">タイトル</div>
      <v-text-field></v-text-field>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">本文</div>
      <v-textarea></v-textarea>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">WEBサイト</div>
      <div>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          variant="text"
        >WEBサイトを追加</v-btn>
      </div>
      <!-- URL入力欄 -->
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="WEBサイト名"
            density="comfortable"
          ></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field
            label="URL"
            placeholder="https://"
            density="comfortable"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn
            icon="mdi-delete"
            color="primary"
            variant="text"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">添付ファイル</div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
            variant="text"
            prepend-icon="mdi-plus"
          >
            追加
          </v-btn>
        </template>
        <v-list>
          <v-list-item link>
            ファイルを選択
          </v-list-item>
          <v-list-item link>
            ファイル管理から選択
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">タグ</div>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '../PcFooter.vue'
  export default {
    name: "forum-edit",
    components: { PcFooter },
    props: {
        params: Object,
        changeMode: Function
    },
    setup(props) {
        const save = () => {
            props.changeMode("list");
        };
        const backFunc = () => {
            props.changeMode("list");
        };
        const footer_options = {
            back: [
                { text: "一覧へ戻る", callback: backFunc }
            ],
            next: [
                { text: "保存", callback: save }
            ]
        };
        return {
            footer_options
        };
    }    
}
  </script>