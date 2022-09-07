/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      sortNumber
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        sortNumber
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAccounts = /* GraphQL */ `
  query GetAccounts($id: ID!) {
    getAccounts(id: $id) {
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
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        account_id
        sub
        status
        user_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getAssociate = /* GraphQL */ `
  query GetAssociate($id: ID!) {
    getAssociate(id: $id) {
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
export const listAssociates = /* GraphQL */ `
  query ListAssociates(
    $filter: ModelAssociateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAssociates(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getStaff = /* GraphQL */ `
  query GetStaff($id: ID!) {
    getStaff(id: $id) {
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
export const listStaff = /* GraphQL */ `
  query ListStaff(
    $filter: ModelStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaff(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getStaffRole = /* GraphQL */ `
  query GetStaffRole($id: ID!) {
    getStaffRole(id: $id) {
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
export const listStaffRoles = /* GraphQL */ `
  query ListStaffRoles(
    $filter: ModelStaffRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaffRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
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
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
export const listCompanies = /* GraphQL */ `
  query ListCompanies(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInvitation = /* GraphQL */ `
  query GetInvitation($id: ID!) {
    getInvitation(id: $id) {
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
export const listInvitations = /* GraphQL */ `
  query ListInvitations(
    $filter: ModelInvitationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvitations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getBrand = /* GraphQL */ `
  query GetBrand($id: ID!) {
    getBrand(id: $id) {
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
export const listBrands = /* GraphQL */ `
  query ListBrands(
    $filter: ModelBrandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBrands(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getArea = /* GraphQL */ `
  query GetArea($id: ID!) {
    getArea(id: $id) {
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
export const listAreas = /* GraphQL */ `
  query ListAreas(
    $filter: ModelAreaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAreas(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getPosition = /* GraphQL */ `
  query GetPosition($id: ID!) {
    getPosition(id: $id) {
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
export const listPositions = /* GraphQL */ `
  query ListPositions(
    $filter: ModelPositionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getStaffPosition = /* GraphQL */ `
  query GetStaffPosition($id: ID!) {
    getStaffPosition(id: $id) {
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
export const listStaffPositions = /* GraphQL */ `
  query ListStaffPositions(
    $filter: ModelStaffPositionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStaffPositions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getShop = /* GraphQL */ `
  query GetShop($id: ID!) {
    getShop(id: $id) {
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
export const listShops = /* GraphQL */ `
  query ListShops(
    $filter: ModelShopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShops(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getShopTime = /* GraphQL */ `
  query GetShopTime($id: ID!) {
    getShopTime(id: $id) {
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
export const listShopTimes = /* GraphQL */ `
  query ListShopTimes(
    $filter: ModelShopTimeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopTimes(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getShopStaff = /* GraphQL */ `
  query GetShopStaff($id: ID!) {
    getShopStaff(id: $id) {
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
export const listShopStaffs = /* GraphQL */ `
  query ListShopStaffs(
    $filter: ModelShopStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopStaffs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getShopStaffGroup = /* GraphQL */ `
  query GetShopStaffGroup($id: ID!) {
    getShopStaffGroup(id: $id) {
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
export const listShopStaffGroups = /* GraphQL */ `
  query ListShopStaffGroups(
    $filter: ModelShopStaffGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopStaffGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
export const getShopStaffGroupStaff = /* GraphQL */ `
  query GetShopStaffGroupStaff($id: ID!) {
    getShopStaffGroupStaff(id: $id) {
      id
      staff_group_cd
      shop_staff_id
      createdAt
      updatedAt
    }
  }
`;
export const listShopStaffGroupStaffs = /* GraphQL */ `
  query ListShopStaffGroupStaffs(
    $filter: ModelShopStaffGroupStaffFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShopStaffGroupStaffs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
`;
export const getRole = /* GraphQL */ `
  query GetRole($id: ID!) {
    getRole(id: $id) {
      id
      role_cd
      role_name
      createdAt
      updatedAt
    }
  }
`;
export const listRoles = /* GraphQL */ `
  query ListRoles(
    $filter: ModelRoleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        role_cd
        role_name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPolicy = /* GraphQL */ `
  query GetPolicy($id: ID!) {
    getPolicy(id: $id) {
      id
      func_cd
      crud
      createdAt
      updatedAt
    }
  }
`;
export const listPolicies = /* GraphQL */ `
  query ListPolicies(
    $filter: ModelPolicyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPolicies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        func_cd
        crud
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
