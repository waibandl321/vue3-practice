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
      associate {
        items {
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
        nextToken
      }
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
      associate {
        items {
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
        nextToken
      }
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
      associate {
        items {
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
        nextToken
      }
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
      staffs {
        items {
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
        nextToken
      }
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
      staffs {
        items {
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
        nextToken
      }
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
      staffs {
        items {
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
        nextToken
      }
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
      roles {
        items {
          id
          role_cd
          staff_id
          company_cd
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      positions {
        items {
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
        nextToken
      }
      employees {
        items {
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
        nextToken
      }
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
      roles {
        items {
          id
          role_cd
          staff_id
          company_cd
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      positions {
        items {
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
        nextToken
      }
      employees {
        items {
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
        nextToken
      }
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
      roles {
        items {
          id
          role_cd
          staff_id
          company_cd
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      positions {
        items {
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
        nextToken
      }
      employees {
        items {
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
        nextToken
      }
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
      employees {
        items {
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
        nextToken
      }
      brands {
        items {
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
        nextToken
      }
      positions {
        items {
          id
          company_position_cd
          company_cd
          position_cd
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      areas {
        items {
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
        nextToken
      }
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
      employees {
        items {
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
        nextToken
      }
      brands {
        items {
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
        nextToken
      }
      positions {
        items {
          id
          company_position_cd
          company_cd
          position_cd
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      areas {
        items {
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
        nextToken
      }
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
      employees {
        items {
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
        nextToken
      }
      brands {
        items {
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
        nextToken
      }
      positions {
        items {
          id
          company_position_cd
          company_cd
          position_cd
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      areas {
        items {
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
        nextToken
      }
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
      shops {
        items {
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
        nextToken
      }
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
      shops {
        items {
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
        nextToken
      }
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
      shops {
        items {
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
        nextToken
      }
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
      times {
        items {
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
        nextToken
      }
      staffs {
        items {
          id
          shop_staff_id
          company_shop_cd
          staff_id
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      groups {
        items {
          id
          staff_group_cd
          company_shop_cd
          group_name
          staff_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
      times {
        items {
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
        nextToken
      }
      staffs {
        items {
          id
          shop_staff_id
          company_shop_cd
          staff_id
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      groups {
        items {
          id
          staff_group_cd
          company_shop_cd
          group_name
          staff_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
      times {
        items {
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
        nextToken
      }
      staffs {
        items {
          id
          shop_staff_id
          company_shop_cd
          staff_id
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      groups {
        items {
          id
          staff_group_cd
          company_shop_cd
          group_name
          staff_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
export const updateShopTime = /* GraphQL */ `
  mutation UpdateShopTime(
    $input: UpdateShopTimeInput!
    $condition: ModelShopTimeConditionInput
  ) {
    updateShopTime(input: $input, condition: $condition) {
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
export const deleteShopTime = /* GraphQL */ `
  mutation DeleteShopTime(
    $input: DeleteShopTimeInput!
    $condition: ModelShopTimeConditionInput
  ) {
    deleteShopTime(input: $input, condition: $condition) {
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
export const createShopStaff = /* GraphQL */ `
  mutation CreateShopStaff(
    $input: CreateShopStaffInput!
    $condition: ModelShopStaffConditionInput
  ) {
    createShopStaff(input: $input, condition: $condition) {
      id
      shop_staff_id
      company_shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
      employee {
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
      company_shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
      employee {
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
      company_shop_cd
      staff_id
      status
      delete
      createdAt
      updatedAt
      employee {
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
      company_shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
      members {
        items {
          id
          staff_group_cd
          shop_staff_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
      company_shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
      members {
        items {
          id
          staff_group_cd
          shop_staff_id
          createdAt
          updatedAt
        }
        nextToken
      }
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
      company_shop_cd
      group_name
      staff_id
      createdAt
      updatedAt
      members {
        items {
          id
          staff_group_cd
          shop_staff_id
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createShopStaffGroupStaff = /* GraphQL */ `
  mutation CreateShopStaffGroupStaff(
    $input: CreateShopStaffGroupStaffInput!
    $condition: ModelShopStaffGroupStaffConditionInput
  ) {
    createShopStaffGroupStaff(input: $input, condition: $condition) {
      id
      staff_group_cd
      shop_staff_id
      createdAt
      updatedAt
    }
  }
`;
export const updateShopStaffGroupStaff = /* GraphQL */ `
  mutation UpdateShopStaffGroupStaff(
    $input: UpdateShopStaffGroupStaffInput!
    $condition: ModelShopStaffGroupStaffConditionInput
  ) {
    updateShopStaffGroupStaff(input: $input, condition: $condition) {
      id
      staff_group_cd
      shop_staff_id
      createdAt
      updatedAt
    }
  }
`;
export const deleteShopStaffGroupStaff = /* GraphQL */ `
  mutation DeleteShopStaffGroupStaff(
    $input: DeleteShopStaffGroupStaffInput!
    $condition: ModelShopStaffGroupStaffConditionInput
  ) {
    deleteShopStaffGroupStaff(input: $input, condition: $condition) {
      id
      staff_group_cd
      shop_staff_id
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
export const createFileDirTop = /* GraphQL */ `
  mutation CreateFileDirTop(
    $input: CreateFileDirTopInput!
    $condition: ModelFileDirTopConditionInput
  ) {
    createFileDirTop(input: $input, condition: $condition) {
      id
      organization_id
      function_cd
      dir_id
      level
      company_cd
      dirs {
        items {
          id
          dir_id
          dir_name
          parent_dir_id
          company_cd
          level
          status
          permission
          createdAt
          updatedAt
        }
        nextToken
      }
      files {
        items {
          id
          company_cd
          dir_id
          function_cd
          file_name
          file_size
          owner_id
          data_url
          store_type
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateFileDirTop = /* GraphQL */ `
  mutation UpdateFileDirTop(
    $input: UpdateFileDirTopInput!
    $condition: ModelFileDirTopConditionInput
  ) {
    updateFileDirTop(input: $input, condition: $condition) {
      id
      organization_id
      function_cd
      dir_id
      level
      company_cd
      dirs {
        items {
          id
          dir_id
          dir_name
          parent_dir_id
          company_cd
          level
          status
          permission
          createdAt
          updatedAt
        }
        nextToken
      }
      files {
        items {
          id
          company_cd
          dir_id
          function_cd
          file_name
          file_size
          owner_id
          data_url
          store_type
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteFileDirTop = /* GraphQL */ `
  mutation DeleteFileDirTop(
    $input: DeleteFileDirTopInput!
    $condition: ModelFileDirTopConditionInput
  ) {
    deleteFileDirTop(input: $input, condition: $condition) {
      id
      organization_id
      function_cd
      dir_id
      level
      company_cd
      dirs {
        items {
          id
          dir_id
          dir_name
          parent_dir_id
          company_cd
          level
          status
          permission
          createdAt
          updatedAt
        }
        nextToken
      }
      files {
        items {
          id
          company_cd
          dir_id
          function_cd
          file_name
          file_size
          owner_id
          data_url
          store_type
          status
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createFileDir = /* GraphQL */ `
  mutation CreateFileDir(
    $input: CreateFileDirInput!
    $condition: ModelFileDirConditionInput
  ) {
    createFileDir(input: $input, condition: $condition) {
      id
      dir_id
      dir_name
      parent_dir_id
      company_cd
      level
      status
      permission
      createdAt
      updatedAt
    }
  }
`;
export const updateFileDir = /* GraphQL */ `
  mutation UpdateFileDir(
    $input: UpdateFileDirInput!
    $condition: ModelFileDirConditionInput
  ) {
    updateFileDir(input: $input, condition: $condition) {
      id
      dir_id
      dir_name
      parent_dir_id
      company_cd
      level
      status
      permission
      createdAt
      updatedAt
    }
  }
`;
export const deleteFileDir = /* GraphQL */ `
  mutation DeleteFileDir(
    $input: DeleteFileDirInput!
    $condition: ModelFileDirConditionInput
  ) {
    deleteFileDir(input: $input, condition: $condition) {
      id
      dir_id
      dir_name
      parent_dir_id
      company_cd
      level
      status
      permission
      createdAt
      updatedAt
    }
  }
`;
export const createFileStore = /* GraphQL */ `
  mutation CreateFileStore(
    $input: CreateFileStoreInput!
    $condition: ModelFileStoreConditionInput
  ) {
    createFileStore(input: $input, condition: $condition) {
      id
      company_cd
      dir_id
      function_cd
      file_name
      file_size
      owner_id
      data_url
      store_type
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const updateFileStore = /* GraphQL */ `
  mutation UpdateFileStore(
    $input: UpdateFileStoreInput!
    $condition: ModelFileStoreConditionInput
  ) {
    updateFileStore(input: $input, condition: $condition) {
      id
      company_cd
      dir_id
      function_cd
      file_name
      file_size
      owner_id
      data_url
      store_type
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const deleteFileStore = /* GraphQL */ `
  mutation DeleteFileStore(
    $input: DeleteFileStoreInput!
    $condition: ModelFileStoreConditionInput
  ) {
    deleteFileStore(input: $input, condition: $condition) {
      id
      company_cd
      dir_id
      function_cd
      file_name
      file_size
      owner_id
      data_url
      store_type
      status
      delete
      createdAt
      updatedAt
    }
  }
`;
export const createForum = /* GraphQL */ `
  mutation CreateForum(
    $input: CreateForumInput!
    $condition: ModelForumConditionInput
  ) {
    createForum(input: $input, condition: $condition) {
      id
      forum_id
      forum_name
      company_cd
      company_group_cd
      owner_id
      posts {
        items {
          id
          post_key
          forum_id
          title
          post_text
          attached
          url_links
          status
          importance
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      tag_options {
        items {
          id
          forum_id
          forum_tag_name
          company_cd
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateForum = /* GraphQL */ `
  mutation UpdateForum(
    $input: UpdateForumInput!
    $condition: ModelForumConditionInput
  ) {
    updateForum(input: $input, condition: $condition) {
      id
      forum_id
      forum_name
      company_cd
      company_group_cd
      owner_id
      posts {
        items {
          id
          post_key
          forum_id
          title
          post_text
          attached
          url_links
          status
          importance
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      tag_options {
        items {
          id
          forum_id
          forum_tag_name
          company_cd
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteForum = /* GraphQL */ `
  mutation DeleteForum(
    $input: DeleteForumInput!
    $condition: ModelForumConditionInput
  ) {
    deleteForum(input: $input, condition: $condition) {
      id
      forum_id
      forum_name
      company_cd
      company_group_cd
      owner_id
      posts {
        items {
          id
          post_key
          forum_id
          title
          post_text
          attached
          url_links
          status
          importance
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
      tag_options {
        items {
          id
          forum_id
          forum_tag_name
          company_cd
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createForumPost = /* GraphQL */ `
  mutation CreateForumPost(
    $input: CreateForumPostInput!
    $condition: ModelForumPostConditionInput
  ) {
    createForumPost(input: $input, condition: $condition) {
      id
      post_key
      forum_id
      title
      post_text
      attached
      url_links
      status
      importance
      delete
      createdAt
      updatedAt
      files {
        items {
          id
          post_id
          post_key
          sort_number
          file_id
          file_name
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      urls {
        items {
          id
          post_id
          post_key
          sort_number
          url_key
          url_value
          createdAt
          updatedAt
        }
        nextToken
      }
      eyecatch {
        items {
          id
          post_id
          post_key
          file_id
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          post_id
          post_key
          sort_number
          forum_tag_name
          company_cd
          createdAt
          updatedAt
        }
        nextToken
      }
      forum {
        id
        forum_id
        forum_name
        company_cd
        company_group_cd
        owner_id
        posts {
          nextToken
        }
        tag_options {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateForumPost = /* GraphQL */ `
  mutation UpdateForumPost(
    $input: UpdateForumPostInput!
    $condition: ModelForumPostConditionInput
  ) {
    updateForumPost(input: $input, condition: $condition) {
      id
      post_key
      forum_id
      title
      post_text
      attached
      url_links
      status
      importance
      delete
      createdAt
      updatedAt
      files {
        items {
          id
          post_id
          post_key
          sort_number
          file_id
          file_name
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      urls {
        items {
          id
          post_id
          post_key
          sort_number
          url_key
          url_value
          createdAt
          updatedAt
        }
        nextToken
      }
      eyecatch {
        items {
          id
          post_id
          post_key
          file_id
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          post_id
          post_key
          sort_number
          forum_tag_name
          company_cd
          createdAt
          updatedAt
        }
        nextToken
      }
      forum {
        id
        forum_id
        forum_name
        company_cd
        company_group_cd
        owner_id
        posts {
          nextToken
        }
        tag_options {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteForumPost = /* GraphQL */ `
  mutation DeleteForumPost(
    $input: DeleteForumPostInput!
    $condition: ModelForumPostConditionInput
  ) {
    deleteForumPost(input: $input, condition: $condition) {
      id
      post_key
      forum_id
      title
      post_text
      attached
      url_links
      status
      importance
      delete
      createdAt
      updatedAt
      files {
        items {
          id
          post_id
          post_key
          sort_number
          file_id
          file_name
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      urls {
        items {
          id
          post_id
          post_key
          sort_number
          url_key
          url_value
          createdAt
          updatedAt
        }
        nextToken
      }
      eyecatch {
        items {
          id
          post_id
          post_key
          file_id
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      tags {
        items {
          id
          post_id
          post_key
          sort_number
          forum_tag_name
          company_cd
          createdAt
          updatedAt
        }
        nextToken
      }
      forum {
        id
        forum_id
        forum_name
        company_cd
        company_group_cd
        owner_id
        posts {
          nextToken
        }
        tag_options {
          nextToken
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const createForumFile = /* GraphQL */ `
  mutation CreateForumFile(
    $input: CreateForumFileInput!
    $condition: ModelForumFileConditionInput
  ) {
    createForumFile(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      file_id
      file_name
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const updateForumFile = /* GraphQL */ `
  mutation UpdateForumFile(
    $input: UpdateForumFileInput!
    $condition: ModelForumFileConditionInput
  ) {
    updateForumFile(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      file_id
      file_name
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const deleteForumFile = /* GraphQL */ `
  mutation DeleteForumFile(
    $input: DeleteForumFileInput!
    $condition: ModelForumFileConditionInput
  ) {
    deleteForumFile(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      file_id
      file_name
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const createForumUrl = /* GraphQL */ `
  mutation CreateForumUrl(
    $input: CreateForumUrlInput!
    $condition: ModelForumUrlConditionInput
  ) {
    createForumUrl(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const updateForumUrl = /* GraphQL */ `
  mutation UpdateForumUrl(
    $input: UpdateForumUrlInput!
    $condition: ModelForumUrlConditionInput
  ) {
    updateForumUrl(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const deleteForumUrl = /* GraphQL */ `
  mutation DeleteForumUrl(
    $input: DeleteForumUrlInput!
    $condition: ModelForumUrlConditionInput
  ) {
    deleteForumUrl(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const createForumEyecatch = /* GraphQL */ `
  mutation CreateForumEyecatch(
    $input: CreateForumEyecatchInput!
    $condition: ModelForumEyecatchConditionInput
  ) {
    createForumEyecatch(input: $input, condition: $condition) {
      id
      post_id
      post_key
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const updateForumEyecatch = /* GraphQL */ `
  mutation UpdateForumEyecatch(
    $input: UpdateForumEyecatchInput!
    $condition: ModelForumEyecatchConditionInput
  ) {
    updateForumEyecatch(input: $input, condition: $condition) {
      id
      post_id
      post_key
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const deleteForumEyecatch = /* GraphQL */ `
  mutation DeleteForumEyecatch(
    $input: DeleteForumEyecatchInput!
    $condition: ModelForumEyecatchConditionInput
  ) {
    deleteForumEyecatch(input: $input, condition: $condition) {
      id
      post_id
      post_key
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const createForumTag = /* GraphQL */ `
  mutation CreateForumTag(
    $input: CreateForumTagInput!
    $condition: ModelForumTagConditionInput
  ) {
    createForumTag(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const updateForumTag = /* GraphQL */ `
  mutation UpdateForumTag(
    $input: UpdateForumTagInput!
    $condition: ModelForumTagConditionInput
  ) {
    updateForumTag(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const deleteForumTag = /* GraphQL */ `
  mutation DeleteForumTag(
    $input: DeleteForumTagInput!
    $condition: ModelForumTagConditionInput
  ) {
    deleteForumTag(input: $input, condition: $condition) {
      id
      post_id
      post_key
      sort_number
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const createForumTagOption = /* GraphQL */ `
  mutation CreateForumTagOption(
    $input: CreateForumTagOptionInput!
    $condition: ModelForumTagOptionConditionInput
  ) {
    createForumTagOption(input: $input, condition: $condition) {
      id
      forum_id
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const updateForumTagOption = /* GraphQL */ `
  mutation UpdateForumTagOption(
    $input: UpdateForumTagOptionInput!
    $condition: ModelForumTagOptionConditionInput
  ) {
    updateForumTagOption(input: $input, condition: $condition) {
      id
      forum_id
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const deleteForumTagOption = /* GraphQL */ `
  mutation DeleteForumTagOption(
    $input: DeleteForumTagOptionInput!
    $condition: ModelForumTagOptionConditionInput
  ) {
    deleteForumTagOption(input: $input, condition: $condition) {
      id
      forum_id
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const createChat = /* GraphQL */ `
  mutation CreateChat(
    $input: CreateChatInput!
    $condition: ModelChatConditionInput
  ) {
    createChat(input: $input, condition: $condition) {
      id
      chat_id
      chat_name
      company_cd
      company_group_cd
      owner_id
      rooms {
        items {
          id
          room_id
          room_name
          room_type
          send_notice
          owner_staff_id
          delete
          chat_id
          createdAt
          updatedAt
        }
        nextToken
      }
      company_employees {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChat = /* GraphQL */ `
  mutation UpdateChat(
    $input: UpdateChatInput!
    $condition: ModelChatConditionInput
  ) {
    updateChat(input: $input, condition: $condition) {
      id
      chat_id
      chat_name
      company_cd
      company_group_cd
      owner_id
      rooms {
        items {
          id
          room_id
          room_name
          room_type
          send_notice
          owner_staff_id
          delete
          chat_id
          createdAt
          updatedAt
        }
        nextToken
      }
      company_employees {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChat = /* GraphQL */ `
  mutation DeleteChat(
    $input: DeleteChatInput!
    $condition: ModelChatConditionInput
  ) {
    deleteChat(input: $input, condition: $condition) {
      id
      chat_id
      chat_name
      company_cd
      company_group_cd
      owner_id
      rooms {
        items {
          id
          room_id
          room_name
          room_type
          send_notice
          owner_staff_id
          delete
          chat_id
          createdAt
          updatedAt
        }
        nextToken
      }
      company_employees {
        items {
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
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      room_id
      room_name
      room_type
      send_notice
      owner_staff_id
      delete
      chat_id
      createdAt
      updatedAt
      members {
        items {
          id
          room_id
          member_id
          send_notice
          room_name
          ignore
          last_access
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          chat_key
          room_id
          attached
          post_text
          url_links
          poster_ids
          mentions
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      room_id
      room_name
      room_type
      send_notice
      owner_staff_id
      delete
      chat_id
      createdAt
      updatedAt
      members {
        items {
          id
          room_id
          member_id
          send_notice
          room_name
          ignore
          last_access
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          chat_key
          room_id
          attached
          post_text
          url_links
          poster_ids
          mentions
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      room_id
      room_name
      room_type
      send_notice
      owner_staff_id
      delete
      chat_id
      createdAt
      updatedAt
      members {
        items {
          id
          room_id
          member_id
          send_notice
          room_name
          ignore
          last_access
          createdAt
          updatedAt
        }
        nextToken
      }
      posts {
        items {
          id
          chat_key
          room_id
          attached
          post_text
          url_links
          poster_ids
          mentions
          delete
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createChatRoomMember = /* GraphQL */ `
  mutation CreateChatRoomMember(
    $input: CreateChatRoomMemberInput!
    $condition: ModelChatRoomMemberConditionInput
  ) {
    createChatRoomMember(input: $input, condition: $condition) {
      id
      room_id
      member_id
      send_notice
      room_name
      ignore
      last_access
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoomMember = /* GraphQL */ `
  mutation UpdateChatRoomMember(
    $input: UpdateChatRoomMemberInput!
    $condition: ModelChatRoomMemberConditionInput
  ) {
    updateChatRoomMember(input: $input, condition: $condition) {
      id
      room_id
      member_id
      send_notice
      room_name
      ignore
      last_access
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoomMember = /* GraphQL */ `
  mutation DeleteChatRoomMember(
    $input: DeleteChatRoomMemberInput!
    $condition: ModelChatRoomMemberConditionInput
  ) {
    deleteChatRoomMember(input: $input, condition: $condition) {
      id
      room_id
      member_id
      send_notice
      room_name
      ignore
      last_access
      createdAt
      updatedAt
    }
  }
`;
export const createChatPost = /* GraphQL */ `
  mutation CreateChatPost(
    $input: CreateChatPostInput!
    $condition: ModelChatPostConditionInput
  ) {
    createChatPost(input: $input, condition: $condition) {
      id
      chat_key
      room_id
      attached
      post_text
      url_links
      poster_ids
      mentions
      delete
      createdAt
      updatedAt
      files {
        items {
          id
          chat_key
          sort_number
          file_id
          file_name
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      urls {
        items {
          id
          chat_key
          sort_number
          url_key
          url_value
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const updateChatPost = /* GraphQL */ `
  mutation UpdateChatPost(
    $input: UpdateChatPostInput!
    $condition: ModelChatPostConditionInput
  ) {
    updateChatPost(input: $input, condition: $condition) {
      id
      chat_key
      room_id
      attached
      post_text
      url_links
      poster_ids
      mentions
      delete
      createdAt
      updatedAt
      files {
        items {
          id
          chat_key
          sort_number
          file_id
          file_name
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      urls {
        items {
          id
          chat_key
          sort_number
          url_key
          url_value
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const deleteChatPost = /* GraphQL */ `
  mutation DeleteChatPost(
    $input: DeleteChatPostInput!
    $condition: ModelChatPostConditionInput
  ) {
    deleteChatPost(input: $input, condition: $condition) {
      id
      chat_key
      room_id
      attached
      post_text
      url_links
      poster_ids
      mentions
      delete
      createdAt
      updatedAt
      files {
        items {
          id
          chat_key
          sort_number
          file_id
          file_name
          data_url
          createdAt
          updatedAt
        }
        nextToken
      }
      urls {
        items {
          id
          chat_key
          sort_number
          url_key
          url_value
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const createChatFile = /* GraphQL */ `
  mutation CreateChatFile(
    $input: CreateChatFileInput!
    $condition: ModelChatFileConditionInput
  ) {
    createChatFile(input: $input, condition: $condition) {
      id
      chat_key
      sort_number
      file_id
      file_name
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const updateChatFile = /* GraphQL */ `
  mutation UpdateChatFile(
    $input: UpdateChatFileInput!
    $condition: ModelChatFileConditionInput
  ) {
    updateChatFile(input: $input, condition: $condition) {
      id
      chat_key
      sort_number
      file_id
      file_name
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatFile = /* GraphQL */ `
  mutation DeleteChatFile(
    $input: DeleteChatFileInput!
    $condition: ModelChatFileConditionInput
  ) {
    deleteChatFile(input: $input, condition: $condition) {
      id
      chat_key
      sort_number
      file_id
      file_name
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const createChatUrl = /* GraphQL */ `
  mutation CreateChatUrl(
    $input: CreateChatUrlInput!
    $condition: ModelChatUrlConditionInput
  ) {
    createChatUrl(input: $input, condition: $condition) {
      id
      chat_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const updateChatUrl = /* GraphQL */ `
  mutation UpdateChatUrl(
    $input: UpdateChatUrlInput!
    $condition: ModelChatUrlConditionInput
  ) {
    updateChatUrl(input: $input, condition: $condition) {
      id
      chat_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatUrl = /* GraphQL */ `
  mutation DeleteChatUrl(
    $input: DeleteChatUrlInput!
    $condition: ModelChatUrlConditionInput
  ) {
    deleteChatUrl(input: $input, condition: $condition) {
      id
      chat_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
