<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-container style="padding-bottom: 100px;">
    <v-card-title>従業員情報 編集</v-card-title>
    {{ params.editor }}
    {{ invitation }}
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
          :items="shops"
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
          :items="roles"
          item-title="role_name"
          item-value="role_cd"
          hide-details="auto"
          clearable
        ></v-select>
      </v-card-item>
    <PcFooter :options="footer_options" />
  </v-container>
</template>

<script>
import utilsMixin from '@/mixins/utils/utils.js'
import PcFooter from '@/components/common/PcFooter.vue'
import invitationApiFunc from '@/mixins/api/invitation.js'
import shopApiFunc from '@/mixins/api/master/shop.js'
import roleFunc from '@/mixins/api/master/role.js'
import { ref } from 'vue'
export default {
  name: 'employee-new',
  components: { PcFooter },
  mixins: [utilsMixin],
  props: {
    changeMode: Function,
    params: Object
  },
  setup () {
    const shops = ref([])
    const roles = ref([])
    const getShops = async () => {
      shops.value = await shopApiFunc.apiGetShops()
    }
    const getRoles = () => {
      roles.value = roleFunc.getSystemRoleList()
    }
    getShops()
    getRoles()

    const invitation = ref({
      send_to: "",
      shop_cd: null,
      role_cd: null,
      send_type: 0,
      approval: 1
    })

    return {
      shops,
      roles,
      invitation,
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
      try {
        const employee = await invitationApiFunc.apiCreateInvitationEmployee(this.params.editor)
        await invitationApiFunc.apiCreateInvitation(employee, this.invitation)
      } catch (error) {
        console.log(error);
        alert(error)
      }
      this.invitation = {}
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
