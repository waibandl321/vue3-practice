import { API } from 'aws-amplify'
import { createEmployee, createInvitation } from '@/graphql/mutations'
import { listInvitations } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
// import crypto from 'crypto-js';
import store from '@/store/index.js'
import environment from '@/mixins/utils/environment.js'

// 招待社員作成
async function apiCreateInvitationEmployee (employee) {
  const _employee = generateEmployeeObject(employee)
  return await API.graphql({
    query: createEmployee,
    variables: { input: _employee }
  })
}
// 招待社員データ生成
function generateEmployeeObject (employee) {
  return {
    company_employee_id: uuid.v4(),
    staff_id: null,
    company_cd: store.getters.companyCd,
    last_name: employee.last_name,
    first_name: employee.first_name,
    last_name_kana: employee.last_name_kana,
    first_name_kana: employee.first_name_kana,
    gender: employee.gender,
    birth: null,
    employee_number: employee.employee_number !== "" ? employee.employee_number : uuid.v4(),
    permanent: employee.permanent,
    official_position: employee.official_position !== "" ? employee.official_position : "",
    delete: 0,
    status: 1 //未登録フラグ
  }
}

// 招待データ追加
async function apiCreateInvitation (employee, invitation) {
  const _invitation = generateInvitationObject(employee, invitation)
  return await API.graphql({
    query: createInvitation,
    variables: { input: _invitation }
  })
}
// 招待データ生成
function generateInvitationObject (employee, invitation) {
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
  result.url = createEmployeeInvitationUrl(result)
  return result
}
// 招待URL生成
function createEmployeeInvitationUrl (data) {
  let basepath = environment.getEnvHost() + "?ivc=" + data.company_cd
  // TODO: 暗号化予定
  // basepath += '&to=' + data.send_to
  basepath += '&emp=' + data.employee_id
  // if(data.shop_cd !== "admin") {
  //   basepath += '&ivc_shop=' + data.shop_cd
  // }
  return basepath
}

function createShopInvitationUrl(shop) {
  return environment.getEnvHost() + "?ivs=" + shop.company_shop_cd
}

async function apiGetInvitation () {
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
}


export default {
  apiCreateInvitationEmployee,
  apiCreateInvitation,
  apiGetInvitation,
  createShopInvitationUrl
}
