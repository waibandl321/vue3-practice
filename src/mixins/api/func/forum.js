import { API } from 'aws-amplify'
import { createForum,createForumPost, createForumFile, createForumEyecatch, createForumUrl,createForumTag,
  deleteForumPost, deleteForumFile, deleteForumEyecatch, deleteForumUrl, deleteForumTag } from '@/graphql/mutations'
import { listForums, listForumPosts, getForumPost, listForumEyecatches } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
  async getForum () {
    const filter = {
      company_cd: {
        eq: store.getters.companyCd
      }
    }
    const results = await API.graphql({
      query: listForums,
      variables: { filter: filter }
    })
    return results.data.listForums.items[0]
  },
  // 企業掲示板 作成(初回のみ)
  async apiCreateForum (company) {
    const forumObj = this.generateForumObject(company)
    return await API.graphql({
      query: createForum,
      variables: { input: forumObj }
    })
  },
  generateForumObject (company) {
    return {
      forum_id: uuid.v4(),
      forum_name: company.company_name,
      company_cd: company.company_cd,
      company_group_cd: company.company_group_cd,
      owner_id: store.getters.staff.staff_id,
    }
  },
  // 投稿取得
  async getPostList (forum_id) {
    const filter = {
      forum_id: {
        eq: forum_id
      }
    }
    const results = await API.graphql({
      query: listForumPosts,
      variables: { filter: filter }
    })
    return results.data.listForumPosts.items
  },
  async getPostDetail (id) {
    // ID指定テスト
    return await API.graphql({
      query: getForumPost,
      variables: { id: id }
    })
  },
  // 投稿作成
  async createPost (forum, item) {
    const post = this.generateForumPostObject(forum, item)
    return await API.graphql({
      query: createForumPost,
      variables: { input: post }
    }).then((res) => {
      return res.data.createForumPost
    })
  },
  generateForumPostObject (forum, item, delete_flag = null) {
    return {
      forum_id: forum.forum_id,
      post_key: item.post_key ?? uuid.v4(),
      title: item.title,
      post_text: item.post_text,
      attached: item.files.items.length > 0 ? 0 : 1,
      url_links: item.urls.items.length > 0 ? 0 : 1,
      status: 0,
      delete: delete_flag ? 1 : 0,
    }
  },
  // 投稿削除
  async delete (post) {
    const filter = {
      id: post.id,
    }
    return await API.graphql({
      query: deleteForumPost,
      variables: {input: filter}
    });
  },

  // ファイル
  async createFiles (file, save_post) {
    const item = this.createFileObject(file, save_post)
    await API.graphql({
      query: createForumFile,
      variables: { input: item }
    })
  },
  createFileObject (file, save_post) {
    return {
      post_id: save_post.id,
      post_key: save_post.post_key,
      sort_number: uuid.v4(),
      file_id: null,
      data_url: file.data_url,
    }
  },
  async deleteFile (file) {
    const filter = {
      id: file.id,
    }
    return await API.graphql({
      query: deleteForumFile,
      variables: {input: filter}
    });
  },
  // URLリンク
  async createLinks (url, save_post) {
    const item = this.createLinkObject(url, save_post)
    await API.graphql({
      query: createForumUrl,
      variables: { input: item }
    })
  },
  createLinkObject (url, save_post) {
    return {
      post_id: save_post.id,
      post_key: save_post.post_key,
      sort_number: uuid.v4(),
      url_key: url.url_key,
      url_value: url.url_value
    }
  },
  async deleteLink (url) {
    const filter = {
      id: url.id,
    }
    return await API.graphql({
      query: deleteForumUrl,
      variables: {input: filter}
    });
  },
  // アイキャッチ
  async createEyecatch (_eyecatch, save_post) {
    const eyecatch = this.createEyecatchObject(_eyecatch, save_post)
    await API.graphql({
      query: createForumEyecatch,
      variables: { input: eyecatch }
    })
  },
  createEyecatchObject (_eyecatch, save_post) {
    return {
      post_key: save_post.post_key,
      file_id: null,
      data_url: _eyecatch.data_url
    }
  },
  async deleteEyecatch (_eyecatch) {
    const filter = {
      id: _eyecatch.id,
    }
    return await API.graphql({
      query: deleteForumEyecatch,
      variables: {input: filter}
    });
  },
  async getEyecatch (post) {
    const filter = {
      post_key: {
        eq: post.post_key
      }
    }
    const results = await API.graphql({
      query: listForumEyecatches,
      variables: { filter: filter }
    })
    return results.data.listForumEyecatches.items[0]
  },
  // タグ
  async createTags (tag, save_post) {
    const item = this.createTagObject(tag, save_post)
    await API.graphql({
      query: createForumTag,
      variables: { input: item }
    })
  },
  createTagObject (tag, save_post) {
    return {
      post_id: save_post.id,
      post_key: save_post.post_key,
      sort_number: uuid.v4(),
      forum_tag_name: tag,
      company_cd: store.getters.companyCd
    }
  },
  async deleteTag (tag) {
    const filter = {
      id: tag.id,
    }
    return await API.graphql({
      query: deleteForumTag,
      variables: {input: filter}
    });
  },
  update () {},
}