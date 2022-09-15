import Storage from '@aws-amplify/storage'
import storeAuth from '@/mixins/store/auth'
export default {
  async storageUploadFile (file) {
    return await Storage.put(
      storeAuth.storeGetCompanyCd() + '/' + file.name,
      file,
    ).then(async (response) => {
      return await getS3Object(response)
    })
    async function getS3Object (response) {
      return await Storage.get(response.key)
    }
  },
  // 機能別アップロード
  async storageUploadFunctionFile (file, function_cd) {
    return await Storage.put(
      storeAuth.storeGetCompanyCd() + '/' + function_cd + '/' + file.name,
      file,
    ).then(async (response) => {
      return await getS3Object(response)
    })
    async function getS3Object (response) {
      return await Storage.get(response.key)
    }
  },
  async storageDeleteFile (file) {
    return await Storage.remove(
      storeAuth.storeGetCompanyCd() + '/' + file.file_name,
    )
  }
}