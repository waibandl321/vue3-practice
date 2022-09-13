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
export const onCreateShopStaffGroupStaff = /* GraphQL */ `
  subscription OnCreateShopStaffGroupStaff(
    $filter: ModelSubscriptionShopStaffGroupStaffFilterInput
  ) {
    onCreateShopStaffGroupStaff(filter: $filter) {
      id
      staff_group_cd
      shop_staff_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateShopStaffGroupStaff = /* GraphQL */ `
  subscription OnUpdateShopStaffGroupStaff(
    $filter: ModelSubscriptionShopStaffGroupStaffFilterInput
  ) {
    onUpdateShopStaffGroupStaff(filter: $filter) {
      id
      staff_group_cd
      shop_staff_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteShopStaffGroupStaff = /* GraphQL */ `
  subscription OnDeleteShopStaffGroupStaff(
    $filter: ModelSubscriptionShopStaffGroupStaffFilterInput
  ) {
    onDeleteShopStaffGroupStaff(filter: $filter) {
      id
      staff_group_cd
      shop_staff_id
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
export const onCreateFileDirTop = /* GraphQL */ `
  subscription OnCreateFileDirTop(
    $filter: ModelSubscriptionFileDirTopFilterInput
  ) {
    onCreateFileDirTop(filter: $filter) {
      id
      organization_id
      function_cd
      dir_id
      level
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateFileDirTop = /* GraphQL */ `
  subscription OnUpdateFileDirTop(
    $filter: ModelSubscriptionFileDirTopFilterInput
  ) {
    onUpdateFileDirTop(filter: $filter) {
      id
      organization_id
      function_cd
      dir_id
      level
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteFileDirTop = /* GraphQL */ `
  subscription OnDeleteFileDirTop(
    $filter: ModelSubscriptionFileDirTopFilterInput
  ) {
    onDeleteFileDirTop(filter: $filter) {
      id
      organization_id
      function_cd
      dir_id
      level
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFileDir = /* GraphQL */ `
  subscription OnCreateFileDir($filter: ModelSubscriptionFileDirFilterInput) {
    onCreateFileDir(filter: $filter) {
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
export const onUpdateFileDir = /* GraphQL */ `
  subscription OnUpdateFileDir($filter: ModelSubscriptionFileDirFilterInput) {
    onUpdateFileDir(filter: $filter) {
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
export const onDeleteFileDir = /* GraphQL */ `
  subscription OnDeleteFileDir($filter: ModelSubscriptionFileDirFilterInput) {
    onDeleteFileDir(filter: $filter) {
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
export const onCreateFileStore = /* GraphQL */ `
  subscription OnCreateFileStore(
    $filter: ModelSubscriptionFileStoreFilterInput
  ) {
    onCreateFileStore(filter: $filter) {
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
export const onUpdateFileStore = /* GraphQL */ `
  subscription OnUpdateFileStore(
    $filter: ModelSubscriptionFileStoreFilterInput
  ) {
    onUpdateFileStore(filter: $filter) {
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
export const onDeleteFileStore = /* GraphQL */ `
  subscription OnDeleteFileStore(
    $filter: ModelSubscriptionFileStoreFilterInput
  ) {
    onDeleteFileStore(filter: $filter) {
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
export const onCreateForum = /* GraphQL */ `
  subscription OnCreateForum($filter: ModelSubscriptionForumFilterInput) {
    onCreateForum(filter: $filter) {
      id
      forum_id
      forum_name
      company_cd
      company_group_cd
      owner_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForum = /* GraphQL */ `
  subscription OnUpdateForum($filter: ModelSubscriptionForumFilterInput) {
    onUpdateForum(filter: $filter) {
      id
      forum_id
      forum_name
      company_cd
      company_group_cd
      owner_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForum = /* GraphQL */ `
  subscription OnDeleteForum($filter: ModelSubscriptionForumFilterInput) {
    onDeleteForum(filter: $filter) {
      id
      forum_id
      forum_name
      company_cd
      company_group_cd
      owner_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForumPost = /* GraphQL */ `
  subscription OnCreateForumPost(
    $filter: ModelSubscriptionForumPostFilterInput
  ) {
    onCreateForumPost(filter: $filter) {
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
  }
`;
export const onUpdateForumPost = /* GraphQL */ `
  subscription OnUpdateForumPost(
    $filter: ModelSubscriptionForumPostFilterInput
  ) {
    onUpdateForumPost(filter: $filter) {
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
  }
`;
export const onDeleteForumPost = /* GraphQL */ `
  subscription OnDeleteForumPost(
    $filter: ModelSubscriptionForumPostFilterInput
  ) {
    onDeleteForumPost(filter: $filter) {
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
  }
`;
export const onCreateForumFile = /* GraphQL */ `
  subscription OnCreateForumFile(
    $filter: ModelSubscriptionForumFileFilterInput
  ) {
    onCreateForumFile(filter: $filter) {
      id
      post_key
      sort_number
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForumFile = /* GraphQL */ `
  subscription OnUpdateForumFile(
    $filter: ModelSubscriptionForumFileFilterInput
  ) {
    onUpdateForumFile(filter: $filter) {
      id
      post_key
      sort_number
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForumFile = /* GraphQL */ `
  subscription OnDeleteForumFile(
    $filter: ModelSubscriptionForumFileFilterInput
  ) {
    onDeleteForumFile(filter: $filter) {
      id
      post_key
      sort_number
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForumUrl = /* GraphQL */ `
  subscription OnCreateForumUrl($filter: ModelSubscriptionForumUrlFilterInput) {
    onCreateForumUrl(filter: $filter) {
      id
      post_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForumUrl = /* GraphQL */ `
  subscription OnUpdateForumUrl($filter: ModelSubscriptionForumUrlFilterInput) {
    onUpdateForumUrl(filter: $filter) {
      id
      post_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForumUrl = /* GraphQL */ `
  subscription OnDeleteForumUrl($filter: ModelSubscriptionForumUrlFilterInput) {
    onDeleteForumUrl(filter: $filter) {
      id
      post_key
      sort_number
      url_key
      url_value
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForumEyecatch = /* GraphQL */ `
  subscription OnCreateForumEyecatch(
    $filter: ModelSubscriptionForumEyecatchFilterInput
  ) {
    onCreateForumEyecatch(filter: $filter) {
      id
      post_key
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForumEyecatch = /* GraphQL */ `
  subscription OnUpdateForumEyecatch(
    $filter: ModelSubscriptionForumEyecatchFilterInput
  ) {
    onUpdateForumEyecatch(filter: $filter) {
      id
      post_key
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForumEyecatch = /* GraphQL */ `
  subscription OnDeleteForumEyecatch(
    $filter: ModelSubscriptionForumEyecatchFilterInput
  ) {
    onDeleteForumEyecatch(filter: $filter) {
      id
      post_key
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onCreateForumTag = /* GraphQL */ `
  subscription OnCreateForumTag($filter: ModelSubscriptionForumTagFilterInput) {
    onCreateForumTag(filter: $filter) {
      id
      post_key
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateForumTag = /* GraphQL */ `
  subscription OnUpdateForumTag($filter: ModelSubscriptionForumTagFilterInput) {
    onUpdateForumTag(filter: $filter) {
      id
      post_key
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteForumTag = /* GraphQL */ `
  subscription OnDeleteForumTag($filter: ModelSubscriptionForumTagFilterInput) {
    onDeleteForumTag(filter: $filter) {
      id
      post_key
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChat = /* GraphQL */ `
  subscription OnCreateChat($filter: ModelSubscriptionChatFilterInput) {
    onCreateChat(filter: $filter) {
      id
      chat_id
      chat_name
      company_cd
      company_group_cd
      owner_id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChat = /* GraphQL */ `
  subscription OnUpdateChat($filter: ModelSubscriptionChatFilterInput) {
    onUpdateChat(filter: $filter) {
      id
      chat_id
      chat_name
      company_cd
      company_group_cd
      owner_id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChat = /* GraphQL */ `
  subscription OnDeleteChat($filter: ModelSubscriptionChatFilterInput) {
    onDeleteChat(filter: $filter) {
      id
      chat_id
      chat_name
      company_cd
      company_group_cd
      owner_id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
      id
      room_id
      room_name
      room_type
      send_notice
      owner_staff_id
      delete
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
      id
      room_id
      room_name
      room_type
      send_notice
      owner_staff_id
      delete
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
      id
      room_id
      room_name
      room_type
      send_notice
      owner_staff_id
      delete
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatRoomMember = /* GraphQL */ `
  subscription OnCreateChatRoomMember(
    $filter: ModelSubscriptionChatRoomMemberFilterInput
  ) {
    onCreateChatRoomMember(filter: $filter) {
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
export const onUpdateChatRoomMember = /* GraphQL */ `
  subscription OnUpdateChatRoomMember(
    $filter: ModelSubscriptionChatRoomMemberFilterInput
  ) {
    onUpdateChatRoomMember(filter: $filter) {
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
export const onDeleteChatRoomMember = /* GraphQL */ `
  subscription OnDeleteChatRoomMember(
    $filter: ModelSubscriptionChatRoomMemberFilterInput
  ) {
    onDeleteChatRoomMember(filter: $filter) {
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
export const onCreateChatPost = /* GraphQL */ `
  subscription OnCreateChatPost($filter: ModelSubscriptionChatPostFilterInput) {
    onCreateChatPost(filter: $filter) {
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
  }
`;
export const onUpdateChatPost = /* GraphQL */ `
  subscription OnUpdateChatPost($filter: ModelSubscriptionChatPostFilterInput) {
    onUpdateChatPost(filter: $filter) {
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
  }
`;
export const onDeleteChatPost = /* GraphQL */ `
  subscription OnDeleteChatPost($filter: ModelSubscriptionChatPostFilterInput) {
    onDeleteChatPost(filter: $filter) {
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
  }
`;
export const onCreateChatFile = /* GraphQL */ `
  subscription OnCreateChatFile($filter: ModelSubscriptionChatFileFilterInput) {
    onCreateChatFile(filter: $filter) {
      id
      chat_key
      sort_number
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateChatFile = /* GraphQL */ `
  subscription OnUpdateChatFile($filter: ModelSubscriptionChatFileFilterInput) {
    onUpdateChatFile(filter: $filter) {
      id
      chat_key
      sort_number
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteChatFile = /* GraphQL */ `
  subscription OnDeleteChatFile($filter: ModelSubscriptionChatFileFilterInput) {
    onDeleteChatFile(filter: $filter) {
      id
      chat_key
      sort_number
      file_id
      data_url
      createdAt
      updatedAt
    }
  }
`;
export const onCreateChatUrl = /* GraphQL */ `
  subscription OnCreateChatUrl($filter: ModelSubscriptionChatUrlFilterInput) {
    onCreateChatUrl(filter: $filter) {
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
export const onUpdateChatUrl = /* GraphQL */ `
  subscription OnUpdateChatUrl($filter: ModelSubscriptionChatUrlFilterInput) {
    onUpdateChatUrl(filter: $filter) {
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
export const onDeleteChatUrl = /* GraphQL */ `
  subscription OnDeleteChatUrl($filter: ModelSubscriptionChatUrlFilterInput) {
    onDeleteChatUrl(filter: $filter) {
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
