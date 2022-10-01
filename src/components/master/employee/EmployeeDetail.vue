<template>
  <v-container>
    {{ params.viewer }}
    <v-card-item>
      <v-card-subtitle>社員番号</v-card-subtitle>
      <v-card-text>{{ params.viewer.employee_number }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>氏名</v-card-subtitle>
      <v-card-text>
        {{ params.viewer.last_name }}
        {{ params.viewer.first_name }}
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>氏名（フリガナ）</v-card-subtitle>
      <v-card-text>
        {{ params.viewer.last_name_kana }}
        {{ params.viewer.first_name_kana }}
      </v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>性別</v-card-subtitle>
      <v-card-text>{{ getGenderText(params.viewer.gender) }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>従業員種別</v-card-subtitle>
      <v-card-text>{{ params.viewer.permanent === 0 ? '社員' : '臨時' }}</v-card-text>
    </v-card-item>
    <v-card-item>
      <v-card-subtitle>役職名</v-card-subtitle>
      <v-card-text>{{ params.viewer.official_position }}</v-card-text>
    </v-card-item>
    <footer class="fixed-footer">
      <div class="back">
        <v-btn
          @click="changeMode('list')"
        >一覧へ戻る
        </v-btn>
      </div>
      <div class="next">
        <v-btn
          @click="changeModeEdit()"
          color="primary"
        >修正
        </v-btn>
      </div>
    </footer>
  </v-container>
</template>

<script>
import utilsMixin from '@/mixins/utils/utils.js'

export default {
  name: 'brand-detail',
  mixins: [utilsMixin],
  props: {
    params: Object,
    changeMode: Function,
    setEditor: Function,
  },
  setup (props) {
    const changeModeEdit = () => {
      props.setEditor()
    }
    return {
      changeModeEdit
    }
  }
}
</script>
