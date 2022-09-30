import storageFunc from '@/mixins/storage/storage.js'
import fileApiFunc from '@/mixins/api/func/file'
export default {
  // S3アップロード
  async mixinUploadChatFile (file, function_cd = "chat") {
    console.log("chat file local upload", file);
    return await storageFunc.storageUploadFunctionFile(file, function_cd)
    .catch((error) => console.error('storageFunc.storageUploadFunctionFile', error))
  },
  // ファイル管理に保存
  async mixinSaveChatFileDatabase (dir_top, file, data_url, function_cd = "chat") {
    return await fileApiFunc.createFile(
      dir_top,
      file,
      data_url,
      function_cd
    ).catch((error) => console.error('fileApiFunc.createFile', error))
  },
}
