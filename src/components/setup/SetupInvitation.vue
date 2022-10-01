<template>
  <v-container class="im-container">
    <v-card>
      <AppAlert
        :success="message.success"
        :error="message.error"
      />
      <v-card-title>ようこそポータルへ</v-card-title>
      <v-card-text>参加する企業情報とプロフィールを確認して登録を完了させましょう。</v-card-text>
      <v-card-item>
        <v-card-subtitle>プロフィール情報</v-card-subtitle>
        <v-table v-if="!loading">
          <tbody>
            <tr>
              <td>名前</td>
              <td>{{ setup_data.employee.last_name }}{{ setup_data.employee.first_name }}</td>
            </tr>
            <tr>
              <td>名前（フリガナ）</td>
              <td>{{ setup_data.employee.last_name_kana }}{{ setup_data.employee.first_name_kana }}</td>
            </tr>
            <tr>
              <td>性別</td>
              <td>{{ setup_data.employee.gender }}</td>
            </tr>
            <tr>
              <td>社員番号</td>
              <td>{{ setup_data.employee.employee_number }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <v-card-item v-if="!loading">
        <v-card-subtitle>企業情報</v-card-subtitle>
        {{ setup_data.company }}
        <v-table>
          <tbody>
            <tr>
              <td>事業タイプ</td>
              <td>{{ setup_data.company.company_type === 0 ? '法人' : '個人事業主' }}</td>
            </tr>
            <tr>
              <td>企業名</td>
              <td>
                {{ setup_data.company.company_name }}
              </td>
            </tr>
            <tr>
              <td>企業名（フリガナ）</td>
              <td>
                {{ setup_data.company.company_name_kana }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <SetupFooter :options="footer_options" />
    </v-card>
  </v-container>
  <OverlayLoading v-if="loading" />
</template>

<script>
import SetupFooter from './SetupFooter.vue'
import AppAlert from '@/components/common/AppAlert.vue'
import OverlayLoading from '../common/OverlayLoading.vue'

import accountApiFunc from '@/mixins/api/account.js'
import apiFunc from '@/mixins/api/api.js'

import storeAuth from '@/mixins/store/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'setup-invite',
  components: {
    SetupFooter,
    OverlayLoading,
    AppAlert
  },
  props: {
    params: Object,
    save: Function
  },
  setup () {
    const router = useRouter()
    const loading = ref(false)

    const message = reactive({
      success: "",
      error: ""
    })
    // データ定義
    const setup_data = reactive({
      company: {},
      employee: {},
      invitation: {}
    })
    const account = storeAuth.storeGetAccount()

    const init = async () => {
      loading.value = true
      try {
        // 企業
        setup_data.company = await apiFunc.apiGetCompanyFromInvitation(storeAuth.storeGetInvitationCode())
        // 招待情報
        setup_data.invitation = await apiFunc.apiGetInvitation()
        // 従業員
        setup_data.employee = await apiFunc.apiGetEmployeeDetail(setup_data.invitation.employee_id)
      } catch (error) {
        console.error(error);
        message.error = error
      }
      loading.value = false
    }
    init()
    
    // 保存処理
    const saveSetup = async () => {
      loading.value = true
      try {
        // アソシエイト作成
        const associate = await accountApiFunc.apiAssociateCreate(
          account,
          setup_data.company
        )
        // スタッフ登録(従業員招待でstaff_idが生成されているので割り当てる)
        const invitation_staff_id = setup_data.employee.staff_id
        const staff = await accountApiFunc.apiStaffCreate(
          associate,
          setup_data.company,
          setup_data.invitation,
          invitation_staff_id
        )
        // store保存
        storeAuth.storeSetAssociateStaff(associate, staff)
        // スタッフロール登録
        const staff_role = await accountApiFunc.apiSetupStaffRoleCreate(
          staff,
          setup_data.invitation.role_cd
        )
        // employeeステータス有効化
        await apiFunc.apiUpdateEmployee(setup_data.employee)
        // store保存
        storeAuth.storeSetAssociateStaff(associate, staff)
        storeAuth.storeSetStaffRole(staff_role)
        router.push('/')
      } catch (error) {
        message.error = error
        console.error(error);
      }
      loading.value = false
    }

    // フッター
    const footer_options = [
      {
        btn_type: 'primary',
        text: '登録する',
        callback: saveSetup
      }
    ]
    return {
      setup_data,
      saveSetup,
      footer_options,
      loading,
      message
      }
  },
}
</script>
<style scoped>
.im-container >>> .v-table > .v-table__wrapper > table {
  table-layout: fixed;
}
</style>