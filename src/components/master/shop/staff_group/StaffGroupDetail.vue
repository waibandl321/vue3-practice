<template>
  <v-container class="im-container">
    <div class="mt-4">
      スタッフグループ詳細<br>
    {{ viewer }}
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
              v-for="staff in viewer.members.items"
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
    // 名前表示
    const viewStaff = (staff_id) => {
      const staff = props.params.viewer.staffs.items.find((r) => {
        return r.staff_id === staff_id
      })
      return staff.employee.items[0].last_name + staff.employee.items[0].first_name
    }
    
    // 編集モード切り替え
    const editStaffGroup = async () => {
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
      editStaffGroup,
      backFunc,
      viewStaff
    }
  }
}
</script>