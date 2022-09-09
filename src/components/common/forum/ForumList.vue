<template>
  <v-row class="pa-6">
    <v-col cols="3">
      <v-card
        variant="outlined"
        width="100%"
      >
        <v-card-item>
          <div>
            <v-img src="https://placehold.jp/500x400.png"></v-img>
            <div class="text-overline mb-1">
              タグ名
            </div>
            <div class="text-h6 mb-1">
              投稿タイトル
            </div>
            <div class="text-overline">
              投稿者 | yyyy/mm/dd
            </div>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-btn
            variant="outlined"
            @click="viewPost()"
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
</template>

<script>
export default {
  name: "forum-list",
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    const viewPost = () => {
      props.changeMode('detail')
    }
    const newPost = () => {
      props.changeMode('edit')
    }
    return {
      viewPost,
      newPost
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
  </style>