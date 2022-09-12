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
                  @click="deleteDir(dir)"
                >
                  完全に削除
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
                    @click="execDelete(file)"
                  >
                    完全に削除
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import fileApiFunc from '@/mixins/api/func/file'
import storageFunc from '@/mixins/storage/storage.js'

export default {
  name: "file-trashbox",
  props: {
    params: Object,
    changeMode: Function,
  },
  setup(props) {
    const loading = ref(false);
    
    // 初回読み込み時 最上位ディレクトリをセット
    const current_dir = ref({})
    const initCurrentDir = () => {
      current_dir.value = props.params.dir_top
    }
    initCurrentDir()
    // フォルダ、ファイル初期化
    const items = ref({
      dirs: [],
      files: []
    });
    // ディレクトリ・ファイル 初期データセット
    const init = async () => {
      loading.value = true;
      items.value.dirs = []
      items.value.files = []
      try {
        items.value.dirs = await fileApiFunc.apiGetFileDirList(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
        items.value.files = await fileApiFunc.apiGetFileList(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
      } catch (error) {
        console.log("get files & dirs exception error", error);
      }
      loading.value = false;
    };
    init()


    // フォルダ→ファイル物理削除
    const deleteDir = async (dir) => {
      if(!confirm("実行するとデータは復元できません。よろしいですか？")) return;
      loading.value = true;
      try {
        // TODO: 別関数に切り出す && 共通化
        // 第一階層
        await fileApiFunc.apiDeleteDir(dir);
        await deleteFiles(dir)
        // 第二階層
        for (const level1 of props.params.dirs) {
          if (dir.dir_id === level1.parent_dir_id) {
            await fileApiFunc.apiDeleteDir(level1);
            await deleteFiles(level1)
            // 第三階層
            for (const level2 of props.params.dirs) {
              if (level1.dir_id === level2.parent_dir_id) {
                await fileApiFunc.apiDeleteDir(level2);
                await deleteFiles(level2)
                // 第四階層
                for (const level3 of props.params.dirs) {
                  if (level2.dir_id === level3.parent_dir_id) {
                    await fileApiFunc.apiDeleteDir(level3);
                    await deleteFiles(level3)
                  }
                }
              }
            }
          }
        }
        init()
        alert("フォルダを完全に削除しました");
      }
      catch (error) {
        console.log("delete item error:", error);
      }
      loading.value = false;
      // ディレクトリ直下ファイル物理削除
      async function deleteFiles (target_dir) {
        const dir_files = await fileApiFunc.apiGetFileList(target_dir, fileApiFunc.getTrashboxFlag())
        if(dir_files.length > 0) {
          for (const file of dir_files) {
            await storageFunc.storageDeleteFile(file).then(async () => {
              await fileApiFunc.apiExecuteDeleteFile(file)
            })
          }
        }
      }
    };
    
    // ファイル物理削除
    const execDelete = async (file) => {
      if(!confirm("実行するとデータは復元できません。よろしいですか？")) return;
      loading.value = true;
      try {
        await storageFunc.storageDeleteFile(file).then(async () => {
          await fileApiFunc.apiExecuteDeleteFile(file)
        })
        items.value.files = await fileApiFunc.apiGetFileList(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
        alert('ファイルを完全に削除しました。')
      } catch (error) {
        console.log('file execute delete error', error);
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
    const moveDir = async (dir) => {
      current_dir.value = dir
      breadcrumbs.value.push({
        title: dir.dir_name,
        dir: dir
      })
      init()
    }
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
      // 削除
      execDelete,
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
  }
}
</script>