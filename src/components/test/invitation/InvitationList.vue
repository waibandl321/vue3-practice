<template>
  <v-container>
    <v-card
      v-for="(inv, idx) in items"
      :key="idx"
      class="pa-4"
    >
      <v-table>
        <tr>
          <td>招待企業CD</td>
          <td>{{ inv.company_cd }}</td>
        </tr>
        <tr>
          <td>招待した社員employee_id</td>
          <td>{{ inv.employee_id }}</td>
        </tr>
        <tr>
          <td>招待された人のメールアドレス</td>
          <td>{{ inv.send_to }}</td>
        </tr>
        <tr>
          <td>招待用URL</td>
          <td>{{ inv.url }}</td>
        </tr>
      </v-table>
    </v-card>
  </v-container>
</template>
<script>
import { API } from 'aws-amplify'
import { listInvitations } from '@/graphql/queries'
import { ref } from 'vue'
export default {
  name: "invitation-check",
  setup () {
    const items = ref([])
    const getInvitations = async () => {
      items.value = await API.graphql({
        query: listInvitations
      })
      items.value = items.value.data.listInvitations.items
    }
    getInvitations()

    return {
      items
    }
  }
}
</script>
