<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>企業コード</v-card-subtitle>
      <v-card-text>{{ detail.company_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>企業名</v-card-subtitle>
      <v-card-text
        class="d-flex"
        :class="{ 'flex-row-reverse': detail.form_name_position === 1 }"
      >
        <div>{{ detail.company_form_text }}</div>
        <div class="ml-2">{{ detail.company_name }}</div>
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>企業名（フリガナ）</v-card-subtitle>
      <v-card-text
        class="d-flex"
        :class="{ 'flex-row-reverse': detail.form_name_position === 1 }"
      >
        <div>{{ detail.company_form_kana_text }}</div>
        <div class="ml-2">{{ detail.company_name_kana }}</div>
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>企業ホームページ</v-card-subtitle>
      <v-card-text>
        <a
          :href="detail.homepage_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ detail.homepage_url }}
        </a>
      </v-card-text>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>
<script>
import utilsMixin from '@/mixins/utils/utils.js'
import PcFooter from '@/components/common/PcFooter.vue'

export default {
  name: 'company-detail',
  components: { PcFooter },
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const detail = props.params.viewer
    detail.company_form_text = utilsMixin.methods.getCompanyFormText(detail.company_form)
    detail.company_form_kana_text = utilsMixin.methods.getCompanyFormKanaText(detail.company_form)

    return {
      detail
    }
  },
  data () {
    return {
      footer_options: {
        back: [
          { text: '一覧へ戻る', callback: this.changeMode }
        ],
        next: [
          { text: '修正', callback: this.changeModeEdit }
        ]
      }
    }
  },
  methods: {
    changeModeEdit () {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.editor = this.params.viewer
      this.changeMode('edit')
    }
  }
}
</script>
