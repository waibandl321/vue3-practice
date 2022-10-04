<template>
  <v-container>
    <v-alert
      v-if="alert_message"
      closable
    >{{ alert_message }}</v-alert>
    <v-card class="mt-10">
      <v-card-title>S3ファイルアップロード</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="upload_file"
          label="File input"
          clearable
        ></v-file-input>
        <v-btn
          color="primary"
          :disabled="upload_file.length === 0"
          @click="uploadFiles"
        >アップロード</v-btn>
      </v-card-text>
    </v-card>
    <v-card class="mt-10">
      <v-card-title>S3ファイル取得</v-card-title>
      <v-card-text>
        {{ items }}
      </v-card-text>
    </v-card>
    <OverlayLoading v-if="loading" />
  </v-container>
</template>
<script>
import { ref } from '@vue/reactivity'
import Storage from '@aws-amplify/storage'
import OverlayLoading from '@/components/common/OverlayLoading.vue'
import storeAuth from '@/mixins/store/auth'

export default {
  name: "file-upload",
  components: { OverlayLoading },
  setup() {
    const alert_message = ref("")
    const loading = ref(false);
    
    // ファイルアップロード
    const upload_file = ref([]);
    const uploadFiles = async () => {
      alert_message.value = ""
      loading.value = true
        try {
          await Storage.put(
            // company_cdがディレクトリ名になる
            storeAuth.storeGetCompanyCd() + '/' + upload_file.value[0].name,
            upload_file.value[0],
            {
              progressCallback() {
                loading.value = false
                alert_message.value = "ファイルをアップロードしました。"
              },
          }).then(async (res) => {
            console.log('s3 URL:', await getS3Object(res));
          })
        }
        catch (error) {
          console.log('file upload exception error', error);
          alert_message.value = error
        }
      loading.value = false

      // S3のURLを取得
      async function getS3Object (res) {
        return await Storage.get(res.key)
      }
    };
    // ファイル取得
    const items = ref([])
    const getFiles = async () => {
      try {
        items.value = await Storage.list(storeAuth.storeGetCompanyCd())
      } catch (error) {
        alert_message.value = error
        console.log('get file exception err:', error);
      }
    }
    getFiles()
    return {
      loading,
      alert_message,
      upload_file,
      items,
      uploadFiles
    };
  }  
}
</script>