<template>
  <div class="pa-6">
    <div>TOPディレクトリ<br>
      {{ params }}
    </div>
    <div>現在のディレクトリ<br>
    {{ current_dir }}
    </div>
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
      height="300px"
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
                  削除
                </v-list-item>
              </v-list>
            </v-menu>
          </td>
        </tr>
        <!-- ファイル -->
        <tr>
          <td class="short-td px-0">
            <v-checkbox
              v-model="is_selected_items"
              hide-details="auto"
            ></v-checkbox>
          </td>
          <td>hogehoge.jpg</td>
          <td>開発 太郎</td>
          <td>2022/09/10</td>
          <td>125KB</td>
          <td class="short-td">
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
                  >
                    削除
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
        console.log("ファイル取得");
      }
      catch (error) {
        console.log("get files error:", error);
      }
    };
    // データ読み込み
    const init = async () => {
      loading.value = true;
      await getDir();
      await getDirFiles();
      loading.value = false;
    };
    init();

    // 新規フォルダ作成
    const create_new_folder = ref(false);
    const new_dir = ref("");
    const saveNewFolder = async () => {
      // TODO: 同じフォルダ名の場合チェック
      try {
        await fileApiFunc.apiCreateFileDir(
          current_dir.value,
          new_dir.value,
        );
        alert("フォルダを作成しました。");
        init();
      }
      catch (error) {
        console.log("create folder error:", error);
      }
      create_new_folder.value = false;
    };

    // フォルダ削除
    const deleteDir = async (item) => {
      try {
        await fileApiFunc.apiDeleteDirItem(item);
        alert("フォルダを削除しました。");
        init();
      }
      catch (error) {
        console.log("delete item error:", error);
      }
    };
    // ファイルアップロード
    const upload_file = ref([]);
    const uploadFile = async () => {
      loading.value = true;
      try {
        const file = upload_file.value[0]
        const data_url = await storageFunc.storageUploadFile(file)
        await fileApiFunc.apiCreateUploadFile(current_dir.value, file, data_url)
        alert('ファイルをアップロードしました。')
        upload_file.value = []
      } catch (error) {
        console.log('file upload exception', error);
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