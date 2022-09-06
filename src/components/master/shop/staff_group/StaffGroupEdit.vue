<template>
  <v-container>
    {{ params.viewer }}
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ名</v-card-title>
    <v-card class="mt-4">
      <v-card-item>
        <v-card-subtitle>スタッフグループ名</v-card-subtitle>
        <v-card-text>
          <v-text-field label="スタッフグループ名"></v-text-field>
        </v-card-text>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>スタッフ</v-card-subtitle>
        <v-card-text>
          <v-btn append-icon="mdi-plus">追加</v-btn>
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
          { text: '保存', callback: this.saveStaffGroup }
        ]
      }
    }
  },
  methods: {
    saveStaffGroup () {
      alert('スタッフグループ保存処理')
      this.changeMode('staff-group-list')
    },
    backFunc() {
      this.changeMode('staff-group-list')
    }
  }
}
</script>