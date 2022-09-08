<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container>
    <v-card-title>ブランド登録</v-card-title>
    {{ params }}
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
</template>

<script>
import utilsMixin from '@/mixins/utils/utils.js'
import PcFooter from '@/components/common/PcFooter.vue'
import brandApiFunc from '@/mixins/api/master/brand.js'
import { computed } from '@vue/runtime-core'

export default {
  name: 'brand-edit',
  components: { PcFooter },
  mixins: [utilsMixin],
  props: {
    changeMode: Function,
    params: Object
  },
  setup () {
    const time_select = computed(() => {
      const items = []
      for (let i = 24; i < 36; i++) {
        items.push(i + '時')
      }
      return items
    })
    return {
      time_select
    }
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
        await brandApiFunc.apiBrandCreate(this.params.editor)
      } else {
        await brandApiFunc.apiUpdateBrand(this.params.editor)
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
