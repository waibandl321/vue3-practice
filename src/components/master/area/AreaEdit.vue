<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>エリア登録</v-card-title>
    {{ params.editor }}
    <v-card-item>
        <v-card-subtitle>
          エリアコード
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.area_cd"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
    <v-card-item>
        <v-card-subtitle>
          エリア名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.area_name"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import areaApiFunc from '@/mixins/api/master/area.js'

export default {
  name: 'area-edit',
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
        await areaApiFunc.apiCreateArea(this.params.editor)
      } else {
        await areaApiFunc.apiUpdateArea(this.params.editor)
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
