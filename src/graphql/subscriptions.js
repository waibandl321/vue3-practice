/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const onCreateAccounts = /* GraphQL */ `
  subscription OnCreateAccounts($filter: ModelSubscriptionAccountsFilterInput) {
    onCreateAccounts(filter: $filter) {
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
export const onUpdateAccounts = /* GraphQL */ `
  subscription OnUpdateAccounts($filter: ModelSubscriptionAccountsFilterInput) {
    onUpdateAccounts(filter: $filter) {
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
export const onDeleteAccounts = /* GraphQL */ `
  subscription OnDeleteAccounts($filter: ModelSubscriptionAccountsFilterInput) {
    onDeleteAccounts(filter: $filter) {
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
export const onCreateAssociate = /* GraphQL */ `
  subscription OnCreateAssociate(
    $filter: ModelSubscriptionAssociateFilterInput
  ) {
    onCreateAssociate(filter: $filter) {
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
export const onUpdateAssociate = /* GraphQL */ `
  subscription OnUpdateAssociate(
    $filter: ModelSubscriptionAssociateFilterInput
  ) {
    onUpdateAssociate(filter: $filter) {
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
export const onDeleteAssociate = /* GraphQL */ `
  subscription OnDeleteAssociate(
    $filter: ModelSubscriptionAssociateFilterInput
  ) {
    onDeleteAssociate(filter: $filter) {
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
export const onCreateStaff = /* GraphQL */ `
  subscription OnCreateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onCreateStaff(filter: $filter) {
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
export const onUpdateStaff = /* GraphQL */ `
  subscription OnUpdateStaff($filter: ModelSubscriptionStaffFilterInput) {
    onUpdateStaff(filter: $filter) {
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
export const onDeleteStaff = /* GraphQL */ `
  subscription OnDeleteStaff($filter: ModelSubscriptionStaffFilterInput) {
    onDeleteStaff(filter: $filter) {
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
export const onCreateStaffRole = /* GraphQL */ `
  subscription OnCreateStaffRole(
    $filter: ModelSubscriptionStaffRoleFilterInput
  ) {
    onCreateStaffRole(filter: $filter) {
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
export const onUpdateStaffRole = /* GraphQL */ `
  subscription OnUpdateStaffRole(
    $filter: ModelSubscriptionStaffRoleFilterInput
  ) {
    onUpdateStaffRole(filter: $filter) {
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
export const onDeleteStaffRole = /* GraphQL */ `
  subscription OnDeleteStaffRole(
    $filter: ModelSubscriptionStaffRoleFilterInput
  ) {
    onDeleteStaffRole(filter: $filter) {
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
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onCreateEmployee(filter: $filter) {
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onUpdateEmployee(filter: $filter) {
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee($filter: ModelSubscriptionEmployeeFilterInput) {
    onDeleteEmployee(filter: $filter) {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
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
export const onCreateInvitation = /* GraphQL */ `
  subscription OnCreateInvitation(
    $filter: ModelSubscriptionInvitationFilterInput
  ) {
    onCreateInvitation(filter: $filter) {
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
export const onUpdateInvitation = /* GraphQL */ `
  subscription OnUpdateInvitation(
    $filter: ModelSubscriptionInvitationFilterInput
  ) {
    onUpdateInvitation(filter: $filter) {
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
export const onDeleteInvitation = /* GraphQL */ `
  subscription OnDeleteInvitation(
    $filter: ModelSubscriptionInvitationFilterInput
  ) {
    onDeleteInvitation(filter: $filter) {
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
export const onCreateBrand = /* GraphQL */ `
  subscription OnCreateBrand($filter: ModelSubscriptionBrandFilterInput) {
    onCreateBrand(filter: $filter) {
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
export const onUpdateBrand = /* GraphQL */ `
  subscription OnUpdateBrand($filter: ModelSubscriptionBrandFilterInput) {
    onUpdateBrand(filter: $filter) {
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
export const onDeleteBrand = /* GraphQL */ `
  subscription OnDeleteBrand($filter: ModelSubscriptionBrandFilterInput) {
    onDeleteBrand(filter: $filter) {
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
export const onCreateArea = /* GraphQL */ `
  subscription OnCreateArea($filter: ModelSubscriptionAreaFilterInput) {
    onCreateArea(filter: $filter) {
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
export const onUpdateArea = /* GraphQL */ `
  subscription OnUpdateArea($filter: ModelSubscriptionAreaFilterInput) {
    onUpdateArea(filter: $filter) {
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
export const onDeleteArea = /* GraphQL */ `
  subscription OnDeleteArea($filter: ModelSubscriptionAreaFilterInput) {
    onDeleteArea(filter: $filter) {
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
export const onCreatePosition = /* GraphQL */ `
  subscription OnCreatePosition($filter: ModelSubscriptionPositionFilterInput) {
    onCreatePosition(filter: $filter) {
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
export const onUpdatePosition = /* GraphQL */ `
  subscription OnUpdatePosition($filter: ModelSubscriptionPositionFilterInput) {
    onUpdatePosition(filter: $filter) {
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
export const onDeletePosition = /* GraphQL */ `
  subscription OnDeletePosition($filter: ModelSubscriptionPositionFilterInput) {
    onDeletePosition(filter: $filter) {
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
export const onCreateStaffPosition = /* GraphQL */ `
  subscription OnCreateStaffPosition(
    $filter: ModelSubscriptionStaffPositionFilterInput
  ) {
    onCreateStaffPosition(filter: $filter) {
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
export const onUpdateStaffPosition = /* GraphQL */ `
  subscription OnUpdateStaffPosition(
    $filter: ModelSubscriptionStaffPositionFilterInput
  ) {
    onUpdateStaffPosition(filter: $filter) {
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
export const onDeleteStaffPosition = /* GraphQL */ `
  subscription OnDeleteStaffPosition(
    $filter: ModelSubscriptionStaffPositionFilterInput
  ) {
    onDeleteStaffPosition(filter: $filter) {
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
export const onCreateShop = /* GraphQL */ `
  subscription OnCreateShop($filter: ModelSubscriptionShopFilterInput) {
    onCreateShop(filter: $filter) {
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
export const onUpdateShop = /* GraphQL */ `
  subscription OnUpdateShop($filter: ModelSubscriptionShopFilterInput) {
    onUpdateShop(filter: $filter) {
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
export const onDeleteShop = /* GraphQL */ `
  subscription OnDeleteShop($filter: ModelSubscriptionShopFilterInput) {
    onDeleteShop(filter: $filter) {
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
export const onCreateShopTime = /* GraphQL */ `
  subscription OnCreateShopTime($filter: ModelSubscriptionShopTimeFilterInput) {
    onCreateShopTime(filter: $filter) {
      id
      shop_time_id
      company_shop_cd
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
export const onUpdateShopTime = /* GraphQL */ `
  subscription OnUpdateShopTime($filter: ModelSubscriptionShopTimeFilterInput) {
    onUpdateShopTime(filter: $filter) {
      id
      shop_time_id
      company_shop_cd
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
export const onDeleteShopTime = /* GraphQL */ `
  subscription OnDeleteShopTime($filter: ModelSubscriptionShopTimeFilterInput) {
    onDeleteShopTime(filter: $filter) {
      id
      shop_time_id
      company_shop_cd
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
export const onCreateShopStaff = /* GraphQL */ `
  subscription OnCreateShopStaff(
    $filter: ModelSubscriptionShopStaffFilterInput
  ) {
    onCreateShopStaff(filter: $filter) {
      id
      shop_staff_id
      company_shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShopStaff = /* GraphQL */ `
  subscription OnUpdateShopStaff(
    $filter: ModelSubscriptionShopStaffFilterInput
  ) {
    onUpdateShopStaff(filter: $filter) {
      id
      shop_staff_id
      company_shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShopStaff = /* GraphQL */ `
  subscription OnDeleteShopStaff(
    $filter: ModelSubscriptionShopStaffFilterInput
  ) {
    onDeleteShopStaff(filter: $filter) {
      id
      shop_staff_id
      company_shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const onCreateShopStaffGroup = /* GraphQL */ `
  subscription OnCreateShopStaffGroup(
    $filter: ModelSubscriptionShopStaffGroupFilterInput
  ) {
    onCreateShopStaffGroup(filter: $filter) {
      id
      staff_group_cd
      company_shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShopStaffGroup = /* GraphQL */ `
  subscription OnUpdateShopStaffGroup(
    $filter: ModelSubscriptionShopStaffGroupFilterInput
  ) {
    onUpdateShopStaffGroup(filter: $filter) {
      id
      staff_group_cd
      company_shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShopStaffGroup = /* GraphQL */ `
  subscription OnDeleteShopStaffGroup(
    $filter: ModelSubscriptionShopStaffGroupFilterInput
  ) {
    onDeleteShopStaffGroup(filter: $filter) {
      id
      staff_group_cd
      company_shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateRole = /* GraphQL */ `
  subscription OnCreateRole($filter: ModelSubscriptionRoleFilterInput) {
    onCreateRole(filter: $filter) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRole = /* GraphQL */ `
  subscription OnUpdateRole($filter: ModelSubscriptionRoleFilterInput) {
    onUpdateRole(filter: $filter) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRole = /* GraphQL */ `
  subscription OnDeleteRole($filter: ModelSubscriptionRoleFilterInput) {
    onDeleteRole(filter: $filter) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePolicy = /* GraphQL */ `
  subscription OnCreatePolicy($filter: ModelSubscriptionPolicyFilterInput) {
    onCreatePolicy(filter: $filter) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePolicy = /* GraphQL */ `
  subscription OnUpdatePolicy($filter: ModelSubscriptionPolicyFilterInput) {
    onUpdatePolicy(filter: $filter) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePolicy = /* GraphQL */ `
  subscription OnDeletePolicy($filter: ModelSubscriptionPolicyFilterInput) {
    onDeletePolicy(filter: $filter) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
