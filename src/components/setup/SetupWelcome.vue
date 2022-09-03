<template>
  <v-container>
    <v-card>
      <v-card-title>ポータルにようこそ</v-card-title>
      <v-card-text>初期設定から始めましょう。</v-card-text>
      <SetupFooter :options="footer_options" />
    </v-card>
  </v-container>
</template>
<script>
import SetupFooter from './SetupFooter.vue'
export default {
  name: 'setup-company',
  components: { SetupFooter },
  data () {
    return {
      footer_options: [
        {
          btn_type: 'primary',
          text: '次へ',
          path: 'profile'
        }
      ]
    }
  }
}
</script>
