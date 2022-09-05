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
    associate_id: null,
    brand_cd: null,
    company_cd: null,
    company_group_cd: null,
    shop_cd: null,
    staff: null,
    staff_role_cd: null,
    //招待
    invitation_cd: null,
    invitation_send_to: null
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
    staff (state) {
      return state.staff
    },
    associateId (state) {
      return state.associate_id
    },
    companyCd (state) {
      return state.company_cd
    },
    companyGroupCd (state) {
      return state.company_group_cd
    },
    brandCd (state) {
      return state.brand_cd
    },
    staffRoleCd (state) {
      return state.staff_role_cd
    },
    // 招待
    invitationCd (state) {
      return state.invitation_cd
    },
    invitationSendTo (state) {
      return state.invitation_send_to
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

      state.associate_id = null
      state.staff = null
      state.company_cd = null
      state.company_group_cd = null
      state.brand_cd = null,
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
      state.associate_id = associate.associate_id
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
    mSetCompanyGroupCd (state, company_group_cd) {
      state.company_group_cd = company_group_cd
    },
    mSetBrandCd (state, brand) {
      state.brand_cd = brand.company_brand_cd
    },
    mSetStaffRole (state, role_cd) {
      state.staff_role_cd = role_cd
    },
    //招待
    mSetInvitationCode (state, invitation_cd) {
      state.invitation_cd = invitation_cd
    },
    mSetInvitationSendTo (state, invitation_send_to) {
      state.invitation_send_to = invitation_send_to
    }
  },
  actions: {
  },
  modules: {
  }
})
