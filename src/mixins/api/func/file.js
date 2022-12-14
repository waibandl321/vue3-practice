import { API } from 'aws-amplify'
import {
  createFileDirTop, createFileDir, createFileStore,
  updateFileDir, updateFileStore,
  deleteFileDir, deleteFileStore
} from '@/graphql/mutations'
import { listFileDirTops, listFileDirs, listFileStores } from '@/graphql/queries'
import { uuid } from 'vue-uuid'
import store from '@/store'

export default {
  getDeleteFlag () {
    return true
  },
  getTrashboxFlag () {
    return true
  },
  // トップディレクトリ
  // TODO: 企業登録時に自動生成する
  async apiCreateTopDir (company) {
    const fileDirTop = this.generateFileTopDirObject(company)
    return await API.graphql({
      query: createFileDirTop,
      variables: { input: fileDirTop }
    })
  },
  generateFileTopDirObject (company) {
    return {
      organization_id: company.company_cd,
      function_cd: "file",
      dir_id: uuid.v4(),
      level: 0,
      company_cd: company.company_cd
    }
  },
  async apiGetDirTop() {
    const filter = {
      organization_id: {
        eq: store.getters.companyCd
      }
    }
    const results = await API.graphql({
      query: listFileDirTops,
      variables: { filter: filter }
    })
    return results.data.listFileDirTops.items[0]
  },
  // 全てのディレクトリを取得
  async apiGetDirs () {
    const filter = {
      company_cd: {
        eq: store.getters.companyCd
      },
      status: {
        eq: 0
      }
    }
    const results = await API.graphql({
      query: listFileDirs,
      variables: { filter: filter }
    })
    return results.data.listFileDirs.items
  },
  // フォルダ作成
  async apiCreateDir (current_dir, dir_name) {
    const dirObj = this.generateDirObject(current_dir, dir_name)
    return await API.graphql({
      query: createFileDir,
      variables: { input: dirObj }
    })
  },
  generateDirObject(current_dir, dir_name) {
    return {
      dir_id: uuid.v4(),
      dir_name: dir_name,
      parent_dir_id: current_dir.dir_id,
      level: current_dir.level + 1,
      status: 0,
      company_cd: store.getters.companyCd
    }
  },
  // フォルダ更新
  async apiUpdateDir (_dir, delete_flag = false) {
    const dir = {
      id: _dir.id,
      dir_name: _dir.dir_name
    }
    if(delete_flag) {
      dir.status = 1
    }
    return await API.graphql({
      query: updateFileDir,
      variables: { input: dir }
    })
  },
  // フォルダ削除
  // TODO: チャットや掲示板に紐づくファイルも削除する
  async apiDeleteDir(item) {
    const filter = {
      id: item.id,
    }
    return await API.graphql({
      query: deleteFileDir,
      variables: {input: filter}
    });
  },

  // 現在のディレクトリに紐づくフォルダを取得
  async apiGetDirsUnderParentDir (current_dir, trashbox_flag = false) {
    const filter = {
      parent_dir_id: {
        eq: current_dir.dir_id
      },
      status: {
        eq: trashbox_flag ? 1 : 0
      }
    }
    const results = await API.graphql({
      query: listFileDirs,
      variables: { filter: filter }
    })
    return results.data.listFileDirs.items
  },
  
  // ファイルアップロード
  async createFile (current_dir, _file, data_url, func_cd = null) {
    const fileObj = this.generateUploadFileObject(current_dir, _file, data_url, func_cd)
    return await API.graphql({
      query: createFileStore,
      variables: { input: fileObj }
    }).then(res => res.data.createFileStore)
  },
  generateUploadFileObject (current_dir, _file, data_url, func_cd) {
    return {
      company_cd: store.getters.companyCd,
      dir_id: current_dir.dir_id,
      function_cd: func_cd,
      file_name: _file.name,
      file_size: _file.size,
      owner_id: store.getters.staff.staff_id,
      data_url: data_url,
      store_type: 0,
      status: 0,
      delete: 0,
    }
  },
  // 現在のディレクトリに紐付くファイル一覧を取得
  async apiGetFilesUnderParentDir (current_dir, trashbox_flag = false) {
    const filter = {
      dir_id: {
        eq: current_dir.dir_id
      },
      status: {
        eq: trashbox_flag ? 1 : 0
      }
    }
    const results = await API.graphql({
      query: listFileStores,
      variables: { filter: filter }
    })
    return results.data.listFileStores.items
  },
  // 全てのファイルを取得
  async apiGetAllFile () {
    const filter = {
      company_cd: {
        eq: store.getters.companyCd
      }
    }
    const results = await API.graphql({
      query: listFileStores,
      variables: { filter: filter }
    })
    return results.data.listFileStores.items
  },
  // ファイル論理削除
  async apiMoveTrashbox (item) {
    const file = {
      id: item.id,
      status: 1
    }
    return await API.graphql({
      query: updateFileStore,
      variables: { input: file }
    })
  },
  // ファイル物理削除
  async apiExecuteDeleteFile (item) {
    const file = {
      id: item.id,
    }
    return await API.graphql({
      query: deleteFileStore,
      variables: { input: file }
    })
  },
  // ファイルをゴミ箱から戻す
  async apiRestoreFile (item) {
    const file = {
      id: item.id,
      status: 0
    }
    return await API.graphql({
      query: updateFileStore,
      variables: { input: file }
    })
  },
  async apiGetTrashboxFileList (current_dir) {
    const filter = {
      dir_id: {
        eq: current_dir.dir_id
      },
      status: {
        eq: 1
      }
    }
    const results = await API.graphql({
      query: listFileStores,
      variables: { filter: filter }
    })
    return results.data.listFileStores.items
  },
  
}