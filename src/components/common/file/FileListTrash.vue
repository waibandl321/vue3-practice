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
        @click="bulkRestore()"
      >ゴミ箱から戻す</v-btn>
      <v-btn
        color="error"
        variant="text"
        append-icon="mdi-delete"
        @click="bulkExecDelete()"
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
                    @click="restoreFile(file)"
                  >
                    ゴミ箱から戻す
                  </v-list-item>
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
import fileApiFunc from '@/mixins/api/func/file'
import storageFunc from '@/mixins/storage/storage.js'

import { ref } from '@vue/reactivity'

export default {
  name: "file-trashbox",
  props: {
    params: Object,
    changeMode: Function,
    uploadedChange: Function
  },
  setup(props) {
    // MEMO: 容量計算コンポーネントにて物理削除検知用
    props.uploadedChange(false)

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
        items.value.dirs = await fileApiFunc.apiGetDirsUnderParentDir(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
        items.value.files = await fileApiFunc.apiGetFilesUnderParentDir(
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
      props.uploadedChange(true)
      // ディレクトリ直下ファイル物理削除
      async function deleteFiles (target_dir) {
        const dir_files = await fileApiFunc.apiGetFilesUnderParentDir(target_dir, fileApiFunc.getTrashboxFlag())
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
        // TODO: API&storage削除共通化
        await storageFunc.storageDeleteFile(file).then(async () => {
          await fileApiFunc.apiExecuteDeleteFile(file)
        })
        items.value.files = await fileApiFunc.apiGetFilesUnderParentDir(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
        alert('ファイルを完全に削除しました。')
      } catch (error) {
        console.log('file execute delete error', error);
      }
      loading.value = false;
      props.uploadedChange(true)
    }
    // ゴミ箱から戻す
    const restoreFile = async (_file) => {
      loading.value = true;
      try {
        await execRestore(_file)
        alert('ファイルを復元しました。')
      } catch (error) {
        console.error('restore file error', error)
      }
      loading.value = false;
    }
    const bulkRestore = async () => {
      loading.value = true
      try {
        for (const item of is_selected_items.value) {
          await execRestore(item)
        }
        items.value.files = await fileApiFunc.apiGetFilesUnderParentDir(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
        alert('選択されたファイルを復元しました。')
      } catch (error) {
        console.log("bulk delete file exeptopn error", error);
      }
      loading.value = false
    }
    // 共通 復元API処理
    async function execRestore (_file) {
      await fileApiFunc.apiRestoreFile(_file)
      items.value.files = items.value.files.filter(v => v.id !== _file.id)
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
    const bulkExecDelete = async () => {
      if(!confirm("実行するとデータは復元できません。よろしいですか？")) return;
      loading.value = true
      try {
        for (const item of is_selected_items.value) {
          // TODO: API&storage削除共通化
          await storageFunc.storageDeleteFile(item).then(async () => {
            await fileApiFunc.apiExecuteDeleteFile(item)
          })
        }
        items.value.files = await fileApiFunc.apiGetFilesUnderParentDir(
          current_dir.value,
          fileApiFunc.getTrashboxFlag()
        );
        alert('選択されたファイルを完全に削除しました')
      } catch (error) {
        console.log("bulk delete file exeptopn error", error);
      }
      loading.value = false
      props.uploadedChange(true)
    }
    const isSelectAll = () => {
      if(!is_selected_all.value) {
        is_selected_items.value = []
        return;
      }
      items.value.files.forEach((file) => {
        is_selected_items.value.push(file)
      })
    }
    return {
      loading,
      current_dir,
      // アイテム
      items,
      // 削除
      execDelete,
      // restore
      restoreFile,
      bulkRestore,
      // パンくず
      breadcrumbs,
      clickBreadcrumb,
      judgeCurrentDir,
      // 一括操作
      is_selected_items,
      is_selected_all,
      isSelectAll,
      bulkExecDelete,

      deleteDir,
      moveDir
      
    };
  }
}
</script>