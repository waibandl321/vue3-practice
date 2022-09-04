import { API } from 'aws-amplify'
import { createEmployee, createInvitation } from '@/graphql/mutations'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

async function apiCreateInvitationEmployee (employee) {
  const _employee = generateEmployeeObject(employee)
  return await API.graphql({
    query: createEmployee,
    variables: { input: _employee }
  }).then((res) => {
    alert('招待従業員を作成しました。')
    return res.data.createEmployee
  }).catch((error) => {
    alert('招待従業員の作成に失敗しました。')
    console.log(error)
    return null
  })
}
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
    employee_number: employee.employee_number.length === 0 ? uuid.v4() : employee.employee_number,
    permanent: employee.permanent,
    official_position: employee.official_position ?? null,
    delete: 0,
    status: 0
  }
}


async function apiCreateInvitation (employee, invitation) {
  const _invitation = generateInvitationObject(employee, invitation)
  return await API.graphql({
    query: createInvitation,
    variables: { input: _invitation }
  }).then((res) => {
    alert('招待データを作成しました。')
    return res.data.createInvitation
  }).catch((error) => {
    alert('招待データの作成に失敗しました。')
    console.log(error)
    return null
  })
}

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
  result.url = createInvitationUrl(result)
  return result
}

function createInvitationUrl (data) {
  let basepath = "http://localhost:8080?ivc="
  basepath += data.company_cd
  if(data.shop_cd !== "admin") {
    basepath += '&ivc_shop=' + data.shop_cd
  }
  return basepath
}


export default {
  apiCreateInvitationEmployee,
  apiCreateInvitation
}
