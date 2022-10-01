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
// import companyApiFunc from '@/mixins/api/master/company.js'
// import brandApiFunc from '@/mixins/api/master/brand.js'
// import employeeApiFunc from '@/mixins/api/master/employee.js'
import accountApiFunc from '@/mixins/api/account.js'
import apiFunc from '@/mixins/api/api.js'

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
    // 招待ユーザーの場合は、招待用確認画面に飛ばす
    if (store.getters.invitationCd) {
      storeAuth.storeSetCompanyCd(store.getters.invitationCd)
      this.$router.push({
        name: 'setup-invite',
      })
    }
  },
  methods: {
    async save () {
      this.loading = true
      try {
        this.company = await apiFunc.apiCreateCompany(this.params.company)
        this.brand = await apiFunc.apiCreateBrand(this.params.brand, this.company)
        storeAuth.storeSetSetupInfo(this.company, this.brand)
        this.afterSave()
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async afterSave (invitation_role = null) {
      try {
        const account = await accountApiFunc.getAccount(store.getters.cognitoUser)
        const associate = await accountApiFunc.apiAssociateCreate(account, this.company)
        console.log('created associate', associate)
        const staff = await accountApiFunc.apiStaffCreate(associate, this.company)
        console.log('created staff', staff)
        // MEMO: setupから登録されるスタッフについては強制的に「admin」権限
        const staff_role = await accountApiFunc.apiSetupStaffRoleCreate(staff, invitation_role)
        console.log('created staff role', staff)
        storeAuth.storeSetAssociateStaff(associate, staff)
        storeAuth.storeSetStaffRole(staff_role)
        await apiFunc.apiCreateEmployee(this.params.profile)
        // TODO: ファイル、掲示板、チャットの最上位カラムを追加しなければならない
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
