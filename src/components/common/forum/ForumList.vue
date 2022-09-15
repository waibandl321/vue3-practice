<template>
  <v-row class="pa-6">
    <v-col>
      <div style="position: relative;">
        <v-btn
          class="filter-more"
          icon
          variant="text"
          x-small
          @click="filter_mode = !filter_mode"
        >
          <v-icon>{{ !filter_mode ? "mdi-filter-variant-plus" : "mdi-close" }}</v-icon>
        </v-btn>
        <v-text-field
          variant="outlined"
          hide-details="auto"
        ></v-text-field>
        <v-card
          v-show="filter_mode"
          class="filter-area"
        >
          <v-card-item>
            <v-card-subtitle>投稿日</v-card-subtitle>
            <v-card-actions>
              <Datepicker
                v-model="post_start"
                locale="ja"
                autoApply
                clearable
                :enableTimePicker="false"
                placeholder="開始日"
              />
              <Datepicker
                v-model="post_end"
                locale="ja"
                autoApply
                clearable
                :enableTimePicker="false"
                placeholder="終了日"
              />
            </v-card-actions>
          </v-card-item>
          <v-card-item>
            <v-card-subtitle>タグ</v-card-subtitle>
            <v-card-actions>
              <v-chip
                color="primary"
                variant="outlined"
                link
              >
                タグ
              </v-chip>
            </v-card-actions>
          </v-card-item>
        </v-card>
      </div>
    </v-col>
    <v-col>
      <v-btn
        variant="outlined"
      >検索</v-btn>
    </v-col>
  </v-row>
  {{ items }}
  <v-row class="pa-6">
    <v-col 
      cols="3"
      v-for="post in items"
      :key="post.id"
    >
      <v-card
        variant="outlined"
        width="100%"
      >
        <v-card-item>
          <div>
            <v-img src="https://placehold.jp/500x400.png"></v-img>
            <div class="text-overline my-2 d-flex justify-space-between align-center">
              <v-chip
                v-for="tag in post.tags.items"
                :key="tag.id"
              >
                {{ tag.forum_tag_name }}
              </v-chip>
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    color="primary"
                    v-bind="props"
                    icon="mdi-dots-horizontal"
                    variant="text"
                    size="small"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    link
                    @click="deletePost(post)"
                  >投稿を削除</v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div class="text-h6 mb-1">
              {{ post.title }}
            </div>
            <div class="text-overline">
              投稿者??? | {{ post.updatedAt }}
            </div>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click.stop="viewPost(post)"
          >
            詳しく見る
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <div class="fixed-btn">
    <v-btn
      color="primary"
      icon="mdi-plus"
      size="x-large"
      @click="newPost()"
    ></v-btn>
  </div>
  <OverlayLoading v-if="loading" />
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, toRefs } from '@vue/reactivity';
import forumApiFunc from '@/mixins/api/func/forum'
import OverlayLoading from '../OverlayLoading.vue';

export default {
  name: "forum-list",
  components: {
    Datepicker,
    OverlayLoading
},
  props: {
    params: Object,
    changeMode: Function,
    setViewer: Function,
  },
  setup (props) {
    const loading = ref(false)
    const _props = toRefs(props)
    const items =ref(_props.params.value.forum.posts.items)
    // 詳細遷移
    const viewPost = (post) => {
      props.setViewer(post)
      props.changeMode('detail')
    }
    // 新規作成 遷移
    const newPost = () => {
      const is_new = true
      props.changeMode('edit', is_new)
    }
    // 削除
    const deletePost = async (post) => {
      if(!confirm('データは復元できません。よろしいですか？')) return;
      console.log('delete post', post);
      loading.value = true
      try {
        await forumApiFunc.delete(post)
        .catch((error) => console.error('deleteForumPost', error))
        // アイキャッチ
        if(post.eyecatch) {
          await forumApiFunc.deleteEyecatch(post.eyecatch)
          .catch((error) => console.error('deleteForumEyecatch', error))
        }
        // 添付ファイル
        if(post.files.items.length > 0) {
          // TODO: ファイル管理、ストレージにあるデータを残すか要検討
          for (const file of post.files.items ) {
            await forumApiFunc.deleteFile(file)
            .catch((error) => console.error('deleteForumFile', error))
          }
        }
        // URL
        if(post.urls.items.length > 0) {
          for (const url of post.urls.items ) {
            await forumApiFunc.deleteLink(url)
            .catch((error) => console.error('deleteForumUrl', error))
          }
        }
        // タグ
        if(post.tags.items.length > 0) {
          for (const tag of post.tags.items ) {
            await forumApiFunc.deleteTag(tag)
            .catch((error) => console.error('deleteForumTag', error))
          }
        }
        alert('投稿を削除しました')
        items.value = items.value.filter(v => v.id !== post.id)
      } catch (error) {
        console.error('delete post exception error', error);
      }
      loading.value = false
    }
    // 検索
    const filter_mode = ref(false)
    const post_start = ref()
    const post_end = ref()
    return {
      loading,
      // リスト
      items,
      // methods
      viewPost,
      newPost,
      // 削除
      deletePost,
      // filter
      filter_mode,
      post_start,
      post_end,
    }
  },
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
.filter-area {
  position: absolute;
  top: 100%;
  z-index: 2;
  left: 0;
  right: 0;
}
.filter-more {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 8px;
  display: flex;
  align-items: center;
  z-index: 2;
}
</style>