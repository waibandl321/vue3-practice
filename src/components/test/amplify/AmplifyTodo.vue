<template>
  <v-container>
    <AmplifyTodoInput
      :posts="posts"
    />
    <AmplifyTodoList
      :posts="posts"
    />
  </v-container>
</template>

<script>
import AmplifyTodoInput from './AmplifyTodoInput.vue'
import AmplifyTodoList from './AmplifyTodoList.vue'

import { API } from 'aws-amplify'
import { listTodos } from '@/graphql/queries'
import { onCreateTodo, onDeleteTodo } from '@/graphql/subscriptions'
import { ref } from 'vue'

export default {
  name: 'amplify-tutorial',
  components: {
    AmplifyTodoInput,
    AmplifyTodoList
  },
  setup () {
    const posts = ref([])
    // 一覧取得
    const getTodos = async () => {
      const results = await API.graphql({
        query: listTodos
      })
      posts.value = results.data.listTodos.items
    }
    getTodos()
    // 作成：再取得
    const onCreatedSubscribe = () => {
      API.graphql({ query: onCreateTodo })
        .subscribe({
          next: (eventData) => {
            const todo = eventData.value.data.onCreateTodo
            if (posts.value.some(item => item.name === todo.name)) return
            posts.value = [...posts.value, todo]
          }
        })
    }
    onCreatedSubscribe()
    // 削除：再取得
    const onDeleteSubscribe = () => {
      API.graphql({ query: onDeleteTodo })
        .subscribe({
          next: (eventData) => {
            const todo = eventData.value.data.onDeleteTodo
            posts.value = posts.value.filter(v => v.id !== todo.id)
          }
        })
    }
    onDeleteSubscribe()

    return {
      posts
    }
  }
}
</script>
