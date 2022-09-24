import { API } from 'aws-amplify'
import { createArea, updateArea } from '@/graphql/mutations'
import { listAreas } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

async function apiCreateArea (area) {
  const _area = generateAreaObject(area)
  return await API.graphql({
    query: createArea,
    variables: { input: _area }
  })
}

async function apiUpdateArea (_area) {
  const item = generateAreaObject(_area)
  item.id = _area.id

  await API.graphql({
    query: updateArea,
    variables: { input: item }
  })
}

function generateAreaObject (area) {
  return {
    company_area_cd: area.company_area_cd ?? uuid.v4(),
    area_cd: area.area_cd,
    area_name: area.area_name,
    company_cd: store.getters.companyCd,
    status: 0,
    delete: 0
  }
}

async function apiGetArea () {
  const filter = {
    company_cd: {
      eq: store.getters.companyCd
    }
  }
  const results = await API.graphql({
    query: listAreas,
    variables: { filter: filter }
  })
  return results.data.listAreas.items
}

export default {
  apiCreateArea,
  apiUpdateArea,
  apiGetArea
}
