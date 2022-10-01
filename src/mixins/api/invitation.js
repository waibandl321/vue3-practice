import { API } from 'aws-amplify'
import { createInvitation } from '@/graphql/mutations'
import { listInvitations } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
// import crypto from 'crypto-js';
import store from '@/store/index.js'
import environment from '@/mixins/utils/environment.js'

export default {
  // 招待データ追加
  async create (employee, invitation) {
    const _invitation = this.generateInvitationObject(employee, invitation)
    return await API.graphql({
      query: createInvitation,
      variables: { input: _invitation }
    })
  },
  // 招待データ生成
  generateInvitationObject (employee, invitation) {
    const result = {
      company_cd: store.getters.companyCd,
      shop_cd: invitation.shop_cd ?? 'admin',
      role_cd: invitation.role_cd,
      employee_id: employee.id,
      send_type: 0,
      expired_in: null,
      approval: 1,
      invitation_id: uuid.v4(),
      send_to: invitation.send_to
    }
    result.url = this.createEmployeeInvitationUrl(result)
    return result
  },
  // 招待URL生成
  createEmployeeInvitationUrl (data) {
    return environment.getEnvHost() 
    + "?ivc="
    + data.company_cd
    + '&emp='
    + data.employee_id
  },

  createShopInvitationUrl(shop) {
    return environment.getEnvHost() + "?ivs=" + shop.company_shop_cd
  },

  async getInvitation () {
    // TODO: コンポーネント側でstore参照関数を定義して従業員IDは引数で渡す
    console.log('invitation employee id:', store.getters.invitationEmployeeId);
    const filter = {
      employee_id: {
        eq: store.getters.invitationEmployeeId
      }
    }
    const results = await API.graphql({
      query: listInvitations,
      variables: { filter: filter }
    })
    return results.data.listInvitations.items[0]
  },
}
