import { API } from 'aws-amplify'
import { createNotification } from '@/graphql/mutations'
import { listNotifications } from '@/graphql/queries'
// import { uuid } from 'vue-uuid'
import storeFunc from '@/mixins/store/auth'

export default {
  async getNotifications () {
    const filter = {
      company_group_cd: {
        eq: storeFunc.storeGetCompanyCd()
      },
      delete: {
        eq: NOTIFICATION_ACTIVE_NUMBER
      }
    }
    const results = await API.graphql({
      query: listNotifications,
      variables: { filter: filter }
    })
    return results.data.listNotifications.items
  },
  async create (data, service_type, function_cd) {
    const notification = generateNotificationObject(data, service_type, function_cd)
    return await API.graphql({
      query: createNotification,
      variables: { input: notification }
    })

    function generateNotificationObject (data, service_type, function_cd) {
      let _category = undefined
      const _post = {
        post_title: "",
        post_text: ""
      }
      // カテゴリ
      if(function_cd) {
        if(function_cd === 'forum') {
          _category = 1
          _post.post_title = data.title
          _post.post_text = data.post_text
        }
        if(function_cd === 'chat') {
          _category = 2
          _post.post_title = CHAT_TEMPLATE.title
          _post.post_text = CHAT_TEMPLATE.text
        }
      }
      return {
        notification_id: data.id,
        company_group_cd: storeFunc.storeGetCompanyCd(),
        category: _category,
        service_name: service_type,
        // poster_id: String
        post_title: _post.post_title,
        post_text: _post.post_text,
        delete: 0
      }
    }
  },
}

const NOTIFICATION_ACTIVE_NUMBER = 0
const CHAT_TEMPLATE = { key: "chat", title: 'チャット通知', text: "チャットメッセージが届いています" }

// const CATEGORIES = [
//   { key: 0, value: "staff" },
//   { key: 1, value: "company" },
//   { key: 2, value: "system" },
// ]

// const FORUM_TEMPLATE = { key: "forum", title: '', text: "掲示板に新規投稿があります" }