<template>
  <v-container class="im-container">
    新規フラグ: {{ params.is_new }}  <br>
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
            @click="openFileSelectModal('eyecatch')"
          >
            ファイル管理から選択
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- 選択 or 登録済み -->
      <div 
        v-if="editor.eyecatch?.id || editor.eyecatch?.name"
        class="mt-2"
      >
        <v-chip
          closable
          @click:close="editor.eyecatch = undefined"
        >
          {{ editor.eyecatch.file_name || editor.eyecatch.name }}
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
      {{ editor.files.items }}
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
            @click="openFileSelectModal('attachment')"
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
          @click:close="removeForumFile(file)"
        >
          {{ file.file_name ?? file.name ?? file.id }}
        </v-chip>
      </div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">タグ</div>
      <div class="mb-2">
        {{ params.forum.tag_options }}
      </div>
      v-model {{ editor.tags.items }}<br>
      options: {{ tag_options }}
      <div>
        <Multiselect
          mode="tags"
          v-model="editor.tags.items"
          :addTagOn="[',']"
          :options="tag_options"
          :searchable="true"
          createTag
          :object="true"
          label="forum_tag_name"
          valueProp="forum_tag_name"
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
        @click="savePost()"
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
  <!-- ファイル管理から選択 -->
  <template v-if="file_select_modal">
    <FIleSelectModal
      :file-select-modal="file_select_modal"
      :dir-top="dir_top"
      :isSelectedFile="isSelectedFile"
      :closeFileSelectModal="closeFileSelectModal"
    />
  </template>
  <!-- ローディング -->
  <OverlayLoading v-if="loading" />
  </v-container>
</template>

<script>
import { toRefs, ref, effectScope } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';

import AppRequireLabel from '@/components/common/modules/AppRequireLabel.vue';
import OverlayLoading from '../OverlayLoading.vue';
import FIleSelectModal from '../modal/FIleSelectModal.vue';

import fileApiFunc from '@/mixins/api/func/file'
import forumMixin from './forum_mixin'
import forumApiFunc from '@/mixins/api/func/forum'


import Multiselect from '@vueform/multiselect'
import { uuid } from 'vue-uuid'


export default {
  name: "forum-edit",
  components: {
    "app-require-label": AppRequireLabel,
    Multiselect,
    OverlayLoading,
    FIleSelectModal
  },
  props: {
    params: Object,
    changeMode: Function,
    initEditor: Function
  },
  setup(props) {
    const loading = ref(false)
    const _props = toRefs(props);
    const editor = _props.params.value.editor;
    const tag_options = _props.params.value.forum.tag_options.items
    const dir_top = ref({})
    // エフェクトスコープ
    const scope = effectScope()
    scope.run(() => {
      onMounted(async () => {
        dir_top.value = await fileApiFunc.apiGetDirTop()
        if(!_props.params.value.is_new) {
          editor.eyecatch = editor.eyecatch?.items[0]
        }
      })
    })
    // URL
    const addLinks = () => {
      editor.urls.items.push(
        {
          uid: uuid.v4(),
          url_key: "",
          url_value: ""
        }
      )
    }
    const deleteLinks = (item) => {
      let results = editor.urls.items
      results = results.filter(v => v.uid !== item.uid)
      editor.urls.items = results
    }
    // 添付画像
    const changeAttachment = (event) => {
      editor.files.items.push(...event.target.files)
    }
    const removeForumFile = async (file) => {
      editor.files.items = editor.files.items.filter(v => v.name !== file.name || v.id !== file.id)
      if(file.post_key) {
        await forumApiFunc.deleteFile(file)
      }
    }
    // タグ
    const handleTagCreate = (query, select$) => {
      console.log('handleTagCreate', select$.options);
      tag_options.push({
        uid: uuid.v4(),
        forum_tag_name: query
      })
    }
    // 保存
    const savePost = async () => {
      loading.value = true
      const forum = _props.params.value.forum
      const is_new = _props.params.value.is_new
      try {
        if(is_new) {
          // タグオプション作成 TODO: 後でMixin化する
          if(tag_options.length > 0) {
            for (const tag_option of tag_options) {
              await forumApiFunc.createTagOption(forum, tag_option)
            }
          }
          await forumMixin.mixinCreateForumPost(forum, editor, dir_top.value)
          alert('投稿を保存しました。')
        } else {
          // タグ更新
          const tags = editor.tags.items
          await forumMixin.mixinUpdateTags(tags, editor)
          // 添付ファイル更新
          const files = editor.files.items.filter(v => !v.post_key)
          if(files.length > 0) {
            await forumMixin.mixinCreateFiles(files, editor, dir_top.value)
          }
          alert('投稿を保存しました。')
          // const urls = editor.urls.items
        }
        // TODO: 新しく登録されたタグオプションもDBに保存する（table: ForumTagOption）
        props.changeMode('list')
      } catch (error) {
        console.error("forumApiFunc.createPost", error)
      }
      loading.value = false
      props.initEditor()
    }
    // ファイル管理から選択
    const file_select_modal = ref(false)
    const file_select_function = ref(undefined)
    const openFileSelectModal = (func) => {
      file_select_function.value = func
      file_select_modal.value = true
    }
    const closeFileSelectModal = () => {
      file_select_function.value = undefined
      file_select_modal.value = false
    }
    const isSelectedFile = (file) => {
      if(file_select_function.value === 'eyecatch') {
        // アイキャッチの場合
        editor.eyecatch = file
      } else if (file_select_function.value === 'attachment') {
        // 添付ファイルの場合
        editor.files.items.push(file)
      }
      file_select_function.value = undefined
      file_select_modal.value = false
    }
    // アイキャッチ画像（ローカルから）
    const changeEyecatch = (event) => {
      editor.eyecatch = event.target.files[0]
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
      removeForumFile,
      // タグ
      tag_options,
      handleTagCreate,
      // 保存
      savePost,
      // ファイル管理から選択
      file_select_modal,
      file_select_function,
      dir_top,
      openFileSelectModal,
      closeFileSelectModal,
      isSelectedFile
    };
  },
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>