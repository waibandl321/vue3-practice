import Storage from '@aws-amplify/storage'
import storeAuth from '@/mixins/store/auth'

export default {
  // S3にアップしてダウンロードパスまで取得
  async upload (file, function_cd = undefined) {
    let s3_path = ""
    if(function_cd) {
      s3_path = storeAuth.storeGetCompanyCd() + '/' + function_cd + '/' + file.name
    } else {
      s3_path = storeAuth.storeGetCompanyCd() + '/' + file.name
    }
    
    return await Storage.put(
      s3_path,
      file,
    ).then(async (response) => {
      return await getS3Object(response)
    })
    async function getS3Object (response) {
      return await Storage.get(response.key)
    }
  },
  async delete (file) {
    return await Storage.remove(
      storeAuth.storeGetCompanyCd() + '/' + file.file_name,
    )
  }
}