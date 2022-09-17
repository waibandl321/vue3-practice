<template>
  <v-container class="im-container">
    {{ viewer }}
    <div
      v-if="viewer.eyecatch_url"
      class="mt-4"
    >
      <v-img 
        :src="viewer.eyecatch_url"
        aspect-ratio="2"
      ></v-img>
    </div>
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
      <v-row>
        <v-col
          class="mt-2"
          v-for="file in viewer.files.items"
          :key="file.id"
        >
          <v-chip>
            {{ file.id }}
          </v-chip>
        </v-col>
      </v-row>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">タグ</div>
      <div class="mt-2">
        {{ viewer.tags.items }}
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
    
    return {
      viewer,
      edit,
      backFunc,
      // eyecatch_src
    }
  }
}
</script>