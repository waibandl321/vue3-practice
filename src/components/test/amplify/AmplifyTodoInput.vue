<template>
  <v-card class="pa-6">
    <v-text-field
      v-model="post.name"
      clearable
      label="タイトル"
    ></v-text-field>
    <v-textarea
      v-model="post.description"
      clearable
      label="内容"
    ></v-textarea>
    <v-btn
      @click="create()"
      color="success"
      :disabled="!post.name"
    >
      Create Todo
    </v-btn>
  </v-card>
</template>

<script>
import { API } from 'aws-amplify'
import { createTodo } from '@/graphql/mutations'
import { reactive } from 'vue'

export default {
  name: 'amplify-tutorial-input',
  props: {
    posts: Array
  },
  setup (props) {
    const post = reactive({
      name: '',
      description: ''
    })

    const create = async () => {
      const todo = {
        name: post.name,
        description: post.description,
        sortNumber: props.posts.length + 1
      }
      await API.graphql({
        query: createTodo,
        variables: { input: todo }
      }).then(() => {
        post.name = ''
        post.description = ''
        alert('TODOリストを投稿しました。')
      }).catch((error) => {
        console.log(error)
        alert('投稿に失敗しました。')
      })
    }

    return {
      post,
      create
    }
  }
}
</script>
<style scoped>
input[type="text"],
textarea {
  border: 1px solid #ccc;
}
</style>
