<template>
  <v-card>
    <v-card-title>掲示板データ一括作成テスト</v-card-title>
    <v-card-text>
      <v-text-field
        label="タイトル"
        v-model="post_obj.title"
      ></v-text-field>
      <v-text-field
        label="内容"
        v-model="post_obj.post_text"
      ></v-text-field>
      <div>
        <v-btn
          @click="addUrl()"
          icon="mdi-plus"
        ></v-btn>
        <v-row
          v-for="(url, u) in post_obj.urls"
          :key="u"
        >
          <v-col>
            <v-text-field
              label="サイト名"
              v-model="url.key"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex">
            <v-text-field
              label="URL"
              v-model="url.value"
            ></v-text-field>
            <v-btn
              icon="mdi-delete"
              @click="deleteUrl(url)"
            ></v-btn>
          </v-col>
        </v-row>
      </div>
      <v-btn
        color="primary"
        size="large"
        @click="save()"
      >送信</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { API } from 'aws-amplify'
import { createForumPost } from '@/graphql/mutations'
// import { listForums } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
// import store from '@/store'

export default {
  setup() {
    
    const post_obj = reactive({
      eyecatch: undefined,
      title: "",
      post_text: "",
      urls: [],
    })
    const save = async () => {
      await apiCreateForumPost(post_obj)
    }
    async function apiCreateForumPost (post_obj) {
      const post = generateForumPostObject(post_obj)
      await API.graphql({
        query: createForumPost,
        variables: { input: post }
      }).then((res) => {
        console.log(res.data.createForumPost);
      })

      function generateForumPostObject (post_obj) {
        const forum_id = "795d8aba-9476-4c12-921b-14f875a0e1d0"
        return {
          forum_id: forum_id,
          post_key: uuid.v4(),
          title: post_obj.title,
          post_text: post_obj.post_text,
        }
      }
    }

    const addUrl = () => {
      post_obj.urls.push(
        { id: uuid.v4(), key: "", value: "" }
      )
    }
    const deleteUrl = (url) => {
      post_obj.urls = post_obj.urls.filter(v => v.id !== url.id)
    }

    return {
      post_obj,
      addUrl,
      deleteUrl,
      save
    }
  },
}
</script>