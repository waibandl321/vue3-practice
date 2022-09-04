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
      if(this.params.is_new) {
        await positionApiFunc.apiCreatePosition(this.params.editor)
      } else {
        await positionApiFunc.apiUpdatePosition(this.params.editor)
      }
      // eslint-disable-next-line vue/no-mutating-props
      this.params.is_new = false
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
