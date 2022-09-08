<template>
  <v-container>
    <div>
    店舗<br>
    {{ params.viewer }}
    </div>
    <div class="mt-4">
      スタッフグループ<br>
    {{ viewer }}
    </div>
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ詳細</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>{{ viewer.group_name }}</v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>作成者スタッフID</v-card-subtitle>
        <v-card-text>{{ viewer.staff_id }}</v-card-text>
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
              {{ staff.shop_staff_id }}
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
import shopApiFunc from '@/mixins/api/master/shop.js'
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
    const staff_group_staffs = ref([])
    const getStaffGroupStaff = async () => {
      staff_group_staffs.value = await shopApiFunc.apiGetStaffGroupStaff(props.viewer)
      storeFunc.storeSetStaffGroupStaffs(staff_group_staffs.value)
    }
    getStaffGroupStaff()

    const editStaffGroup = async () => {
      props.changeModeStaffGroup('staff-group-edit')
      props.setEditor(props.viewer)
    }
    const backFunc = () => {
      props.changeModeStaffGroup('staff-group-list')
    }
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
      backFunc
    }
  }
}
</script>