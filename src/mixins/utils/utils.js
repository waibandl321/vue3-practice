const CompanyTypes = [
  { value: 0, text: '法人' },
  { value: 1, text: '個人事業主' }
]
const CompanyFormPositions = [
  { value: 0, text: '社名の前' },
  { value: 1, text: '社名の後' }
]
const CompanyForms = [
  {
    value: 0,
    name: '株式会社',
    name_kana: 'カブシキガイシャ'
  },
  {
    value: 1,
    name: '有限会社',
    name_kana: 'ユウゲンガイシャ'
  },
  {
    value: 2,
    name: '合同会社',
    name_kana: 'ゴウドウガイシャ'
  },
  {
    value: 3,
    name: '合資会社',
    name_kana: 'ゴウシガイシャ'
  },
  {
    value: 4,
    name: '合名会社',
    name_kana: 'ゴウメイガイシャ'
  }
]
const GenderList = [
  {
    value: 0,
    text: '男性'
  },
  {
    value: 1,
    text: '女性'
  },
  {
    value: 9,
    text: 'その他'
  }
]
const Permanents = [
  {
    value: 0,
    text: '社員'
  },
  {
    value: 1,
    text: '臨時'
  }
]
export default {
  methods: {
    getCompanyTypes () {
      return CompanyTypes
    },
    getCompanyFormPositions () {
      return CompanyFormPositions
    },
    getCompanyForms () {
      return CompanyForms
    },
    getCompanyFormText (value) {
      return CompanyForms.find(r => r.value === value).name
    },
    getCompanyFormKanaText (value) {
      return CompanyForms.find(r => r.value === value).name_kana
    },
    getGenderList () {
      return GenderList
    },
    getGenderText (value) {
      return GenderList.find(v => v.value === value).text
    },
    getPermanentList () {
      return Permanents
    },
    getPermanentText (value) {
      return Permanents.find(v => v.value === value).text
    }
  }
}
