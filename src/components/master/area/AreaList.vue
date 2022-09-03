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
              <th class="text-left">コード</th>
              <th class="text-left">エリア名</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.area_id"
            >
              <td>{{ item.area_code }}</td>
              <td>{{ item.area_name }}</td>
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
  name: 'area-list',
  components: { MasterLeftMenu },
  setup () {
    const items = [
      {
        area_id: '001',
        area_code: 'code001',
        area_name: 'エリア001'
      }
    ]
    return {
      items
    }
  }
}
</script>
