// 各種API処理コール用
import api_auth from '@/mixins/api/auth.js'
import api_account from '@/mixins/api/account.js'
import api_invitation from '@/mixins/api/invitation.js'
import api_company from '@/mixins/api/master/company.js'
import api_brand from '@/mixins/api/master/brand.js'
import api_area from '@/mixins/api/master/area.js'
import api_position from '@/mixins/api/master/position.js'
import api_employee from '@/mixins/api/master/employee.js'
import api_role from '@/mixins/api/master/role.js'
import api_shop from '@/mixins/api/master/shop.js'

import api_forum from '@/mixins/api/func/forum'
import api_chat from '@/mixins/api/func/chat'
import api_file from '@/mixins/api/func/file'

import api_storage from '@/mixins/storage/storage.js'


export default {
  // 認証
  async apiSignOut () {
    return await api_auth.signout()
  },
  async apiEmailSignIn (email, password) {
    return await api_auth.emailSignIn(email, password)
  },
  // アカウント
  apiGetAccount (cognito_user) {
    return api_account.getAccount(cognito_user)
  },
  apiCreateAccount (cognito_user) {
    return api_account.create(cognito_user)
  },
  apiCreateAssociate (account, company, invite_key) {
    return api_account._createAssociate(account, company, invite_key)
  },
  apiCreateStaff (associate, company, invitation, invitation_staff_id) {
    return api_account._createStaff(associate, company, invitation, invitation_staff_id)
  },
  apiCreateStaffRole (staff, invitation_role) {
    return api_account._createStaffRole(staff, invitation_role)
  },
  apiUpdateStaffRole (staff_id, role) {
    return api_account._updateStaffRole(staff_id, role)
  },
  // ストレージ
  apiStorageUploadFunctionFile (file, function_cd) {
    return api_storage.storageUploadFunctionFile(file, function_cd)
  },
  // ファイル管理
  apiGetTopDir () {
    return api_file.apiGetDirTop()
  },
  apiCreateFile (current_dir, file, data_url, func_cd = null) {
    return api_file.createFile(current_dir, file, data_url, func_cd)
  },
  // 企業マスタ
  apiGetCompanyFromInvitation (company_cd) {
    return api_company.getCompanyFromInvitation(company_cd)
  },
  apiGetCompanies () {
    return api_company.getCompanies()
  },
  apiCreateCompany (company) {
    return api_company.create(company)
  },
  apiUpdateCompany (company) {
    return api_company.update(company)
  },
  
  // ブランドマスタ
  apiGetBrands () {
    return api_brand.getBrands()
  },
  apiGetBrandsBySignin (company_cd) {
    return api_brand.getBrandsBySignin(company_cd)
  },
  apiCreateBrand (brand, company) {
    return api_brand.create(brand, company)
  },
  apiUpdateBrand (brand) {
    return api_brand.update(brand)
  },
  // エリアマスタ
  apiGetAreas () {
    return api_area.getAreas()
  },
  apiCreateArea (area) {
    return api_area.create(area)
  },
  apiUpdateArea (area) {
    return api_area.update(area)
  },
  apiDeleteArea (area) {
    return api_area.delete(area)
  },
  // ポジションマスタ
  apiGetPositions () {
    return api_position.getPositions()
  },
  apiCreatePosition (position) {
    return api_position.create(position)
  },
  apiUpdatePosition (position) {
    return api_position.update(position)
  },
  apiDeletePosition (position) {
    return api_position.delete(position)
  },
  // 店舗マスタ
  apiGetShops () {
    return api_shop.getShops()
  },
  apiCreateShop (shop) {
    return api_shop.create(shop)
  },
  apiUpdateShop (shop) {
    return api_shop.update(shop)
  },
  // 店舗スタッフ
  apiCreateShopStaff () {
    return api_shop.createShopStaff()
  },
  apiDeleteShopStaff (staff_id) {
    return api_shop.deleteShopStaff(staff_id)
  },
  // 店舗スタッフグループ
  apiGetStaffGroupStaffs (staff_group) {
    return api_shop.getStaffGroupStaffs(staff_group)
  },
  apiGetStaffGroups (shop) {
    return api_shop.getStaffGroups(shop)
  },
  apiCreateStaffGroup (shop, staff_group_name) {
    return api_shop.createStaffGroup(shop, staff_group_name)
  },
  apiUpdateStaffGroup (shop, staff_group) {
    return api_shop.updateStaffGroup(shop, staff_group)
  },
  apiDeleteStaffGroup (staff_group) {
    return api_shop.deleteStaffGroup(staff_group)
  },
  apiAddStaffGroupStaff (staff_group, staff_id) {
    return api_shop.addStaffGroupStaff(staff_group, staff_id)
  },
  apiDeleteStaffGroupStaff (delete_staff) {
    return api_shop.deleteStaffGroupStaff(delete_staff)
  },
  // 招待
  apiGetInvitation () {
    return api_invitation.getInvitation()
  },
  apiCreateInvitation (employee, invitation) {
    return api_invitation.create(employee, invitation)
  },

  // ロールマスタ
  getSystemRoles () {
    return api_role.getSystemRoleList()
  },

  // 従業員マスタ
  apiGetEmployees () {
    return api_employee.getEmployees()
  },
  apiCreateEmployee (employee, invitation) {
    return api_employee.create(employee, invitation)
  },
  apiUpdateEmployee (employee) {
    return api_employee.update(employee)
  },
  apiGetEmployeeRelateStaffId () {
    return api_employee
  },
  apiGetEmployeeDetail (employee_id) {
    return api_employee.getEmployeeDetail(employee_id)
  },
  // 設備マスタ
  // 掲示板
  apiGetForum () {
    return api_forum.getForum()
  },
  apiCreateForumPost (forum, post) {
    return api_forum.createPost(forum, post)
  },
  apiCreateForumEyecatch (eyecatch, post) {
    return api_forum.createEyecatch(eyecatch, post)
  },
  apiCreateForumFile (file, post) {
    return api_forum.createFile(file, post)
  },
  apiCreateForumLink (url, post) {
    return api_forum.createLink(url, post)
  },
  apiCreateForumTag (tag, post) {
    return api_forum.createTag(tag, post)
  },
  apiCreateForumTagOption (forum, new_option) {
    return api_forum.createTagOption(forum, new_option)
  },

  apiUpdatePost (forum, post) {
    return api_forum.updatePost(forum, post)
  },
  apiUpdateEyecatch (eyecatch, old_eyecatch, post) {
    return api_forum.updateEyecatch(eyecatch, old_eyecatch, post)
  },
  apiUpdateForumLink (url, post) {
    return api_forum.updateLink(url, post)
  },

  apiDeletePost (post) {
    return api_forum.delete(post)
  },
  apiDeleteEyecatch (eyecatch) {
    return api_forum.deleteEyecatch(eyecatch)
  },
  apiDeleteForumFile (file) {
    return api_forum.deleteFile(file)
  },
  apiDeleteForumLink (url) {
    return api_forum.deleteLink(url)
  },
  apiDeleteForumTag (tag) {
    return api_forum.deleteTag(tag)
  },
  // チャット
  apiGetChat () {
    return api_chat.getCompanyChat()
  },
  apiGetChatRooms (chat_id) {
    return api_chat.getChatRooms(chat_id)
  },
  apiChatRoomCreate (room, company_chat) {
    return api_chat.createRooom(room, company_chat)
  },
  apiUpdateChatRoom (room) {
    return api_chat.updateRoom(room)
  },
  apiDeleteChatRoom (room) {
    return api_chat.deleteRoom(room)
  },
  apiCreateFirstChatRoomMember (room, datetime) {
    return api_chat.createInitRoomMember(room, datetime)
  },
  apiAddChatMember (room, member, datetime) {
    return api_chat.addChatMember(room, member, datetime)
  },
  apiUpdateChatMember (current_member, datetime) {
    return api_chat.updateChatMember(current_member, datetime)
  },
  apiDeleteChatMember (member) {
    return api_chat.deleteRoomMember(member)
  },
  apiDeleteRoomMember (member) {
    return api_chat.deleteRoomMember(member)
  },
  apiGetChatMessages (room) {
    return api_chat.getMessages(room)
  },
  apiCreateChatMessage (room, message_text) {
    return api_chat.createChatMessage(room, message_text)
  },
  apiCreateChatMessageFile (post, file, file_store) {
    return api_chat.createChatFile(post, file, file_store)
  },
  apiCreateChatMessageUrl (post, url) {
    return api_chat.createChatUrl(post, url)
  },
  apiDeleteChatMessage (message) {
    return api_chat.deleteChatMessage(message)
  },
  apiDeleteChatMessageFile (file) {
    return api_chat.deleteChatFile(file)
  },
  apiDeleteChatMessageUrl (url) {
    return api_chat.deleteChatUrl(url)
  }
}