<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card>
      <v-card-title>ブランド登録</v-card-title>
      <v-card-item>
        <v-card-subtitle>
          ブランドコード
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.brand.brand_cd"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          ブランド名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.brand.brand_name"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <SetupFooter :options="footer_options" />
    </v-card>
  </v-container>
</template>
<script>
import SetupFooter from './SetupFooter.vue'
export default {
  name: 'setup-brand',
  components: {
    SetupFooter
  },
  props: {
    params: Object
  },
  data () {
    return {
      footer_options: [
        {
          btn_type: 'cancel',
          text: '戻る',
          path: 'company'
        },
        {
          btn_type: 'primary',
          text: '確認画面へ',
          path: 'confirm'
        }
      ]
    }
  }
}
</script>
