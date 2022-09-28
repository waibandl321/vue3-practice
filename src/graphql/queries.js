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
              }
              nextToken
            }
          }
          nextToken
        }
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
        staffs {
          nextToken
        }
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
        roles {
          nextToken
        }
        positions {
          nextToken
        }
        employees {
          nextToken
        }
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
        employees {
          nextToken
        }
        brands {
          nextToken
        }
        positions {
          nextToken
        }
        areas {
          nextToken
        }
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
        shops {
          nextToken
        }
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
        times {
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
            employee {
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
              }
              nextToken
            }
            role {
              items {
                id
                role_cd
                staff_id
                company_cd
              }
              nextToken
            }         
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
            members {
              items {
                id
                staff_group_cd
                shop_staff_id
              }
              nextToken
            }
          }
          nextToken
        }
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
      employee {
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
      role {
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
        employee {
          nextToken
        }
        role {
          nextToken
        }
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
        members {
          nextToken
        }
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
export const getFileDirTop = /* GraphQL */ `
  query GetFileDirTop($id: ID!) {
    getFileDirTop(id: $id) {
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
export const listFileDirTops = /* GraphQL */ `
  query ListFileDirTops(
    $filter: ModelFileDirTopFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFileDirTops(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        organization_id
        function_cd
        dir_id
        level
        company_cd
        dirs {
          nextToken
        }
        files {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFileDir = /* GraphQL */ `
  query GetFileDir($id: ID!) {
    getFileDir(id: $id) {
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
export const listFileDirs = /* GraphQL */ `
  query ListFileDirs(
    $filter: ModelFileDirFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFileDirs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getFileStore = /* GraphQL */ `
  query GetFileStore($id: ID!) {
    getFileStore(id: $id) {
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
export const listFileStores = /* GraphQL */ `
  query ListFileStores(
    $filter: ModelFileStoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFileStores(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getForum = /* GraphQL */ `
  query GetForum($id: ID!) {
    getForum(id: $id) {
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
export const listForums = /* GraphQL */ `
  query ListForums(
    $filter: ModelForumFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForums(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getForumPost = /* GraphQL */ `
  query GetForumPost($id: ID!) {
    getForumPost(id: $id) {
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
export const listForumPosts = /* GraphQL */ `
  query ListForumPosts(
    $filter: ModelForumPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForumPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        files {
          nextToken
        }
        urls {
          nextToken
        }
        eyecatch {
          nextToken
        }
        tags {
          nextToken
        }
        forum {
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
      nextToken
    }
  }
`;
export const getForumFile = /* GraphQL */ `
  query GetForumFile($id: ID!) {
    getForumFile(id: $id) {
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
export const listForumFiles = /* GraphQL */ `
  query ListForumFiles(
    $filter: ModelForumFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForumFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getForumUrl = /* GraphQL */ `
  query GetForumUrl($id: ID!) {
    getForumUrl(id: $id) {
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
export const listForumUrls = /* GraphQL */ `
  query ListForumUrls(
    $filter: ModelForumUrlFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForumUrls(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getForumEyecatch = /* GraphQL */ `
  query GetForumEyecatch($id: ID!) {
    getForumEyecatch(id: $id) {
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
export const listForumEyecatches = /* GraphQL */ `
  query ListForumEyecatches(
    $filter: ModelForumEyecatchFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForumEyecatches(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getForumTag = /* GraphQL */ `
  query GetForumTag($id: ID!) {
    getForumTag(id: $id) {
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
export const listForumTags = /* GraphQL */ `
  query ListForumTags(
    $filter: ModelForumTagFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForumTags(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getForumTagOption = /* GraphQL */ `
  query GetForumTagOption($id: ID!) {
    getForumTagOption(id: $id) {
      id
      forum_id
      forum_tag_name
      company_cd
      createdAt
      updatedAt
    }
  }
`;
export const listForumTagOptions = /* GraphQL */ `
  query ListForumTagOptions(
    $filter: ModelForumTagOptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listForumTagOptions(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getChat = /* GraphQL */ `
  query GetChat($id: ID!) {
    getChat(id: $id) {
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
export const listChats = /* GraphQL */ `
  query ListChats(
    $filter: ModelChatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          }
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        members {
          nextToken
        }
        posts {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getChatRoomMember = /* GraphQL */ `
  query GetChatRoomMember($id: ID!) {
    getChatRoomMember(id: $id) {
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
export const listChatRoomMembers = /* GraphQL */ `
  query ListChatRoomMembers(
    $filter: ModelChatRoomMemberFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomMembers(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getChatPost = /* GraphQL */ `
  query GetChatPost($id: ID!) {
    getChatPost(id: $id) {
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
export const listChatPosts = /* GraphQL */ `
  query ListChatPosts(
    $filter: ModelChatPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
      nextToken
    }
  }
`;
export const getChatFile = /* GraphQL */ `
  query GetChatFile($id: ID!) {
    getChatFile(id: $id) {
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
export const listChatFiles = /* GraphQL */ `
  query ListChatFiles(
    $filter: ModelChatFileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatFiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getChatUrl = /* GraphQL */ `
  query GetChatUrl($id: ID!) {
    getChatUrl(id: $id) {
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
export const listChatUrls = /* GraphQL */ `
  query ListChatUrls(
    $filter: ModelChatUrlFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatUrls(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
`;
