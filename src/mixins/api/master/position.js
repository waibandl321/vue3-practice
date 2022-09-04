import { API } from 'aws-amplify'
import { createPosition, updatePosition } from '@/graphql/mutations'
import { listPositions } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

async function apiCreatePosition (position) {
  const _position = generatePositionObject(position)
  return await API.graphql({
    query: createPosition,
    variables: { input: _position }
  }).then((res) => {
    alert(`「${res.data.createPosition.position_cd}」を作成しました。`)
    return res.data.createPosition
  }).catch((error) => {
    console.log(error)
    return null
  })
}

async function apiUpdatePosition (_position) {
  const item = generatePositionObject(_position)
  item.id = _position.id

  await API.graphql({
    query: updatePosition,
    variables: { input: item }
  }).then(() => {
    alert(`ポジションを更新しました。`)
  }).catch((error) => {
    console.log(error)
    alert(`ポジションの更新に失敗しました。エラーメッセージ:${error}`)
  })
}

function generatePositionObject (position) {
  return {  
    company_position_cd: position.company_position_cd ?? uuid.v4(),
    // MEMO: position_cd = ポジション名
    position_cd: position.position_cd,
    company_cd: store.getters.companyCd,
    status: 0,
    delete: 0
  }
}

async function apiGetPosition () {
  const filter = {
    company_cd: {
      eq: store.getters.companyCd
    }
  }
  const results = await API.graphql({
    query: listPositions,
    variables: { filter: filter }
  })
  return results.data.listPositions.items
}

export default {
  apiCreatePosition,
  apiUpdatePosition,
  apiGetPosition
}
