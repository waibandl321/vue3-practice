import { API } from 'aws-amplify'
import { createEmployee, updateEmployee } from '@/graphql/mutations'
import { listEmployees, getEmployee } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

async function apiEmployeeCreate (employee) {
  const _employee = generateEmployeeObject(employee)
  return await API.graphql({
    query: createEmployee,
    variables: { input: _employee }
  }).then((res) => {
    return res.data.createEmployee
  }).catch((error) => {
    console.log(error)
    return null
  })
}

async function apiUpdateEmployee (_employee, _staff_id = null, invitation_done = false) {
  const item = generateEmployeeObject(_employee)
  item.id = _employee.id
  if(_staff_id) {
    item.staff_id = _staff_id
  }
  if(invitation_done) {
    item.status = 0
  }

  await API.graphql({
    query: updateEmployee,
    variables: { input: item }
  }).then(() => {
    alert(`アイテム「${_employee.employee_number}」を更新しました。`)
  }).catch((error) => {
    console.log(error)
    alert(`アイテム「${_employee.employee_number}」の更新に失敗しました。エラーメッセージ:${error}`)
  })
}

function generateEmployeeObject (employee) {
  return {
    company_employee_id: employee.company_employee_id ?? uuid.v4(),
    staff_id: store.getters.staffId,
    company_cd: store.getters.companyCd,
    last_name: employee.last_name,
    first_name: employee.first_name,
    last_name_kana: employee.last_name_kana,
    first_name_kana: employee.first_name_kana,
    gender: employee.gender,
    birth: null,
    employee_number: employee.employee_number.length === 0 ? uuid.v4() : employee.employee_number,
    permanent: employee.permanent ? employee.permanent : 0,
    official_position: employee.official_position ?? null,
    delete: 0,
    status: 0
  }
}

async function apiGetEmployee () {
  const filter = {
    company_cd: {
      eq: store.getters.companyCd
    }
  }
  const results = await API.graphql({
    query: listEmployees,
    variables: { filter: filter }
  })
  return results.data.listEmployees.items
}

async function apiGetEmployeeDetail (employee_id) {
  return await API.graphql({
    query: getEmployee,
    variables: { id: employee_id }
  })
}

export default {
  apiEmployeeCreate,
  apiGetEmployee,
  apiUpdateEmployee,
  apiGetEmployeeDetail
}
