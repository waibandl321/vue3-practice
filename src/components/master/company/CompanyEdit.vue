<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>企業登録</v-card-title>
    {{ params.editor }}
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
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
  <OverlayLoading v-if="loading" />
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import OverlayLoading from '@/components/common/OverlayLoading.vue'

import utilsMixin from '@/mixins/utils/utils.js'
import companyApiFunc from '@/mixins/api/master/company.js'
import { ref } from '@vue/reactivity'

export default {
  name: 'company-edit',
  components: { PcFooter, OverlayLoading, AppAlert },
  mixins: [utilsMixin],
  props: {
    changeMode: Function,
    messageSet: Function,
    initList: Function,
    params: Object
  },
  setup(props) {
    const loading = ref(false)
    // 保存
    const save = async () => {
      loading.value = true
      try {
        await companyApiFunc.apiUpdateCompany(props.params.editor)
        props.messageSet('企業情報を更新しました', 'success')
        props.changeMode('list')
      } catch (error) {
        props.messageSet('更新に失敗しました', 'error')
        console.error(error);
      }
      loading.value = false
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
      loading,
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
