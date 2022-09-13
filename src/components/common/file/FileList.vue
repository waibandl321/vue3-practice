<template>
  <div class="pa-6">
    <!-- パンくず -->
    <div class="d-flex align-center">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            append-icon="mdi-chevron-down"
          >
            全てのファイル
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            link
            @click="changeMode('trash')"
          >
            ゴミ箱を表示
          </v-list-item>
        </v-list>
      </v-menu>
      <!-- パンくずリスト -->
      <div class="d-flex">
        <v-btn
          v-for="(b, idxb) in breadcrumbs"
          :key="idxb"
          variant="text"
          size="small"
          @click="clickBreadcrumb(b)"
          :disabled="judgeCurrentDir(b)"
        >{{ b.title }}</v-btn>
      </div>
    </div>
    <!-- 一括操作 -->
    <div class="text-right">
      <v-btn
        color="error"
        variant="text"
        append-icon="mdi-delete"
        @click="bulkMoveTrash()"
      >選択したファイルを削除</v-btn>
    </div>
    <!-- リスト -->
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="green"
    ></v-progress-linear>
    <v-table
      fixed-header
      height="500px"
    >
      <thead>
        <tr>
          <th class="short-td px-0">
            <v-checkbox
              v-model="is_selected_all"
              hide-details="auto"
              @change="isSelectAll()"
            ></v-checkbox>
          </th>
          <th class="text-left">ファイル・フォルダ名</th>
          <th class="text-left">更新者</th>
          <th class="text-left">更新日</th>
          <th class="text-left">サイズ</th>
          <th class="short-td px-0"></th>
        </tr>
      </thead>
      <tbody v-show="!loading">
        <!-- ディレクトリ -->
        <tr
          v-for="(dir, idxD) in items.dirs"
          :key="idxD"
          @click.stop="moveDir(dir)"
        >
          <td class="short-td px-0"></td>
          <td>
            <v-icon>mdi-folder</v-icon>
            <span class="ml-2">{{ dir.dir_name }}</span>
          </td>
          <td>-</td>
          <td>{{ dir.updatedAt }}</td>
          <td>-</td>
          <td class="short-td px-0">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  variant="text"
                  v-bind="props"
                  icon="mdi-dots-vertical"
                  size="small"
                ></v-btn>
              </template>
              <v-list>
                <v-list-item
                  density="compact"
                  link
                >
                  フォルダ名編集
                </v-list-item>
                <v-list-item
                  density="compact"
                  link
                  @click="deleteDir(dir)"
                >
                  ゴミ箱に移動
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
        <!-- ファイル -->
        <tr
          v-for="(file, idxF) in items.files"
          :key="idxF"
        >
          <td class="short-td px-0">
            <v-checkbox
              v-model="is_selected_items"
              :value="file"
              hide-details="auto"
            ></v-checkbox>
          </td>
          <td>{{ file.file_name }}</td>
          <td>{{ file.staff_id }}</td>
          <td>{{ file.updatedAt }}</td>
          <td>{{ file.file_size }} byte</td>
          <td class="short-td px-0">
            <div class="drop-menu">
              <v-menu>
                <template v-slot:activator="{ props }">
                  <v-btn
                    variant="text"
                    v-bind="props"
                    icon="mdi-dots-vertical"
                    size="small"
                  ></v-btn>
                </template>
                <v-list>
                  <v-list-item
                    density="compact"
                    link
                    @click="downloadFile(file)"
                  >
                    ダウンロード
                  </v-list-item>
                  <v-list-item
                    density="compact"
                    link
                    @click="moveTrashbox(file)"
                  >
                    ゴミ箱に移動
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
    <!-- アップロード -->
    <div class="fixed-btn">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            :disabled="params.capacity_over"
            v-bind="props"
            z-index="2"
            color="primary"
            icon="mdi-plus"
            size="x-large"
          ></v-btn>
        </template>
        <v-list>
          <v-list-item
            :disabled="current_dir.level === 3"
            density="compact"
            link
            @click.stop="create_new_folder = !create_new_folder"
          >
            フォルダ作成
          </v-list-item>
          <v-list-item
            density="compact"
            link
            @click.stop="$refs.triggerFileInput.click()"
          >
            ファイルアップロード
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <!-- input -->
    <v-file-input
      v-model="upload_file"
      class="d-none"
      ref="triggerFileInput"
      @change="uploadFile()"
    ></v-file-input>
    <!-- フォルダ作成 -->
    <v-dialog v-model="create_new_folder">
      <v-card width="500">
        <v-card-title>フォルダ作成</v-card-title>
        <v-divider></v-divider>
        <v-card-item>
          <v-card-subtitle>フォルダ名</v-card-subtitle>
          <v-text-field
            v-model.trim="new_dir"
          ></v-text-field>
        </v-card-item>
        <v-card-actions class="justify-end">
          <v-btn 
            variant="outlined"
            @click="create_new_folder = false"
          >キャンセル</v-btn>
          <v-btn
            variant="outlined"
            color="primary"
            @click="saveNewFolder()"
            :disabled="!new_dir"
          >作成</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import fileApiFunc from '@/mixins/api/func/file'
import storageFunc from '@/mixins/storage/storage.js'

export default {
  name: "file-list",
  props: {
    params: Object,
    changeMode: Function,
    uploadedChange: Function
  },
  setup(props) {
    // MEMO: 容量計算コンポーネントにてアップロード検知用
    props.uploadedChange(false)
    // データ初期化
    const loading = ref(false);
    const items = ref({
      dirs: [],
      files: []
    });
    // 初回読み込み時 最上位ディレクトリをセット
    const current_dir = ref({})
    const initCurrentDir = () => {
      current_dir.value = props.params.dir_top
    }
    initCurrentDir()
    // ディレクトリ・ファイル 初期データセット
    const init = async () => {
      loading.value = true;
      items.value.dirs = []
      items.value.files = []
      try {
        items.value.dirs = await fileApiFunc.apiGetFileDirList(current_dir.value);
        items.value.files = await fileApiFunc.apiGetFileList(current_dir.value);
      } catch (error) {
        console.log("get files & dirs exception error", error);
      }
      loading.value = false;
    };
    init()
    // 新規フォルダ作成
    const create_new_folder = ref(false);
    const new_dir = ref("");
    const saveNewFolder = async () => {
      loading.value = true;
      // TODO: 同じフォルダ名チェックする
      try {
        await fileApiFunc.apiCreateFileDir(
          current_dir.value,
          new_dir.value,
        );
        items.value.dirs = await fileApiFunc.apiGetFileDirList(current_dir.value);
        alert("フォルダを作成しました。");
      }
      catch (error) {
        console.log("create folder error:", error);
      }
      create_new_folder.value = false;
      loading.value = false;
    };
    // フォルダ→ファイル削除
    const deleteDir = async (dir) => {
      loading.value = true;
      try {
        // TODO: 別関数に切り出す && 共通化
        // 第一階層
        await fileApiFunc.apiUpdateDir(dir, fileApiFunc.getDeleteFlag());
        await deleteFiles(dir)
        // 第二階層
        for (const level1 of props.params.dirs) {
          if (dir.dir_id === level1.parent_dir_id) {
            await fileApiFunc.apiUpdateDir(level1, fileApiFunc.getDeleteFlag());
            await deleteFiles(level1)
            // 第三階層
            for (const level2 of props.params.dirs) {
              if (level1.dir_id === level2.parent_dir_id) {
                await fileApiFunc.apiUpdateDir(level2, fileApiFunc.getDeleteFlag());
                await deleteFiles(level2)
                // 第四階層
                for (const level3 of props.params.dirs) {
                  if (level2.dir_id === level3.parent_dir_id) {
                    await fileApiFunc.apiUpdateDir(level3, fileApiFunc.getDeleteFlag());
                    await deleteFiles(level3)
                  }
                }
              }
            }
          }
        }
        items.value.dirs = await fileApiFunc.apiGetFileDirList(current_dir.value);
        alert("フォルダとフォルダに紐付くファイルをゴミ箱に移動しました。");
      }
      catch (error) {
        console.log("delete item error:", error);
      }
      loading.value = false;
      // ディレクトリ直下ファイルをゴミ箱へ
      async function deleteFiles (target_dir) {
        const dir_files = await fileApiFunc.apiGetFileList(target_dir)
        if(dir_files.length > 0) {
          for (const file of dir_files) {
            await fileApiFunc.apiMoveTrashbox(file)
          }
        }
      }
    };
    // ファイルアップロード
    const upload_file = ref([]);
    const uploadFile = async () => {
      props.uploadedChange(false)
      loading.value = true;
      try {
        const file = upload_file.value[0]
        const data_url = await storageFunc.storageUploadFile(file)
        await fileApiFunc.apiCreateUploadFile(current_dir.value, file, data_url)
        items.value.files = await fileApiFunc.apiGetFileList(current_dir.value);
        // MEMO: 容量計算コンポーネントにてアップロード検知用
        props.uploadedChange(true)
        alert('ファイルをアップロードしました。')
      } catch (error) {
        console.log('file upload exception', error);
      }
      upload_file.value = []
      loading.value = false;
    }
    // ファイルダウンロード
    const downloadFile = async (file) => {
      const a = document.createElement('a');
      a.href = file.data_url;
      a.download = file.file_name || 'download';
      a.click();
    }
    // ファイル論理削除
    const moveTrashbox = async (item) => {
      loading.value = true;
      try {
        await fileApiFunc.apiMoveTrashbox(item)
        items.value.files = await fileApiFunc.apiGetFileList(current_dir.value);
        alert('ファイルをゴミ箱に移動しました。')
      } catch (error) {
        console.log('file move trashbox error', error);
      }
      loading.value = false;
    }
    // パンくずリスト
    const breadcrumbs = ref([])
    const initBreadcrumbs = () => {
      const top_dir = {
        title: "TOP",
        dir: props.params.dir_top,
      }
      breadcrumbs.value.push(top_dir)
    }
    initBreadcrumbs();
    // ディレクトリ移動
    const moveDir = async (dir) => {
      current_dir.value = dir
      breadcrumbs.value.push({
        title: dir.dir_name,
        dir: dir
      })
      init()
    }
    // パンくず移動
    const clickBreadcrumb = async (item) => {
      current_dir.value = item.dir
      // パンくず最適化
      breadcrumbs.value = breadcrumbs.value.filter(v => 
        v.dir.organization_id ||
        v.dir.dir_id === item.dir.dir_id ||
        v.dir.dir_id === item.dir.parent_dir_id ||
        v.dir.parent_dir_id === item.dir.parent_dir_id
      )
      init()
    }
    // アクティブディレクトリ判定
    const judgeCurrentDir = (breadcrumb) => {
      return current_dir.value.id === breadcrumb.dir.id
    }
    // 一括操作
    const is_selected_items = ref([])
    const is_selected_all = ref(false)
    // 一括ファイル選択
    const isSelectAll = () => {
      if(!is_selected_all.value) {
        is_selected_items.value = []
        return;
      }
      items.value.files.forEach((file) => {
        is_selected_items.value.push(file)
      })
    }
    // 一括ファイル論理削除
    const bulkMoveTrash = async () => {
      loading.value = true
      try {
        for (const item of is_selected_items.value) {
          await fileApiFunc.apiMoveTrashbox(item)
        }
        items.value.files = await fileApiFunc.apiGetFileList(current_dir.value);
        alert('選択されたファイルをゴミ箱に移動しました')
      } catch (error) {
        console.log("bulk delete file exeptopn error", error);
      }
      loading.value = false
    }
    return {
      loading,
      current_dir,
      // アイテム
      items,
      // フォルダ
      create_new_folder,
      new_dir,
      saveNewFolder,
      deleteDir,
      moveDir,
      // アップロード
      upload_file,
      uploadFile,
      // ダウンロード
      downloadFile,
      // 削除
      moveTrashbox,
      // パンくず
      breadcrumbs,
      clickBreadcrumb,
      judgeCurrentDir,
      // 一括操作
      is_selected_items,
      is_selected_all,
      isSelectAll,
      bulkMoveTrash,
    };
  }
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>