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
      <div
        v-for="file in viewer.files.items"
        :key="file.id"
        class="mt-4"
      >
        <v-chip>
          {{ file.file_name }}
        </v-chip>
        <div class="mt-2">
          <v-img
            width="150"
            :src="file.preview_src"
          ></v-img>
        </div>
      </div>
    </div>
    <div class="mt-10">
      <div class="font-weight-bold">タグ</div>
      <div class="mt-2">
        <v-chip
          v-for="tag in viewer.tags.items"
          :key="tag.id"
          class="mr-2"
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
import utilMixin from '@/mixins/utils/utils.js'

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
    const getPreviewerFile = async (data_url) => {
      const requset_url = utilMixin.removeUrlQuery(data_url)
      return await utilMixin.getImageObjectURL(requset_url)
    }
    const init = async () => {
      if(viewer.files.items.length === 0) return;
      for (const file of viewer.files.items) {
        file.preview_src = await getPreviewerFile(file.data_url)
      }
    }
    init()

    return {
      viewer,
      edit,
      backFunc,
    }
  }
}
</script>