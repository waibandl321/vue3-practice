<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>ポジション登録</v-card-title>
    {{ params.editor }}
    <v-card-item>
        <v-card-subtitle>
          ポジション名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.position_cd"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import positionApiFunc from '@/mixins/api/master/position.js'

export default {
  name: 'position-edit',
  components: { PcFooter },
  props: {
    changeMode: Function,
    params: Object
  },
  setup (props) {
    async function save () {
      // データ保存処理
      try {
        if(props.params.is_new) {
          await positionApiFunc.apiCreatePosition(props.params.editor)
          alert('ポジションを登録しました')
        } else {
          await positionApiFunc.apiUpdatePosition(props.params.editor)
          alert('ポジションを更新しました')
        }
      } catch (error) {
        console.error(error);
      }
      
      // eslint-disable-next-line vue/no-mutating-props
      props.params.is_new = false
      props.changeMode('list')
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
