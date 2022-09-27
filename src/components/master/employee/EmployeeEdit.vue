<template>
  <v-container>
    <v-card-title>従業員情報 編集</v-card-title>
    {{ params.editor }}
    <v-card-item>
        <v-card-subtitle>社員番号</v-card-subtitle>
        <v-text-field
          v-model.trim="editor.employee_number"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          氏名
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              label="性"
              hide-details="auto"
              v-model="editor.last_name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="名"
              hide-details="auto"
              v-model="editor.first_name"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          氏名（フリガナ）
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-row>
          <v-col>
            <v-text-field
              label="セイ"
              hide-details="auto"
              v-model="editor.last_name_kana"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="メイ"
              hide-details="auto"
              v-model="editor.first_name_kana"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          性別
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-radio-group
          hide-details="auto"
          v-model="editor.gender"
        >
          <v-radio
            v-for="(gender, idx) in getGenderList()"
            :key="idx"
            :label="gender.text"
            :value="gender.value"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>
          従業員種別
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-radio-group
          hide-details="auto"
          v-model="editor.permanent"
        >
          <v-radio
            v-for="(permanent, idx) in getPermanentList()"
            :key="idx"
            :label="permanent.text"
            :value="permanent.value"
            color="primary"
          ></v-radio>
        </v-radio-group>
      </v-card-item>
      <v-card-item class="mb-10">
        <v-card-subtitle>
          役職名
        </v-card-subtitle>
        <v-text-field
          v-model="editor.official_position"
          hide-details="auto"
          ></v-text-field>
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
            @click="update()"
            color="primary"
          >保存</v-btn>
        </div>
      </footer>
  </v-container>
  <OverlayLoading v-if="loading" />
</template>

<script>
import utilsMixin from '@/mixins/utils/utils.js'
import employeeApiFunc from '@/mixins/api/master/employee.js'
import { reactive, ref } from '@vue/reactivity'
import OverlayLoading from '@/components/common/OverlayLoading.vue'

export default {
  name: "employee-edit",
  components: { OverlayLoading },
  mixins: [utilsMixin],
  props: {
    initData: Function,
    changeMode: Function,
    messageSet: Function,
    params: Object
  },
  setup(props) {
    const loading = ref(false)
    const editor = reactive(props.params.editor);
    const update = async () => {
      loading.value = true
      try {
        await employeeApiFunc.apiUpdateEmployee(editor);
        props.messageSet("従業員情報を更新しました", "success");
      }
      catch (error) {
        console.error(error);
      }
      loading.value = false
      props.initData();
      props.changeMode("list");
    };
    return {
      loading,
      update,
      editor
    };
  },
}
</script>
<style scoped>
  .red {
    color: red;
  }
</style>
