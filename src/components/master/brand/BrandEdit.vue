<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>ブランド登録</v-card-title>
    {{ params.editor }}
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
    <v-card-item>
        <v-card-subtitle>
          ブランドコード
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.brand_cd"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          ブランド名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.brand_name"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          （V-Manage）日付変更時間
        </v-card-subtitle>
        <v-select
          v-model="params.editor.exchange_time"
          :items="time_select"
        ></v-select>
      </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
  <OverlayLoading v-if="loading" />
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import OverlayLoading from '@/components/common/OverlayLoading.vue'

import utilsMixin from '@/mixins/utils/utils.js'
import brandApiFunc from '@/mixins/api/master/brand.js'
import { computed, ref } from '@vue/runtime-core'

export default {
  name: 'brand-edit',
  components: { PcFooter, OverlayLoading, AppAlert },
  mixins: [utilsMixin],
  props: {
    params: Object,
    changeMode: Function,
    initList: Function,
    messageSet: Function,
  },
  setup (props) {
    const loading = ref(false)
    // 時間選択
    const time_select = computed(() => {
      const items = []
      for (let i = 24; i < 36; i++) {
        items.push(i + '時')
      }
      return items
    })

    // データ保存処理
    async function save () {
      loading.value = true
      try {
        if(props.params.is_new) {
          await brandApiFunc.apiBrandCreate(props.params.editor)
          props.messageSet('ブランドを登録しました', 'success')
        } else {
          await brandApiFunc.apiUpdateBrand(props.params.editor)
          props.messageSet('ブランドを更新しました', 'success')
        }
        props.initList()
      } catch (error) {
        console.error(error);
        props.messageSet('更新に失敗しました', 'error')
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
      time_select,
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
