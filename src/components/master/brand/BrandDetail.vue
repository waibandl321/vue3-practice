<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>ブランドコード</v-card-subtitle>
      <v-card-text>{{ params.viewer.brand_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>ブランド名</v-card-subtitle>
      <v-card-text>{{ params.viewer.brand_name }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>（V-Manage）日付変更時間</v-card-subtitle>
      <v-card-text>{{ params.viewer.exchange_time }}</v-card-text>
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
    changeMode: Function,
    setEditor: Function,
  },
  setup (props) {
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
    }

    return {
      footer_options
    }
  },
}
</script>
