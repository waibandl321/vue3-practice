<template>
  <v-container style="padding-bottom: 100px;">
    {{ detail }}
    <v-card-item>
      <v-card-subtitle>店舗コード</v-card-subtitle>
      <v-card-text>{{ detail.shop_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>店舗名</v-card-subtitle>
      <v-card-text>{{ detail.shop_name }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>店舗名（カナ）</v-card-subtitle>
      <v-card-text>{{ detail.shop_name_kana }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>ブランド</v-card-subtitle>
      <v-card-text>{{ detail.brand_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>エリア</v-card-subtitle>
      <v-card-text>{{ detail.area_cd }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>住所</v-card-subtitle>
      <v-card-text>{{ detail.address }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>電話番号</v-card-subtitle>
      <v-card-text>{{ detail.phone }}</v-card-text>
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

export default {
  name: 'shop-detail',
  components: { PcFooter },
  props: {
    params: Object,
    changeMode: Function
  },
  setup (props) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const detail = props.params.viewer

    return {
      detail
    }
  },
  data () {
    return {
      footer_options: {
        back: [
          { text: '一覧へ戻る', callback: this.changeMode }
        ],
        next: [
          { text: '修正', callback: this.changeModeEdit }
        ]
      }
    }
  },
  methods: {
    changeModeEdit () {
      // eslint-disable-next-line vue/no-mutating-props
      this.params.editor = this.params.viewer
      this.changeMode('edit')
    }
  }
}
</script>
