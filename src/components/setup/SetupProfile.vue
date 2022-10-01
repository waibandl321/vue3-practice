<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card>
      <v-card-title>プロフィール登録</v-card-title>
      <v-card-item>
        <v-card-subtitle>
          名前
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              label="性"
              hide-details="auto"
              v-model="params.profile.last_name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="名"
              hide-details="auto"
              v-model="params.profile.first_name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          名前（フリガナ）
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              label="セイ"
              hide-details="auto"
              v-model="params.profile.last_name_kana"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="メイ"
              hide-details="auto"
              v-model="params.profile.first_name_kana"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          性別
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-radio-group
          hide-details="auto"
          v-model="params.profile.gender"
        >
          <v-radio
            label="男性"
            :value="0"
            color="primary"
          ></v-radio>
          <v-radio
            label="女性"
            :value="1"
            color="primary"
          ></v-radio>
          <v-radio
            label="その他"
            :value="9"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>社員番号</v-card-subtitle>
        <v-text-field
          label="例）001"
          hide-details="auto"
          v-model="params.profile.employee_number"
        ></v-text-field>
        <v-card-text>設定しない場合は自動割り当て</v-card-text>
      </v-card-item>
      <SetupFooter :options="footer_options" />
    </v-card>
  </v-container>
</template>

<script>
import SetupFooter from './SetupFooter.vue'

export default {
  name: 'setup-profile',
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
          btn_type: 'primary',
          text: '次へ',
          path: 'company'
        }
      ]
    }
  }
}
</script>
<style scoped>
.red {
  color: red;
}
</style>
