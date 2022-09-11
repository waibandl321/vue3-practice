import Storage from '@aws-amplify/storage'
import storeAuth from '@/mixins/store/auth'
export default {
  async storageUploadFile (file) {
    console.log(file);
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
}