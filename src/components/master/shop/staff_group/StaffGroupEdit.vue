<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container class="im-container">
    <div class="mt-4">
      スタッフグループ<br>
      {{ groupInfo.editor }}
    </div>
    <v-card-title>{{ inj_params.viewer.shop_name }} スタッフグループ名</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model="groupInfo.editor.group_name"
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
            @click="staff_select_modal = !staff_select_modal"
          >追加</v-btn>
        </v-card-text>
        <v-row v-show="staff_group_staffs.length !== 0">
          <v-col
            v-for="staff in staff_group_staffs"
            :key="staff.id"
            cols="6"
          >
            <v-card flat border class="pa-4">
              {{ createdStaffName(staff.shop_staff_id) }}
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
    <footer class="fixed-footer">
      <div class="back">
        <v-btn
          @click="backFunc('staff-group-list')"
        >スタッフグループ一覧へ
        </v-btn>
      </div>
      <div class="next">
        <v-btn
          @click="backFunc('staff-group-detail')"
          class="mr-4"
          variant="outlined"
        >キャンセル
        </v-btn>
        <v-btn
          color="primary"
          @click="updateStaffGroup()"
        >保存</v-btn>
      </div>
    </footer>

    <!-- スタッフ追加モーダル -->
    <v-dialog v-model="staff_select_modal">
      <v-card width="500">
        <v-card-title>スタッフ選択</v-card-title>
        <v-table v-if="selectable_staffs.length > 0">
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
                  v-model="add_staff_array"
                  :id="staff.id"
                  :value="staff.staff_id"
                  color="primary"
                  hide-details="auto"
                ></v-checkbox>
              </td>
              <td>{{ createdStaffName(staff.staff_id) }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-card-text v-else>
          追加できるスタッフがいません。<br>
          既に登録済みか、店舗スタッフとして登録されていない可能性があります。<br>
          登録がお済みでない場合は、店舗一覧画面からスタッフを招待してください。
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            variant="outlined"
            @click="staff_select_modal = false"
          >閉じる</v-btn>
          <v-btn
            v-if="selectable_staffs.length > 0"
            color="primary"
            variant="outlined"
            @click="staffAdd()"
          >追加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <OverlayLoading v-if="loading" />
  </v-container>
</template>

<script>
import OverlayLoading from '@/components/common/OverlayLoading.vue'

import apiFunc from '@/mixins/api/api.js'

import { ref } from '@vue/reactivity'
import { inject } from '@vue/runtime-core'

export default {
  name: 'staff-group-detail',
  components: {
    OverlayLoading
  },
  props: {
    groupInfo: Object,
    changeModeStaffGroup: Function,
    refreshMember: Function,
  },
  setup (props) {
    // provide / inject
    const injFuncMessageSet = inject('message-set')
    const inj_params = inject('shop-params')

    const loading = ref(false)
    // スタッフグループ所属メンバー取得
    const staff_group_staffs = ref([])
    // eslint-disable-next-line vue/no-setup-props-destructure
    staff_group_staffs.value = props.groupInfo.editor.members.items
    
    // 選択可能メンバーフィルタ
    const selectable_staffs = ref([])
    selectable_staffs.value = getSelectableStaffs()
    function getSelectableStaffs () {
      let results = []
      if(staff_group_staffs.value.length > 0) {
        results = inj_params.viewer.staffs.items
        results = results.filter((v) => {
          return !staff_group_staffs.value.find(r => r.shop_staff_id === v.staff_id)
        })
        return results
      }
      return inj_params.viewer.staffs.items
    }
    // 名前表示
    const createdStaffName = (staff_id) => {
      const staff = props.groupInfo.company_employees.find((r) => {
        return r.staff_id === staff_id
      })
      return staff ? staff.last_name + staff.first_name : ""
    }
    
    // スタッフグループメンバー
    const staff_select_modal = ref(false)
    const add_staff_array = ref([])
    const delete_staffs = ref([])
    // 追加
    const staffAdd = async () => {
      staff_select_modal.value = false
      for (const staff_id of add_staff_array.value) {
        staff_group_staffs.value.push({
          shop_staff_id: staff_id
        })
        selectable_staffs.value = getSelectableStaffs()
      }
    }
    // 削除
    const deleteStaffGroupStaff = async (staff) => {
      delete_staffs.value.push(staff)
      staff_group_staffs.value = staff_group_staffs.value.filter(v => v.id !== staff.id)
      selectable_staffs.value = getSelectableStaffs()
    }
    // 更新
    const updateStaffGroup = async () => {
      loading.value = true
      try {
        await apiFunc.apiUpdateStaffGroup(inj_params.viewer, props.groupInfo.editor)
        await _deleteStaffs()
        await _addStaffs()
        injFuncMessageSet('スタッフグループを更新しました。', 'success')
      } catch (error) {
        console.log(error);
      }
      loading.value = false
      add_staff_array.value = []
      delete_staffs.value = []
      props.refreshMember()
      props.changeModeStaffGroup('staff-group-list')

      async function _deleteStaffs () {
        if(delete_staffs.value.length > 0) {
          for (const delete_staff of delete_staffs.value) {
            await apiFunc.apiDeleteStaffGroupStaff(delete_staff)
          }
        }
      }
      async function _addStaffs () {
        if(add_staff_array.value.length > 0) {
          for (const staff_id of add_staff_array.value) {
            const result = await apiFunc.apiAddStaffGroupStaff(props.groupInfo.editor, staff_id)
            staff_group_staffs.value.push(result)
            selectable_staffs.value = getSelectableStaffs()
          }
        }
      }
    }
    // スタッフグループ一覧に戻る
    const backFunc = (mode) => {
      props.changeModeStaffGroup(mode)
    }
    
    return {
      inj_params,
      loading,
      staff_group_staffs,
      selectable_staffs,
      createdStaffName,
      staff_select_modal,
      add_staff_array,
      backFunc,
      updateStaffGroup,
      staffAdd,
      deleteStaffGroupStaff,
    }
  }
}
</script>