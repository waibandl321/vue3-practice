<template>
  <div class="pa-6">
    <div>TOPディレクトリ<br>
      {{ params.dir_top }}
    </div>
    <div>現在のディレクトリ<br>
    {{ current_dir }}
    </div>
    <!-- <div>ファイル一覧<br>
    {{ items.files }}
    </div> -->
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
      <!-- <v-breadcrumbs
        :items="breadcrumbs"
      >
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs> -->
    </div>
    <!-- リスト -->
    <div class="text-right">
      <v-btn
        color="error"
        variant="text"
        append-icon="mdi-delete"
      >削除</v-btn>
    </div>
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
            ></v-checkbox>
          </th>
          <th class="text-left">ファイル・フォルダ名</th>
          <th class="text-left">更新者</th>
          <th class="text-left">更新日</th>
          <th class="text-left">サイズ</th>
          <th class="short-td px-0"></th>
        </tr>
      </thead>
      <tbody>
        <!-- ディレクトリ -->
        <tr
          v-for="(dir, idxD) in items.dirs"
          :key="idxD"
          @click.stop="moveDir(dir)"
        >
          <td class="short-td px-0">
            <v-checkbox
              v-model="is_selected_items"
              hide-details="auto"
            ></v-checkbox>
          </td>
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
            v-bind="props"
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
  <OverlayLoading v-if="loading" />
</template>

<script>
import { ref } from '@vue/reactivity'
import fileApiFunc from '@/mixins/api/func/file'
import storageFunc from '@/mixins/storage/storage.js'
import OverlayLoading from '../OverlayLoading.vue'

export default {
  name: "file-list",
  props: {
    params: Object,
    changeMode: Function
  },
  setup(props) {
    const loading = ref(false);
    
    // 初回読み込み時 最上位ディレクトリをセット
    const current_dir = ref({})
    const initDir = () => {
      current_dir.value = props.params.dir_top
    }
    initDir()
    
    // フォルダ、ファイル初期化
    const items = ref({
      dirs: [],
      files: []
    });
    // ディレクトリ取得
    const getDir = async () => {
      try {
        items.value.dirs = await fileApiFunc.apiGetFileDirList(current_dir.value);
      }
      catch (error) {
        console.log("get dirs error:", error);
      }
    };
    // ファイル一覧取得
    const getDirFiles = async () => {
      try {
        items.value.files = await fileApiFunc.apiGetFileList(current_dir.value);
      }
      catch (error) {
        console.log("get files error:", error);
      }
    };
    // データ読み込み
    const init = async () => {
      console.log();
      loading.value = true;
      items.value.files = []
      items.value.dirs = []
      await getDir();
      await getDirFiles();
      loading.value = false;
    };
    init();

    // 新規フォルダ作成
    const create_new_folder = ref(false);
    const new_dir = ref("");
    const saveNewFolder = async () => {
      loading.value = true;
      // TODO: 同じフォルダ名の場合チェック
      try {
        await fileApiFunc.apiCreateFileDir(
          current_dir.value,
          new_dir.value,
        );
        alert("フォルダを作成しました。");
        init()
      }
      catch (error) {
        console.log("create folder error:", error);
      }
      create_new_folder.value = false;
      loading.value = false;
    };

    // フォルダ削除
    const deleteDir = async (dir) => {
      // loading.value = true;
      try {
        // MEMO: フォルダ直下のファイル&フォルダをゴミ箱に移動する
        // const dir_files = await fileApiFunc.apiGetFileList(dir)
        // if(dir_files.length > 0) {
        //   for (const file of dir_files) {
        //     // ファイルをゴミ箱に移動
        //     await fileApiFunc.apiMoveTrashbox(file)
        //   }
        // }
        // ディレクトリもゴミ箱に移動
        const results = []
        // TODO: 別関数に切り出す
        // 第一階層
        results.push(dir)
        await fileApiFunc.apiUpdateDir(dir, fileApiFunc.getDeleteFlag());
        // 第二階層
        for (const level1 of props.params.dirs) {
          if (dir.dir_id === level1.parent_dir_id) {
            results.push(level1)
            await fileApiFunc.apiUpdateDir(level1, fileApiFunc.getDeleteFlag());
            // 第三階層
            for (const level2 of props.params.dirs) {
              if (level1.dir_id === level2.parent_dir_id) {
                results.push(level2)
                await fileApiFunc.apiUpdateDir(level2, fileApiFunc.getDeleteFlag());
                // 第四階層
                for (const level3 of props.params.dirs) {
                  if (level2.dir_id === level3.parent_dir_id) {
                    results.push(level3)
                    await fileApiFunc.apiUpdateDir(level3, fileApiFunc.getDeleteFlag());
                  }
                }
              }
            }
          }
        }
        console.log(results);
        // await fileApiFunc.apiUpdateDir(dir, fileApiFunc.getDeleteFlag());
        
        // alert("フォルダとフォルダに紐付くファイルをゴミ箱に移動しました。");
        init();
      }
      catch (error) {
        console.log("delete item error:", error);
      }
      // loading.value = false;
    };
    // ファイルアップロード
    const upload_file = ref([]);
    const uploadFile = async () => {
      loading.value = true;
      try {
        const file = upload_file.value[0]
        const data_url = await storageFunc.storageUploadFile(file)
        await fileApiFunc.apiCreateUploadFile(current_dir.value, file, data_url)
        upload_file.value = []
        alert('ファイルをアップロードしました。')
        await getDirFiles()
      } catch (error) {
        console.log('file upload exception', error);
      }
      loading.value = false;
    }
    const moveTrashbox = async (item) => {
      try {
        await fileApiFunc.apiMoveTrashbox(item)
        alert('ファイルをゴミ箱に移動しました。')
        init()
      } catch (error) {
        console.log('file move trashbox error', error);
      }
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
    const moveDir = (dir) => {
      current_dir.value = dir
      breadcrumbs.value.push({
        title: dir.dir_name,
        dir: dir
      })
      init()
    }
    const clickBreadcrumb = (item) => {
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
    const judgeCurrentDir = (breadcrumb) => {
      return current_dir.value.id === breadcrumb.dir.id
    }
    // 選択
    const is_selected_items = ref([])
    const is_selected_all = ref(false)
    return {
      loading,
      current_dir,
      // アイテム
      items,
      // フォルダ作成
      create_new_folder,
      new_dir,
      saveNewFolder,
      // アップロード
      upload_file,
      uploadFile,
      // 削除
      moveTrashbox,
      // パンくず
      breadcrumbs,
      clickBreadcrumb,
      judgeCurrentDir,
      // 選択
      is_selected_items,
      is_selected_all,
      
      deleteDir,
      moveDir
      
    };
  },
  components: { OverlayLoading }
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>