<template>
  <v-container>
    {{ params.viewer }}
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ名</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>スタッフグループ名</v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>スタッフ</v-card-subtitle>
        <v-card-text>
          <v-card class="pa-4">スタッフ名</v-card>
        </v-card-text>
      </v-card-item>
    </v-card>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
// import { ref } from '@vue/reactivity'
// import invitationApiFunc from '@/mixins/api/invitation.js'
import PcFooter from '@/components/common/PcFooter.vue'
export default {
  name: 'staff-group-detail',
  components: {
    PcFooter
  },
  props: {
    params: Object,
    changeMode: Function
  },
  data () {
    return {
      footer_options: {
        back: [
          { text: 'スタッフグループ一覧へ', callback: this.backFunc }
        ],
        next: [
          { text: 'スタッフグループ編集', callback: this.editStaffGroup }
        ]
      }
    }
  },
  methods: {
    editStaffGroup () {
      this.changeMode('staff-group-edit')
    },
    backFunc() {
      this.changeMode('staff-group-list')
    }
  }
}
</script>