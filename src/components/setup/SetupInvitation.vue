<template>
  <v-container>
    <v-card>
      <v-card-title>ようこそポータルへ</v-card-title>
      <v-card-text>参加する企業情報とプロフィールを確認して登録を完了させましょう。</v-card-text>
      <v-card-item>
        <v-card-subtitle>プロフィール情報</v-card-subtitle>
        <v-table>
          <tbody>
            <tr>
              <td>名前</td>
              <td>{{ employee.last_name }}{{ employee.first_name }}</td>
            </tr>
            <tr>
              <td>名前（フリガナ）</td>
              <td>{{ employee.last_name_kana }}{{ employee.first_name_kana }}</td>
            </tr>
            <tr>
              <td>性別</td>
              <td>{{ employee.gender }}</td>
            </tr>
            <tr>
              <td>社員番号</td>
              <td>{{ employee.employee_number }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-item>
      <v-card-item>
        <v-card-subtitle>企業情報</v-card-subtitle>
        <v-table>
          <tbody>
            <tr>
              <td>事業タイプ</td>
              <td>{{ company.company_type === 0 ? '法人' : '個人事業主' }}</td>
            </tr>
            <tr>
              <td>企業名</td>
              <td>
                {{ company.company_name }}
              </td>
            </tr>
            <tr>
              <td>企業名（フリガナ）</td>
              <td>
                {{ company.company_name_kana }}
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
import utilsMixin from '@/mixins/utils/utils.js'
import companyApiFunc from '@/mixins/api/master/company.js'
import employeeApiFunc from '@/mixins/api/master/employee.js'
import accountApiFunc from '@/mixins/api/account.js'
import invitationApiFunc from '@/mixins/api/invitation.js'

import store from '@/store/index.js'
import storeAuth from '@/mixins/store/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import OverlayLoading from '../common/OverlayLoading.vue'

export default {
  name: 'setup-invite',
  mixins: [utilsMixin],
  components: {
    SetupFooter,
    OverlayLoading
  },
  setup () {
    const loading = ref(false)
    const router = useRouter()
    // 確認用データ
    const company = ref({})
    const employee = ref({})
    const getCompany = async () => {
      company.value =  await companyApiFunc.apiGetCompanyFromInvitation(store.getters.invitationCd)
    }
    const getEmployee = async () => {
      const invitation = await invitationApiFunc.apiGetInvitation()
      employee.value = await employeeApiFunc.apiGetEmployeeDetail(invitation.employee_id)
    }
    getCompany()
    getEmployee()
    
    // 保存処理
    const saveSetup = async () => {
      loading.value = true
      try {
        const invitation = await invitationApiFunc.apiGetInvitation()
        const account = await accountApiFunc.getAccount(store.getters.cognitoUser)
        const associate = await accountApiFunc.apiAssociateCreate(account, company.value)
        const staff = await accountApiFunc.apiStaffCreate(associate, company.value)
        const staff_role = await accountApiFunc.apiSetupStaffRoleCreate(staff, invitation.role_cd)
        storeAuth.storeSetAssociateStaff(associate, staff)
        storeAuth.storeSetStaffRole(staff_role)
        // employee更新
        await employeeApiFunc.apiUpdateEmployee(employee.value, staff.staff_id, true)
        router.push('/')
      } catch (error) {
        console.log(error);
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
        company,
        employee,
        saveSetup,
        footer_options,
        loading
      }
  },
}
</script>
