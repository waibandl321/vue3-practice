<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container style="padding-bottom: 100px;">
    <v-card-title>店舗登録</v-card-title>
    {{ params.editor }}
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
import shopApiFunc from '@/mixins/api/master/shop.js'

export default {
  name: 'shop-edit',
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
        await shopApiFunc.apiCreateShop(this.params.editor)
      } else {
        await shopApiFunc.apiUpdateShop(this.params.editor)
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
