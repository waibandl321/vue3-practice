<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container class="im-container">
    <div>
      {{ params.editor }}
    </div>
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
    <v-card-title>店舗登録</v-card-title>
    <v-card-item>
        <v-card-subtitle>
          店舗コード
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.shop_cd"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
    <v-card-item>
        <v-card-subtitle>
          店舗名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.shop_name"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          店舗名（カナ）
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="params.editor.shop_name_kana"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          ブランド
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-select
          v-model="params.editor.brand_cd"
          :items="params.brands"
          item-title="brand_name"
          item-value="brand_cd"
          single-line
          label="ブランド"
          hide-details="auto"
        ></v-select>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          エリア
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-select
          v-model="params.editor.area_cd"
          :items="params.areas"
          item-title="area_name"
          item-value="area_cd"
          single-line
          label="エリア"
          hide-details="auto"
        ></v-select>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>住所</v-card-subtitle>
        <v-text-field
          v-model="params.editor.address"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>電話番号</v-card-subtitle>
        <v-text-field
          v-model="params.editor.phone"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import PcFooter from '@/components/common/PcFooter.vue'
import AppAlert from '@/components/common/AppAlert.vue'

import apiFunc from '@/mixins/api/api.js'

export default {
  name: 'shop-edit',
  components: { PcFooter, AppAlert },
  props: {
    changeMode: {
      type: Function
    },
    messageSet: {
      type: Function
    },
    params: {
      type: Object
    }
  },
  setup (props) {
    // 店舗情報保存
    const save = async () => {
      try {
        if(props.params.is_new) {
          await apiFunc.apiCreateShop(props.params.editor)
          props.messageSet('店舗を登録しました', 'success')
        } else {
          await apiFunc.apiUpdateShop(props.params.editor)
          props.messageSet('店舗情報を更新しました', 'success')
        }
      } catch (error) {
        props.messageSet('更新に失敗しました。', 'error')
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
  }
}
</script>
<style scoped>
  .red {
    color: red;
  }
</style>
