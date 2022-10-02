import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState({
    storage: window.localStorage
  })],
  state: {
    // 認証まわり
    attributes: {
      sub: null
    },
    cognito_username: null,
    cognito_access_token: null,
    cognito_id_token: null,
    cognito_refresh_token: null,
    // アカウントまわり
    account: null,
    associate: null,
    brands: null,
    company: null,
    company_cd: null,
    // company_group_cd: null,
    shop_cd: null,
    staff: null,
    staff_role_cd: null,
    //招待
    invitation_cd: null,
    invitation_employee_id: null,
    // 店舗招待
    invitation_shop_cd: null,
    // スタッフグループ
    staff_group_staffs: null
  },
  getters: {
    cognitoUser (state) {
      return {
        attributes: {
          sub: state.attributes.sub
        },
        cognito_username: state.cognito_username,
        cognito_access_token: state.cognito_access_token,
        cognito_id_token: state.cognito_id_token,
        cognito_refresh_token: state.cognito_refresh_token
      }
    },
    account (state) {
      return state.account
    },
    associate (state) {
      return state.associate
    },
    staff (state) {
      return state.staff
    },
    company (state) {
      return state.company
    },
    companyCd (state) {
      return state.company_cd
    },
    brands (state) {
      return state.brands
    },
    staffRoleCd (state) {
      return state.staff_role_cd
    },
    // 招待
    invitationCd (state) {
      return state.invitation_cd
    },
    invitationEmployeeId (state) {
      return state.invitation_employee_id
    },
    // 店舗招待
    invitationShopCode (state) {
      return state.invitation_shop_cd
    },
    // スタッフグループ
    staffGroupStaffs (state) {
      return state.staff_group_staffs
    }
  },
  mutations: {
    mResetUser (state) {
      state.attributes.sub = null
      state.cognito_username = null
      state.cognito_access_token = null
      state.cognito_id_token = null
      state.cognito_refresh_token = null
      state.account = null

      state.associate = null
      state.staff = null
      state.company_cd = null
      state.company_group_cd = null
      state.brands = null,
      state.staff_role_cd = null
    },
    mSetCognitoUser (state, user) {
      state.attributes.sub = user.attributes.sub
      state.cognito_username = user.username
      state.cognito_access_token = user.signInUserSession.accessToken.jwtToken
      state.cognito_id_token = user.signInUserSession.idToken.jwtToken
      state.cognito_refresh_token = user.signInUserSession.refreshToken.token
    },
    mSetAccount (state, account) {
      state.account = account
    },
    mSetAssociate (state, associate) {
      state.associate = associate
    },
    mSetStaff (state, staff) {
      state.staff = staff
    },
    mSetCompany (state, company) {
      state.company_cd = company.company_cd
      state.company_group_cd = company.id
    },
    mSetCompanyCd (state, company_cd) {
      state.company_cd = company_cd
    },
    mSetBrands (state, brands) {
      state.brands = brands
    },
    mSetStaffRole (state, role_cd) {
      state.staff_role_cd = role_cd
    },
    //招待
    mSetInvitationCode (state, invitation_cd) {
      state.invitation_cd = invitation_cd
    },
    mSetInvitationEmployeeId (state, invitation_employee_id) {
      state.invitation_employee_id = invitation_employee_id
    },
    // 店舗招待
    mSetInvitationShopCode (state, invitation_shop_cd) {
      state.invitation_shop_cd = invitation_shop_cd
    },
    mSetStaffGroupStaffs (state, staffs) {
      state.staff_group_staffs = staffs
    }

  },
  actions: {
  },
  modules: {
  }
})
