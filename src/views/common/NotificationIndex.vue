<template>
  <v-container>
    <Header />
    <v-main>
      <!-- 絞り込み -->
      <v-select
        v-model="filter_category"
        :items="filter_options"
        item-title="category_name"
        item-value="category_key"
        hide-details="auto"
        label="絞り込み"
        color="primary"
      ></v-select>
      <!-- アイテム -->
      <v-card class="mt-4 pt-4">
        <v-card-subtitle>
          2022年07月28日 12時00分
        </v-card-subtitle>
        <v-card-title>
          お知らせ
        </v-card-title>
        <v-card-text>
          明日メンテナンスを実施します。
        </v-card-text>
      </v-card>
    </v-main>
  </v-container>
</template>

<script>
import Header from '@/components/common/PcHeader.vue'
import { ref } from '@vue/reactivity'
export default {
  name: 'notification-index',
  components: {
    Header
  },
  setup () {
    const notifications = ref([])
    const filter_category = ref(0)
    const filter_options = [
      { category_key: 0, category_name: "すべてのお知らせ" },
      { category_key: 1, category_name: "システム通知" },
      { category_key: 2, category_name: "運営会社からメッセージ" },
    ]
    return {
      notifications,
      filter_category,
      filter_options
    }
  },
}
</script>
