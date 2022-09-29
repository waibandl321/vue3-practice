import forumApiFunc from '@/mixins/api/func/forum'
import storageFunc from '@/mixins/storage/storage.js'
import fileApiFunc from '@/mixins/api/func/file'

export default {
  // 作成
  async mixinCreatePost (forum, editor) {
    return await forumApiFunc.createPost(forum, editor)
  },
  // アイキャッチ新規作成
  async mixinCreateEyecatch (editor, save_post, dir_top) {
    if(editor.eyecatch){
      // ローカルアップロード
      if(!editor.eyecatch.id) {
        editor.eyecatch.data_url = await storageFunc.storageUploadFunctionFile(editor.eyecatch, "forum_eyecatch")
        await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, "forum")
      }
      await forumApiFunc.createEyecatch(editor.eyecatch, save_post)
    }
    return;
  },
  // 添付ファイル新規作成
  async mixinCreateFiles (files, save_post, dir_top) {
    if(files.length > 0) {
      for (const file of files) {
        if(!file.id) {
          file.data_url = await storageFunc.storageUploadFunctionFile(file, "forum")
          await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
        }
        await forumApiFunc.createFile(file, save_post)
      }
    }
    return;
  },
  // URL新規作成
  async mixinCreateUrls (editor, save_post) {
    if(editor.urls.items.length > 0) {
      for (const url of editor.urls.items) {
        await forumApiFunc.createLink(url, save_post)
      }
    }
    return;
  },
  // タグ新規作成
  async mixinCreateTags (editor, save_post) {
    if(editor.tags.items.length > 0) {
      for (const tag of editor.tags.items) {
        await forumApiFunc.createTag(tag, save_post)
      }
    }
    return;
  },
  // タグオプション作成
  async mixinCreateTagOptions (forum, tag_options) {
    const new_tag_options = tag_options.filter(t => !t.id && !t.forum_id)
    if(new_tag_options.length > 0) {
      console.log('new_tag_options', new_tag_options);
      for (const new_option of new_tag_options) {
        await forumApiFunc.createTagOption(forum, new_option)
      }
    }
  },
  // 更新
  async mixinUpdatePost (forum, editor) {
    return await forumApiFunc.updatePost(forum, editor)
  },
  // アイキャッチ更新
  async mixinUpdateEyecatch (editor, dir_top) {
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
      }
      // 新規登録
      if(editor.old_eyecatch.length === 0) {
        if (!editor.eyecatch.id) {
          await uploadNew()
        }
        await forumApiFunc.createEyecatch(editor.eyecatch, editor)
      }
    }

    async function uploadNew () {
      editor.eyecatch.data_url = await storageFunc.storageUploadFunctionFile(editor.eyecatch, "forum_eyecatch")
      await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, "forum")
    }
  },
  // URL更新
  async mixinUpdateLinks (editor, delete_urls) {
    // 初期値なし
    if(editor.old_urls.length === 0) {
      if(editor.urls.items.length === 0) return;
      // 新規追加
      for (const url of editor.urls.items) {
        await forumApiFunc.createLink(url, editor)
      }
    }
    // 初期値あり
    if(editor.old_urls.length > 0) {
      if(editor.urls.items.length > 0) {
        for (const url of editor.urls.items) {
          // 追加
          if(!url.id && url.uid) {
            await forumApiFunc.createLink(url, editor)
          }
          // 上書き更新
          if(editor.old_urls.find(v => v.id === url.id)) {
            await forumApiFunc.updateLink(url, editor)
          }
        }
      }
      // 削除
      if(delete_urls.length > 0) {
        for (const url of delete_urls) {
          await forumApiFunc.deleteLink(url, editor)
        }
      }
    }
  },
  // 添付ファイル更新
  async mixinUpdateFiles (editor, delete_files, dir_top) {
    // 初期値なし
    if(editor.old_files.length === 0) {
      // 新規追加
      if(editor.files.items.length > 0) {
        for (const file of editor.files.items) {
          // ローカルアップロード
          if(!file.id) {
            file.data_url = await storageFunc.storageUploadFunctionFile(file, "forum")
            await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
          }
          await forumApiFunc.createFile(file, editor)
        }
      } else return;
    }
    if(editor.old_files.length > 0) {
      // 追加
      if(editor.files.items.length > 0) {
        for (const file of editor.files.items) {
          if(!file.post_key) {
            // ローカルアップロード
            if(!file.id) {
              file.data_url = await storageFunc.storageUploadFunctionFile(file, "forum")
              await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, "forum")
            }
            await forumApiFunc.createFile(file, editor)
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
    // 初期値なし
    if(editor.old_tags.length === 0) {
      // 追加
      if(editor.tags.items.length > 0) {
        for (const tag of editor.tags.items) {
          await forumApiFunc.createTag(tag, editor)
        }
      } else return;
    }
    // 初期値あり ＋ 値なし = 全削除
    if(editor.old_tags.length > 0 && editor.tags.items.length === 0) {
      for (const old_tag of editor.old_tags) {
        await forumApiFunc.deleteTag(old_tag)
      }
    }
    // 差分処理
    if(editor.old_tags.length > 0 && editor.tags.items.length > 0) {
      // 追加 （初期値 < 登録値）
      if(editor.tags.items.length > editor.old_tags.length) {
        const add_tags = editor.tags.items.filter(v => !v.post_key)
        for (const add_tag of add_tags) {
          console.log('add new tag', add_tag);
          await forumApiFunc.createTag(add_tag, editor)
        }
      }
      // 削除 (初期値 > 登録値) 
      if(editor.tags.items.length < editor.old_tags.length) {
        for (const old_tag of editor.old_tags) {
          if(editor.tags.items.find(v => v.forum_tag_name === old_tag.forum_tag_name) === undefined) {
            console.log("delete_tag", old_tag);
            await forumApiFunc.deleteTag(old_tag)
          }
        }
      }
    }
  },
  // ファイル管理に保存
  async mixinSaveForumFileDatabase (dir_top, file, data_url, function_cd) {
    await fileApiFunc.apiCreateUploadFile(
      dir_top,
      file,
      data_url,
      function_cd
    )
  },
  // 投稿削除
  // TODO: お知らせからも削除する
  async mixinDeleteForumPost (post) {
    await forumApiFunc.delete(post)
    // アイキャッチ
    if(post.eyecatch.items.length > 0) {
      await forumApiFunc.deleteEyecatch(...post.eyecatch.items)
    }
    // 添付ファイル
    if(post.files.items.length > 0) {
      // TODO: ファイル管理、ストレージにあるデータを残すか要検討
      for (const file of post.files.items ) {
        await forumApiFunc.deleteFile(file)
      }
    }
    // URL
    if(post.urls.items.length > 0) {
      for (const url of post.urls.items ) {
        await forumApiFunc.deleteLink(url)
      }
    }
    // タグ
    if(post.tags.items.length > 0) {
      for (const tag of post.tags.items ) {
        await forumApiFunc.deleteTag(tag)
      }
    }
  }
}