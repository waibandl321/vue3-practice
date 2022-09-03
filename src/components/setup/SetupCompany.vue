<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card>
      <v-card-title>企業登録</v-card-title>
      <v-card-item>
        <v-card-subtitle>
          事業タイプ
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-radio-group
          v-model="params.company.company_type"
          hide-details="auto"
        >
          <v-radio
            v-for="(type, index) in getCompanyTypes()"
            :key="index"
            :label="type.text"
            :value="type.value"
            color="primary"
          ></v-radio>
      </v-radio-group>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          企業名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-card-text>法人格の位置</v-card-text>
        <v-radio-group
          v-model="params.company.form_name_position"
          hide-details="auto"
        >
            <v-radio
              v-for="(option, index) in getCompanyFormPositions()"
              :key="index"
              :label="option.text"
              :value="option.value"
              color="primary"
            ></v-radio>
        </v-radio-group>
        <div
          class="d-flex"
          :class="{ 'flex-row-reverse': params.company.form_name_position === 1 }"
        >
          <v-select
            v-model="params.company.company_form"
            :items="getCompanyForms()"
            item-title="name"
            item-value="value"
            return-object
            single-line
            label="法人格"
            hide-details="auto"
            class="px-2"
          ></v-select>
          <v-text-field
            v-model="params.company.company_name"
            label="企業名"
            hide-details="auto"
            class="px-2"
          ></v-text-field>
        </div>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          企業名（フリガナ）
          <span class="red">必須</span>
        </v-card-subtitle>
        <div
          class="d-flex"
          :class="{ 'flex-row-reverse': params.company.form_name_position === 1 }"
        >
          <div>
            {{ params.company.company_form.name_kana }}
          </div>
          <v-text-field
            v-model="params.company.company_name_kana"
            label="企業名（フリガナ）"
            hide-details="auto"
            class="px-2"
          ></v-text-field>
        </div>
      </v-card-item>
      <SetupFooter :options="footer_options" />
    </v-card>
  </v-container>
</template>
<script>
import SetupFooter from './SetupFooter.vue'
import utilsMixin from '@/mixins/utils/utils.js'
export default {
  name: 'setup-company',
  mixins: [utilsMixin],
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
          path: 'profile'
        },
        {
          btn_type: 'primary',
          text: '次へ',
          path: 'brand'
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
