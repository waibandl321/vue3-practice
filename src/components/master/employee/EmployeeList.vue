<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      {{ items }}
      <div>
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">従業員番号</th>
              <th class="text-left">氏名</th>
              <th class="text-left">従業員種別</th>
              <th class="text-left">ステータス</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.company_employee_id"
              @click="recordClick(item)"
            >
              <td>{{ item.employee_number }}</td>
              <td>{{ item.last_name }} {{ item.first_name }}</td>
              <td>{{ item.permanent === 0 ? '社員' : '臨時' }}</td>
              <td>{{ item.status === 0 ? '登録済み' : '未登録' }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="fixed-btn">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="x-large"
          @click="clickNew()"
        ></v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import employeeApiFunc from '@/mixins/api/master/employee.js'
import { ref } from 'vue'
export default {
  name: 'employee-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    changeMode: Function
  },
  setup () {
    const items = ref([])
    const getCompnay = async () => {
      items.value = await employeeApiFunc.apiGetEmployee()
    }
    getCompnay()

    return {
      items
    }
  },
  methods: {
    recordClick (item) {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.viewer = item
      this.changeMode('view')
    },
    clickNew () {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.editor = {
        employee_number: "",
        last_name: "",
        first_name: "",
        last_name_kana: "",
        first_name_kana: "",
        gender: null,
        permanent: 0,
        official_position: ""
      }
      this.changeMode('new')
    }
  }
}
</script>
<style scoped>
  .fixed-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
  }
  </style>