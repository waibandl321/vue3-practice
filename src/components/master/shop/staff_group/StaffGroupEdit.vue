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
        <v-row v-show="staff_group_staffs.length !== 0">
          <v-col
            v-for="staff in staff_group_staffs"
            :key="staff.id"
            cols="6"
          >
            <v-card flat border class="pa-4">
              {{ staff.shop_staff_id }}
              <v-btn
                icon="mdi-delete"
                variant="text"
                size="small"
                color="error"
                @click="deleteStaffGroupStaff(staff)"
              ></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <!-- スタッフ追加モーダル -->
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
              <th>ID</th>
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
              <td>{{ staff.employee.last_name }}{{ staff.employee.first_name }}</td>
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
            @click="saveGroupStaffAdd()"
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
// import shopFunc from '../shop'
import shopApiFunc from '@/mixins/api/master/shop.js'
import storeFunc from '@/mixins/store/auth'

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
    // スタッフグループ所属メンバー取得（vuexから）
    const staff_group_staffs = ref([])
    staff_group_staffs.value = storeFunc.storeGetStaffGroupStaffs()
    
    // 店舗従業員取得
    const loading = ref(false)
    const shop_staffs = ref([])
    const getShopStaffs = async () => {
      const selected = []
      if(staff_group_staffs.value.length > 0) {
        for (const item of staff_group_staffs.value) {
          selected.push(item.shop_staff_id)
        }
      }
      
      loading.value = true
      // shop_staffs.value = await shopFunc.getShopStaff(props.params.viewer)
      shop_staffs.value = shop_staffs.value.filter(v => !selected.includes(v.id))
      loading.value = false
    }
    
    // スタッフグループメンバー追加
    const add_staff_value = ref([])
    const staff_select_modal = ref(false)
    const saveGroupStaffAdd = async () => {
      const staff_group = props.editor
      try {
        for (const staff of add_staff_value.value) {
          await shopApiFunc.apiCreateStaffGroupStaff(staff_group, staff)
          .then((res) => {
            staff_group_staffs.value.push(
              res.data.createShopStaffGroupStaff
            )
            storeFunc.storeSetStaffGroupStaffs(staff_group_staffs.value)
          })
        }
        alert('スタッフグループにメンバーを追加しました')
      } catch (error) {
        console.log(error)
        alert(error)
      }
      add_staff_value.value = []
      shop_staffs.value = []
      staff_select_modal.value = false
    }
    const closeStaffSelect = () => {
      staff_select_modal.value = false
      shop_staffs.value = []
    }
    const clickStaffAdd = async () => {
      staff_select_modal.value = true
      getShopStaffs()
    }
    // スタッフグループ所属メンバー削除
    const deleteStaffGroupStaff = async (staff) => {
      try {
        await shopApiFunc.apiDeleteStaffGroupStaff(staff)
        staff_group_staffs.value = staff_group_staffs.value.filter(
          v => v.id !== staff.id
        )
        storeFunc.storeSetStaffGroupStaffs(staff_group_staffs.value)
        alert('メンバーを削除しました')
      } catch (error) {
        alert(error)
        console.log(error);
      }
    }
    // スタッフグループ更新
    const updateStaffGroup = async () => {
      try {
        await shopApiFunc.apiUpdateShopStaffGroup(props.params.viewer, props.editor)
        // store初期化
        storeFunc.storeSetStaffGroupStaffs(null)
        alert('スタッフグループを更新しました。')
      } catch (error) {
        alert(error)
        console.log(error);
      }
      props.changeModeStaffGroup('staff-group-list')
    }
    // スタッフグループ一覧に戻る
    const backFunc = () => {
      // store初期化
      storeFunc.storeSetStaffGroupStaffs(null)
      props.changeModeStaffGroup('staff-group-list')
    }
    // フッターオプション
    const footer_options = {
      back: [
        { text: 'スタッフグループ一覧へ', callback: backFunc }
      ],
      next: [
        { text: '保存', callback: updateStaffGroup }
      ]
    }
    return {
      staff_group_staffs,
      loading,
      shop_staffs,
      footer_options,
      staff_select_modal,
      add_staff_value,
      backFunc,
      updateStaffGroup,
      closeStaffSelect,
      saveGroupStaffAdd,
      deleteStaffGroupStaff,
      clickStaffAdd
    }
  }
}
</script>