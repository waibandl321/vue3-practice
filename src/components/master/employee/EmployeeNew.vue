<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container class="im-container">
    <v-card-title>従業員登録</v-card-title>
    {{ params.editor }}
    <div>
    招待データ
    {{ invitation }}
    </div>
    <AppAlert
      :success="params.success"
      :error="params.error"
    />
    <v-card-item>
        <v-card-subtitle>社員番号</v-card-subtitle>
        <v-text-field
          v-model.trim="params.editor.employee_number"
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
              v-model="params.editor.last_name"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="名"
              hide-details="auto"
              v-model="params.editor.first_name"
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
              v-model="params.editor.last_name_kana"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              label="メイ"
              hide-details="auto"
              v-model="params.editor.first_name_kana"
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
          v-model="params.editor.gender"
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
          v-model="params.editor.permanent"
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
          v-model.trim="params.editor.official_position"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-divider class="my-10"></v-divider>
      <v-card-item class="mb-10">
        <v-card-subtitle>
          招待したい人のメールアドレス
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-text-field
          v-model="invitation.send_to"
          hide-details="auto"
          ></v-text-field>
      </v-card-item>
      <v-card-item class="mb-10">
        <v-card-subtitle>
          所属店舗（選択しない場合は企業本部の社員扱い）
        </v-card-subtitle>
        <v-select
          v-model="invitation.shop_cd"
          :items="params.shops"
          item-title="shop_name"
          item-value="shop_cd"
          hide-details="auto"
          clearable
        ></v-select>
      </v-card-item>
      <v-card-item class="mb-10">
        <v-card-subtitle>
          権限
          <span class="red">必須</span>
        </v-card-subtitle>
        <v-select
          v-model="invitation.role_cd"
          :items="params.roles"
          item-title="role_name"
          item-value="role_cd"
          hide-details="auto"
          clearable
        ></v-select>
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
            @click="create()"
            color="primary"
          >新規登録
          </v-btn>
        </div>
      </footer>
  </v-container>
  <OverlayLoading v-if="loading" />
</template>

<script>
import OverlayLoading from '@/components/common/OverlayLoading.vue'
import AppAlert from '@/components/common/AppAlert.vue'

import utilsMixin from '@/mixins/utils/utils.js'
import invitationApiFunc from '@/mixins/api/invitation.js'
import employeeApiFunc from '@/mixins/api/master/employee'
import { reactive, ref } from 'vue'

export default {
  name: 'employee-new',
  components: {
    OverlayLoading,
    AppAlert
  },
  mixins: [utilsMixin],
  props: {
    changeMode: Function,
    messageSet: Function,
    params: Object
  },
  setup (props) {
    const loading = ref(false)
    let invitation = reactive({
      send_to: "",
      shop_cd: null,
      role_cd: null,
      send_type: 0,
      approval: 1
    })

    const create = async () => {
      loading.value = true
      try {
        // 従業員作成
        const is_inv = true
        const employee = await employeeApiFunc.apiEmployeeCreate(props.params.editor, is_inv)
        console.log('employee', employee);
        // 招待データ作成
        await invitationApiFunc.apiCreateInvitation(employee, invitation)
        props.messageSet('従業員を新規作成しました。', 'success')
        props.changeMode('list')
      } catch (error) {
        props.messageSet(error, 'error')
        console.error(error);
      }
      invitation = {}
      loading.value = false
      
    } 

    return {
      loading,
      invitation,
      create
    }
  },
}
</script>
<style scoped>
  .red {
    color: red;
  }
</style>
