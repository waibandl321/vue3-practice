<template>
  <v-container>
    <v-card>
      <v-card-title>初期設定 確認画面</v-card-title>
      <v-card-item>
        <v-card-subtitle>プロフィール情報</v-card-subtitle>
        <v-table>
          <tbody>
            <tr>
              <td>名前</td>
              <td>{{ params.profile.last_name }}{{ params.profile.first_name }}</td>
            </tr>
            <tr>
              <td>名前（フリガナ）</td>
              <td>{{ params.profile.last_name_kana }}{{ params.profile.first_name_kana }}</td>
            </tr>
            <tr>
              <td>性別</td>
              <td>{{ params.profile.gender }}</td>
            </tr>
            <tr>
              <td>社員番号</td>
              <td>{{ params.profile.employee_number }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>企業情報</v-card-subtitle>
        <v-table>
          <tbody>
            <tr>
              <td>事業タイプ</td>
              <td>{{ params.company.company_type === 0 ? '法人' : '個人事業主' }}</td>
            </tr>
            <tr>
              <td>企業名</td>
              <td>
                {{ company_name }}
              </td>
            </tr>
            <tr>
              <td>企業名（フリガナ）</td>
              <td>
                {{ company_name_kana }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>ブランド情報</v-card-subtitle>
        <v-table>
          <tbody>
            <tr>
              <td>ブランドコード</td>
              <td>{{ params.brand.brand_cd }}</td>
            </tr>
            <tr>
              <td>ブランド名 </td>
              <td>
                {{ params.brand.brand_name }}
              </td>
            </tr>
            <tr>
              <td>ブランド説明</td>
              <td>
                {{ params.brand.brand_memo }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <SetupFooter :options="footer_options" />
    </v-card>
  </v-container>
</template>
<script>
import SetupFooter from './SetupFooter.vue'
import utilsMixin from '@/mixins/utils/utils.js'

export default {
  name: 'setup-confirm',
  mixins: [utilsMixin],
  components: {
    SetupFooter
  },
  props: {
    params: Object,
    save: Function
  },
  data () {
    return {
      footer_options: [
        {
          btn_type: 'cancel',
          text: '戻る',
          path: 'brand'
        },
        {
          btn_type: 'primary',
          text: '登録する',
          callback: this.save
        }
      ]
    }
  },
  computed: {
    company_name: function () {
      // eslint-disable-next-line camelcase
      const company_form_text = this.getCompanyFormText(this.params.company.company_form.value)
      // eslint-disable-next-line camelcase
      if (this.params.company.form_name_position === 1) {
        // eslint-disable-next-line camelcase
        return this.params.company.company_name + ' ' + company_form_text
      } else {
        // eslint-disable-next-line camelcase
        return company_form_text + ' ' + this.params.company.company_name
      }
    },
    company_name_kana: function () {
      // eslint-disable-next-line camelcase
      const company_form_text = this.getCompanyFormKanaText(this.params.company.company_form.value)
      // eslint-disable-next-line camelcase
      if (this.params.company.form_name_position === 1) {
        // eslint-disable-next-line camelcase
        return this.params.company.company_name_kana + ' ' + company_form_text
      } else {
        // eslint-disable-next-line camelcase
        return company_form_text + ' ' + this.params.company.company_name_kana
      }
    }
  }
}
</script>
