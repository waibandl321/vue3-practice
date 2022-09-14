<template>
  <v-container class="im-container">
    新規フラグ: {{ params.is_new }} <br>
    {{ editor }}
    <div class="mt-10">
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
            @click="$refs.triggerEyecatch.click()"
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
        v-if="editor.eyecatch"
        class="mt-2"
      >
        <v-chip
          closable
          @click:close="editor.eyecatch = undefined"
        >
          {{ editor.eyecatch?.file_name || editor.eyecatch?.name }}
        </v-chip>
      </div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">
        タイトル
        <app-require-label></app-require-label>
      </div>
      <v-text-field
        v-model.trim="editor.title"
      ></v-text-field>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">
        本文
        <app-require-label></app-require-label>
      </div>
      <v-textarea
        v-model.trim="editor.post_text"
      ></v-textarea>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">
        WEBサイト
      </div>
      リンク有無判定: {{ editor.url_links }}
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
        v-for="url in editor.urls.items"
        :key="url.id"
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
    </div>
    <div class="mt-10">
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
            @click="$refs.triggerAttachment.click()"
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
      <div
        v-for="file in editor.files.items"
        :key="file.id"
        class="mt-2"
      >
        <v-chip
          closable
          @click:close="removeAttachment(file)"
        >
          {{ file.id }}
        </v-chip>
      </div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">タグ</div>
      <div>追加する際は入力後に「セミころん(;)」を押してください</div>
      options: {{ tag_options }}
      <div>
        <Multiselect
          mode="tags"
          v-model="editor.tags.items"
          :options="tag_options"
          :searchable="true"
          createTag
          :addTagOn="[';']"
          :object="true"
          label="forum_tag_name"
          noOptionsText="タグが登録されていません"
          placeholder="タグを入力して登録できます"
          @tag="handleTagCreate"
        />
      </div>
    </div>
  <footer class="fixed-footer">
    <div class="back">
      <v-btn @click="changeMode('list')">一覧へ戻る</v-btn>
    </div>
    <div class="next">
      <v-btn
        color="primary"
        :disabled="!editor.title || !editor.post_text"
        @click="createPost()"
      >
        {{ params.is_new ? '新規作成' : '更新' }}
      </v-btn>
    </div>
  </footer>
  <v-file-input
    ref="triggerEyecatch"
    class="d-none"
    @change="changeEyecatch"
  ></v-file-input>
  <v-file-input
    ref="triggerAttachment"
    class="d-none"
    @change="changeAttachment"
  ></v-file-input>
  <OverlayLoading v-if="loading" />
  </v-container>
</template>

<script>
import { toRefs, ref } from '@vue/reactivity';
import AppRequireLabel from '@/components/common/modules/AppRequireLabel.vue';
import Multiselect from '@vueform/multiselect'
import { uuid } from 'vue-uuid'
import forumApiFunc from '@/mixins/api/func/forum'
import storageFunc from '@/mixins/storage/storage.js'
import OverlayLoading from '../OverlayLoading.vue';

export default {
  name: "forum-edit",
  components: {
    "app-require-label": AppRequireLabel,
    Multiselect,
    OverlayLoading
  },
  props: {
    params: Object,
    changeMode: Function,
    initEditor: Function
  },
  setup(props) {
    const loading = ref(false)
    const _props = toRefs(props);
    const editor = ref(_props.params.value.editor);
    // アイキャッチ
    const changeEyecatch = (event) => {
      editor.value.eyecatch = event.target.files[0]
    }
    // URL
    const addLinks = () => {
      editor.value.urls.items.push(
        {
          uid: uuid.v4(),
          url_key: "",
          url_value: ""
        }
      )
    }
    const deleteLinks = (item) => {
      let results = editor.value.urls.items
      results = results.filter(v => v.uid !== item.uid)
      editor.value.urls.items = results
    }
    // 添付画像
    const changeAttachment = (event) => {
      editor.value.files.push(...event.target.files)
    }
    const removeAttachment = (attachment) => {
      editor.value.files.items = editor.value.files.items.filter(v => v.name !== attachment.name)
    }
    // タグ
    const tag_options = ref([])
    const handleTagCreate = (query, select$) => {
      console.log('handleTagCreate', select$.options);
      tag_options.value.push({
        uid: uuid.v4(),
        forum_tag_name: query
      })
    }
    const initTagOptions = () => {
      const tags = ref(editor.value.tags.items)
      if(tags.value.length > 0) {
        for (const tag of tags.value) {
          tag_options.value.push({
            uid: tag.id,
            forum_tag_name: tag.forum_tag_name
          })
        }
      }
    }
    initTagOptions()
    const createPost = async () => {
      if(props.params.is_new) {
        // 1. S3にファイルアップロード
        loading.value = true
        try {
          // 投稿
          const save_post = await forumApiFunc.createPost(props.params.forum, editor.value)
          console.log(save_post);
          // // アイキャッチ
          if(editor.value.eyecatch && !editor.value.eyecatch?.file_id){
            editor.value.eyecatch.data_url = await storageFunc.storageUploadFunctionFile(editor.value.eyecatch, "forum_eyecatch")
            await forumApiFunc.createEyecatch(editor.value.eyecatch, save_post)
          }
          // 添付画像
          if(editor.value.files.items.length > 0) {
            for (const attachment of editor.value.files.items) {
              if(attachment.file_id) return;
              attachment.data_url = await storageFunc.storageUploadFunctionFile(attachment, "forum")
              await forumApiFunc.createFiles(attachment, save_post)
            }
          }
          // URL
          if(editor.value.urls.items.length > 0) {
            for (const url of editor.value.urls.items) {
              await forumApiFunc.createLinks(url, save_post)
            }
          }
          // タグ
          if(editor.value.tags.items.length > 0) {
            for (const tag of editor.value.tags.items) {
              await forumApiFunc.createTags(tag, save_post)
            }
          }
          alert('投稿データ保存')
          props.changeMode('list')
          loading.value = false
        } catch (error) {
          console.error("createPost exception error", error)
        }
        loading.value = false
      } else {
        alert('更新')
      }
      props.initEditor()
    }
    return {
      loading,
      editor,
      // アイキャッチ
      changeEyecatch,
      // URL
      addLinks,
      deleteLinks,
      // 添付ファイル
      changeAttachment,
      removeAttachment,
      // タグ
      tag_options,
      handleTagCreate,
      // 保存
      createPost
    };
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>