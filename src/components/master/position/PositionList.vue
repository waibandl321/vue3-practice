<template>
  <v-row>
    <v-col cols="2">
      <MasterLeftMenu />
    </v-col>
    <v-col cols="10">
      {{ items }}
      <div>
        <v-progress-linear
          v-if="loading"
          indeterminate
          color="green"
          class="mt-4"
        ></v-progress-linear>
        <v-table
          fixed-header
          height="300px"
        >
          <thead>
            <tr>
              <th class="text-left">ポジション名</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in items"
              :key="item.position_id"
              @click="recordClick(item)"
            >
              <td>{{ item.position_cd }}</td>
              <td>
                <v-menu>
                  <template v-slot:activator="{ props }">
                    <v-btn
                      variant="text"
                      v-bind="props"
                      icon="mdi-dots-horizontal"
                      size="small"
                    ></v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      density="compact"
                      link
                      @click="deletePosition(item)"
                    >
                      ポジションを削除
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="fixed-btn">
        <v-btn
          color="primary"
          icon="mdi-plus"
          size="x-large"
          @click="clickNew()"
        ></v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import MasterLeftMenu from '../MasterLeftMenu.vue'
import positionApiFunc from '@/mixins/api/master/position.js'
import { ref } from 'vue'
export default {
  name: 'position-list',
  components: { MasterLeftMenu },
  props: {
    params: Object,
    setEditor: Function,
    setViewer: Function,
  },
  setup (props) {
    const loading = ref(false)
    const items = ref([])
    // 一覧読み込み
    const getPositionList = async () => {
      loading.value = true
      try {
        items.value = await positionApiFunc.apiGetPosition()
      } catch (error) {
        console.error(error);
      }
      loading.value = false
    }
    getPositionList()

    // 削除
    const deletePosition = async (position) => {
      try {
        await positionApiFunc.apiDeletePosition(position)
        items.value = items.value.filter(v => v.id !== position.id)
        alert('ポジションを削除しました')
      } catch (error) {
        console.error(error);
      }
    }

    // 詳細遷移
    const recordClick = (item) => {
      props.setViewer(item)
    }

    // 新規作成遷移
    const is_new = true
    const clickNew = () => {
      props.setEditor(undefined, is_new)
    }

    return {
      loading,
      items,
      is_new,
      recordClick,
      clickNew,
      deletePosition
    }
  },
}
</script>
<style scoped>
.fixed-btn {
  position: fixed;
  bottom: 24px;
  right: 24px;
}
</style>
