import forumApiFunc from '@/mixins/api/func/forum'
import storageFunc from '@/mixins/storage/storage.js'
import fileApiFunc from '@/mixins/api/func/file'

export default {
  // 作成
  async mixinCreateEyecatch (editor, save_post, dir_top) {
    if(editor.eyecatch){
      if(!editor.eyecatch.id) {
        editor.eyecatch.data_url = await this.mixinUploadForumFile(editor.eyecatch, "forum_eyecatch")
        await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, "forum")
      }
      await forumApiFunc.createEyecatch(editor.eyecatch, save_post)
      .catch((error) => console.error('forumApiFunc.createEyecatch', error))
    }
    return;
  },
  async mixinCreateFiles (files, save_post, dir_top) {
    if(files.length > 0) {
      for (const file of files) {
        if(!file.id) {
          file.data_url = await this.mixinUploadForumFile(file, "forum")
          await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
        }
        await forumApiFunc.createFile(file, save_post)
        .catch((error) => console.error('forumApiFunc.createFile', error))
      }
    }
    return;
  },
  async mixinCreateUrls (editor, save_post) {
    if(editor.urls.items.length > 0) {
      for (const url of editor.urls.items) {
        await forumApiFunc.createLink(url, save_post)
        .catch((error) => console.error('forumApiFunc.createLink', error))
      }
    }
    return;
  },
  async mixinCreateTags (editor, save_post) {
    if(editor.tags.items.length > 0) {
      for (const tag of editor.tags.items) {
        await forumApiFunc.createTag(tag, save_post)
        .catch((error) => console.error('forumApiFunc.createTag', error))
      }
    }
    return;
  },
  async mixinCreateTagOptions (forum, tag_options) {
    const new_tag_options = tag_options.filter(t => !t.id && !t.forum_id)
    console.log('new_tag_options', new_tag_options);
    if(new_tag_options.length > 0) {
      for (const new_option of new_tag_options) {
        await forumApiFunc.createTagOption(forum, new_option)
      }
    }
  },
  // 更新
  async mixinUpdateForumPost () {
    
  },
  // アイキャッチ更新
  async mixinUpdateEyecatch (editor, dir_top) {
    const uploadNew = async () => {
      editor.eyecatch.data_url = await this.mixinUploadForumFile(editor.eyecatch, "forum_eyecatch")
      await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, "forum")
    }
    // 削除
    if(!editor.eyecatch && editor.old_eyecatch.length > 0) {
      await forumApiFunc.deleteEyecatch(...editor.old_eyecatch)
    }
    // 更新
    if(editor.eyecatch) {
      if(editor.old_eyecatch.length > 0 && !editor.eyecatch.post_key) {
        // ローカルから画像アップロードして更新
        if (!editor.eyecatch.id) {
          await uploadNew()
        }
        await forumApiFunc.updateEyecatch(editor.eyecatch, ...editor.old_eyecatch, editor)
        .catch((error) => console.log('forumApiFunc.updateEyecatch', error))
      }
      // 新規登録
      if(editor.old_eyecatch.length === 0) {
        if (!editor.eyecatch.id) {
          await uploadNew()
        }
        await forumApiFunc.createEyecatch(editor.eyecatch, editor)
      }
    }
  },
  // URL更新
  async mixinUpdateLinks (editor, delete_urls) {
    const urls = editor.urls.items
    const old_urls = editor.old_urls.filter(v => !v.uid)
    // 初期値なし ＋ 新規追加
    if(old_urls.length === 0) {
      for (const url of urls) {
        console.log('add new url', url);
        await forumApiFunc.createLink(url, editor)
      }
    }
    // 初期値あり
    if(old_urls.length > 0) {
      if(urls.length > 0) {
        for (const url of urls) {
          // 追加
          if(!url.id && url.uid) {
            await forumApiFunc.createLink(url, editor)
          }
          // 上書き更新
          if(old_urls.find(v => v.id === url.id)) {
            await forumApiFunc.updateLink(url, editor)
          }
        }
      }
      // 削除
      if(delete_urls.length > 0) {
        for (const url of delete_urls) {
          console.log('delete url', url);
          await forumApiFunc.deleteLink(url, editor)
        }
      }
    }
  },
  // 添付ファイル更新
  async mixinUpdateFiles (editor, delete_files, dir_top) {
    const files = editor.files.items
    const old_files = editor.old_files.filter(v => v.post_key)

    // 初期値なし ＋ 新規追加
    if(old_files.length === 0 && files.length > 0) {
      for (const file of files) {
        if(file.id) {
          console.log('forum file new', file);
          await forumApiFunc.createFile(file, editor)
        } else {
          console.log('forum local file add', file);
          file.data_url = await this.mixinUploadForumFile(file, "forum")
          await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
        }
      }
    }
    if(old_files.length > 0) {
      // 差分
      if(files.length > 0) {
        for (const file of files) {
          // 追加
          if(!file.post_key) {
            if(file.id) {
              console.log('forum file add', file);
              await forumApiFunc.createFile(file, editor)
            } else {
              // 追加：アップロードあり
              console.log('forum local file add', file);
              file.data_url = await this.mixinUploadForumFile(file, "forum")
              await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
            }
          }
        }
      }
      // 削除
      if(delete_files.length > 0) {
        for (const file of delete_files) {
          console.log('delete', file);
          await forumApiFunc.deleteFile(file, editor)
        }
      }
    }
  },
  // タグ更新
  async mixinUpdateTags (editor) {
    const tags = editor.tags.items
    const old_tags = editor.old_tags
    // 1つ目追加
    if(old_tags.length === 0 && tags.length > 0) {
      for (const tag of tags) {
        await forumApiFunc.createTag(tag, editor)
        .catch((error) => console.error('update:forumApiFunc.createTag', error))
      }
    }
    // 値なし → 全削除
    if(old_tags.length > 0 && tags.length === 0) {
      for (const old_tag of old_tags) {
        await forumApiFunc.deleteTag(old_tag)
      }
    }
    // 差分処理
    if(old_tags.length > 0 && tags.length > 0) {
      // 追加 （初期値 < 登録値）
      if(tags.length > old_tags.length) {
        const add_tags = tags.filter(v => !v.post_key)
        for (const add_tag of add_tags) {
          console.log('add new tag', add_tag);
          await forumApiFunc.createTag(add_tag, editor)
        }
      }
      // 削除 (初期値 > 登録値) 
      if(tags.length < old_tags.length) {
        for (const old_tag of old_tags) {
          if(tags.find(v => v.forum_tag_name === old_tag.forum_tag_name)) {
            console.log("stay", old_tag);
          } else {
            console.log("delete_tag", old_tag);
            await forumApiFunc.deleteTag(old_tag)
          }
        }
      }
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