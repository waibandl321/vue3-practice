import { API } from 'aws-amplify'
import { createPosition, updatePosition, deletePosition } from '@/graphql/mutations'
import { listPositions } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

export default {
  async create (position) {
    const _position = this.generatePositionObject(position)
    return await API.graphql({
      query: createPosition,
      variables: { input: _position }
    })
  },
  
  async update (_position) {
    const item = this.generatePositionObject(_position)
    item.id = _position.id
  
    await API.graphql({
      query: updatePosition,
      variables: { input: item }
    })
  },
  generatePositionObject (position) {
    return {  
      company_position_cd: position.company_position_cd ?? uuid.v4(),
      // MEMO: position_cd = ポジション名
      position_cd: position.position_cd,
      company_cd: store.getters.companyCd,
      status: 0,
      delete: 0
    }
  },
  
  async delete (position) {
    const filter = {
      id: position.id,
    }
    return await API.graphql({
      query: deletePosition,
      variables: { input: filter }
    });
  },
  async getPositions () {
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
  },
}
