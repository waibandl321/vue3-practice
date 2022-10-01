<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>ポジション名</v-card-subtitle>
      <v-card-text>{{ params.viewer.position_cd }}</v-card-text>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'

export default {
  name: 'position-detail',
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
      const is_new = false
      props.setEditor(props.params.viewer, is_new)
    }

    return {
      footer_options
    }
  },
}
</script>
