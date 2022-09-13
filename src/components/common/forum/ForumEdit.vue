<template>
  <v-container class="im-container">
    {{ editor }}
    <v-card-item>
      <div class="font-weight-bold mb-2">アイキャッチ画像</div>
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
          <v-list-item
            @click="$refs.triggerFile.click()"
            density="compact"
            link
          >
            お使いのコンピューターから選択
          </v-list-item>
          <v-list-item
            link
            density="compact"
          >
            ファイル管理から選択
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- 選択 or 登録済み -->
      <div 
        v-if="editor.eyecatch || eyecatch"
        class="mt-2"
      >
        <v-chip
          closable
          @click:close="chip = false"
        >
          {{ editor.eyecatch ? editor.eyecatch?.file_name : eyecatch?.name }}
        </v-chip>
      </div>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">
        タイトル
        <app-require-label></app-require-label>
      </div>
      <v-text-field
        v-model.trim="editor.title"
      ></v-text-field>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">
        本文
        <app-require-label></app-require-label>
      </div>
      <v-textarea
        v-model.trim="editor.post_text"
      ></v-textarea>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">
        WEBサイト
      </div>
      <div>
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          variant="text"
          @click="addLinks()"
        >WEBサイトを追加</v-btn>
      </div>
      <!-- URL入力欄 -->
      <v-row
        v-for="(url, idxU) in editor.url_links"
        :key="idxU"
      >
        <v-col cols="4">
          <v-text-field
            v-model="url.url_key"
            label="WEBサイト名"
            density="comfortable"
          ></v-text-field>
        </v-col>
        <v-col cols="7">
          <v-text-field
            v-model="url.url_value"
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
            @click="deleteLinks(url)"
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
          <v-list-item 
            @click="$refs.triggerFile.click()"
            density="compact"
            link
          >
            お使いのコンピューターから選択
          </v-list-item>
          <v-list-item
            density="compact"
            link
          >
            ファイル管理から選択
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-if="editor.attachments.length > 0">
        <div
          v-for="(attachment, idxA) in editor.attachments"
          :key="idxA"
          class="mt-2"
        >
          <v-chip
            closable
            @click:close="chip = false"
          >
            {{ attachment.name }}
          </v-chip>
        </div>
      </template>
    </v-card-item>
    <v-card-item>
      <div class="font-weight-bold">タグ</div>
      <template v-if="editor.tags.length > 0">
        <div
          v-for="(tag, idxT) in editor.tags"
          :key="idxT"
          class="mt-2"
        >
          <v-chip
            closable
            @click:close="chip = false"
          >
            {{ tag.name }}
          </v-chip>
        </div>
      </template>
    </v-card-item>
    <footer class="fixed-footer">
    <div class="back">
      <v-btn>一覧へ戻る</v-btn>
    </div>
    <div class="next">
      <v-btn
        color="primary"
        :disabled="!editor.title || !editor.post_text"
        @click="save()"
      >
        {{ params.is_new ? '新規作成' : '更新' }}
      </v-btn>
    </div>
  </footer>
  <v-file-input
    ref="triggerFile"
    class="d-none"
  ></v-file-input>
  </v-container>
</template>

<script>
import { toRefs, ref } from '@vue/reactivity';
import AppRequireLabel from '@/components/common/modules/AppRequireLabel.vue';
import { uuid } from 'vue-uuid'
export default {
  name: "forum-edit",
  components: { 'app-require-label': AppRequireLabel },
  props: {
    params: Object,
    changeMode: Function
  },
  setup(props) {
    const props_data = toRefs(props);
    const editor = ref(props_data.params.value.editor);
    // アイキャッチ
    const eyecatch = ref(undefined)
    // URL
    const addLinks = () => {
      editor.value.url_links.push(
        {
          uid: uuid.v4(),
          url_key: "",
          url_value: ""
        }
      )
    }
    const deleteLinks = (item) => {
      let results = editor.value.url_links
      results = results.filter(v => v.uid !== item.uid)
      editor.value.url_links = results
    }
    const save = () => {
      if(props.params.is_new) {
        alert('新規作成')
      } else {
        alert('更新')
      }
    }
    return {
      editor,
      eyecatch,
      // URL
      addLinks,
      deleteLinks,
      // 保存
      save
    };
  },
}
</script>