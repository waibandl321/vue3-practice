<template>
  <div class="my-4">
    <v-btn 
      @click="changeCheckSheetMode('list')"
      prepend-icon="mdi-chevron-left"
    >チェックシート一覧に戻る</v-btn>
  </div>
  <div class="font-weight-bold">衛生管理チェック</div>
  <div class="my-2">
    <Datepicker
      v-model="target_date"
      locale="ja"
      autoApply
      clearable
      :enableTimePicker="false"
      placeholder="適用日"
      style="width: 200px;"
    />
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { ref } from '@vue/reactivity';

export default {
  props: {
    changeCheckSheetMode: {
      type: Function
    }
  },
  components: {
    Datepicker
  },
  setup() {
    const target_date = ref()
    return {
      target_date
    }
  },
}
</script>