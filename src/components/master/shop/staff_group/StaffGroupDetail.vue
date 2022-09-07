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
        <v-card-text>
          <v-card class="pa-4">スタッフ名</v-card>
        </v-card-text>
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
    const editStaffGroup = () => {
      props.setEditor(props.viewer)
      props.changeModeStaffGroup('staff-group-edit')
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
      editStaffGroup,
      backFunc
    }
  }
}
</script>