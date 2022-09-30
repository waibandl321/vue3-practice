// 各種API処理コール用
// MEMO: 各コンポーネント内に複数のAPI処理ファイルが乱立すると保守性が下がるので、
// 基本的にAPI関連処理は当該ファイルに一纏めにする。
import api_forum from '@/mixins/api/func/forum'
import api_file from '@/mixins/api/func/file'

export default {
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
  }
  // チャット
}