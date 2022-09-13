<template>
  <Header />
  <v-main>
    <ForumList
      v-if="mode === 'list'"
      :params="params"
      :changeMode="changeMode"
    />
    <ForumDetail
      v-if="mode === 'detail'"
      :params="params"
      :changeMode="changeMode"
    />
    <ForumEdit
      v-if="mode === 'edit'"
      :params="params"
      :changeMode="changeMode"
    />
  </v-main>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import ForumList from '@/components/common/forum/ForumList.vue';
import ForumDetail from '@/components/common/forum/ForumDetail.vue';
import ForumEdit from '@/components/common/forum/ForumEdit.vue';
import { ref } from '@vue/reactivity';
export default {
  name: 'forum-index',
  components: {
    Header,
    ForumList,
    ForumDetail,
    ForumEdit
  },
  setup () {
    const mode = ref('list')
    const params = ref({
      viewer: {},
      editor: {},
      is_new: false
    })
    const changeMode = (_mode, is_new = false) => {
      if(is_new) {
        params.value.is_new = true
        params.value.editor = {
          title: "",
          post_text: "",
          attachments: [],
          url_links: [],
          eyecatch: undefined
        }
      }
      mode.value = _mode
    }
    return {
      mode,
      params,
      changeMode
    }
  }
}
</script>
