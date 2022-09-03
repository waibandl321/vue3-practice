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
import companyApiFunc from '@/mixins/api/master/company.js'
import brandApiFunc from '@/mixins/api/master/brand.js'
import employeeApiFunc from '@/mixins/api/master/employee.js'
import accountApiFunc from '@/mixins/api/account.js'

import store from '@/store/index.js'
import storeAuth from '@/mixins/store/auth'
import OverlayLoading from '@/components/common/OverlayLoading.vue'
export default {
  components: {
    OverlayLoading
  },
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
  methods: {
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
    async afterSave () {
      try {
        const account = await accountApiFunc.getAccount(store.getters.cognitoUser)
        const associate = await accountApiFunc.apiAssociateCreate(account.data.listAccounts.items[0], this.company)
        console.log('created associate', associate)
        const staff = await accountApiFunc.apiStaffCreate(associate, this.company)
        // const staff_role = await accountApiFunc.apiStaffRoleCreate(staff)
        console.log('created staff', staff)
        storeAuth.storeSetAssociateStaff(associate, staff)
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
