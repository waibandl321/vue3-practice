// 各種API処理コール用
// MEMO: 各コンポーネント内に複数のAPI処理ファイルが乱立すると保守性が下がるので、
// 基本的にAPI関連処理は当該ファイルに一纏めにする。
import api_auth from '@/mixins/api/auth.js'
import api_forum from '@/mixins/api/func/forum'
import api_chat from '@/mixins/api/func/chat'
import api_file from '@/mixins/api/func/file'
import api_storage from '@/mixins/storage/storage.js'


export default {
  // 認証
  async apiSignOut () {
    return await api_auth.signout()
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