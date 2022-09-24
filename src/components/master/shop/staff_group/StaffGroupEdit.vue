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
              {{ viewStaff(staff.shop_staff_id) }}
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
        <v-table>
          <thead>
            <tr>
              <th></th>
              <th>氏名</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="staff in selectable_staffs"
              :key="staff.id"
            >
              <td>
                <v-checkbox
                  v-model="add_staff_value"
                  :id="staff.id"
                  :value="staff.staff_id"
                  color="primary"
                  hide-details="auto"
                ></v-checkbox>
              </td>
              <td>{{ viewStaff(staff.staff_id) }}</td>
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
    
    // 選択可能なメンバー
    const selectable_staffs = ref([])
    selectable_staffs.value = getSelectableStaffs()
    function getSelectableStaffs () {
      if(staff_group_staffs.value.length > 0) {
        let results = []
        results = props.params.viewer.staffs.items.filter((v) => {
          console.log(staff_group_staffs.value.find(r => v.staff_id !== r.shop_staff_id));       
          return staff_group_staffs.value.find(r => {
            return v.staff_id !== r.shop_staff_id
          })
        })
        return results
      }
      return props.params.viewer.staffs.items
    }
    // 名前表示
    const viewStaff = (staff_id) => {
      const staff = props.params.viewer.staffs.items.find((r) => {
        return r.staff_id === staff_id
      })
      return staff.employee.items[0].last_name + staff.employee.items[0].first_name
    }
    
    // スタッフグループメンバー追加
    const staff_select_modal = ref(false)
    const add_staff_value = ref([])
    const saveGroupStaffAdd = async () => {
      staff_select_modal.value = false
      try {
        for (const staff_id of add_staff_value.value) {
          const result = await shopApiFunc.apiCreateStaffGroupStaff(props.editor, staff_id)
          staff_group_staffs.value.push(result)
          storeFunc.storeSetStaffGroupStaffs(staff_group_staffs.value)
        }
        alert('スタッフグループにメンバーを追加しました')
      } catch (error) {
        console.log(error)
      }
      add_staff_value.value = []      
    }
    const closeStaffSelect = () => {
      staff_select_modal.value = false      
    }
    const clickStaffAdd = async () => {
      staff_select_modal.value = true
    }
    // スタッフグループ所属メンバー削除
    const deleteStaffGroupStaff = async (staff) => {
      try {
        await shopApiFunc.apiDeleteStaffGroupStaff(staff)
        staff_group_staffs.value = staff_group_staffs.value.filter(v => v.id !== staff.id)
        storeFunc.storeSetStaffGroupStaffs(staff_group_staffs.value)
        alert('メンバーを削除しました')
      } catch (error) {
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
      selectable_staffs,
      viewStaff,
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