<template>
  <v-container class="im-container">
    <div>
      {{ params.viewer }}
    </div>
    <v-card-item>
      <v-card-subtitle>店舗コード</v-card-subtitle>
      <v-card-text>{{ params.viewer.shop_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>店舗名</v-card-subtitle>
      <v-card-text>{{ params.viewer.shop_name }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>店舗名（カナ）</v-card-subtitle>
      <v-card-text>{{ params.viewer.shop_name_kana }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>ブランド</v-card-subtitle>
      <v-card-text>{{ brand_obj.brand_name }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>エリア</v-card-subtitle>
      <v-card-text>{{ area_obj.area_name }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>住所</v-card-subtitle>
      <v-card-text>{{ params.viewer.address }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>電話番号</v-card-subtitle>
      <v-card-text>{{ params.viewer.phone }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>営業時間</v-card-subtitle>
      <v-table>
        <tbody>
          <tr>
            <td>月曜日</td>
            <td>9:00 ~ 20:00</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>
<script>
import PcFooter from '@/components/common/PcFooter.vue'
import { computed } from 'vue'

export default {
  name: 'shop-detail',
  components: { PcFooter },
  props: {
    params: Object,
    changeMode: Function,
    setEditor: Function
  },
  setup (props) {
    // ブランド、エリアテキスト表示
    const brand_obj = computed(() => {
      const brand_cd = props.params.viewer.brand_cd
      console.log(props.params.brands.find(v => v.brand_cd === brand_cd));
      return props.params.brands.find(v => v.brand_cd === brand_cd)
    })
    const area_obj = computed(() => {
      const area_cd = props.params.viewer.area_cd
      return props.params.areas.find(v => v.area_cd === area_cd)
    })
    // 編集画面へ遷移
    const changeModeEdit = () => {
      props.setEditor(props.params.viewer)
    }
    // フッターオプション
    const footer_options = {
      back: [
        { text: '一覧へ戻る', callback: props.changeMode }
      ],
      next: [
        { text: '修正', callback: changeModeEdit }
      ]
    }

    return {
      brand_obj,
      area_obj,
      changeModeEdit,
      footer_options,
    }
  },
}
</script>
