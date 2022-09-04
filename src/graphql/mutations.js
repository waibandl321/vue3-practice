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
export const createStaffRole = /* GraphQL */ `
  mutation CreateStaffRole(
    $input: CreateStaffRoleInput!
    $condition: ModelStaffRoleConditionInput
  ) {
    createStaffRole(input: $input, condition: $condition) {
      id
      role_cd
      staff_id
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateStaffRole = /* GraphQL */ `
  mutation UpdateStaffRole(
    $input: UpdateStaffRoleInput!
    $condition: ModelStaffRoleConditionInput
  ) {
    updateStaffRole(input: $input, condition: $condition) {
      id
      role_cd
      staff_id
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteStaffRole = /* GraphQL */ `
  mutation DeleteStaffRole(
    $input: DeleteStaffRoleInput!
    $condition: ModelStaffRoleConditionInput
  ) {
    deleteStaffRole(input: $input, condition: $condition) {
      id
      role_cd
      staff_id
      company_cd
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
      status
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
      status
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
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createInvitation = /* GraphQL */ `
  mutation CreateInvitation(
    $input: CreateInvitationInput!
    $condition: ModelInvitationConditionInput
  ) {
    createInvitation(input: $input, condition: $condition) {
      id
      company_cd
      shop_cd
      role_cd
      employee_id
      send_type
      expired_in
      approval
      invitation_id
      send_to
      url
      createdAt
      updatedAt
    }
  }
`;
export const updateInvitation = /* GraphQL */ `
  mutation UpdateInvitation(
    $input: UpdateInvitationInput!
    $condition: ModelInvitationConditionInput
  ) {
    updateInvitation(input: $input, condition: $condition) {
      id
      company_cd
      shop_cd
      role_cd
      employee_id
      send_type
      expired_in
      approval
      invitation_id
      send_to
      url
      createdAt
      updatedAt
    }
  }
`;
export const deleteInvitation = /* GraphQL */ `
  mutation DeleteInvitation(
    $input: DeleteInvitationInput!
    $condition: ModelInvitationConditionInput
  ) {
    deleteInvitation(input: $input, condition: $condition) {
      id
      company_cd
      shop_cd
      role_cd
      employee_id
      send_type
      expired_in
      approval
      invitation_id
      send_to
      url
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
export const createArea = /* GraphQL */ `
  mutation CreateArea(
    $input: CreateAreaInput!
    $condition: ModelAreaConditionInput
  ) {
    createArea(input: $input, condition: $condition) {
      id
      company_area_cd
      area_cd
      area_name
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateArea = /* GraphQL */ `
  mutation UpdateArea(
    $input: UpdateAreaInput!
    $condition: ModelAreaConditionInput
  ) {
    updateArea(input: $input, condition: $condition) {
      id
      company_area_cd
      area_cd
      area_name
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteArea = /* GraphQL */ `
  mutation DeleteArea(
    $input: DeleteAreaInput!
    $condition: ModelAreaConditionInput
  ) {
    deleteArea(input: $input, condition: $condition) {
      id
      company_area_cd
      area_cd
      area_name
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createPosition = /* GraphQL */ `
  mutation CreatePosition(
    $input: CreatePositionInput!
    $condition: ModelPositionConditionInput
  ) {
    createPosition(input: $input, condition: $condition) {
      id
      company_position_cd
      company_cd
      position_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updatePosition = /* GraphQL */ `
  mutation UpdatePosition(
    $input: UpdatePositionInput!
    $condition: ModelPositionConditionInput
  ) {
    updatePosition(input: $input, condition: $condition) {
      id
      company_position_cd
      company_cd
      position_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deletePosition = /* GraphQL */ `
  mutation DeletePosition(
    $input: DeletePositionInput!
    $condition: ModelPositionConditionInput
  ) {
    deletePosition(input: $input, condition: $condition) {
      id
      company_position_cd
      company_cd
      position_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createStaffPosition = /* GraphQL */ `
  mutation CreateStaffPosition(
    $input: CreateStaffPositionInput!
    $condition: ModelStaffPositionConditionInput
  ) {
    createStaffPosition(input: $input, condition: $condition) {
      id
      staff_position_id
      position_cd
      staff_id
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateStaffPosition = /* GraphQL */ `
  mutation UpdateStaffPosition(
    $input: UpdateStaffPositionInput!
    $condition: ModelStaffPositionConditionInput
  ) {
    updateStaffPosition(input: $input, condition: $condition) {
      id
      staff_position_id
      position_cd
      staff_id
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteStaffPosition = /* GraphQL */ `
  mutation DeleteStaffPosition(
    $input: DeleteStaffPositionInput!
    $condition: ModelStaffPositionConditionInput
  ) {
    deleteStaffPosition(input: $input, condition: $condition) {
      id
      staff_position_id
      position_cd
      staff_id
      company_cd
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createShop = /* GraphQL */ `
  mutation CreateShop(
    $input: CreateShopInput!
    $condition: ModelShopConditionInput
  ) {
    createShop(input: $input, condition: $condition) {
      id
      company_shop_cd
      shop_cd
      address
      area_cd
      brand_cd
      company_cd
      shop_name_kana
      shop_name
      phone
      is_head
      francisee_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateShop = /* GraphQL */ `
  mutation UpdateShop(
    $input: UpdateShopInput!
    $condition: ModelShopConditionInput
  ) {
    updateShop(input: $input, condition: $condition) {
      id
      company_shop_cd
      shop_cd
      address
      area_cd
      brand_cd
      company_cd
      shop_name_kana
      shop_name
      phone
      is_head
      francisee_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteShop = /* GraphQL */ `
  mutation DeleteShop(
    $input: DeleteShopInput!
    $condition: ModelShopConditionInput
  ) {
    deleteShop(input: $input, condition: $condition) {
      id
      company_shop_cd
      shop_cd
      address
      area_cd
      brand_cd
      company_cd
      shop_name_kana
      shop_name
      phone
      is_head
      francisee_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createShopTime = /* GraphQL */ `
  mutation CreateShopTime(
    $input: CreateShopTimeInput!
    $condition: ModelShopTimeConditionInput
  ) {
    createShopTime(input: $input, condition: $condition) {
      id
      shop_time_id
      shop_cd
      day_cd
      holiday
      start_time
      end_time
      status
      createdAt
      updatedAt
    }
  }
`;
export const updateShopTime = /* GraphQL */ `
  mutation UpdateShopTime(
    $input: UpdateShopTimeInput!
    $condition: ModelShopTimeConditionInput
  ) {
    updateShopTime(input: $input, condition: $condition) {
      id
      shop_time_id
      shop_cd
      day_cd
      holiday
      start_time
      end_time
      status
      createdAt
      updatedAt
    }
  }
`;
export const deleteShopTime = /* GraphQL */ `
  mutation DeleteShopTime(
    $input: DeleteShopTimeInput!
    $condition: ModelShopTimeConditionInput
  ) {
    deleteShopTime(input: $input, condition: $condition) {
      id
      shop_time_id
      shop_cd
      day_cd
      holiday
      start_time
      end_time
      status
      createdAt
      updatedAt
    }
  }
`;
export const createShopStaff = /* GraphQL */ `
  mutation CreateShopStaff(
    $input: CreateShopStaffInput!
    $condition: ModelShopStaffConditionInput
  ) {
    createShopStaff(input: $input, condition: $condition) {
      id
      shop_staff_id
      shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateShopStaff = /* GraphQL */ `
  mutation UpdateShopStaff(
    $input: UpdateShopStaffInput!
    $condition: ModelShopStaffConditionInput
  ) {
    updateShopStaff(input: $input, condition: $condition) {
      id
      shop_staff_id
      shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteShopStaff = /* GraphQL */ `
  mutation DeleteShopStaff(
    $input: DeleteShopStaffInput!
    $condition: ModelShopStaffConditionInput
  ) {
    deleteShopStaff(input: $input, condition: $condition) {
      id
      shop_staff_id
      shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createShopStaffGroup = /* GraphQL */ `
  mutation CreateShopStaffGroup(
    $input: CreateShopStaffGroupInput!
    $condition: ModelShopStaffGroupConditionInput
  ) {
    createShopStaffGroup(input: $input, condition: $condition) {
      id
      staff_group_cd
      shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
    }
  }
`;
export const updateShopStaffGroup = /* GraphQL */ `
  mutation UpdateShopStaffGroup(
    $input: UpdateShopStaffGroupInput!
    $condition: ModelShopStaffGroupConditionInput
  ) {
    updateShopStaffGroup(input: $input, condition: $condition) {
      id
      staff_group_cd
      shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteShopStaffGroup = /* GraphQL */ `
  mutation DeleteShopStaffGroup(
    $input: DeleteShopStaffGroupInput!
    $condition: ModelShopStaffGroupConditionInput
  ) {
    deleteShopStaffGroup(input: $input, condition: $condition) {
      id
      staff_group_cd
      shop_cd
      group_name
      staff_id
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
