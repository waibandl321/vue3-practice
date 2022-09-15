import forumApiFunc from '@/mixins/api/func/forum'
import storageFunc from '@/mixins/storage/storage.js'
import fileApiFunc from '@/mixins/api/func/file'

export default {
  // 作成
  async mixinCreateForumPost (forum, editor, dir_top) {
    const save_post = await forumApiFunc.createPost(forum, editor)
    await this.mixinCreateEyecatch(editor, save_post, dir_top)
    if(editor.files.items.length > 0) {
      await this.mixinCreateFiles(editor.files.items, save_post, dir_top)
    }
    if(editor.urls.items.length > 0) {
      await this.mixinCreateUrls(editor, save_post)
    }
    if(editor.tags.items.length > 0) {
      await this.mixinCreateTags(editor, save_post)
    }
  },
  async mixinCreateEyecatch (editor, save_post, dir_top) {
    if(editor.eyecatch){
      if(!editor.eyecatch.id) {
        editor.eyecatch.data_url = await this.mixinUploadForumFile(editor.eyecatch, "forum_eyecatch")
        await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, "forum")
      }
      await forumApiFunc.createEyecatch(editor.eyecatch, save_post)
      .catch((error) => console.error('forumApiFunc.createEyecatch', error))
    }
  },
  async mixinCreateFiles (files, save_post, dir_top) {
    for (const file of files) {
      if(!file.id) {
        file.data_url = await this.mixinUploadForumFile(file, "forum")
        await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
      }
      await forumApiFunc.createFiles(file, save_post)
      .catch((error) => console.error('forumApiFunc.createFiles', error))
    }
  },
  async mixinCreateUrls (editor, save_post) {
    for (const url of editor.urls.items) {
      await forumApiFunc.createLinks(url, save_post)
      .catch((error) => console.error('forumApiFunc.createLinks', error))
    }
  },
  async mixinCreateTags (editor, save_post) {
    for (const tag of editor.tags.items) {
      await forumApiFunc.createTags(tag, save_post)
      .catch((error) => console.error('forumApiFunc.createTags', error))
    }
  },
  // 更新
  async mixinUpdateForumPost () {
    
  },
  async mixinUpdateTags (tags, post_data) {
    for (const tag of tags) {
      await forumApiFunc.updateTag(tag, post_data)
      .catch((error) => console.error('forumApiFunc.updateTag', error))
    }
  },
  // S3アップロード
  async mixinUploadForumFile (file, function_cd) {
    return await storageFunc.storageUploadFunctionFile(file, function_cd)
    .catch((error) => console.error('storageFunc.storageUploadFunctionFile', error))
  },
  // ファイル管理に保存
  async mixinSaveForumFileDatabase (dir_top, file, data_url, function_cd) {
    await fileApiFunc.apiCreateUploadFile(
      dir_top,
      file,
      data_url,
      function_cd
    ).catch((error) => console.error('fileApiFunc.apiCreateUploadFile', error))
  },
  // 削除
  async mixinDeleteForumPost (post) {
    await forumApiFunc.delete(post).catch((error) => console.error('deleteForumPost', error))
    // アイキャッチ
    if(post.eyecatch.items.length > 0) {
      await forumApiFunc.deleteEyecatch(...post.eyecatch.items)
      .catch((error) => console.error('deleteForumEyecatch', error))
    }
    // 添付ファイル
    if(post.files.items.length > 0) {
      // TODO: ファイル管理、ストレージにあるデータを残すか要検討
      for (const file of post.files.items ) {
        await forumApiFunc.deleteFile(file).catch((error) => console.error('deleteForumFile', error))
      }
    }
    // URL
    if(post.urls.items.length > 0) {
      for (const url of post.urls.items ) {
        await forumApiFunc.deleteLink(url).catch((error) => console.error('deleteForumUrl', error))
      }
    }
    // タグ
    if(post.tags.items.length > 0) {
      for (const tag of post.tags.items ) {
        await forumApiFunc.deleteTag(tag).catch((error) => console.error('deleteForumTag', error))
      }
    }
  }
}