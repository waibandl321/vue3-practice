<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container class="im-container">
    <div>
      店舗<br>
      {{ params.viewer }}
    </div>
    <div class="mt-4">
      スタッフグループ<br>
      {{ editor }}
    </div>
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ名</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="editor.group_name"
            label="スタッフグループ名"
          ></v-text-field>
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>スタッフ</v-card-subtitle>
        <v-card-text>
          <v-btn
            append-icon="mdi-plus"
            color="primary"
            @click="clickStaffAdd()"
          >追加</v-btn>
        </v-card-text>
        <v-row>
          <v-col>
            <v-card flat border class="pa-4">スタッフ名</v-card>
          </v-col>
          <v-col>
            <v-card flat border class="pa-4">スタッフ名</v-card>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <!-- スタッフ追加 -->
    <v-dialog v-model="staff_select_modal">
      <v-card width="500">
        <v-card-title>スタッフ選択</v-card-title>
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
        <v-table>
          <thead>
            <tr>
              <th>氏名</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="staff in shop_staffs"
              :key="staff.id"
            >
              <td>{{ staff.id }}</td>
              <td>
                <v-checkbox
                  v-model="add_staff_value"
                  :id="staff.id"
                  :value="staff.id"
                  color="primary"
                ></v-checkbox>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            @click="closeStaffSelect()"
          >キャンセル</v-btn>
          <v-btn
            color="primary"
            variant="outlined"
            @click="saveAddStaff()"
          >追加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import { ref } from '@vue/reactivity'
import shopFunc from '../shop'

export default {
  name: 'staff-group-detail',
  components: {
    PcFooter
  },
  props: {
    editor: Object,
    params: Object,
    changeModeStaffGroup: Function
  },
  setup (props) {
    const loading = ref(false)
    
    const saveStaffGroup = () => {
      alert('スタッフグループ保存処理')
      props.changeModeStaffGroup('staff-group-list')
    }
    const backFunc = () => {
      props.changeModeStaffGroup('staff-group-list')
    }
    // 店舗スタッフ追加
    const shop_staffs = ref([])
    const staff_select_modal = ref(false)
    const add_staff_value = ref([])
    const getStaff = async () => {
      loading.value = true
      shop_staffs.value = await shopFunc.getShopStaff(props.params.viewer)
      loading.value = false
    }
    const closeStaffSelect = () => {
      staff_select_modal.value = false
      shop_staffs.value = []
    }
    const saveAddStaff = () => {
      console.log(add_staff_value.value);
    }
    const clickStaffAdd = async () => {
      staff_select_modal.value = true
      getStaff()
    }
    // フッターオプション
    const footer_options = {
      back: [
        { text: 'スタッフグループ一覧へ', callback: backFunc }
      ],
      next: [
        { text: '保存', callback: saveStaffGroup }
      ]
    }
    return {
      loading,
      shop_staffs,
      footer_options,
      staff_select_modal,
      add_staff_value,
      backFunc,
      saveStaffGroup,
      closeStaffSelect,
      saveAddStaff,
      clickStaffAdd
    }
  }
}
</script>