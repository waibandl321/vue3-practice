<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      <div>
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">ポジション名</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.position_id"
            >
              <td>{{ item.position_name }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
export default {
  name: 'position-list',
  components: { MasterLeftMenu },
  setup () {
    const items = [
      {
        position_id: '001',
        position_name: 'キッチン'
      },
      {
        position_id: '002',
        position_name: 'ホール'
      }
    ]
    return {
      items
    }
  }
}
</script>
