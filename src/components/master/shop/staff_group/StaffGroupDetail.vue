<template>
  <v-container class="im-container">
    <div class="mt-4">
      スタッフグループ詳細<br>
    {{ groupInfo }}
    </div>
    <v-card-title>{{ inj_params.viewer.shop_name }} スタッフグループ詳細</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>{{ groupInfo.viewer.group_name }}</v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>作成者スタッフ</v-card-subtitle>
        <v-card-text>
          {{ createdStaffName(groupInfo.viewer.staff_id) }}
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>参加スタッフ</v-card-subtitle>
        <v-row>
          <v-col
              v-for="staff in groupInfo.viewer.members.items"
              :key="staff.id"
              cols="6"
          >
            <v-card
              class="pa-4"
              border
              flat
            >
              {{ createdStaffName(staff.shop_staff_id) }}
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
import { inject } from '@vue/runtime-core'

export default {
  name: 'staff-group-detail',
  components: {
    PcFooter
  },
  props: {
    groupInfo: Object,
    changeModeStaffGroup: Function,
    setGroupEditor: Function
  },
  setup (props) {
    const inj_params = inject('shop-params')
    // 名前表示 
    const createdStaffName = (staff_id) => {
      const staff = props.groupInfo.company_employees.find((r) => {
        return r.staff_id === staff_id
      })
      return staff ? staff.last_name + staff.first_name : ""
    }
    
    // 編集モード切り替え
    const editStaffGroup = async () => {
      props.setGroupEditor(props.groupInfo.viewer)
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
      inj_params,
      footer_options,
      editStaffGroup,
      backFunc,
      createdStaffName,
    }
  }
}
</script>