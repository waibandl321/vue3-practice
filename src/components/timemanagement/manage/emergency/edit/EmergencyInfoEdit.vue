<template>
  <v-card-item>
    <v-card-subtitle>臨時タスク名</v-card-subtitle>
    <v-text-field></v-text-field>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>臨時タスク説明</v-card-subtitle>
    <v-textarea></v-textarea>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>タスク実施期間</v-card-subtitle>
    <v-radio-group hide-details="auto">
      <v-radio
        color="primary"
        label="期限指定 （特定の日までに、一回のみ実施させる）"
      ></v-radio>
      <v-radio
        color="primary"
        label="期間指定 （特定の期間中に、毎日実施させる）"
      ></v-radio>
    </v-radio-group>
    <v-card-actions>
      <Datepicker
        v-model="task_start"
        locale="ja"
        autoApply
        clearable
        :enableTimePicker="false"
        placeholder="開始日"
      />
      <Datepicker
        v-model="task_end"
        locale="ja"
        autoApply
        clearable
        :enableTimePicker="false"
        placeholder="終了日"
      />
    </v-card-actions>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>オプション</v-card-subtitle>
    <v-checkbox
      v-for="n in 3"
      :key="n"
      :label="`オプション ${n}`"
      :value="n"
      color="primary"
      hide-details
    ></v-checkbox>
  </v-card-item>
  <v-card-item>
    <v-card-subtitle>タグ</v-card-subtitle>
  </v-card-item>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker';
import { ref } from '@vue/reactivity';

export default {
  components: {
    Datepicker
  },
  setup() {
    const task_start = ref(),
          task_end = ref()

    return {
      task_start,
      task_end
    }
  },
}
</script>