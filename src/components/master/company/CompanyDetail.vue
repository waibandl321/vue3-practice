<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>企業コード</v-card-subtitle>
      <v-card-text>{{ params.viewer.company_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>企業名</v-card-subtitle>
      <v-card-text
        class="d-flex"
        :class="{ 'flex-row-reverse': params.viewer.form_name_position === 1 }"
      >
        <div>{{ company_form_text }}</div>
        <div class="ml-2">{{ params.viewer.company_name }}</div>
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>企業名（フリガナ）</v-card-subtitle>
      <v-card-text
        class="d-flex"
        :class="{ 'flex-row-reverse': params.viewer.form_name_position === 1 }"
      >
        <div>{{ company_form_kana_text }}</div>
        <div class="ml-2">{{ params.viewer.company_name_kana }}</div>
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>企業ホームページ</v-card-subtitle>
      <v-card-text>
        <a
          :href="params.viewer.homepage_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ params.viewer.homepage_url }}
        </a>
      </v-card-text>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import utilFunc from '@/mixins/utils/utils.js'
import PcFooter from '@/components/common/PcFooter.vue'

import { computed } from '@vue/runtime-core'

export default {
  name: 'company-detail',
  components: { PcFooter },
  props: {
    params: Object,
    changeMode: Function,
    setEditor: Function
  },
  setup (props) {
    // 会社名テキスト取得
    const company_form_text = computed(() => {
      return utilFunc.methods.getCompanyFormText(props.params.viewer.company_form)
    })
    const company_form_kana_text = computed(() => {
      return utilFunc.methods.getCompanyFormKanaText(props.params.viewer.company_form)
    })
    // フッターオプション
    const footer_options = {
      back: [
        { text: '一覧へ戻る', callback: props.changeMode }
      ],
      next: [
        { text: '修正', callback: changeModeEdit }
      ]
    }
    // 編集遷移
    function changeModeEdit() {
      props.setEditor(props.params.viewer)
      props.changeMode('edit')
    }

    return {
      company_form_text,
      company_form_kana_text,
      footer_options,
      changeModeEdit
    }
  },
}
</script>
