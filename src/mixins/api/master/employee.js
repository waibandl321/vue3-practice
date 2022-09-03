import { API } from 'aws-amplify'
import { createEmployee, updateEmployee } from '@/graphql/mutations'
import { listEmployees } from '@/graphql/queries'

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
    employee_number: employee.employee_number ?? uuid.v4(),
    permanent: employee.permanent ? employee.permanent : 0,
    official_position: employee.official_position ?? null,
    delete: 0,
    status: 0
  }
}

async function apiGetEmployee () {
  const results = await API.graphql({
    query: listEmployees
  })
  return results.data.listEmployees.items
}

async function apiUpdateEmployee (_employee) {
  const item = generateEmployeeObject(_employee)
  item.id = _employee.id

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
export default {
  apiEmployeeCreate,
  apiGetEmployee,
  apiUpdateEmployee
}
