<template>
  <div class="pa-6">
    <div class="d-flex align-center">
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            variant="text"
            v-bind="props"
            append-icon="mdi-chevron-down"
          >
            ゴミ箱
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            link
            @click="changeMode('list')"
          >
            全てのファイルを表示
          </v-list-item>
        </v-list>
      </v-menu>
      <v-breadcrumbs
        :items="breadcrumbs"
        link
      >
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="text-right">
      <v-btn
        color="primary"
        variant="text"
        append-icon="mdi-backup-restore"
      >ゴミ箱から戻す</v-btn>
      <v-btn
        color="error"
        variant="text"
        append-icon="mdi-delete"
      >完全に削除</v-btn>
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
    <OverlayLoading v-if="loading" />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import fileApiFunc from '@/mixins/api/func/file'
import storageFunc from '@/mixins/storage/storage.js'
import OverlayLoading from '../OverlayLoading.vue'

export default {
  name: "file-trashbox",
  components: { OverlayLoading },
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
}
</script>