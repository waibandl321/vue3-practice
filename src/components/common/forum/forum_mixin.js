import storageFunc from '@/mixins/storage/storage.js'
import apiFunc from '@/mixins/api/api.js'

export default {
  // 作成
  async mixinCreatePost (forum, editor) {
    return await apiFunc.apiCreateForumPost(forum, editor)
  },
  // アイキャッチ新規作成
  async mixinCreateEyecatch (editor, save_post, dir_top) {
    if(editor.eyecatch){
      // ローカルアップロード
      if(!editor.eyecatch.id) {
        editor.eyecatch.data_url = await storageFunc.upload(editor.eyecatch, STORAGE_DIR_NAME)
        await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, FUNCTION_CD)
      }
      await apiFunc.apiCreateForumEyecatch(editor.eyecatch, save_post)
    }
    return;
  },
  // 添付ファイル新規作成
  async mixinCreateFiles (files, save_post, dir_top) {
    if(files.length > 0) {
      for (const file of files) {
        if(!file.id) {
          file.data_url = await storageFunc.upload(file, FUNCTION_CD)
          await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, FUNCTION_CD)
        }
        await apiFunc.apiCreateForumFile(file, save_post)
      }
    }
    return;
  },
  // URL新規作成
  async mixinCreateUrls (editor, save_post) {
    if(editor.urls.items.length > 0) {
      for (const url of editor.urls.items) {
        await apiFunc.apiCreateForumLink(url, save_post)
      }
    }
    return;
  },
  // タグ新規作成
  async mixinCreateTags (editor, save_post) {
    if(editor.tags.items.length > 0) {
      for (const tag of editor.tags.items) {
        await apiFunc.apiCreateForumTag(tag, save_post)
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
        await apiFunc.apiCreateForumTagOption(forum, new_option)
      }
    }
  },
  // 更新
  async mixinUpdatePost (forum, editor) {
    return await apiFunc.apiUpdatePost(forum, editor)
  },
  // アイキャッチ更新
  async mixinUpdateEyecatch (editor, dir_top) {
    // 削除
    if(!editor.eyecatch && editor.old_eyecatch.length > 0) {
      await apiFunc.apiDeleteEyecatch(...editor.old_eyecatch)
    }
    // 更新
    if(editor.eyecatch) {
      if(editor.old_eyecatch.length > 0 && !editor.eyecatch.post_key) {
        // ローカルから画像アップロードして更新
        if (!editor.eyecatch.id) {
          await uploadNew()
        }
        await apiFunc.apiUpdateEyecatch(editor.eyecatch, ...editor.old_eyecatch, editor)
      }
      // 新規登録
      if(editor.old_eyecatch.length === 0) {
        if (!editor.eyecatch.id) {
          await uploadNew()
        }
        await apiFunc.apiCreateForumEyecatch(editor.eyecatch, editor)
      }
    }

    async function uploadNew () {
      editor.eyecatch.data_url = await storageFunc.upload(editor.eyecatch, STORAGE_DIR_NAME)
      await this.mixinSaveForumFileDatabase(dir_top, editor.eyecatch, editor.eyecatch.data_url, FUNCTION_CD)
    }
  },
  // URL更新
  async mixinUpdateLinks (editor, delete_urls) {
    // 初期値なし
    if(editor.old_urls.length === 0) {
      if(editor.urls.items.length === 0) return;
      // 新規追加
      for (const url of editor.urls.items) {
        await apiFunc.apiCreateForumLink(url, editor)
      }
    }
    // 初期値あり
    if(editor.old_urls.length > 0) {
      if(editor.urls.items.length > 0) {
        for (const url of editor.urls.items) {
          // 追加
          if(!url.id && url.uid) {
            await apiFunc.apiCreateForumLink(url, editor)
          }
          // 上書き更新
          if(editor.old_urls.find(v => v.id === url.id)) {
            await apiFunc.apiUpdateForumLink(url, editor)
          }
        }
      }
      // 削除
      if(delete_urls.length > 0) {
        for (const url of delete_urls) {
          await apiFunc.apiDeleteForumLink(url, editor)
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
            file.data_url = await storageFunc.upload(file, FUNCTION_CD)
            await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, FUNCTION_CD)
          }
          await apiFunc.apiCreateForumFile(file, editor)
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
              file.data_url = await storageFunc.upload(file, FUNCTION_CD)
              await this.mixinSaveForumFileDatabase(dir_top, file, file.data_url, FUNCTION_CD)
            }
            await apiFunc.apiCreateForumFile(file, editor)
          }
        }
      }
      // 削除
      if(delete_files.length > 0) {
        for (const file of delete_files) {
          console.log('delete', file);
          await apiFunc.apiDeleteForumFile(file, editor)
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
          await apiFunc.apiCreateForumTag(tag, editor)
        }
      } else return;
    }
    // 初期値あり ＋ 値なし = 全削除
    if(editor.old_tags.length > 0 && editor.tags.items.length === 0) {
      for (const old_tag of editor.old_tags) {
        await apiFunc.apiDeleteForumTag(old_tag)
      }
    }
    // 差分処理
    if(editor.old_tags.length > 0 && editor.tags.items.length > 0) {
      // 追加 （初期値 < 登録値）
      if(editor.tags.items.length > editor.old_tags.length) {
        const add_tags = editor.tags.items.filter(v => !v.post_key)
        for (const add_tag of add_tags) {
          console.log('add new tag', add_tag);
          await apiFunc.apiCreateForumTag(add_tag, editor)
        }
      }
      // 削除 (初期値 > 登録値) 
      if(editor.tags.items.length < editor.old_tags.length) {
        for (const old_tag of editor.old_tags) {
          if(editor.tags.items.find(v => v.forum_tag_name === old_tag.forum_tag_name) === undefined) {
            console.log("delete_tag", old_tag);
            await apiFunc.apiDeleteForumTag(old_tag)
          }
        }
      }
    }
  },
  // ファイル管理に保存
  async mixinSaveForumFileDatabase (dir_top, file, data_url, function_cd) {
    await apiFunc.apiCreateFile(
      dir_top,
      file,
      data_url,
      function_cd
    )
  },
  // 投稿削除
  // TODO: お知らせからも削除する
  async mixinDeleteForumPost (post) {
    await apiFunc.apiDeletePost(post)
    // アイキャッチ
    if(post.eyecatch.items.length > 0) {
      await apiFunc.apiDeleteEyecatch(...post.eyecatch.items)
    }
    // 添付ファイル
    if(post.files.items.length > 0) {
      // TODO: ファイル管理、ストレージにあるデータを残すか要検討
      for (const file of post.files.items ) {
        await apiFunc.apiDeleteForumFile(file)
      }
    }
    // URL
    if(post.urls.items.length > 0) {
      for (const url of post.urls.items ) {
        await apiFunc.apiDeleteForumLink(url)
      }
    }
    // タグ
    if(post.tags.items.length > 0) {
      for (const tag of post.tags.items ) {
        await apiFunc.apiDeleteForumTag(tag)
      }
    }
  },
  async createForumNotification (post) {
    await apiFunc.apiCreateNotification(post, SERVICE_TYPE, FUNCTION_CD)
  },
}

const STORAGE_DIR_NAME = "forum_eyecatch"
const SERVICE_TYPE = "portal"
const FUNCTION_CD = "forum"