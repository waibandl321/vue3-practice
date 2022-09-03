<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>従業員情報 編集</v-card-title>
    {{ params.editor }}
    <v-card-item>
        <v-card-subtitle>社員番号</v-card-subtitle>
        <v-text-field
          v-model.trim="params.editor.employee_number"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          氏名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              label="性"
              hide-details="auto"
              v-model="params.editor.last_name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="名"
              hide-details="auto"
              v-model="params.editor.first_name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          氏名（フリガナ）
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              label="セイ"
              hide-details="auto"
              v-model="params.editor.last_name_kana"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="メイ"
              hide-details="auto"
              v-model="params.editor.first_name_kana"
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
          v-model="params.editor.gender"
        >
          <v-radio
            v-for="(gender, idx) in getGenderList()"
            :key="idx"
            :label="gender.text"
            :value="gender.value"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          従業員種別
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-radio-group
          hide-details="auto"
          v-model="params.editor.permanent"
        >
          <v-radio
            v-for="(permanent, idx) in getPermanentList()"
            :key="idx"
            :label="permanent.text"
            :value="permanent.value"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-card-item>
      <v-card-item class="mb-10">
        <v-card-subtitle>
          役職名
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.official_position"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import utilsMixin from '@/mixins/utils/utils.js'
import PcFooter from '@/components/common/PcFooter.vue'
import employeeApiFunc from '@/mixins/api/master/employee.js'

export default {
  name: 'employee-edit',
  components: { PcFooter },
  mixins: [utilsMixin],
  props: {
    changeMode: Function,
    params: Object
  },
  data () {
    return {
      footer_options: {
        back: [
          { text: '一覧へ戻る', callback: this.changeMode }
        ],
        next: [
          { text: '保存', callback: this.save }
        ]
      }
    }
  },
  methods: {
    async save () {
      // データ保存処理
      await employeeApiFunc.apiUpdateEmployee(this.params.editor)
      this.changeMode('list')
    }
  }
}
</script>
<style scoped>
  .red {
    color: red;
  }
</style>
