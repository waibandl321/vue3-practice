<template>
  <v-container class="im-container">
    {{ viewer }}
    <v-img src="https://placehold.jp/1200x800.png"></v-img>
    アイキャッチ{{ viewer.post_eyecatch.data_url }}
    <div class="mt-4">
      <v-card-title>{{ viewer.title }}</v-card-title>
      <v-card-subtitle>投稿者 | {{ viewer.updatedAt }}</v-card-subtitle>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">本文</div>
      <div class="mt-2">{{ viewer.post_text }}</div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">WEBサイト</div>
      <div
        v-for="url in viewer.urls.items"
        :key="url.id"
        class="mt-2"
      >
        <a
          :href="url.url_value"
          target="_blank"
          rel="noopener noreferrer"
        >{{ url.url_key }}</a>
      </div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">添付ファイル</div>
      <div
        class="mt-2"
        v-for="file in viewer.files.items"
        :key="file.id"
      >
        <v-chip>
          {{ file.id }}
        </v-chip>
      </div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">タグ</div>
      <div class="mt-2">
        <v-chip
          v-for="tag in viewer.tags.items"
          :key="tag.id"
        >
          {{ tag.forum_tag_name }}
        </v-chip>
      </div>
    </div>
    <footer class="fixed-footer">
    <div class="back">
      <v-btn @click="backFunc()">一覧へ戻る</v-btn>
    </div>
    <div class="next">
      <v-btn
        color="primary"
        @click="edit()"
      >
        修正
      </v-btn>
    </div>
  </footer>
  </v-container>
</template>

<script>
import { toRefs } from '@vue/reactivity';
import forumApiFunc from '@/mixins/api/func/forum'
export default {
  name: "forum-detail",
  props: {
    params: Object,
    changeMode: Function,
    setEditor: Function,
  },
  setup(props) {
    const _props = toRefs(props)
    const viewer = _props.params.value.viewer
    const edit = () => {
      props.setEditor(viewer)
      props.changeMode('edit')
    }
    const backFunc = () => {
      props.changeMode('list')
    }
    // アイキャッチ
    const setEyecatch = async () => {
      viewer.post_eyecatch = await forumApiFunc.getEyecatch(viewer)
    }
    setEyecatch()
    return {
      viewer,
      edit,
      backFunc
    }
  }
}
</script>