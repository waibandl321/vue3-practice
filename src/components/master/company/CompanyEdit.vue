<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>企業登録</v-card-title>
    {{ params.editor }}
    <v-card-item>
      <v-card-subtitle>
        企業名
        <span class="red">必須</span>
      </v-card-subtitle>
      <v-card-text>法人格の位置</v-card-text>
      <v-radio-group
        v-model="params.editor.form_name_position"
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
        :class="{ 'flex-row-reverse': params.editor.form_name_position === 1 }"
      >
        <v-select
          v-model="params.editor.company_form"
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
          v-model="params.editor.company_name"
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
        :class="{ 'flex-row-reverse': params.editor.form_name_position === 1 }"
      >
        <div>
          {{ getCompanyFormKanaText(params.editor.company_form) }}
        </div>
        <v-text-field
          v-model="params.editor.company_name_kana"
          label="企業名（フリガナ）"
          hide-details="auto"
          class="px-2"
        ></v-text-field>
      </div>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>
        企業サイト URL
      </v-card-subtitle>
      <v-text-field
        v-model="params.editor.homepage_url"
        label="企業サイト URL"
        hide-details="auto"
        class="px-2"
      ></v-text-field>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import utilsMixin from '@/mixins/utils/utils.js'
import PcFooter from '@/components/common/PcFooter.vue'
import companyApiFunc from '@/mixins/api/master/company.js'

export default {
  name: 'company-edit',
  components: { PcFooter },
  mixins: [utilsMixin],
  props: {
    changeMode: Function,
    params: Object
  },
  setup(props) {
    // 保存
    const save = async () => {
      try {
        await companyApiFunc.apiUpdateCompany(props.params.editor)
        alert('企業情報を更新しました')
        props.changeMode('list')
      } catch (error) {
        console.error(error);
      }
    }
    // フッターオプション
    const footer_options = {
      back: [
        { text: '一覧へ戻る', callback: props.changeMode }
      ],
      next: [
        { text: '保存', callback: save }
      ]
    }

    return {
      save,
      footer_options
    }
  },
}
</script>
<style scoped>
  .red {
    color: red;
  }
</style>
