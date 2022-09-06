<template>
  <v-container>
    {{ params.viewer }}
    <v-card-title>{{ params.viewer.shop_name }} スタッフグループ</v-card-title>
    <v-card class="mt-4 pa-4" link @click="viewStaffGroup()">
      スタッフグループ名
    </v-card>
    <v-card class="mt-4 pa-4" link @click="viewStaffGroup()">
      スタッフグループ名
    </v-card>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
export default {
  name: 'staff-group-list',
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
          { text: '店舗一覧へ戻る', callback: this.changeMode }
        ]
      }
    }
  },
  methods: {
    viewStaffGroup () {
      this.changeMode('staff-group-detail')
    },
    backFunc() {
      this.changeMode('list')
    }
  }
}
</script>