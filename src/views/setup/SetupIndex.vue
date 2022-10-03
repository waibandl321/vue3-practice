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
import OverlayLoading from '@/components/common/OverlayLoading.vue'

import utilMixin from '@/mixins/utils/utils'
import apiFunc from '@/mixins/api/api.js'
import storeFunc from '@/mixins/store/auth'

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
    const invitation_code = storeFunc.storeGetInvitationCode()
    if (invitation_code) {
      storeFunc.storeSetCompanyCd(invitation_code)
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
        storeFunc.storeSetSetupInfo(this.company, this.brand)
        this.afterSave()
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    async afterSave (invitation_role = null) {
      try {
        const account = await apiFunc.apiGetAccount(storeFunc.storeGetCognitoUser())
        const associate = await apiFunc.apiCreateAssociate(account, this.company)
        const staff = await apiFunc.apiCreateStaff(associate, this.company)
        // MEMO: setupから登録されるスタッフについては強制的に「admin」権限とする
        const staff_role = await apiFunc.apiCreateStaffRole(staff, invitation_role)
        storeFunc.storeSetAssociateStaff(associate, staff)
        storeFunc.storeSetStaffRole(staff_role)
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
