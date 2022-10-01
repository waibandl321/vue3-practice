<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>ポジション登録</v-card-title>
    {{ params.editor }}
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
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
  <OverlayLoading v-if="loading" />
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import OverlayLoading from '@/components/common/OverlayLoading.vue'

import apiFunc from '@/mixins/api/api.js'

import { ref } from '@vue/reactivity'

export default {
  name: 'position-edit',
  components: { PcFooter, AppAlert, OverlayLoading },
  props: {
    changeMode: Function,
    initList: Function,
    messageSet: Function,
    params: Object
  },
  setup (props) {
    const loading = ref(false)
    async function save () {
      loading.value = true
      try {
        if(props.params.is_new) {
          await apiFunc.apiCreatePosition(props.params.editor)
          props.messageSet('ポジションを登録しました', 'success')
        } else {
          await apiFunc.apiUpdatePosition(props.params.editor)
          props.messageSet('ポジションを更新しました', 'success')
        }
        props.changeMode('list')
      } catch (error) {
        props.messageSet('更新に失敗しました', 'error')
        console.error(error);
      }
      
      // eslint-disable-next-line vue/no-mutating-props
      props.params.is_new = false
      loading.value = false
      props.initList()
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
