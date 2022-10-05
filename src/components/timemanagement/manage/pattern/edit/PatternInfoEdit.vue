<template>
  <v-card-item>
    <v-card-subtitle>業務パターン名</v-card-subtitle>
    <v-text-field></v-text-field>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>適用期間</v-card-subtitle>
    <v-card-actions>
      <Datepicker
        v-model="apply.start"
        locale="ja"
        autoApply
        clearable
        :enableTimePicker="false"
        placeholder="開始日"
      />
      <Datepicker
        v-model="apply.end"
        locale="ja"
        autoApply
        clearable
        :enableTimePicker="false"
        placeholder="終了日"
      />
    </v-card-actions>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>繰り返し設定</v-card-subtitle>
    <v-radio-group
      v-model="repeat_value"
      hide-details="auto"
    >
      <v-radio
        v-for="(option, index) in repeat_option"
        :key="index"
        :label="option.name"
        :value="option.key"
        color="primary"
      ></v-radio>
    </v-radio-group>
    <div
      class="mt-4"
    >
      月火水木金土日
    </div>
    <div
      class="mt-4 d-flex"
    >
      <span>毎月</span>
      <v-select
        :items="[1,2,3,4,5,6]"
      ></v-select>
      <span>日</span>
    </div>
  </v-card-item>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { reactive, ref } from '@vue/reactivity';
import { inject } from '@vue/runtime-core';
export default {
  components: {
    Datepicker
  },
  setup() {
    const params = inject('params')
    const apply = reactive({
      start: "",
      end: ""
    }),
    repeat_value = ref(),
    repeat_option = [
      { key: 10, name: "毎週" },
      { key: 20, name: "祝日" },
      { key: 30, name: "祝前日" },
      { key: 40, name: "指定日" },
    ]

    return {
      params,
      apply,
      repeat_value,
      repeat_option,
    }
  },
}
</script>