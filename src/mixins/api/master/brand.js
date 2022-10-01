import { API } from 'aws-amplify'
import { createBrand, updateBrand } from '@/graphql/mutations'
import { listBrands } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store/index.js'

export default {
  async create (brand, company) {
    const _brand = this.generateBrandObject(brand, company)
    return await API.graphql({
      query: createBrand,
      variables: { input: _brand }
    })
  },
  async update (_brand) {
    const item = this.generateBrandObject(_brand)
    item.id = _brand.id
  
    await API.graphql({
      query: updateBrand,
      variables: { input: item }
    })
  },
  generateBrandObject (brand, company = null) {
    return {
      company_brand_cd: brand.company_brand_cd ?? uuid.v4(),
      brand_name: brand.brand_name,
      brand_cd: brand.brand_cd,
      exchange_time: brand.exchange_time ?? '24時',
      company_cd: company ? company.company_cd : store.getters.companyCd,
      status: 0,
      delete: 0
    }
  },
  
  async getBrands () {
    const filter = {
      company_cd: {
        eq: store.getters.companyCd
      }
    }
    const results = await API.graphql({
      query: listBrands,
      variables: { filter: filter }
    })
    return results.data.listBrands.items
  },
  // サインイン用ブランド取得
  async getBrandsBySignin (company_cd) {
    const filter = {
      company_cd: {
        eq: company_cd
      }
    }
    const results = await API.graphql({
      query: listBrands,
      variables: { filter: filter }
    })
    return results.data.listBrands.items
  },
}
