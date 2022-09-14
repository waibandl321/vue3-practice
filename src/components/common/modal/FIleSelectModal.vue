<template>
  <v-dialog v-model="modal">
    <v-card width="800">
      <v-card-title>ファイル管理から選択</v-card-title>
      <!-- パンくずリスト -->
      <div class="d-flex mb-4">
        <v-btn
          v-for="(b, idxb) in breadcrumbs"
          :key="idxb"
          variant="text"
          size="small"
          @click="clickBreadcrumb(b)"
          :disabled="judgeCurrentDir(b)"
        >{{ b.title }}</v-btn>
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
            <th class="short-td px-0"></th>
            <th class="text-left">ファイル・フォルダ名</th>
            <th class="text-left">更新者</th>
            <th class="text-left">更新日</th>
            <th class="text-left">サイズ</th>
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
          </tr>
          <!-- ファイル -->
          <tr
            v-for="(file, idxF) in items.files"
            :key="idxF"
          >
            <td class="short-td px-0">
              <v-checkbox
                v-model="is_selected_item"
                :value="file"
                hide-details="auto"
              ></v-checkbox>
            </td>
            <td>{{ file.file_name }}</td>
            <td>{{ file.staff_id }}</td>
            <td>{{ file.updatedAt }}</td>
            <td>{{ file.file_size }} byte</td>
          </tr>
        </tbody>
      </v-table>
      <!-- フッター -->
      <v-divider></v-divider>
      <v-card-actions class="justify-end">
        <v-btn
          @click="close()"
          variant="outlined"
        >
          キャンセル
        </v-btn>
        <v-btn
          @click="save()"
          color="primary"
          variant="outlined"
          :disabled="!is_selected_item"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { effectScope, ref, toRefs } from '@vue/reactivity'
import fileApiFunc from '@/mixins/api/func/file'
import { onMounted, watchEffect } from '@vue/runtime-core'

export default {
  props: {
    fileSelectModal: Boolean,
    dirTop: Object,
    closeFileSelectModal: Function,
    isSelectedFile: Function,
  },
  setup (props) {
    // データ初期化
    const _props = toRefs(props)
    const modal = ref(_props.fileSelectModal)
    const loading = ref(false);
    const items = ref({
      dirs: [],
      files: []
    });
    const dir_top = ref({})
    const current_dir = ref({})
    const breadcrumbs = ref([])

    const scope = effectScope()
    scope.run(() => {
      // TOPディレクトリのデータセット監視
      watchEffect(() => {
        if(Object.keys(_props.dirTop.value).length > 0) {
          dir_top.value = _props.dirTop.value
          current_dir.value = dir_top.value
        }
      })
      onMounted(() => {
        // パンくず初期データセット
        const top_dir = {
          title: "TOP",
          dir: dir_top.value,
        }
        breadcrumbs.value.push(top_dir)
      })
    })
    
    // ディレクトリ・ファイル 初期データセット
    const init = async () => {
      loading.value = true;
      items.value.dirs = []
      items.value.files = []
      try {
        items.value.dirs = await fileApiFunc.apiGetFileDirList(current_dir.value);
        items.value.files = await fileApiFunc.apiGetFileList(current_dir.value);
      } catch (error) {
        console.error("get files & dirs exception error", error);
      }
      loading.value = false;
    };
    init()
    
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
    
    // 選択系
    const is_selected_item = ref(undefined)
    // 保存、キャンセル
    const close = () => {
      items.value.dirs = []
      items.value.files = []
      props.closeFileSelectModal()
    }
    const save = () => {
      props.isSelectedFile(is_selected_item.value)
      items.value.dirs = []
      items.value.files = []
      current_dir.value = {}
      is_selected_item.value = undefined
    }

    return {
      modal,
      loading,
      current_dir,
      // アイテム
      items,
      moveDir,
      // パンくず
      breadcrumbs,
      clickBreadcrumb,
      judgeCurrentDir,
      // 選択系
      is_selected_item,
      close,
      save,
    }
  }
}
</script>