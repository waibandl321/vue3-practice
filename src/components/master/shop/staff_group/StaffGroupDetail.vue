<template>
  <v-container class="im-container">
    <div class="mt-4">
      スタッフグループ詳細<br>
    {{ viewer }}
    </div>
    <div class="mt-4">
      店舗従業員<br>
    {{ params.viewer.staffs }}
    </div>
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ詳細</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>{{ viewer.group_name }}</v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>作成者スタッフ</v-card-subtitle>
        <v-card-text>{{ viewStaff(viewer.staff_id) }}</v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>参加スタッフ</v-card-subtitle>
        <v-row>
          <v-col
              v-for="staff in staff_group_staffs"
              :key="staff.id"
              cols="6"
          >
            <v-card
              class="pa-4"
              border
              flat
            >
              {{ viewStaff(staff.shop_staff_id) }}
            </v-card>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
// import shopApiFunc from '@/mixins/api/master/shop.js'
import storeFunc from '@/mixins/store/auth'
import { ref } from '@vue/reactivity'
export default {
  name: 'staff-group-detail',
  components: {
    PcFooter
  },
  props: {
    viewer: Object,
    params: Object,
    changeModeStaffGroup: Function,
    setEditor: Function
  },
  setup (props) {
    // スタッフグループ所属メンバー取得（MEMO: 編集で使うのでvuexに保存する）
    const staff_group_staffs = ref([])
    const getStaffGroupStaff = () => {
      staff_group_staffs.value = props.viewer.members.items
      storeFunc.storeSetStaffGroupStaffs(staff_group_staffs.value)
    }
    getStaffGroupStaff()

    // 名前表示
    const viewStaff = (staff_id) => {
      const staff = props.params.viewer.staffs.items.find((r) => {
        return r.staff_id === staff_id
      })
      return staff.employee.items[0].last_name + staff.employee.items[0].first_name
    }
    
    // 編集モード切り替え
    const editStaffGroup = async () => {
      props.changeModeStaffGroup('staff-group-edit')
      props.setEditor(props.viewer)
    }
    
    // スタッフグループ一覧へ
    const backFunc = () => {
      props.changeModeStaffGroup('staff-group-list')
    }
    
    // フッターオプション
    const footer_options = {
      back: [
        { text: 'スタッフグループ一覧へ', callback: backFunc }
      ],
      next: [
        { text: 'スタッフグループ編集', callback: editStaffGroup }
      ]
    }

    return {
      footer_options,
      staff_group_staffs,
      editStaffGroup,
      backFunc,
      viewStaff
    }
  }
}
</script>