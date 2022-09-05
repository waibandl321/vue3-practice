<template>
  <router-view
    :params="params"
    :save="save"
  />
  <div>
    <OverlayLoading v-if="loading" />
  </div>
</template>

<script>
import utilMixin from '@/mixins/utils/utils'
import companyApiFunc from '@/mixins/api/master/company.js'
import brandApiFunc from '@/mixins/api/master/brand.js'
import employeeApiFunc from '@/mixins/api/master/employee.js'
import accountApiFunc from '@/mixins/api/account.js'
import invitationApiFunc from '@/mixins/api/invitation.js'

import store from '@/store/index.js'
import storeAuth from '@/mixins/store/auth'
import OverlayLoading from '@/components/common/OverlayLoading.vue'

export default {
  components: {
    OverlayLoading
  },
  mixins: [utilMixin],
  data () {
    return {
      loading: false,
      params: {
        profile: {
          last_name: '',
          first_name: '',
          last_name_kana: '',
          first_name_kana: '',
          gender: '',
          employee_number: '',
          role_cd: ''
        },
        company: {
          company_type: 0,
          company_name: '',
          company_name_kana: '',
          company_form: {
            value: 0, name: '株式会社', name_kana: 'カブシキガイシャ'
          },
          form_name_position: 0
        },
        brand: {
          brand_cd: '',
          brand_name: ''
        }
      },
      company: null,
      brand: null
    }
  },
  created () {
    // 招待コードある場合は、company_cdフックに企業データとブランドデータ取得
    // associate, staffを自動作成して最終確認画面まで
    // employeeのstaff_id更新も
    if (store.getters.invitationCd) {
      storeAuth.storeSetCompanyCd(store.getters.invitationCd)
      this.invitationSave(store.getters.invitationCd)
    }
  },
  methods: {
    async invitationSave (_invitation_cd) {
      this.loading = true
      // _invitation_cd = 企業コード
      this.company = await companyApiFunc.apiGetCompanyFromInvitation(_invitation_cd)
      // 招待情報取得
      const invitation = await invitationApiFunc.apiGetInvitation()
      console.log('招待データ', invitation)
      // アカウント作成
      // const account = await accountApiFunc.getAccount(store.getters.cognitoUser)
      // アソシエイト作成
      // const associate = await accountApiFunc.apiAssociateCreate(account.data.listAccounts.items[0], this.company)
      // staff作成
      // const staff = await accountApiFunc.apiStaffCreate(associate, this.company)
      // const staff_role = await accountApiFunc.apiSetupStaffRoleCreate(staff, invitation.role_cd)
      // storeAuth.storeSetAssociateStaff(associate, staff)
      // storeAuth.storeSetStaffRole(staff_role)
      // employee取得
      // const employee = await employeeApiFunc.apiGetEmployeeDetail(invitation.employee_id)
      // employee更新
      // await employeeApiFunc.apiUpdateEmployee(employee, staff.staff_id, true)

      this.$router.push('/')
      this.company = null
      this.brand = null
      this.loading = false
    },
    async save () {
      this.loading = true
      try {
        this.company = await companyApiFunc.apiCompanyCreate(this.params.company)
        this.brand = await brandApiFunc.apiBrandCreate(this.params.brand, this.company)
        await storeAuth.storeSetSetupInfo(this.company, this.brand)
        this.afterSave()
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async afterSave (invitation_role = null) {
      try {
        const account = await accountApiFunc.getAccount(store.getters.cognitoUser)
        const associate = await accountApiFunc.apiAssociateCreate(account.data.listAccounts.items[0], this.company)
        console.log('created associate', associate)
        const staff = await accountApiFunc.apiStaffCreate(associate, this.company)
        console.log('created staff', staff)
        // MEMO: setupから登録されるスタッフについては強制的に「admin」権限
        const staff_role = await accountApiFunc.apiSetupStaffRoleCreate(staff, invitation_role)
        console.log('created staff role', staff)
        storeAuth.storeSetAssociateStaff(associate, staff)
        storeAuth.storeSetStaffRole(staff_role)
        await employeeApiFunc.apiEmployeeCreate(this.params.profile)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
      }
      this.company = null
      this.brand = null
      this.loading = false
    }
  }
}
</script>
