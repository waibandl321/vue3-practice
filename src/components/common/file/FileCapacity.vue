<template>
  <div class="pa-6">
    <div class="text-right">上限:10MB</div>
    <div class="text-right">残り:{{ capacity_rest }}byte</div>
    <v-progress-linear
      v-model="percent"
      color="amber"
      height="25"
      rounded
    >
      <template v-slot:default="{ value }">
        <strong>{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
  </div>
</template>

<script>
import fileApiFunc from '@/mixins/api/func/file'

import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'

export default {
  props: {
    params: Object,
    mutationCapacityOver: Function
  },
  setup (props) {
    // ファイルデータ
    const files = ref([])
    const max_capacity = 1 * 1024 * 1024 * 10 // max: 10MB
    const current_capacity = ref(0)
    const capacity_rest = ref(0)
    const percent = ref(undefined)

    const getFiles = async () => {
      current_capacity.value = 0
      files.value = await fileApiFunc.apiGetAllFile()
      for (const file of files.value) {
        current_capacity.value += Number(file.file_size)
      }
      capacity_rest.value = Number(max_capacity) - Number(current_capacity.value)
      percent.value = Math.floor((Number(current_capacity.value) / Number(max_capacity)) * 100)
    }
    getFiles()

    // 容量max監視
    watchEffect(() => {
      if (percent.value > 100) {
        props.mutationCapacityOver(true)
      } else {
        props.mutationCapacityOver(false)
      }
    })

    // ファイルアップロード状況を監視
    watchEffect( async () => {
      if(props.params.uploaded_flag) {
        getFiles()
      }
    })

    return {
      percent,
      capacity_rest 
    }
  }
}
</script>