<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>エリア登録</v-card-title>
    {{ params.editor }}
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
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
  <OverlayLoading v-if="loading" />
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import OverlayLoading from '@/components/common/OverlayLoading.vue'

import apiFunc from '@/mixins/api/api.js'

import { ref } from '@vue/reactivity'

export default {
  name: 'area-edit',
  components: { PcFooter, OverlayLoading, AppAlert },
  props: {
    changeMode: Function,
    initList: Function,
    messageSet: Function,
    params: Object
  },
  setup (props) {
    const loading = ref(false)
    // データ保存
    async function save () {
      loading.value = true
      try {
        if(props.params.is_new) {
          await apiFunc.apiCreateArea(props.params.editor)
          props.messageSet('エリアを登録しました', 'success')
        } else {
          await apiFunc.apiUpdateArea(props.params.editor)
          props.messageSet('エリアを更新しました', 'success')
        }
        props.initList()
      } catch (error) {
        props.messageSet('更新に失敗しました', 'error')
        console.error(error);
      }
      // eslint-disable-next-line vue/no-mutating-props
      props.params.is_new = false
      loading.value = false
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
      loading,
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
