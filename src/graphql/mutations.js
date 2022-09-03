/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const createAccounts = /* GraphQL */ `
  mutation CreateAccounts(
    $input: CreateAccountsInput!
    $condition: ModelAccountsConditionInput
  ) {
    createAccounts(input: $input, condition: $condition) {
      id
      account_id
      sub
      status
      user_name
      createdAt
      updatedAt
    }
  }
`;
export const updateAccounts = /* GraphQL */ `
  mutation UpdateAccounts(
    $input: UpdateAccountsInput!
    $condition: ModelAccountsConditionInput
  ) {
    updateAccounts(input: $input, condition: $condition) {
      id
      account_id
      sub
      status
      user_name
      createdAt
      updatedAt
    }
  }
`;
export const deleteAccounts = /* GraphQL */ `
  mutation DeleteAccounts(
    $input: DeleteAccountsInput!
    $condition: ModelAccountsConditionInput
  ) {
    deleteAccounts(input: $input, condition: $condition) {
      id
      account_id
      sub
      status
      user_name
      createdAt
      updatedAt
    }
  }
`;
export const createAssociate = /* GraphQL */ `
  mutation CreateAssociate(
    $input: CreateAssociateInput!
    $condition: ModelAssociateConditionInput
  ) {
    createAssociate(input: $input, condition: $condition) {
      id
      associate_id
      account_id
      invite_key
      company_group_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateAssociate = /* GraphQL */ `
  mutation UpdateAssociate(
    $input: UpdateAssociateInput!
    $condition: ModelAssociateConditionInput
  ) {
    updateAssociate(input: $input, condition: $condition) {
      id
      associate_id
      account_id
      invite_key
      company_group_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteAssociate = /* GraphQL */ `
  mutation DeleteAssociate(
    $input: DeleteAssociateInput!
    $condition: ModelAssociateConditionInput
  ) {
    deleteAssociate(input: $input, condition: $condition) {
      id
      associate_id
      account_id
      invite_key
      company_group_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createStaff = /* GraphQL */ `
  mutation CreateStaff(
    $input: CreateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    createStaff(input: $input, condition: $condition) {
      id
      staff_id
      associate_id
      company_cd
      company_group_cd
      invite_key
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateStaff = /* GraphQL */ `
  mutation UpdateStaff(
    $input: UpdateStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    updateStaff(input: $input, condition: $condition) {
      id
      staff_id
      associate_id
      company_cd
      company_group_cd
      invite_key
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteStaff = /* GraphQL */ `
  mutation DeleteStaff(
    $input: DeleteStaffInput!
    $condition: ModelStaffConditionInput
  ) {
    deleteStaff(input: $input, condition: $condition) {
      id
      staff_id
      associate_id
      company_cd
      company_group_cd
      invite_key
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      company_employee_id
      staff_id
      company_cd
      last_name
      first_name
      last_name_kana
      first_name_kana
      gender
      birth
      employee_number
      permanent
      official_position
      delete
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      company_employee_id
      staff_id
      company_cd
      last_name
      first_name
      last_name_kana
      first_name_kana
      gender
      birth
      employee_number
      permanent
      official_position
      delete
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      company_employee_id
      staff_id
      company_cd
      last_name
      first_name
      last_name_kana
      first_name_kana
      gender
      birth
      employee_number
      permanent
      official_position
      delete
      status
      createdAt
      updatedAt
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      company_cd
      company_name
      company_name_kana
      company_form
      form_name_position
      homepage_url
      membership
      certified
      statsu
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      id
      company_cd
      company_name
      company_name_kana
      company_form
      form_name_position
      homepage_url
      membership
      certified
      statsu
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      id
      company_cd
      company_name
      company_name_kana
      company_form
      form_name_position
      homepage_url
      membership
      certified
      statsu
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createBrand = /* GraphQL */ `
  mutation CreateBrand(
    $input: CreateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    createBrand(input: $input, condition: $condition) {
      id
      company_brand_cd
      brand_name
      brand_cd
      exchange_time
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateBrand = /* GraphQL */ `
  mutation UpdateBrand(
    $input: UpdateBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    updateBrand(input: $input, condition: $condition) {
      id
      company_brand_cd
      brand_name
      brand_cd
      exchange_time
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteBrand = /* GraphQL */ `
  mutation DeleteBrand(
    $input: DeleteBrandInput!
    $condition: ModelBrandConditionInput
  ) {
    deleteBrand(input: $input, condition: $condition) {
      id
      company_brand_cd
      brand_name
      brand_cd
      exchange_time
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createRole = /* GraphQL */ `
  mutation CreateRole(
    $input: CreateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    createRole(input: $input, condition: $condition) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const updateRole = /* GraphQL */ `
  mutation UpdateRole(
    $input: UpdateRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    updateRole(input: $input, condition: $condition) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const deleteRole = /* GraphQL */ `
  mutation DeleteRole(
    $input: DeleteRoleInput!
    $condition: ModelRoleConditionInput
  ) {
    deleteRole(input: $input, condition: $condition) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const createPolicy = /* GraphQL */ `
  mutation CreatePolicy(
    $input: CreatePolicyInput!
    $condition: ModelPolicyConditionInput
  ) {
    createPolicy(input: $input, condition: $condition) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
export const updatePolicy = /* GraphQL */ `
  mutation UpdatePolicy(
    $input: UpdatePolicyInput!
    $condition: ModelPolicyConditionInput
  ) {
    updatePolicy(input: $input, condition: $condition) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
export const deletePolicy = /* GraphQL */ `
  mutation DeletePolicy(
    $input: DeletePolicyInput!
    $condition: ModelPolicyConditionInput
  ) {
    deletePolicy(input: $input, condition: $condition) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
