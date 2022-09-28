import { API } from 'aws-amplify'
import { createEmployee, updateEmployee } from '@/graphql/mutations'
import { listEmployees, getEmployee } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

// 従業員作成
async function apiEmployeeCreate (employee, inv = false) {
  const _employee = generateEmployeeObject(employee, inv)
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

// 従業員情報更新
async function apiUpdateEmployee (_employee) {
  const item = generateEmployeeObject(_employee)
  item.id = _employee.id
  // if(_staff_id) {
  //   item.staff_id = _staff_id
  // }
  // if(invitation_status) {
  //   item.status = 0
  // }

  await API.graphql({
    query: updateEmployee,
    variables: { input: item }
  })
}

function generateEmployeeObject (employee, inv = false) {
  return {
    company_employee_id: employee.company_employee_id ?? uuid.v4(),
    staff_id: inv ? uuid.v4() : employee.staff_id,
    company_cd: store.getters.companyCd,
    last_name: employee.last_name,
    first_name: employee.first_name,
    last_name_kana: employee.last_name_kana,
    first_name_kana: employee.first_name_kana,
    gender: employee.gender,
    birth: null,
    employee_number: employee.employee_number !== "" ? employee.employee_number : uuid.v4(),
    permanent: employee.permanent ? employee.permanent : 0,
    official_position: employee.official_position !== "" ? employee.official_position : "",
    delete: 0,
    status: inv ? 1 : 0
  }
}

// 従業員一覧取得
async function apiGetEmployeeList () {
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

// 従業員詳細取得
async function apiGetEmployeeRelateStaffId (staff_id) {
  const filter = {
    staff_id: {
      eq: staff_id
    }
  }
  const results = await API.graphql({
    query: listEmployees,
    variables: { filter: filter }
  })
  return results.data.listEmployees.items[0]
}

async function apiGetEmployeeDetail (employee_id) {
  const result = await API.graphql({
    query: getEmployee,
    variables: { id: employee_id }
  })
  return result.data.getEmployee
}

export default {
  apiEmployeeCreate,
  apiGetEmployeeList,
  apiUpdateEmployee,
  apiGetEmployeeDetail,
  apiGetEmployeeRelateStaffId
}
