<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>社員番号</v-card-subtitle>
      <v-card-text>{{ detail.employee_number }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>氏名</v-card-subtitle>
      <v-card-text>
        {{ detail.last_name }}
        {{ detail.first_name }}
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>氏名（フリガナ）</v-card-subtitle>
      <v-card-text>
        {{ detail.last_name_kana }}
        {{ detail.first_name_kana }}
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>性別</v-card-subtitle>
      <v-card-text>{{ getGenderText(detail.gender) }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>従業員種別</v-card-subtitle>
      <v-card-text>{{ detail.permanent === 0 ? '社員' : '臨時' }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>役職名</v-card-subtitle>
      <v-card-text>{{ detail.official_position }}</v-card-text>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>
<script>
import PcFooter from '@/components/common/PcFooter.vue'
import utilsMixin from '@/mixins/utils/utils.js'
export default {
  name: 'brand-detail',
  components: { PcFooter },
  mixins: [utilsMixin],
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const detail = props.params.viewer

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
