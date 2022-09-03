<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>ブランドコード</v-card-subtitle>
      <v-card-text>{{ detail.brand_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>ブランド名</v-card-subtitle>
      <v-card-text>{{ detail.brand_name }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>（V-Manage）日付変更時間</v-card-subtitle>
      <v-card-text>{{ detail.exchange_time }}</v-card-text>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>
<script>
import PcFooter from '@/components/common/PcFooter.vue'

export default {
  name: 'brand-detail',
  components: { PcFooter },
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
