<template>
  <suspense>
    <template #default>
      <v-list-item
        v-for="item in posts"
        :key="item.id"
      >
        <template v-slot:append>
          <v-btn
            fab
            small
            @click="deleteItem(item)"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
      </v-list-item>
    </template>
    <template #fallback>
      <div>
        Loading...
      </div>
    </template>
  </suspense>
</template>

<script>
import { API } from 'aws-amplify'
import { deleteTodo } from '@/graphql/mutations'

export default {
  name: 'amplify-tutorial-list',
  props: {
    posts: Array
  },
  setup () {
    const deleteItem = async (item) => {
      if (confirm(`アイテム「${item.name}」を削除します。よろしいですか？`)) {
        const todo = {
          id: item.id
        }
        await API.graphql({
          query: deleteTodo,
          variables: { input: todo }
        }).then(() => {
          alert(`アイテム「${item.name}」を削除しました。`)
        }).catch((error) => {
          console.log(error)
          alert(`アイテム「${item.name}」の削除に失敗しました。`)
        })
      }
    }
    return {
      deleteItem
    }
  }
}
</script>
