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
  setup (props) {
    // データ保存
    async function save () {
      try {
        if(props.params.is_new) {
          await areaApiFunc.apiCreateArea(props.params.editor)
          alert('エリアを登録しました')
        } else {
          await areaApiFunc.apiUpdateArea(props.params.editor)
          alert('エリアを更新しました')
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
